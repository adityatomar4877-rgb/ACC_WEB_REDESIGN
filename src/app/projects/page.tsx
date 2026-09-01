'use client';

import React, { useState } from 'react';
import { PROJECTS_DATA, Project } from '@/data/projects';
import SubmitProjectModal from '@/components/Modals/SubmitProjectModal';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const categories = ['All', 'AI / ML', 'Web', 'Systems & Cloud', 'Open Source'];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCat = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="projects-page">
      {/* Page Hero */}
      <section className="subpage-hero">
        <div className="container">
          <div className="hero-header-flex">
            <div>
              <div className="section-meta">
                <span>SHIPPED SOFTWARE REGISTRY</span>
              </div>
              <h1 className="subpage-hero-title">
                Production tools, AI models & distributed systems.
              </h1>
              <p className="subpage-hero-lead">
                Every project indexed here is architected, tested, and maintained by Amity Coding Club members.
              </p>
            </div>

            <div className="hero-btn-action">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsSubmitOpen(true)}
              >
                Submit a Project <span className="arrow-icon">+</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="projects-controls-section">
        <div className="container">
          <div className="controls-bar">
            {/* Category Pills */}
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search projects, technologies (e.g. Next.js, Rust)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button type="button" className="clear-btn" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <p>No projects found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="projects-cards-grid">
              {filteredProjects.map((proj) => (
                <div key={proj.id} id={proj.id} className="project-grid-card">
                  {/* Top Bar */}
                  <div className="card-top">
                    <span className="badge badge-tech">{proj.category}</span>
                    <span className="proj-version">{proj.version}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-subtitle">{proj.subtitle}</p>

                  {/* Metrics if available */}
                  {proj.metrics && (
                    <div className="metrics-row">
                      {proj.metrics.map((m) => (
                        <div key={m.label} className="metric-box">
                          <span className="m-val">{m.value}</span>
                          <span className="m-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="tech-pills-row">
                    {proj.tags.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Contributors */}
                  <div className="contributors-box">
                    <span className="contrib-label">Built by:</span>
                    <span className="contrib-names">
                      {proj.contributors.map((c) => c.name).join(', ')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="card-actions-footer">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                    >
                      <span>⚙</span> Source Code
                    </a>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link live"
                      >
                        <span>↗</span> Live Preview
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submission Modal */}
      <SubmitProjectModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

      <style jsx>{`
        .hero-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .projects-controls-section {
          padding: 24px 0;
          background: #FFFFFF;
          border-bottom: 1px solid var(--hairline);
        }

        .controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .category-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cat-pill {
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--hairline);
          background: var(--canvas-primary);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--ink-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cat-pill:hover {
          color: var(--ink-primary);
          border-color: var(--ink-primary);
        }

        .cat-pill.active {
          background: var(--ink-primary);
          color: #FFFFFF;
          border-color: var(--ink-primary);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 0.8125rem;
          color: var(--ink-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 8px 32px 8px 36px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--hairline);
          font-size: 0.8125rem;
          background: var(--canvas-subtle);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--accent-primary);
          background: #FFFFFF;
        }

        .clear-btn {
          position: absolute;
          right: 10px;
          font-size: 0.75rem;
          color: var(--ink-muted);
          cursor: pointer;
        }

        .projects-grid-section {
          padding: 48px 0 80px;
          background: var(--canvas-secondary);
        }

        .projects-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .project-grid-card {
          background: #FFFFFF;
          border: 1px solid var(--hairline);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
        }

        .project-grid-card:hover {
          border-color: var(--ink-heading);
          box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .proj-version {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--ink-muted);
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .project-subtitle {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 12px;
          background: var(--canvas-subtle);
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .m-val {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--ink-heading);
        }

        .m-lbl {
          font-size: 0.625rem;
          color: var(--ink-muted);
        }

        .tech-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tech-badge {
          padding: 3px 8px;
          background: var(--canvas-subtle);
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--ink-primary);
          border: 1px solid var(--hairline);
        }

        .contributors-box {
          font-size: 0.75rem;
          color: var(--ink-secondary);
          margin-top: auto;
          margin-bottom: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .contrib-label {
          font-family: var(--font-mono);
          color: var(--ink-muted);
          margin-right: 6px;
        }

        .contrib-names {
          font-weight: 500;
          color: var(--ink-primary);
        }

        .card-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .btn-link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--ink-secondary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color var(--transition-fast);
        }

        .btn-link:hover {
          color: var(--ink-primary);
        }

        .btn-link.live {
          color: var(--accent-primary);
        }

        .btn-link.live:hover {
          color: var(--accent-hover);
        }

        .empty-state {
          text-align: center;
          padding: 64px 20px;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid var(--hairline);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .projects-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-header-flex {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .projects-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
