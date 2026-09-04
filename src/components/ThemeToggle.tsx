'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({
  showLabel = false,
  className = '',
  size = 'md'
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === 'dark' : false;

  return (
    <div className={`theme-toggle-wrapper ${size} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`sky-toggle-track ${isDark ? 'dark' : 'light'}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {/* Track Background Elements */}
        <div className="track-elements" aria-hidden="true">
          {/* Night Stars in track (visible in dark mode on the left) */}
          <div className="track-stars">
            <span className="track-star star-1">✦</span>
            <span className="track-star star-2">·</span>
            <span className="track-star star-3">★</span>
            <span className="track-star star-4">·</span>
            <span className="track-star star-5">✦</span>
          </div>

          {/* Day subtle background cloud hint in track (visible in light mode on the right) */}
          <div className="track-day-clouds">
            <svg
              className="track-cloud-bg"
              width="24"
              height="13"
              viewBox="0 0 30 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 16h17a3.8 3.8 0 0 0 1.8-7.1A4.8 4.8 0 0 0 15 4.5a5 5 0 0 0-8.5 4.5A3.8 3.8 0 0 0 5.5 16z"
                fill="rgba(255, 255, 255, 0.7)"
              />
            </svg>
          </div>
        </div>

        {/* Sliding Capsule Thumb */}
        <div className={`sky-toggle-thumb ${isDark ? 'dark' : 'light'}`} aria-hidden="true">
          {/* Day Mode Contents: Sun + Fluffy Clouds */}
          <div className={`thumb-content day-content ${!isDark ? 'visible' : 'hidden'}`}>
            {/* Golden Sun */}
            <div className="sun-icon-wrap">
              <svg
                className="sun-svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hollow center ring */}
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="#E29B0D"
                  strokeWidth="2.3"
                  fill="none"
                />
                {/* 8 rays */}
                <line x1="12" y1="1.6" x2="12" y2="4.4" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="12" y1="19.6" x2="12" y2="22.4" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="1.6" y1="12" x2="4.4" y2="12" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="19.6" y1="12" x2="22.4" y2="12" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="4.6" y1="4.6" x2="6.6" y2="6.6" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="17.4" y1="17.4" x2="19.4" y2="19.4" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="4.6" y1="19.4" x2="6.6" y2="17.4" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="17.4" y1="6.6" x2="19.4" y2="4.6" stroke="#E29B0D" strokeWidth="2.3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Two Cute Sky-Blue Fluffy Clouds */}
            <div className="clouds-wrap">
              <svg
                className="clouds-svg"
                viewBox="0 0 34 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Big Main Cloud */}
                <path
                  d="M4.5 16h13.2a3.8 3.8 0 0 0 1.5-7.2A4.6 4.6 0 0 0 12.5 4 4.8 4.8 0 0 0 5 8a3.6 3.6 0 0 0-.5 8z"
                  fill="#73A7F7"
                />
                {/* Small Tucked Cloud */}
                <path
                  d="M21 16h7.5a2.7 2.7 0 0 0 1-5.1 3.2 3.2 0 0 0-4.8-2.6 3.4 3.4 0 0 0-4.4 2.8 2.5 2.5 0 0 0 .7 4.9z"
                  fill="#73A7F7"
                />
              </svg>
            </div>
          </div>

          {/* Night Mode Contents: Glowing Crescent Moon + Twinkling Stars */}
          <div className={`thumb-content night-content ${isDark ? 'visible' : 'hidden'}`}>
            {/* Glowing Golden Crescent Moon */}
            <div className="moon-icon-wrap">
              <svg
                className="moon-svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 13.5A8.5 8.5 0 1 1 11 3.5a6.8 6.8 0 0 0 9.5 10z"
                  fill="#F5B51B"
                  stroke="#D97706"
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            {/* Night Stars */}
            <div className="night-stars-wrap">
              <span className="thumb-star ts-1">✦</span>
              <span className="thumb-star ts-2">★</span>
            </div>
          </div>
        </div>
      </button>

      {showLabel && (
        <span className="toggle-label" onClick={toggleTheme}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}

      <style jsx>{`
        .theme-toggle-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          user-select: none;
        }

        /* ─── Track Base ─── */
        .sky-toggle-track {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 9999px;
          cursor: pointer;
          outline: none;
          padding: 0;
          overflow: hidden;
          transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .sky-toggle-track:hover {
          transform: translateY(-1px);
        }

        .sky-toggle-track:active {
          transform: scale(0.97);
        }

        .sky-toggle-track:focus-visible {
          box-shadow: 0 0 0 3px rgba(91, 61, 245, 0.35);
        }

        /* ─── Light Mode Track ─── */
        .sky-toggle-track.light {
          background-color: #E2EAF8;
          border: 1px solid rgba(195, 212, 238, 0.95);
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .sky-toggle-track.light:hover {
          background-color: #D9E4F5;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.06), 0 4px 14px rgba(115, 167, 247, 0.25);
        }

        /* ─── Dark Mode Track ─── */
        .sky-toggle-track.dark {
          background-color: #121827;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .sky-toggle-track.dark:hover {
          background-color: #171E31;
          border-color: rgba(91, 61, 245, 0.4);
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5), 0 4px 14px rgba(91, 61, 245, 0.2);
        }

        /* ─── Background Ambient Elements ─── */
        .track-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
        }

        .track-stars {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(2px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .sky-toggle-track.dark .track-stars {
          opacity: 1;
          transform: translateY(0);
        }

        .track-star {
          display: inline-block;
          color: #93C5FD;
          line-height: 1;
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          transform-origin: center center;
          backface-visibility: hidden;
        }

        .star-1 {
          font-size: 0.65rem;
          color: #FDE047;
          animation: twinkle 2.5s infinite ease-in-out;
        }

        .star-2 {
          font-size: 0.85rem;
          color: #E2E8F0;
        }

        .star-3 {
          font-size: 0.55rem;
          color: #60A5FA;
          animation: twinkle 3s infinite ease-in-out 0.8s;
        }

        .star-4 {
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        .star-5 {
          font-size: 0.6rem;
          color: #FDE047;
          animation: twinkle 2.8s infinite ease-in-out 1.2s;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scale3d(0.85, 0.85, 1);
          }
          50% {
            opacity: 1;
            transform: scale3d(1.15, 1.15, 1);
          }
        }

        .track-day-clouds {
          margin-left: auto;
          margin-right: 8px;
          opacity: 1;
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease;
        }

        .sky-toggle-track.dark .track-day-clouds {
          opacity: 0;
        }

        /* ─── Sliding Capsule Thumb ─── */
        .sky-toggle-thumb {
          position: absolute;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 3px;
          left: 3px;
          transition: transform 0.44s cubic-bezier(0.34, 1.35, 0.64, 1),
                      background-color 0.35s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }

        /* Light Mode Thumb: Pure White Pill */
        .sky-toggle-thumb.light {
          background-color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        /* Dark Mode Thumb: Sleek Night Slate Pill */
        .sky-toggle-thumb.dark {
          background-color: #1F273B;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Thumb Internal Content Layers */
        .thumb-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          padding: 0 4px;
          transition: opacity 0.25s ease, transform 0.3s ease;
        }

        .thumb-content.visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .thumb-content.hidden {
          opacity: 0;
          transform: scale(0.7);
          pointer-events: none;
        }

        /* ─── Day Content: Sun & Clouds ─── */
        .sun-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sun-svg {
          transform-origin: 12px 12px;
          will-change: transform;
          backface-visibility: hidden;
          animation: gentle-spin 20s linear infinite;
        }

        @keyframes gentle-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .clouds-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ─── Night Content: Moon & Stars ─── */
        .moon-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .moon-svg {
          filter: drop-shadow(0 0 4px rgba(245, 181, 27, 0.5));
        }

        .night-stars-wrap {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        /* ─── Size Variants (Long & Slim) ─── */

        /* MD (Default / Header - Long & Slim) */
        .theme-toggle-wrapper.md .sky-toggle-track {
          width: 156px;
          height: 30px;
        }
        .theme-toggle-wrapper.md .sky-toggle-thumb {
          width: 58px;
          height: 24px;
          top: 3px;
          left: 3px;
        }
        .theme-toggle-wrapper.md .sky-toggle-thumb.dark {
          transform: translateX(92px);
        }
        .theme-toggle-wrapper.md .sun-svg {
          width: 17px;
          height: 17px;
        }
        .theme-toggle-wrapper.md .clouds-svg {
          width: 22px;
          height: 13px;
        }
        .theme-toggle-wrapper.md .moon-svg {
          width: 15px;
          height: 15px;
        }
        .theme-toggle-wrapper.md .thumb-star.ts-1 {
          font-size: 0.65rem;
          color: #93C5FD;
        }
        .theme-toggle-wrapper.md .thumb-star.ts-2 {
          font-size: 0.52rem;
          color: #FDE047;
        }

        /* SM (Compact / Footer) */
        .theme-toggle-wrapper.sm .sky-toggle-track {
          width: 130px;
          height: 26px;
        }
        .theme-toggle-wrapper.sm .sky-toggle-thumb {
          width: 48px;
          height: 20px;
          top: 3px;
          left: 3px;
        }
        .theme-toggle-wrapper.sm .sky-toggle-thumb.dark {
          transform: translateX(76px);
        }
        .theme-toggle-wrapper.sm .sun-svg {
          width: 14px;
          height: 14px;
        }
        .theme-toggle-wrapper.sm .clouds-svg {
          width: 18px;
          height: 11px;
        }
        .theme-toggle-wrapper.sm .moon-svg {
          width: 13px;
          height: 13px;
        }
        .theme-toggle-wrapper.sm .thumb-star.ts-1 {
          font-size: 0.58rem;
          color: #93C5FD;
        }
        .theme-toggle-wrapper.sm .thumb-star.ts-2 {
          font-size: 0.45rem;
          color: #FDE047;
        }

        /* LG (Large display) */
        .theme-toggle-wrapper.lg .sky-toggle-track {
          width: 180px;
          height: 36px;
        }
        .theme-toggle-wrapper.lg .sky-toggle-thumb {
          width: 66px;
          height: 30px;
          top: 3px;
          left: 3px;
        }
        .theme-toggle-wrapper.lg .sky-toggle-thumb.dark {
          transform: translateX(108px);
        }
        .theme-toggle-wrapper.lg .sun-svg {
          width: 20px;
          height: 20px;
        }
        .theme-toggle-wrapper.lg .clouds-svg {
          width: 26px;
          height: 15px;
        }
        .theme-toggle-wrapper.lg .moon-svg {
          width: 18px;
          height: 18px;
        }
        .theme-toggle-wrapper.lg .thumb-star.ts-1 {
          font-size: 0.75rem;
          color: #93C5FD;
        }
        .theme-toggle-wrapper.lg .thumb-star.ts-2 {
          font-size: 0.6rem;
          color: #FDE047;
        }

        /* Optional Label */
        .toggle-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--ink-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .toggle-label:hover {
          color: var(--ink-primary);
        }
      `}</style>
    </div>
  );
}
