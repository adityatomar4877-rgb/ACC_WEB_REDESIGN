'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/data/projects';

export default function ProjectShowcase() {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = featuredProjects[currentIndex] || featuredProjects[0];
  const total = featuredProjects.length;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="projects-showcase-section" aria-label="Featured Projects Showcase">
      <div className="container">
        <div className="showcase-grid">
          {/* LEFT ZONE: Section Info */}
          <div className="showcase-left">
            <div className="section-meta">
              <span>02 / PROJECTS</span>
            </div>
            <h2 className="showcase-headline">
              Building solutions<br />
              for the real world.
            </h2>
            <p className="showcase-lead">
              Explore impactful projects built by our talented community members.
            </p>
            <div className="showcase-left-action">
              <Link href="/projects" className="text-link text-link-accent">
                <span>View all projects</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          {/* CENTER ZONE: Dark Visual Mockup Card */}
          <div className="showcase-center">
            <div className="dark-product-card">
              {/* Card Header */}
              <div className="card-top-bar">
                <span className="card-counter">
                  0{currentIndex + 1} <span className="counter-slash">/</span> 0{total}
                </span>
                <span className="card-title-preview">{currentProject.title}</span>
              </div>

              {/* Dynamic Interactive Visual Content */}
              <div className="product-visual-viewport">
                {currentProject.id === 'ai-campus-navigator' && (
                  <div className="campus-map-visual">
                    <svg viewBox="0 0 460 260" className="map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid Background */}
                      <defs>
                        <pattern id="campus-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563EB" />
                          <stop offset="50%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#60A5FA" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <rect width="100%" height="100%" fill="#0F1115" />
                      <rect width="100%" height="100%" fill="url(#campus-grid)" />

                      {/* 3D Isometric Buildings */}
                      {/* Block A */}
                      <g className="building-node" transform="translate(80, 140)">
                        <polygon points="0,-12 28,-26 56,-12 28,2" fill="#242833" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="0,-12 28,2 28,24 0,10" fill="#181B22" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="56,-12 28,2 28,24 56,10" fill="#1C2029" stroke="#374151" strokeWidth="0.75" />
                      </g>

                      {/* Block B */}
                      <g className="building-node" transform="translate(160, 90)">
                        <polygon points="0,-16 34,-32 68,-16 34,0" fill="#242833" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="0,-16 34,0 34,30 0,14" fill="#181B22" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="68,-16 34,0 34,30 68,14" fill="#1C2029" stroke="#374151" strokeWidth="0.75" />
                      </g>

                      {/* Block C */}
                      <g className="building-node" transform="translate(240, 150)">
                        <polygon points="0,-14 30,-28 60,-14 30,0" fill="#242833" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="0,-14 30,0 30,22 0,8" fill="#181B22" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="60,-14 30,0 30,22 60,8" fill="#1C2029" stroke="#374151" strokeWidth="0.75" />
                      </g>

                      {/* Block D */}
                      <g className="building-node" transform="translate(320, 80)">
                        <polygon points="0,-20 40,-40 80,-20 40,0" fill="#242833" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="0,-20 40,0 40,36 0,16" fill="#181B22" stroke="#374151" strokeWidth="0.75" />
                        <polygon points="80,-20 40,0 40,36 80,16" fill="#1C2029" stroke="#374151" strokeWidth="0.75" />
                      </g>

                      {/* Small satellite blocks */}
                      <g transform="translate(130, 180)">
                        <polygon points="0,-8 18,-17 36,-8 18,1" fill="#1E222B" stroke="#374151" strokeWidth="0.5" />
                        <polygon points="0,-8 18,1 18,12 0,3" fill="#16181F" stroke="#374151" strokeWidth="0.5" />
                        <polygon points="36,-8 18,1 18,12 36,3" fill="#181B22" stroke="#374151" strokeWidth="0.5" />
                      </g>

                      <g transform="translate(260, 60)">
                        <polygon points="0,-10 22,-21 44,-10 22,1" fill="#1E222B" stroke="#374151" strokeWidth="0.5" />
                        <polygon points="0,-10 22,1 22,15 0,4" fill="#16181F" stroke="#374151" strokeWidth="0.5" />
                        <polygon points="44,-10 22,1 22,15 44,4" fill="#181B22" stroke="#374151" strokeWidth="0.5" />
                      </g>

                      {/* Animated Glowing Navigation Route Line */}
                      <path
                        d="M 108 140 L 175 188 L 225 125 L 290 148 L 360 88"
                        stroke="url(#routeGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        className="route-line-anim"
                      />

                      {/* Waypoint nodes */}
                      <circle cx="108" cy="140" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="175" cy="188" r="3.5" fill="#60A5FA" />
                      <circle cx="225" cy="125" r="3.5" fill="#60A5FA" />
                      <circle cx="290" cy="148" r="3.5" fill="#60A5FA" />

                      {/* Target Destination Location Pin (Blue Marker with pulse) */}
                      <g transform="translate(360, 88)">
                        <circle cx="0" cy="0" r="14" fill="rgba(59, 130, 246, 0.25)" className="pulse-radar" />
                        <circle cx="0" cy="0" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                      </g>
                    </svg>
                  </div>
                )}

                {currentProject.id === 'amity-os-portal' && (
                  <div className="os-portal-preview">
                    <div className="os-card-header">
                      <div className="os-pill-badge">Next.js 15 App Router</div>
                      <div className="os-status">⚡ 0.2s TTFB</div>
                    </div>
                    <div className="os-dashboard-grid">
                      <div className="os-stat-box">
                        <span className="os-num">98.4%</span>
                        <span className="os-sub">Attendance Sync</span>
                      </div>
                      <div className="os-stat-box">
                        <span className="os-num">4,200</span>
                        <span className="os-sub">Active Students</span>
                      </div>
                      <div className="os-stat-box full">
                        <div className="os-row-line">
                          <span>CSE-402 Distributed Systems</span>
                          <span className="os-time">10:15 AM • Audi 2</span>
                        </div>
                        <div className="os-row-line">
                          <span>AI Hackathon Team Matching</span>
                          <span className="os-tag-live">4 Squads Open</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentProject.id === 'codecollab-ide' && (
                  <div className="collab-preview">
                    <div className="collab-header">
                      <span className="collab-badge">Rust WASM Sandbox</span>
                      <span className="collab-latency">&lt; 12ms sync</span>
                    </div>
                    <div className="collab-code-area">
                      <span className="c-line"><span className="c-blue">async fn</span> <span className="c-yellow">execute_session</span>() &#123;</span>
                      <span className="c-line">&nbsp;&nbsp;<span className="c-purple">let</span> engine = WasmRuntime::init();</span>
                      <span className="c-line">&nbsp;&nbsp;engine.broadcast_crdt_delta().await;</span>
                      <span className="c-line">&#125;</span>
                    </div>
                  </div>
                )}

                {currentProject.id === 'ecopulse-iot' && (
                  <div className="ecopulse-preview">
                    <div className="eco-header">
                      <span className="eco-badge">IoT Telemetry Mesh</span>
                      <span className="eco-active">48 Nodes Live</span>
                    </div>
                    <div className="eco-grid">
                      <div className="eco-box">
                        <span className="eco-val">18.4%</span>
                        <span className="eco-lbl">Power Saved</span>
                      </div>
                      <div className="eco-box">
                        <span className="eco-val">412 ppm</span>
                        <span className="eco-lbl">CO2 Ambient</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="card-bottom-actions">
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark-pill"
                  >
                    <span>↗</span> Live Demo
                  </a>
                )}
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-pill"
                >
                  <span>⚙</span> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: Metadata & Controls */}
          <div className="showcase-right">
            {/* Top Carousel Navigation Controls */}
            <div className="showcase-nav-top">
              <div className="nav-arrow-buttons">
                <button
                  type="button"
                  className="nav-arrow-btn"
                  onClick={prevProject}
                  aria-label="Previous project"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="nav-arrow-btn"
                  onClick={nextProject}
                  aria-label="Next project"
                >
                  →
                </button>
              </div>

              {/* Vertical Progress Bar */}
              <div className="progress-vertical">
                <span className="progress-num">01</span>
                <div className="progress-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      top: `${(currentIndex / (total - 1)) * 70}%`
                    }}
                  />
                </div>
                <span className="progress-num">0{total}</span>
              </div>
            </div>

            {/* Project Content Info */}
            <div className="project-detail-body">
              <span className="featured-tag">FEATURED PROJECT</span>
              <h3 className="featured-title">{currentProject.title}</h3>
              <p className="featured-desc">{currentProject.subtitle}</p>

              {/* Tech Tags */}
              <div className="tech-tags-list">
                {currentProject.tags.map((tag) => (
                  <span key={tag} className="tech-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="featured-action">
                <Link href={`/projects#${currentProject.id}`} className="text-link text-link-accent">
                  <span>View Project</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .projects-showcase-section {
          padding: 64px 0 80px;
          background-color: var(--canvas-primary);
        }

        .showcase-grid {
          display: grid;
          grid-template-columns: 1.15fr 1.6fr 1fr;
          gap: 40px;
          align-items: center;
        }

        /* Left Column */
        .showcase-headline {
          font-size: clamp(2rem, 3.2vw, 2.65rem);
          font-weight: 800;
          color: var(--ink-heading, #0F172A);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .showcase-lead {
          font-size: 1rem;
          color: var(--ink-secondary, #475569);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        /* Center Column: Dark Card */
        .dark-product-card {
          background-color: #0F1115;
          border-radius: 16px;
          border: 1px solid #1F242F;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid #1C202B;
          background-color: #12141A;
          user-select: none;
        }

        .card-counter {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: #E2E8F0;
        }

        .counter-slash {
          color: #64748B;
          margin: 0 2px;
        }

        .card-title-preview {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #94A3B8;
        }

        .product-visual-viewport {
          height: 250px;
          position: relative;
          background-color: #0B0D11;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .map-svg {
          width: 100%;
          height: 100%;
        }

        .route-line-anim {
          stroke-dasharray: 8 3;
          animation: dash-move 30s linear infinite;
        }

        @keyframes dash-move {
          to {
            stroke-dashoffset: -1000;
          }
        }

        .pulse-radar {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          transform-origin: center;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        /* OS Portal Preview */
        .os-portal-preview {
          padding: 20px;
          width: 100%;
          color: #E2E8F0;
        }

        .os-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .os-pill-badge {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          padding: 3px 8px;
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(37, 99, 235, 0.4);
          color: #60A5FA;
          border-radius: 9999px;
        }

        .os-status {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #10B981;
        }

        .os-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .os-stat-box {
          background: #161922;
          border: 1px solid #232836;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .os-stat-box.full {
          grid-column: span 2;
          gap: 6px;
        }

        .os-num {
          font-size: 1.125rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .os-sub {
          font-size: 0.6875rem;
          color: #94A3B8;
        }

        .os-row-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #CBD5E1;
        }

        .os-time {
          font-family: var(--font-mono);
          color: #60A5FA;
        }

        .os-tag-live {
          font-family: var(--font-mono);
          color: #34D399;
        }

        /* Collab preview */
        .collab-preview {
          padding: 20px;
          width: 100%;
        }

        .collab-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          margin-bottom: 12px;
          color: #94A3B8;
        }

        .collab-code-area {
          background: #141720;
          border-radius: 8px;
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          line-height: 1.6;
          color: #E2E8F0;
          display: flex;
          flex-direction: column;
        }

        .c-blue { color: #60A5FA; }
        .c-yellow { color: #FBBF24; }
        .c-purple { color: #C084FC; }

        /* Eco preview */
        .ecopulse-preview {
          padding: 20px;
          width: 100%;
        }

        .eco-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #94A3B8;
          margin-bottom: 16px;
        }

        .eco-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .eco-box {
          background: #141720;
          border: 1px solid #232836;
          padding: 16px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }

        .eco-val {
          font-size: 1.35rem;
          font-weight: 700;
          color: #34D399;
        }

        .eco-lbl {
          font-size: 0.75rem;
          color: #94A3B8;
        }

        /* Card Bottom Actions */
        .card-bottom-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background-color: #12141A;
          border-top: 1px solid #1C202B;
        }

        .btn-dark-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background-color: #1E2330;
          color: #E2E8F0;
          border: 1px solid #2D3344;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          text-decoration: none;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .btn-dark-pill:hover {
          background-color: #293042;
          border-color: #475569;
          color: #FFFFFF;
        }

        /* Right Column */
        .showcase-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .showcase-nav-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-arrow-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          background-color: #FFFFFF;
          color: var(--ink-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-arrow-btn:hover {
          border-color: var(--ink-primary);
          background-color: var(--canvas-subtle);
        }

        .progress-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .progress-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--ink-muted);
        }

        .progress-track {
          width: 2px;
          height: 48px;
          background-color: var(--hairline);
          border-radius: 2px;
          position: relative;
        }

        .progress-bar-fill {
          position: absolute;
          left: 0;
          width: 2px;
          height: 16px;
          background-color: var(--accent-primary);
          border-radius: 2px;
          transition: top var(--transition-base);
        }

        .featured-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 6px;
        }

        .featured-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .featured-desc {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .tech-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tech-pill {
          padding: 4px 10px;
          background-color: var(--canvas-subtle);
          border: 1px solid var(--hairline);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--ink-primary);
        }

        @media (max-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .showcase-right {
            order: 3;
          }
          .showcase-center {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
