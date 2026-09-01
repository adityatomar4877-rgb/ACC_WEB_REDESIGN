'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface MenuItem {
  link: string;
  text: string;
  image?: string;
}

export interface FlowingMenuProps {
  items?: MenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

export default function FlowingMenu({
  items = [
    { link: '#', text: 'CODE()' },
    { link: '#', text: 'LEARN()' },
    { link: '#', text: 'BUILD()' },
    { link: '#', text: 'REPEAT()' }
  ],
  speed = 15,
  textColor = '#ffffff',
  bgColor = '#120F17',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#120F17',
  borderColor = '#ffffff'
}: FlowingMenuProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Performance optimization: Calculate duration based on speed
  const animationDuration = Math.max(4, 60 / (speed || 15));

  return (
    <div
      className="flowing-menu-container"
      onMouseLeave={() => setHoveredIdx(null)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor
      }}
    >
      <nav className="flowing-menu-nav" aria-label="Flowing Menu">
        {items.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={`${item.text}-${idx}`}
              className={`flowing-menu-item ${isHovered ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
            >
              <Link
                href={item.link}
                className="flowing-item-link"
                style={{
                  color: textColor,
                  borderBottomColor: borderColor
                }}
              >
                {/* Default Center Text */}
                <span className="flowing-item-text">{item.text}</span>

                {/* Flowing Marquee Banner (Reveals on hover) */}
                <div
                  className={`flowing-marquee-layer ${isHovered ? 'visible' : ''}`}
                  style={{
                    backgroundColor: marqueeBgColor,
                    color: marqueeTextColor
                  }}
                  aria-hidden={!isHovered}
                >
                  <div
                    className="marquee-track"
                    style={{
                      animationDuration: `${animationDuration}s`
                    }}
                  >
                    {/* Repeating text strip for seamless infinite loop */}
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className="marquee-content-unit">
                        <span className="marquee-text-main">{item.text}</span>
                        <span className="marquee-symbol">•</span>
                      </span>
                    ))}
                  </div>

                  {/* Duplicate track for seamless infinite marquee */}
                  <div
                    className="marquee-track"
                    style={{
                      animationDuration: `${animationDuration}s`
                    }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className="marquee-content-unit">
                        <span className="marquee-text-main">{item.text}</span>
                        <span className="marquee-symbol">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </nav>

      <style jsx>{`
        .flowing-menu-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          user-select: none;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.35);
        }

        .flowing-menu-nav {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .flowing-menu-item {
          flex: 1;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .flowing-item-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          transition: background-color 0.2s ease;
        }

        .flowing-menu-item:last-child .flowing-item-link {
          border-bottom: none;
        }

        .flowing-item-text {
          font-family: var(--font-sans);
          font-size: clamp(2rem, 4.2vw, 3.25rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }

        .flowing-menu-item.active .flowing-item-text {
          opacity: 0;
          transform: scale(0.95);
        }

        /* Flowing Marquee Layer */
        .flowing-marquee-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          z-index: 2;
        }

        .flowing-marquee-layer.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0%);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
          animation: marquee-slide linear infinite;
          flex-shrink: 0;
        }

        .marquee-content-unit {
          display: inline-flex;
          align-items: center;
          padding: 0 16px;
        }

        .marquee-text-main {
          font-family: var(--font-sans);
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .marquee-symbol {
          font-size: 1.5rem;
          margin-left: 24px;
          opacity: 0.5;
        }

        @keyframes marquee-slide {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-100%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .flowing-item-text {
            font-size: 1.75rem;
          }
          .marquee-text-main {
            font-size: 1.85rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
          .flowing-marquee-layer {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
