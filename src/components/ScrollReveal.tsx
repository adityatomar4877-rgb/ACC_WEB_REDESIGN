'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  className?: string;
}

interface WordProps {
  word: string;
  range: [number, number];
  progress: any;
  baseOpacity: number;
  enableBlur: boolean;
  baseRotation: number;
  blurStrength: number;
}

function Word({
  word,
  range,
  progress,
  baseOpacity,
  yDistance = 6
}: {
  word: string;
  range: [number, number];
  progress: any;
  baseOpacity: number;
  yDistance?: number;
}) {
  const opacity = useTransform(progress, range, [baseOpacity, 1], { clamp: true });
  const y = useTransform(progress, range, [yDistance, 0], { clamp: true });

  return (
    <motion.span
      className="scroll-reveal-word"
      style={{
        opacity,
        y,
        display: 'inline-block',
        marginRight: '0.26em',
        marginBottom: '0.12em'
      }}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  baseOpacity = 0.12,
  enableBlur = false,
  containerClassName = '',
  textClassName = '',
  className = ''
}: ScrollRevealProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Raw scroll progress through the track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end']
  });

  // Smooth scroll spring with appropriate restDelta to avoid pinning the CPU
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
    restDelta: 0.002
  });

  // Extract text and split into words
  const text = typeof children === 'string' ? children : String(children || '');
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  // Buffer: Distribute the word reveals across 0 -> 0.78, leaving a 22% pause for comfortable reading
  const animEndRatio = 0.78;
  const wordSpan = 0.08; // Smooth overlap between consecutive words

  return (
    <div
      ref={trackRef}
      className={`scroll-reveal-track ${containerClassName} ${className}`}
    >
      {/* Pinned Sticky Viewport Frame with generous safe padding */}
      <div className="scroll-reveal-sticky-frame">
        <div className="container">
          <div className="scroll-reveal-box">
            <p className={`scroll-reveal-paragraph ${textClassName}`}>
              {words.map((word, i) => {
                const start = (i / words.length) * (animEndRatio - wordSpan);
                const end = start + wordSpan + (1 / words.length) * 0.5;

                return (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    range={[start, Math.min(end, animEndRatio)]}
                    progress={smoothProgress}
                    baseOpacity={baseOpacity}
                  />
                );
              })}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-reveal-track {
          position: relative;
          height: 360vh;
          background-color: var(--canvas-primary);
        }

        .scroll-reveal-sticky-frame {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: calc(var(--nav-height) + 24px) 24px 48px;
          box-sizing: border-box;
          background-color: var(--canvas-primary);
        }

        .scroll-reveal-box {
          max-width: 980px;
          width: 100%;
          margin: 0 auto;
          text-align: left;
        }

        .scroll-reveal-paragraph {
          font-family: var(--font-sans);
          font-size: clamp(1.85rem, 3.4vw, 2.85rem);
          font-weight: 700;
          color: var(--ink-heading);
          line-height: 1.4;
          letter-spacing: -0.025em;
          user-select: none;
        }

        @media (max-width: 768px) {
          .scroll-reveal-track {
            height: 280vh;
          }
          .scroll-reveal-sticky-frame {
            padding: calc(var(--nav-height) + 16px) 20px 32px;
          }
          .scroll-reveal-paragraph {
            font-size: 1.45rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </div>
  );
}
