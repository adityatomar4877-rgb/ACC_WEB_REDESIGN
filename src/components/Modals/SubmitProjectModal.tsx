'use client';

import React, { useState } from 'react';
import { triggerConfetti } from '@/lib/confetti';
import SmoothInput from '@/components/SmoothInput';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitProjectModal({ isOpen, onClose }: SubmitProjectModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'AI / ML' | 'Web' | 'Mobile' | 'Systems & Cloud' | 'Open Source'>('Web');
  const [tags, setTags] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !githubUrl) return;

    setSubmitted(true);
    triggerConfetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setTitle('');
    setTagline('');
    setTags('');
    setGithubUrl('');
    setLiveUrl('');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-meta">COMMUNITY INITIATIVE</span>
            <h3 className="modal-title">Submit a Project</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="project-form">
            <p className="form-intro">
              Shipped something notable? Add your open-source project or prototype to the official Amity Coding Club registry.
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-title">Project Name *</label>
              <SmoothInput
                id="proj-title"
                type="text"
                className="form-input"
                placeholder="e.g. Distributed Task Mesh"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-tagline">One-line Subtitle *</label>
              <SmoothInput
                id="proj-tagline"
                type="text"
                className="form-input"
                placeholder="e.g. Low-latency background worker orchestration in Rust"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="proj-cat">Domain Category</label>
                <select
                  id="proj-cat"
                  className="form-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  <option value="Web">Web Application</option>
                  <option value="AI / ML">AI / Machine Learning</option>
                  <option value="Systems & Cloud">Systems & Cloud</option>
                  <option value="Open Source">Open Source Tool</option>
                  <option value="Mobile">Mobile Application</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-tags">Tech Stack (comma separated)</label>
                <SmoothInput
                  id="proj-tags"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Next.js, Rust, Docker"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="proj-gh">GitHub Repository URL *</label>
                <SmoothInput
                  id="proj-gh"
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-live">Live Demo URL (Optional)</label>
                <SmoothInput
                  id="proj-live"
                  type="url"
                  className="form-input"
                  placeholder="https://myproject.vercel.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-accent">
                Submit for Verification <span className="arrow-icon">→</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="success-box">
            <div className="success-icon">✓</div>
            <h4 className="success-title">Project Submitted to ACC Registry</h4>
            <p className="success-text">
              <strong>{title}</strong> has been received by our technical leads for catalog indexing.
              You will receive an automated GitHub issue review notification shortly.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleReset}>
              Back to Projects
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(17, 17, 17, 0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .modal-box {
          background: var(--card-bg, #FFFFFF);
          border-radius: 20px;
          border: 1px solid var(--card-border, var(--hairline));
          box-shadow: var(--shadow-modal, 0 24px 64px -12px rgba(0, 0, 0, 0.18));
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          color: var(--ink-primary);
          animation: modal-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .modal-meta {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 4px;
        }

        .modal-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
        }

        .modal-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-secondary);
          background: var(--canvas-subtle);
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: var(--hairline);
          color: var(--ink-primary);
        }

        .form-intro {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
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
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid var(--hairline-medium, var(--hairline));
          border-radius: 8px;
          background: var(--canvas-input, #FFFFFF);
          color: var(--ink-heading, var(--ink-primary));
          font-size: 0.875rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px var(--accent-subtle);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 16px;
          gap: 16px;
        }

        .success-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.15);
          color: #10B981;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .success-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink-heading);
        }

        .success-text {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          max-width: 440px;
        }
      `}</style>
    </div>
  );
}
