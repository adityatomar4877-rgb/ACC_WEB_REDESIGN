'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TEAM_DATA, TeamMember } from '@/data/team';

export default function TeamPage() {
  const [activeGroup, setActiveGroup] = useState<string>('All');

  const groups = ['All', 'Leadership', 'Core Leads', 'Technical Mentors', 'Alumni'];

  const filteredTeam = TEAM_DATA.filter((member) => {
    return activeGroup === 'All' || member.group === activeGroup;
  });

  return (
    <div className="team-page">
      {/* Page Hero */}
      <section className="subpage-hero">
        <div className="container">
          <div className="hero-header-flex">
            <div>
              <div className="section-meta">
                <span>CLUB ROSTER 2026</span>
              </div>
              <h1 className="subpage-hero-title">
                The engineers, architects & mentors behind ACC.
              </h1>
              <p className="subpage-hero-lead">
                Meet the student leadership and domain leads who design workshops, maintain club infrastructure, and run hackathons.
              </p>
            </div>

            <div className="hero-btn-action">
              <Link href="/join" className="btn btn-primary">
                Join the Core Team <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Group Filter */}
      <section className="team-controls-section">
        <div className="container">
          <div className="category-pills">
            {groups.map((grp) => (
              <button
                key={grp}
                type="button"
                className={`cat-pill ${activeGroup === grp ? 'active' : ''}`}
                onClick={() => setActiveGroup(grp)}
              >
                {grp}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="team-grid-section">
        <div className="container">
          <div className="team-cards-grid">
            {filteredTeam.map((member) => (
              <div key={member.id} className={`team-card ${member.isLeadership ? 'leadership' : ''}`}>
                {/* Header with Avatar & Badge */}
                <div className="team-card-top">
                  <div className="team-avatar">{member.avatarInitials}</div>
                  <span className="badge badge-tech">{member.group}</span>
                </div>

                {/* Info */}
                <h3 className="team-name">{member.name}</h3>
                <h4 className="team-role">{member.role}</h4>
                <p className="team-bio">{member.bio}</p>

                {/* Focus areas */}
                <div className="focus-tags">
                  {member.focus.map((f) => (
                    <span key={f} className="focus-pill">{f}</span>
                  ))}
                </div>

                {/* Projects led if any */}
                {member.projectsLed && member.projectsLed.length > 0 && (
                  <div className="projects-led-row">
                    <span className="proj-led-label">Projects:</span>
                    <span className="proj-led-items">{member.projectsLed.join(', ')}</span>
                  </div>
                )}

                {/* Social Links */}
                <div className="team-socials">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                      <span>⚙</span> GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                      <span>in</span> LinkedIn
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="X (Twitter)">
                      <span>𝕏</span> X
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Callout */}
      <section className="recruitment-section">
        <div className="container">
          <div className="recruitment-card">
            <div className="recruitment-left">
              <span className="recruit-meta">SPRING 2026 APPLICATIONS OPEN</span>
              <h2 className="recruit-title">Want to lead a domain in ACC?</h2>
              <p className="recruit-desc">
                We are actively recruiting Associate Domain Leads in Systems (Rust/Go), AI Model Deployment, and Competitive Programming.
              </p>
            </div>
            <div className="recruitment-right">
              <Link href="/join" className="btn btn-primary btn-lg">
                Apply for Core Lead <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .team-controls-section {
          padding: 24px 0;
          background: #FFFFFF;
          border-bottom: 1px solid var(--hairline);
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

        .team-grid-section {
          padding: 48px 0 80px;
          background: var(--canvas-secondary);
        }

        .team-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .team-card {
          background: #FFFFFF;
          border: 1px solid var(--hairline);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
        }

        .team-card:hover {
          border-color: var(--ink-heading);
          box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .team-card.leadership {
          border-top: 3px solid var(--accent-primary);
        }

        .team-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .team-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #111111;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .team-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          margin-bottom: 2px;
        }

        .team-role {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-primary);
          margin-bottom: 12px;
        }

        .team-bio {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.55;
          margin-bottom: 20px;
          flex: 1;
        }

        .focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .focus-pill {
          padding: 2px 8px;
          background: var(--canvas-subtle);
          border-radius: 4px;
          font-size: 0.6875rem;
          color: var(--ink-primary);
        }

        .projects-led-row {
          font-size: 0.75rem;
          margin-bottom: 16px;
          padding-top: 10px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .proj-led-label {
          font-family: var(--font-mono);
          color: var(--ink-muted);
          margin-right: 6px;
        }

        .proj-led-items {
          font-weight: 500;
          color: var(--ink-primary);
        }

        .team-socials {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .social-link {
          font-size: 0.75rem;
          color: var(--ink-secondary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color var(--transition-fast);
        }

        .social-link:hover {
          color: var(--accent-primary);
        }

        /* Recruitment Banner */
        .recruitment-section {
          padding: 40px 0 80px;
          background: var(--canvas-primary);
        }

        .recruitment-card {
          background: #0F1115;
          color: #FFFFFF;
          border-radius: 20px;
          padding: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .recruit-meta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .recruit-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .recruit-desc {
          font-size: 0.9375rem;
          color: #94A3B8;
          max-width: 580px;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .team-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
          .recruitment-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .team-cards-grid {
            grid-template-columns: 1fr;
          }
          .hero-header-flex {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
