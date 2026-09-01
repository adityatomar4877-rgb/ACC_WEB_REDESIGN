'use client';

import React, { useEffect, useRef, useState, useId } from 'react';

export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
  textColor?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
}

export default function CurvedLoop({
  marqueeText = 'BUILD ✦ LEARN ✦ SHIP ✦ AMITY CODING CLUB ✦',
  speed = 2,
  curveAmount = 240,
  direction = 'left',
  interactive = false,
  className = '',
  textColor = 'currentColor',
  fontSize = '1.75rem',
  fontWeight = '800'
}: CurvedLoopProps) {
  const generatedId = useId().replace(/:/g, '');
  const pathId = `curved-loop-path-${generatedId}`;
  
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const speedMultiplierRef = useRef(1);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  // Repeat text enough times to create a seamless infinite loop along the path
  const repeatedText = `${marqueeText} `.repeat(12);

  // Direction coefficient
  const dirCoeff = direction === 'right' ? 1 : -1;

  useEffect(() => {
    // Intersection Observer to stop animation when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isVisibleRef.current) {
        // Base speed scaled by interactive multiplier
        const currentSpeed = speed * 12 * speedMultiplierRef.current * dirCoeff;
        offsetRef.current = (offsetRef.current + currentSpeed * delta) % 1000;
        setOffset(offsetRef.current);

        // Smoothly decay interactive speed back to 1
        if (speedMultiplierRef.current > 1) {
          speedMultiplierRef.current = Math.max(1, speedMultiplierRef.current - delta * 3);
        } else if (speedMultiplierRef.current < 1) {
          speedMultiplierRef.current = Math.min(1, speedMultiplierRef.current + delta * 3);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed, dirCoeff]);

  // Interactive mouse move speed boost
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const movement = Math.abs(e.movementX) || 1;
    speedMultiplierRef.current = Math.min(3.5, 1 + movement * 0.15);
  };

  // Generate smooth curved quadratic bezier path based on curveAmount
  const width = 1440;
  const height = 180;
  const startY = height * 0.3;
  const controlY = startY + (curveAmount * 0.45);
  const endY = startY;

  const pathD = `M -200,${startY} Q ${width / 2},${controlY} ${width + 200},${endY}`;

  return (
    <div
      ref={containerRef}
      className={`curved-loop-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        cursor: interactive ? 'grab' : 'default'
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="curved-loop-svg"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        <text
          fill={textColor}
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}
        >
          <textPath
            href={`#${pathId}`}
            startOffset={`${offset}px`}
            style={{
              willChange: 'startOffset'
            }}
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>

      <style jsx>{`
        .curved-loop-wrapper {
          padding: 20px 0 10px;
        }

        .curved-loop-svg {
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .curved-loop-wrapper {
            padding: 10px 0 0;
          }
        }
      `}</style>
    </div>
  );
}
