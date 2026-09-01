'use client';

import React from 'react';
import Link from 'next/link';
import CurvedLoop from './CurvedLoop';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Animated Curved Text Ribbon */}
      <div className="footer-curved-loop-wrap">
        <CurvedLoop
          marqueeText="AMITY CODING CLUB ✦ BUILD ✦ LEARN ✦ SHIP ✦ CREATE TOMORROW ✦"
          speed={2.5}
          curveAmount={280}
          direction="right"
          interactive
          textColor="#5B3DF5"
          fontSize="1.875rem"
          fontWeight="800"
        />
      </div>

      <div className="container">
        <div className="footer-top">
          {/* Brand & Mission */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <span className="footer-brand-icon">&lt;/&gt;</span>
              <span className="footer-brand-name">AMITY CODING CLUB</span>
            </div>
            <p className="footer-tagline">
              Build. Learn. Ship.
              <br />
              <span className="footer-subtext">
                A community of student builders creating real-world impact through code.
              </span>
            </p>
            <div className="footer-status-box">
              <span className="status-dot" />
              <span className="footer-status-text">SYSTEM STATUS: ALL SERVICES OPERATIONAL</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-list">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/events" className="footer-link">Events</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/team" className="footer-link">Team</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/join" className="footer-link">Join Us</Link></li>
            </ul>
          </div>

          {/* Initiatives */}
          <div className="footer-col">
            <h4 className="footer-col-title">Initiatives</h4>
            <ul className="footer-list">
              <li><Link href="/events#hackathon-3-0" className="footer-link">Hackathon 3.0</Link></li>
              <li><Link href="/projects#ai-campus-navigator" className="footer-link">Campus Navigator</Link></li>
              <li><Link href="/join" className="footer-link">Join ACC 2026</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-list">
              <li>
                <a href="https://github.com/amity-coding-club" target="_blank" rel="noopener noreferrer" className="footer-link">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://discord.gg/amitycodingclub" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Discord ↗
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  X (Twitter) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Location / Campus */}
          <div className="footer-col">
            <h4 className="footer-col-title">Campus</h4>
            <address className="footer-address">
              Amity University<br />
              Sector 125, Noida<br />
              Uttar Pradesh 201313<br />
              <span className="footer-coord">28.5450° N, 77.3331° E</span>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Amity Coding Club. Designed & built with care.</p>
          <div className="footer-meta">
            <span>VERSION 2.4.0</span>
            <span className="meta-sep">•</span>
            <span>NEXT.JS APP ROUTER</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          border-top: 1px solid var(--hairline);
          background-color: var(--canvas-primary);
          padding: 32px 0 32px;
          margin-top: auto;
          overflow: hidden;
        }

        .footer-curved-loop-wrap {
          margin-bottom: 24px;
          border-bottom: 1px solid var(--hairline-ultra-light);
          background: linear-gradient(180deg, rgba(91, 61, 245, 0.02) 0%, transparent 100%);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr 1.2fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-brand-icon {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.125rem;
          color: #5B3DF5;
        }

        .footer-brand-name {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--ink-heading);
        }

        .footer-tagline {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--ink-primary);
          line-height: 1.5;
        }

        .footer-subtext {
          font-weight: 400;
          font-size: 0.8125rem;
          color: var(--ink-secondary);
        }

        .footer-status-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: var(--canvas-subtle);
          border-radius: var(--radius-pill);
          border: 1px solid var(--hairline);
          width: fit-content;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--status-online);
          box-shadow: 0 0 0 2px var(--status-online-glow);
        }

        .footer-status-text {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--ink-secondary);
          letter-spacing: 0.02em;
        }

        .footer-col-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink-heading);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          transition: color var(--transition-fast);
        }

        .footer-link:hover {
          color: #5B3DF5;
        }

        .footer-address {
          font-style: normal;
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.6;
        }

        .footer-coord {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ink-muted);
          display: block;
          margin-top: 6px;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid var(--hairline-ultra-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--ink-muted);
        }

        .footer-meta {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--ink-muted);
        }

        .meta-sep {
          color: var(--hairline-medium);
        }

        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 32px;
          }
          .footer-brand {
            grid-column: span 3;
          }
        }

        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: span 2;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
