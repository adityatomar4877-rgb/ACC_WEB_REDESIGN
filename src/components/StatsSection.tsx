'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({
    devs: 0,
    projects: 0,
    events: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCounts = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        devs: Math.floor(ease * 1240),
        projects: Math.floor(ease * 84),
        events: Math.floor(ease * 42)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      } else {
        setCounts({
          devs: 1240,
          projects: 84,
          events: 42
        });
      }
    };

    requestAnimationFrame(animateCounts);
  }, [inView]);

  return (
    <section ref={sectionRef} className="stats-section" aria-label="Community Statistics">
      <div className="container">
        <div className="stats-grid">
          {/* Stat 1: Developers */}
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {inView ? (
                  <span>
                    0{counts.devs.toLocaleString()}+
                  </span>
                ) : (
                  <span>01,240+</span>
                )}
              </div>
              <div className="stat-label">Developers</div>
            </div>
          </div>

          <div className="stat-divider" />

          {/* Stat 2: Projects */}
          <div className="stat-item">
            <div className="stat-icon mono-icon">&lt;/&gt;</div>
            <div className="stat-content">
              <div className="stat-value">
                {inView ? `${counts.projects}+` : '84+'}
              </div>
              <div className="stat-label">Projects Built</div>
            </div>
          </div>

          <div className="stat-divider" />

          {/* Stat 3: Events */}
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {inView ? `${counts.events}+` : '42+'}
              </div>
              <div className="stat-label">Events Conducted</div>
            </div>
          </div>

          <div className="stat-divider" />

          {/* Stat 4: Possibilities */}
          <div className="stat-item">
            <div className="stat-icon infinity-icon">∞</div>
            <div className="stat-content">
              <div className="stat-value">∞</div>
              <div className="stat-label">Possibilities</div>
            </div>
          </div>

          {/* Action Link */}
          <div className="stat-action">
            <Link href="/about" className="text-link text-link-accent">
              <span className="impact-text">VIEW OUR IMPACT</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          border-top: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
          background-color: var(--canvas-primary);
          padding: 24px 0;
          user-select: none;
        }

        .stats-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          color: var(--ink-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #374151;
        }

        .mono-icon {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.15rem;
        }

        .infinity-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          line-height: 1.15;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: var(--ink-secondary);
          font-weight: 400;
        }

        .stat-divider {
          width: 1px;
          height: 36px;
          background-color: var(--hairline);
        }

        .stat-action {
          margin-left: auto;
        }

        .impact-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .stat-divider {
            display: none;
          }
          .stat-action {
            grid-column: span 2;
            margin-left: 0;
            padding-top: 12px;
            border-top: 1px solid var(--hairline-ultra-light);
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .stat-action {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
