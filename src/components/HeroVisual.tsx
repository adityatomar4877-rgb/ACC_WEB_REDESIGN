'use client';

import React from 'react';

export default function HeroVisual() {
  return (
    <div className="hero-visual-wrapper" aria-hidden="true">
      {/* Ambient background glows */}
      <div className="ambient-glow purple-glow" />
      <div className="ambient-glow yellow-glow" />

      {/* Concentric Orbital Rings */}
      <div className="orbit-ring ring-outer" />
      <div className="orbit-ring ring-middle" />
      <div className="orbit-ring ring-inner" />

      {/* Floating Technical Badge: Top-Left </> */}
      <div className="floating-badge badge-top-left">
        <span className="badge-code-symbol">&lt;/&gt;</span>
      </div>

      {/* Floating Technical Badge: Bottom-Right {} */}
      <div className="floating-badge badge-bottom-right">
        <span className="badge-code-symbol">&#123;&#125;</span>
      </div>

      {/* Floating Accent Dots / Spheres */}
      <div className="floating-sphere sphere-purple-1" />
      <div className="floating-sphere sphere-yellow-1" />
      <div className="floating-sphere sphere-purple-2" />

      {/* Main 3D-Style Floating ACC Block */}
      <div className="cube-card-container">
        <div className="cube-card">
          {/* Subtle glossy card reflection highlight */}
          <div className="card-gloss-highlight" />

          {/* 3D ACC Logomark */}
          <div className="acc-logo-mark">
            <svg viewBox="0 0 200 120" className="acc-svg-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Gradient: Purple into Warm Gold */}
                <linearGradient id="accGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B3DF5" />
                  <stop offset="35%" stopColor="#7C4DFF" />
                  <stop offset="68%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#F5B51B" />
                </linearGradient>

                {/* Ambient drop shadow filter */}
                <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(91, 61, 245, 0.25)" />
                </filter>
              </defs>

              {/* Connected 'a' loop and 'c' arcs forming 'acc' */}
              {/* 'a' letter loop */}
              <path
                d="M 38 60 C 38 42, 54 32, 72 32 C 90 32, 102 42, 102 60 C 102 78, 90 88, 72 88 C 54 88, 38 78, 38 60 Z"
                stroke="url(#accGradient)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 88 34 L 88 88"
                stroke="url(#accGradient)"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* first 'c' arc */}
              <path
                d="M 142 40 C 122 34, 105 46, 105 60 C 105 74, 122 86, 142 80"
                stroke="url(#accGradient)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
              />

              {/* second 'c' arc */}
              <path
                d="M 176 40 C 156 34, 139 46, 139 60 C 139 74, 156 86, 176 80"
                stroke="url(#accGradient)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* 3D Base Drop Shadow */}
        <div className="cube-ground-shadow" />
      </div>

      <style jsx>{`
        .hero-visual-wrapper {
          position: relative;
          width: 100%;
          max-width: 520px;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          user-select: none;
          pointer-events: auto;
        }

        /* Ambient Glows */
        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
          opacity: 0.55;
          transform: translate3d(0, 0, 0);
        }

        .purple-glow {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(91, 61, 245, 0.28) 0%, rgba(91, 61, 245, 0.04) 70%, transparent 100%);
          top: 10%;
          left: 5%;
        }

        .yellow-glow {
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(245, 181, 27, 0.22) 0%, rgba(245, 181, 27, 0.02) 70%, transparent 100%);
          top: 25%;
          right: 8%;
        }

        /* Concentric Orbital Rings */
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(91, 61, 245, 0.1);
          pointer-events: none;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .ring-outer {
          width: 440px;
          height: 440px;
          border-color: rgba(91, 61, 245, 0.06);
        }

        .ring-middle {
          width: 360px;
          height: 360px;
          border-color: rgba(91, 61, 245, 0.08);
          border-style: dashed;
        }

        .ring-inner {
          width: 280px;
          height: 280px;
          border-color: rgba(245, 181, 27, 0.12);
        }

        /* Floating Technical Badges */
        .floating-badge {
          position: absolute;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(229, 231, 235, 0.8);
          border-radius: 12px;
          box-shadow: 0 12px 24px -4px rgba(91, 61, 245, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-weight: 600;
          color: #5B3DF5;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .floating-badge:hover {
          transform: scale3d(1.08, 1.08, 1) translate3d(0, -2px, 0) !important;
        }

        .badge-top-left {
          top: 60px;
          left: 36px;
          width: 46px;
          height: 46px;
          font-size: 1rem;
          transform: translate3d(0, 0, 0) rotate(-2deg);
          animation: float-badge-1 5s ease-in-out infinite alternate;
        }

        .badge-bottom-right {
          bottom: 70px;
          right: 36px;
          width: 48px;
          height: 48px;
          font-size: 1.15rem;
          color: #111827;
          transform: translate3d(0, 0, 0) rotate(2deg);
          animation: float-badge-2 6s ease-in-out infinite alternate;
        }

        @keyframes float-badge-1 {
          0% { transform: translate3d(0, 0px, 0) rotate(-2deg); }
          100% { transform: translate3d(0, -9px, 0) rotate(-2deg); }
        }

        @keyframes float-badge-2 {
          0% { transform: translate3d(0, 0px, 0) rotate(2deg); }
          100% { transform: translate3d(0, -10px, 0) rotate(2deg); }
        }

        /* Floating Accent Spheres */
        .floating-sphere {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transform: translate3d(0, 0, 0);
        }

        .sphere-purple-1 {
          width: 10px;
          height: 10px;
          background: #5B3DF5;
          opacity: 0.6;
          top: 90px;
          right: 70px;
          box-shadow: 0 0 12px rgba(91, 61, 245, 0.5);
          animation: float-sphere 4s ease-in-out infinite alternate;
        }

        .sphere-yellow-1 {
          width: 8px;
          height: 8px;
          background: #F5B51B;
          opacity: 0.7;
          top: 60px;
          right: 180px;
          box-shadow: 0 0 10px rgba(245, 181, 27, 0.5);
          animation: float-sphere 5.5s ease-in-out infinite alternate;
        }

        .sphere-purple-2 {
          width: 12px;
          height: 12px;
          background: #7C4DFF;
          opacity: 0.4;
          bottom: 60px;
          left: 80px;
          box-shadow: 0 0 12px rgba(124, 77, 255, 0.4);
          animation: float-sphere 4.5s ease-in-out infinite alternate;
        }

        @keyframes float-sphere {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(4px, -6px, 0); }
        }

        /* 3D Card Container & Floating Animation */
        .cube-card-container {
          position: relative;
          z-index: 5;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          animation: float-main-card 5s ease-in-out infinite alternate;
        }

        @keyframes float-main-card {
          0% {
            transform: translate3d(0, 0px, 0);
          }
          100% {
            transform: translate3d(0, -12px, 0);
          }
        }

        .cube-card {
          width: 250px;
          height: 250px;
          background: #FFFFFF;
          border-radius: 36px;
          border: 1px solid rgba(243, 244, 246, 0.9);
          box-shadow:
            0 28px 60px -12px rgba(91, 61, 245, 0.16),
            0 12px 24px -6px rgba(0, 0, 0, 0.05),
            inset 0 1px 2px rgba(255, 255, 255, 0.9),
            inset 0 -2px 6px rgba(0, 0, 0, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .cube-card:hover {
          transform: scale3d(1.03, 1.03, 1) translate3d(0, -4px, 0);
          box-shadow:
            0 36px 72px -12px rgba(91, 61, 245, 0.22),
            0 16px 32px -6px rgba(0, 0, 0, 0.06);
        }

        .card-gloss-highlight {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 36px 36px 0 0;
          pointer-events: none;
        }

        .acc-logo-mark {
          width: 170px;
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .acc-svg-logo {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 12px rgba(91, 61, 245, 0.2));
        }

        .cube-ground-shadow {
          width: 200px;
          height: 24px;
          background: radial-gradient(ellipse at center, rgba(91, 61, 245, 0.22) 0%, rgba(91, 61, 245, 0.03) 60%, transparent 80%);
          margin: 16px auto 0;
          border-radius: 50%;
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          backface-visibility: hidden;
          animation: shadow-scale 5s ease-in-out infinite alternate;
        }

        @keyframes shadow-scale {
          0% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 0.6;
          }
          100% {
            transform: translate3d(0, 0, 0) scale3d(0.85, 0.85, 1);
            opacity: 0.35;
          }
        }

        @media (max-width: 1024px) {
          .hero-visual-wrapper {
            max-width: 440px;
            height: 380px;
          }
          .cube-card {
            width: 210px;
            height: 210px;
            border-radius: 30px;
          }
          .acc-logo-mark {
            width: 140px;
            height: 90px;
          }
          .ring-outer {
            width: 360px;
            height: 360px;
          }
          .ring-middle {
            width: 300px;
            height: 300px;
          }
          .ring-inner {
            width: 230px;
            height: 230px;
          }
        }

        @media (max-width: 640px) {
          .hero-visual-wrapper {
            max-width: 320px;
            height: 320px;
          }
          .cube-card {
            width: 180px;
            height: 180px;
            border-radius: 26px;
          }
          .acc-logo-mark {
            width: 120px;
            height: 80px;
          }
          .badge-top-left {
            top: 20px;
            left: 10px;
            width: 38px;
            height: 38px;
            font-size: 0.875rem;
          }
          .badge-bottom-right {
            bottom: 30px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </div>
  );
}
