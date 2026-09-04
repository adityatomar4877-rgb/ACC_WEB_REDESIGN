'use client';

import React, { useState } from 'react';
import { triggerConfetti } from '@/lib/confetti';
import Link from 'next/link';
import SmoothInput from '@/components/SmoothInput';

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [degree, setDegree] = useState('B.Tech CSE (2nd Year)');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['Modern Frontend (Next.js/React)', 'AI & Machine Learning']);
  const [level, setLevel] = useState('Intermediate (Built several projects)');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [memberId, setMemberId] = useState('');

  const domainsList = [
    'Modern Frontend (Next.js/React)',
    'Distributed Backend & Cloud (Go/Rust)',
    'AI & Machine Learning (PyTorch/LLMs)',
    'Competitive Programming (C++/DSA)',
    'Systems & Low-level Engineering',
    'Product Design & UI/UX Systems',
    'Open Source & Tooling'
  ];

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email) return;
      setStep(2);
    } else if (step === 2) {
      if (selectedDomains.length === 0) {
        alert('Please select at least one domain of interest.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const generatedId = `ACC-2026-MEM-${Math.floor(1000 + Math.random() * 9000)}`;
      setMemberId(generatedId);
      setStep(4);

      triggerConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="join-page">
      {/* Page Hero */}
      <section className="subpage-hero">
        <div className="container">
          <div className="section-meta">
            <span>MEMBERSHIP INTAKE 2026</span>
          </div>
          <h1 className="subpage-hero-title">
            Join the Amity Coding Club cohort.
          </h1>
          <p className="subpage-hero-lead">
            Open to all Amity University students passionate about building software. Complete the 3-minute intake application below.
          </p>
        </div>
      </section>

      {/* Application Container */}
      <section className="application-section">
        <div className="container container-narrow">
          <div className="application-card">
            {/* Step Progress Header */}
            {step < 4 && (
              <div className="steps-progress-bar">
                <div className={`step-node ${step >= 1 ? 'active' : ''}`}>
                  <span className="step-number">01</span>
                  <span className="step-label">Personal Info</span>
                </div>
                <div className="step-connector" />
                <div className={`step-node ${step >= 2 ? 'active' : ''}`}>
                  <span className="step-number">02</span>
                  <span className="step-label">Engineering Focus</span>
                </div>
                <div className="step-connector" />
                <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
                  <span className="step-number">03</span>
                  <span className="step-label">Links & Experience</span>
                </div>
              </div>
            )}

            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <form onSubmit={handleNext} className="step-form">
                <h3 className="step-title">01 / Personal Details</h3>
                <p className="step-desc">Provide your basic contact information and university enrollment.</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-name">Full Name *</label>
                  <SmoothInput
                    id="join-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Aditya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-email">University / Personal Email *</label>
                  <SmoothInput
                    id="join-email"
                    type="email"
                    className="form-input"
                    placeholder="aditya@amity.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="join-enroll">Enrollment Number</label>
                    <SmoothInput
                      id="join-enroll"
                      type="text"
                      className="form-input"
                      placeholder="A2305221004"
                      value={enrollment}
                      onChange={(e) => setEnrollment(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="join-degree">Branch & Academic Year</label>
                    <select
                      id="join-degree"
                      className="form-input"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      <option>B.Tech CSE (1st Year)</option>
                      <option>B.Tech CSE (2nd Year)</option>
                      <option>B.Tech CSE (3rd Year)</option>
                      <option>B.Tech CSE / IT (4th Year)</option>
                      <option>BCA / MCA</option>
                      <option>Other Engineering Discipline</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Next: Technical Focus <span className="arrow-icon">→</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Engineering Focus */}
            {step === 2 && (
              <form onSubmit={handleNext} className="step-form">
                <h3 className="step-title">02 / Technical Domains</h3>
                <p className="step-desc">Select the areas of engineering you are most keen to build or learn in.</p>

                <div className="domain-selection-grid">
                  {domainsList.map((dom) => {
                    const isSelected = selectedDomains.includes(dom);
                    return (
                      <button
                        key={dom}
                        type="button"
                        className={`domain-checkbox-pill ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleDomain(dom)}
                      >
                        <span className="check-box-icon">{isSelected ? '✓' : '+'}</span>
                        <span>{dom}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label" htmlFor="join-level">Current Coding Proficiency</label>
                  <select
                    id="join-level"
                    className="form-input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option>Beginner (Learning syntax & foundations)</option>
                    <option>Intermediate (Built several projects)</option>
                    <option>Advanced (Production applications / ICPC ranker)</option>
                    <option>Experienced (Internships / Open Source maintainer)</option>
                  </select>
                </div>

                <div className="form-actions space-between">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Next: Links & Projects <span className="arrow-icon">→</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Links & Experience */}
            {step === 3 && (
              <form onSubmit={handleNext} className="step-form">
                <h3 className="step-title">03 / Links & Experience</h3>
                <p className="step-desc">Share your public code repositories or tell us about your proudest build.</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-gh">GitHub Profile URL *</label>
                  <SmoothInput
                    id="join-gh"
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/yourusername"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-li">LinkedIn Profile URL</label>
                  <SmoothInput
                    id="join-li"
                    type="url"
                    className="form-input"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-note">Tell us about something cool you built or want to build</label>
                  <textarea
                    id="join-note"
                    rows={3}
                    className="form-input"
                    placeholder="e.g. I built a real-time web crawler in Python or I want to build a decentralized campus voting app..."
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                  />
                </div>

                <div className="form-actions space-between">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-accent btn-lg">
                    Complete Membership <span className="arrow-icon">✓</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Confirmed Membership Badge Pass */}
            {step === 4 && (
              <div className="confirmation-view">
                <div className="conf-badge-card">
                  <div className="badge-card-header">
                    <div className="badge-logo">
                      <span className="b-icon">&lt;/&gt;</span>
                      <span className="b-name">AMITY CODING CLUB</span>
                    </div>
                    <span className="badge-chip-status">OFFICIAL MEMBER</span>
                  </div>

                  <div className="badge-card-body">
                    <div className="badge-avatar-ring">{name.slice(0, 2).toUpperCase()}</div>
                    <h3 className="badge-member-name">{name}</h3>
                    <span className="badge-member-id">{memberId}</span>

                    <div className="badge-meta-grid">
                      <div className="b-meta">
                        <span className="bm-lbl">ACADEMIC COHORT</span>
                        <span className="bm-val">{degree}</span>
                      </div>
                      <div className="b-meta">
                        <span className="bm-lbl">DOMAINS</span>
                        <span className="bm-val">{selectedDomains.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="badge-card-footer">
                    <span className="badge-tagline">BUILD. LEARN. SHIP.</span>
                    <span className="badge-verified">VERIFIED 2026</span>
                  </div>
                </div>

                <div className="confirmation-actions">
                  <h4 className="next-steps-title">Welcome to the Club, {name}!</h4>
                  <p className="next-steps-desc">
                    Your member record <strong>{memberId}</strong> is activated. Jump into Discord to introduce yourself and claim your onboarding role.
                  </p>
                  <div className="conf-btn-group">
                    <a
                      href="https://discord.gg/amitycodingclub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg"
                    >
                      Join Discord Guild ↗
                    </a>
                    <Link href="/projects" className="btn btn-secondary btn-lg">
                      Explore Active Repos →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .application-section {
          padding: 64px 0 100px;
          background: var(--canvas-secondary);
        }

        .application-card {
          background: var(--canvas-card);
          border: 1px solid var(--hairline);
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow-card);
        }

        /* Progress */
        .steps-progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .step-node {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.4;
          transition: opacity var(--transition-fast);
        }

        .step-node.active {
          opacity: 1;
        }

        .step-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background: var(--canvas-subtle);
          color: var(--ink-heading);
        }

        .step-node.active .step-number {
          background: var(--ink-heading);
          color: var(--canvas-primary);
        }

        .step-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--ink-heading);
        }

        .step-connector {
          flex: 1;
          height: 1px;
          background: var(--hairline);
          margin: 0 16px;
        }

        /* Form */
        .step-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--ink-heading, #0F172A);
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin-bottom: 6px;
        }

        .step-desc {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          margin-bottom: 28px;
        }

        .form-group {
          margin-bottom: 20px;
          flex: 1;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--ink-primary);
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--hairline);
          border-radius: 10px;
          background: var(--canvas-subtle);
          color: var(--ink-primary);
          font-size: 0.9375rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--accent-primary);
          background: var(--canvas-card);
          box-shadow: 0 0 0 3px var(--accent-subtle);
          outline: none;
        }

        .domain-selection-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .domain-checkbox-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--canvas-subtle);
          border: 1px solid var(--hairline);
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--ink-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .domain-checkbox-pill:hover {
          border-color: var(--ink-primary);
        }

        .domain-checkbox-pill.selected {
          background: var(--accent-subtle);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          font-weight: 600;
        }

        .check-box-icon {
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .form-actions.space-between {
          justify-content: space-between;
        }

        /* Confirmation Pass */
        .confirmation-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
        }

        .conf-badge-card {
          width: 100%;
          max-width: 440px;
          background: #0F1115;
          color: #FFFFFF;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #1F242F;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
        }

        .badge-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid #1C202B;
        }

        .badge-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .b-icon {
          font-family: var(--font-mono);
          font-weight: 700;
          color: #60A5FA;
        }

        .b-name {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .badge-chip-status {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 3px 8px;
          background: rgba(34, 197, 94, 0.2);
          color: #34D399;
          border-radius: 9999px;
          font-weight: 600;
        }

        .badge-card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 24px;
        }

        .badge-avatar-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1E2330;
          border: 2px solid #3B82F6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 12px;
        }

        .badge-member-name {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .badge-member-id {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #60A5FA;
          margin-bottom: 20px;
        }

        .badge-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          text-align: left;
          background: #141720;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #1F242F;
        }

        .bm-lbl {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: #64748B;
          display: block;
        }

        .bm-val {
          font-size: 0.75rem;
          font-weight: 500;
          color: #E2E8F0;
        }

        .badge-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid #1C202B;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #94A3B8;
        }

        .badge-verified {
          color: #34D399;
          font-weight: 600;
        }

        .confirmation-actions {
          text-align: center;
          max-width: 500px;
        }

        .next-steps-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink-heading);
          margin-bottom: 8px;
        }

        .next-steps-desc {
          font-size: 0.9375rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .conf-btn-group {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .application-card {
            padding: 24px 20px;
          }
          .form-row {
            flex-direction: column;
          }
          .conf-btn-group {
            flex-direction: column;
          }
          .steps-progress-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .step-connector {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
