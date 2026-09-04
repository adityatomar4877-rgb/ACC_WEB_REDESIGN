'use client';

import React from 'react';
import Link from 'next/link';
import HeroVisual from './HeroVisual';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextEl = document.getElementById('scroll-reveal-quote') || document.querySelector('.scroll-reveal-section') || document.querySelector('.pillars-section');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="new-hero-section" aria-label="Hero">
      {/* Background ambient lighting and subtle grid */}
      <div className="hero-bg-canvas">
        <div className="bg-top-purple-glow" />
        <div className="bg-subtle-grid" />
      </div>

      <div className="container hero-layout-container">
        <div className="hero-two-col-grid">
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <div className="hero-content-col">
            {/* Main Signature Headline */}
            <h1 className="hero-main-headline">
              <span className="headline-line">
                <span className="accent-code-purple">Code</span> Today.
              </span>
              <span className="headline-line">
                <span className="accent-create-yellow">Create</span> Tomorrow.
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="hero-sub-description">
              Amity Coding Club is a community of passionate coders building skills, sharing knowledge and creating impact.
            </p>

            {/* CTA Action Buttons */}
            <div className="hero-cta-buttons-row">
              <Link href="/events" className="btn btn-hero-primary">
                <span>Explore Events</span>
                <span className="arrow-glyph">→</span>
              </Link>
              <Link href="/join" className="btn btn-hero-secondary">
                <span>Join Club</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="community-icon">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </Link>
            </div>

            {/* Follow Us / Social Links */}
            <div className="hero-social-section">
              <span className="follow-label">Follow us on</span>
              <div className="social-icons-stack">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Follow Amity Coding Club on LinkedIn"
                  title="LinkedIn"
                >
                  <span className="icon-text-in">in</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Follow Amity Coding Club on Instagram"
                  title="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.gg/amitycodingclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Join Amity Coding Club Discord"
                  title="Discord"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Join Amity Coding Club WhatsApp"
                  title="WhatsApp"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D-Style Floating Visual */}
          <div className="hero-visual-col">
            <HeroVisual />
          </div>
        </div>

        {/* Bottom Center Scroll Indicator */}
        <div className="hero-bottom-scroll-trigger">
          <button
            type="button"
            className="scroll-down-circle-btn"
            onClick={scrollToNext}
            aria-label="Scroll to exploration sections"
          >
            <span className="arrow-down-glyph">↓</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .new-hero-section {
          position: relative;
          background-color: #FFFFFF;
          padding: 40px 0 32px;
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-top-purple-glow {
          position: absolute;
          top: -150px;
          right: 15%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(91, 61, 245, 0.08) 0%, rgba(91, 61, 245, 0.01) 60%, transparent 80%);
          border-radius: 50%;
        }

        .bg-subtle-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(17, 24, 39, 0.035) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.7;
        }

        .hero-layout-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-two-col-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 24px;
        }

        /* Left Column */
        .hero-content-col {
          display: flex;
          flex-direction: column;
        }

        /* Eyebrow Pill */
        .hero-eyebrow-wrap {
          margin-bottom: 24px;
        }

        .hero-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(91, 61, 245, 0.07);
          border: 1px solid rgba(91, 61, 245, 0.16);
          border-radius: 9999px;
          user-select: none;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #5B3DF5;
        }

        .eyebrow-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: #5B3DF5;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Main Headline */
        .hero-main-headline {
          font-size: clamp(3.2rem, 5.5vw, 4.6rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
        }

        .headline-line {
          display: block;
        }

        .accent-code-purple {
          color: #5B3DF5;
        }

        .accent-create-yellow {
          color: #F5B51B;
        }

        /* Sub Description */
        .hero-sub-description {
          font-size: 1.125rem;
          color: #5B6475;
          line-height: 1.6;
          max-width: 490px;
          margin-bottom: 36px;
        }

        /* Buttons Row */
        .hero-cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          background-color: #5B3DF5;
          color: #FFFFFF;
          border: 1px solid #5B3DF5;
          padding: 12px 26px;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          box-shadow: 0 8px 20px -4px rgba(91, 61, 245, 0.35);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-primary:hover {
          background-color: #4C2BE6;
          border-color: #4C2BE6;
          box-shadow: 0 12px 28px -4px rgba(91, 61, 245, 0.45);
          transform: translateY(-2px);
        }

        .arrow-glyph {
          transition: transform 0.2s ease;
        }

        .btn-hero-primary:hover .arrow-glyph {
          transform: translateX(4px);
        }

        .btn-hero-secondary {
          background-color: #FFFFFF;
          color: #111827;
          border: 1px solid rgba(17, 24, 39, 0.12);
          padding: 12px 22px;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-secondary:hover {
          border-color: #111827;
          background-color: #F9FAFB;
          transform: translateY(-2px);
        }

        .community-icon {
          color: #5B6475;
        }

        /* Social Links */
        .hero-social-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .follow-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #5B6475;
          letter-spacing: 0.02em;
        }

        .social-icons-stack {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(17, 24, 39, 0.1);
          background-color: #FFFFFF;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }

        .social-icon-btn:hover {
          border-color: #5B3DF5;
          color: #5B3DF5;
          box-shadow: 0 4px 12px rgba(91, 61, 245, 0.15);
          transform: translateY(-2px);
        }

        .icon-text-in {
          font-weight: 700;
          font-size: 0.9375rem;
          font-family: var(--font-sans);
        }

        /* Bottom Scroll Trigger */
        .hero-bottom-scroll-trigger {
          display: flex;
          justify-content: center;
          margin-top: 12px;
        }

        .scroll-down-circle-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(17, 24, 39, 0.12);
          background-color: #FFFFFF;
          color: #5B3DF5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .scroll-down-circle-btn:hover {
          border-color: #5B3DF5;
          background-color: rgba(91, 61, 245, 0.04);
          transform: translateY(3px);
        }

        .arrow-down-glyph {
          display: inline-block;
          font-size: 0.9375rem;
          font-weight: 700;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          animation: bounce-subtle 2s infinite ease-in-out;
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, 3px, 0); }
        }

        @media (max-width: 1024px) {
          .hero-two-col-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-content-col {
            max-width: 600px;
          }
          .hero-visual-col {
            order: 2;
          }
        }

        @media (max-width: 640px) {
          .new-hero-section {
            padding: 24px 0 28px;
          }
          .hero-main-headline {
            font-size: 2.75rem;
          }
          .hero-sub-description {
            font-size: 1rem;
          }
          .hero-cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
          .btn-hero-primary, .btn-hero-secondary {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
