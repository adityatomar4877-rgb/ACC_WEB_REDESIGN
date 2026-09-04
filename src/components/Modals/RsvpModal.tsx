'use client';

import React, { useState } from 'react';
import { EventItem } from '@/data/events';
import { triggerConfetti } from '@/lib/confetti';
import SmoothInput from '@/components/SmoothInput';

interface RsvpModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ event, isOpen, onClose }: RsvpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [track, setTrack] = useState('Fullstack / AI Track');
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const randomTicket = `ACC-${event.month}${event.day}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);
    setConfirmed(true);

    // Fire subtle celebration confetti
    triggerConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setConfirmed(false);
    setName('');
    setEmail('');
    setEnrollment('');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-meta">EVENT REGISTRATION</span>
            <h3 className="modal-title">{event.title}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {!confirmed ? (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="event-quick-summary">
              <div className="quick-pill">
                <span className="pill-lbl">DATE:</span> {event.month} {event.day}, {event.year}
              </div>
              <div className="quick-pill">
                <span className="pill-lbl">VENUE:</span> {event.location}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-name">Full Name *</label>
              <SmoothInput
                id="rsvp-name"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-email">University / Personal Email *</label>
              <SmoothInput
                id="rsvp-email"
                type="email"
                className="form-input"
                placeholder="alex@amity.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-enroll">Student ID / Enrollment</label>
                <SmoothInput
                  id="rsvp-enroll"
                  type="text"
                  className="form-input"
                  placeholder="A2305221004"
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-track">Preferred Focus</label>
                <select
                  id="rsvp-track"
                  className="form-input"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                >
                  <option>Fullstack / AI Track</option>
                  <option>Systems & Cloud Track</option>
                  <option>Competitive Coding Track</option>
                  <option>Open Source Beginner</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-accent">
                Confirm & Generate Pass <span className="arrow-icon">→</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmed Digital Ticket Pass */
          <div className="ticket-pass-container">
            <div className="ticket-pass">
              {/* Ticket Top */}
              <div className="ticket-top">
                <div className="ticket-brand">
                  <span className="brand-code">&lt;/&gt;</span>
                  <span className="brand-org">AMITY CODING CLUB</span>
                </div>
                <span className="ticket-status-badge">CONFIRMED SEAT</span>
              </div>

              {/* Ticket Body */}
              <div className="ticket-body">
                <h4 className="ticket-event-name">{event.title}</h4>
                <p className="ticket-event-sub">{event.subtitle}</p>

                <div className="ticket-details-grid">
                  <div className="ticket-detail">
                    <span className="t-label">ATTENDEE</span>
                    <span className="t-val">{name}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="t-label">TICKET ID</span>
                    <span className="t-val mono">{ticketId}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="t-label">DATE & TIME</span>
                    <span className="t-val">{event.month} {event.day} • {event.time}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="t-label">LOCATION</span>
                    <span className="t-val">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Ticket Tear Line */}
              <div className="ticket-tear-line">
                <div className="tear-circle left" />
                <div className="tear-dashed" />
                <div className="tear-circle right" />
              </div>

              {/* Ticket Stub / Barcode */}
              <div className="ticket-stub">
                <div className="barcode-mock">
                  <div className="bar b1" /><div className="bar b3" /><div className="bar b2" />
                  <div className="bar b1" /><div className="bar b4" /><div className="bar b2" />
                  <div className="bar b1" /><div className="bar b3" /><div className="bar b2" />
                  <div className="bar b4" /><div className="bar b1" /><div className="bar b3" />
                </div>
                <span className="ticket-instruction">Scan for check-in at entrance</span>
              </div>
            </div>

            <div className="ticket-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  alert(`Ticket pass ${ticketId} saved to your browser! A confirmation email has been logged.`);
                }}
              >
                Save Ticket Pass ↗
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Close
              </button>
            </div>
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
          max-width: 580px;
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
          margin-bottom: 24px;
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

        .event-quick-summary {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--canvas-subtle);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 0.8125rem;
          color: var(--ink-primary);
        }

        .pill-lbl {
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--ink-secondary);
          margin-right: 6px;
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

        /* Digital Ticket Pass */
        .ticket-pass-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ticket-pass {
          background: #0F1115;
          color: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #1F242F;
          overflow: hidden;
          position: relative;
        }

        .ticket-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #141720;
          border-bottom: 1px solid #1C202B;
        }

        .ticket-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-code {
          font-family: var(--font-mono);
          font-weight: 700;
          color: #60A5FA;
        }

        .brand-org {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .ticket-status-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 3px 8px;
          background: rgba(34, 197, 94, 0.2);
          color: #34D399;
          border-radius: 9999px;
          font-weight: 600;
        }

        .ticket-body {
          padding: 20px;
        }

        .ticket-event-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .ticket-event-sub {
          font-size: 0.8125rem;
          color: #94A3B8;
          margin-bottom: 20px;
        }

        .ticket-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .ticket-detail {
          display: flex;
          flex-direction: column;
        }

        .t-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: #64748B;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .t-val {
          font-size: 0.875rem;
          font-weight: 500;
          color: #E2E8F0;
        }

        .t-val.mono {
          font-family: var(--font-mono);
          color: #60A5FA;
        }

        /* Tear line */
        .ticket-tear-line {
          position: relative;
          height: 20px;
          display: flex;
          align-items: center;
          margin: 0 -10px;
        }

        .tear-circle {
          width: 20px;
          height: 20px;
          background: #FFFFFF;
          border-radius: 50%;
          position: absolute;
        }

        .tear-circle.left { left: 0; }
        .tear-circle.right { right: 0; }

        .tear-dashed {
          flex: 1;
          height: 1px;
          border-top: 1.5px dashed #2D3344;
          margin: 0 16px;
        }

        /* Ticket stub */
        .ticket-stub {
          padding: 16px 20px;
          background: #12141A;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .barcode-mock {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 32px;
        }

        .bar {
          height: 100%;
          background: #E2E8F0;
        }

        .b1 { width: 2px; }
        .b2 { width: 4px; }
        .b3 { width: 6px; }
        .b4 { width: 8px; }

        .ticket-instruction {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: #94A3B8;
        }

        .ticket-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
