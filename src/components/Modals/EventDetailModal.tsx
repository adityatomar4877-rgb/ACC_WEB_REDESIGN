'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from '@/data/events';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  X, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenRsvp: (event: EventItem) => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
  onOpenRsvp
}: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'prerequisites'>('overview');

  if (!event) return null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/events#${event.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.subtitle}\n\n${event.description}\n\nLocation: ${event.location}`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="event-detail-modal-root">
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="modal-scroll-wrapper" onClick={onClose}>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="close-btn"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              {/* Modal Hero Banner */}
              <div className="modal-banner-container">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="modal-banner-img"
                />
                <div className="banner-overlay" />

                {/* Banner Content Tags */}
                <div className="banner-top-bar">
                  <div className="banner-badges">
                    <span className="badge-code">{event.code}</span>
                    <span className="badge-cat">{event.category}</span>
                    <span className="badge-format">{event.format}</span>
                  </div>
                  <span className="badge-status">
                    <span className="status-dot" />
                    {event.status}
                  </span>
                </div>

                <div className="banner-bottom-info">
                  <h2 className="banner-title">{event.title}</h2>
                  <p className="banner-subtitle">{event.subtitle}</p>
                </div>
              </div>

              {/* Key Details Quick Strip */}
              <div className="quick-details-strip">
                <div className="detail-item">
                  <Calendar size={18} className="detail-icon" />
                  <div>
                    <div className="detail-label">DATE</div>
                    <div className="detail-value">{event.month} {event.day}, {event.year}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock size={18} className="detail-icon" />
                  <div>
                    <div className="detail-label">TIME</div>
                    <div className="detail-value">{event.time}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <MapPin size={18} className="detail-icon" />
                  <div>
                    <div className="detail-label">VENUE</div>
                    <div className="detail-value">{event.location}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <div>
                    <div className="detail-label">ATTENDEES</div>
                    <div className="detail-value">{event.attendeesCount}</div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="modal-nav-tabs">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Sparkles size={15} /> Overview & Perks
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'agenda' ? 'active' : ''}`}
                  onClick={() => setActiveTab('agenda')}
                >
                  <Layers size={15} /> Full Agenda ({event.agenda.length})
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'speakers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('speakers')}
                >
                  <Users size={15} /> Speakers & Mentors ({event.speakers?.length || 0})
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'prerequisites' ? 'active' : ''}`}
                  onClick={() => setActiveTab('prerequisites')}
                >
                  <FileCheck size={15} /> Prerequisites
                </button>
              </div>

              {/* Tab Content Area */}
              <div className="modal-body-content">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="tab-panel"
                  >
                    {/* Prize Banner if exists */}
                    {event.prizes && (
                      <div className="prize-callout">
                        <Award size={22} className="prize-icon" />
                        <div>
                          <div className="prize-title">PRIZES & REWARDS</div>
                          <div className="prize-text">{event.prizes}</div>
                        </div>
                      </div>
                    )}

                    {/* About Section */}
                    <div className="content-section">
                      <h4 className="section-title">About the Event</h4>
                      <p className="body-text">
                        {event.fullDescription || event.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="content-section">
                        <h4 className="section-title">Event Highlights & Perks</h4>
                        <div className="highlights-grid">
                          {event.highlights.map((highlight, idx) => (
                            <div key={idx} className="highlight-pill">
                              <CheckCircle2 size={16} className="highlight-check" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="content-section">
                        <h4 className="section-title">Tags & Technologies</h4>
                        <div className="tags-row">
                          {event.tags.map((tag) => (
                            <span key={tag} className="tech-badge">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'agenda' && (
                  <motion.div
                    key="agenda"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="tab-panel"
                  >
                    <h4 className="section-title">Schedule Timeline</h4>
                    <div className="agenda-timeline-box">
                      {event.agenda.map((item, idx) => (
                        <div key={idx} className="timeline-node">
                          <div className="node-marker">
                            <span className="marker-dot" />
                            {idx < event.agenda.length - 1 && <span className="marker-line" />}
                          </div>
                          <div className="node-content">
                            <div className="node-time">{item.time}</div>
                            <div className="node-topic">{item.topic}</div>
                            {item.speaker && (
                              <div className="node-speaker">Lead by: {item.speaker}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'speakers' && (
                  <motion.div
                    key="speakers"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="tab-panel"
                  >
                    <h4 className="section-title">Featured Speakers & Industry Mentors</h4>
                    <div className="speakers-grid">
                      {event.speakers?.map((spk, idx) => (
                        <div key={idx} className="speaker-card">
                          <div className="speaker-avatar">
                            {spk.name.charAt(0)}
                          </div>
                          <div className="speaker-details">
                            <h5 className="speaker-name">{spk.name}</h5>
                            <p className="speaker-role">{spk.title}</p>
                            <span className="speaker-company">{spk.company}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'prerequisites' && (
                  <motion.div
                    key="prerequisites"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="tab-panel"
                  >
                    <h4 className="section-title">Prerequisites & Guidelines</h4>
                    {event.prerequisites && event.prerequisites.length > 0 ? (
                      <div className="prereq-list">
                        {event.prerequisites.map((req, idx) => (
                          <div key={idx} className="prereq-row">
                            <span className="prereq-num">0{idx + 1}</span>
                            <span className="prereq-text">{req}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="body-text">No strict prerequisites required. Open to all students with curiosity to learn and build!</p>
                    )}

                    <div className="info-box-note">
                      <strong>Note:</strong> Please arrive 15 minutes before the scheduled time for badge collection and seating.
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer / Actions */}
              <div className="modal-footer">
                <div className="footer-left-actions">
                  <button
                    type="button"
                    className="footer-btn-secondary"
                    onClick={handleCopyLink}
                  >
                    <Share2 size={15} />
                    {copied ? 'Link Copied!' : 'Share'}
                  </button>

                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-btn-secondary"
                  >
                    <ExternalLink size={15} />
                    Google Calendar
                  </a>
                </div>

                <div className="footer-right-actions">
                  <button
                    type="button"
                    className="footer-btn-primary"
                    onClick={() => {
                      onClose();
                      onOpenRsvp(event);
                    }}
                  >
                    Register / RSVP Now →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <style jsx>{`
            .event-detail-modal-root {
              position: fixed;
              inset: 0;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .modal-backdrop {
              position: fixed;
              inset: 0;
              background: rgba(15, 17, 23, 0.75);
              backdrop-filter: blur(8px);
              z-index: 1001;
            }

            .modal-scroll-wrapper {
              position: fixed;
              inset: 0;
              z-index: 1002;
              overflow-y: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px 16px;
            }

            .modal-card {
              position: relative;
              width: 100%;
              max-width: 800px;
              background: #FFFFFF;
              border-radius: 24px;
              box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.35);
              border: 1px solid rgba(255, 255, 255, 0.2);
              overflow: hidden;
              margin: auto;
            }

            .close-btn {
              position: absolute;
              top: 16px;
              right: 16px;
              z-index: 20;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.55);
              backdrop-filter: blur(8px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .close-btn:hover {
              background: rgba(0, 0, 0, 0.8);
              transform: scale(1.05);
            }

            /* Banner */
            .modal-banner-container {
              position: relative;
              height: 240px;
              width: 100%;
              overflow: hidden;
              background: #0F1115;
            }

            .modal-banner-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              opacity: 0.85;
            }

            .banner-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(15, 17, 23, 0.3) 0%, rgba(15, 17, 23, 0.9) 100%);
            }

            .banner-top-bar {
              position: absolute;
              top: 16px;
              left: 20px;
              right: 64px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 8px;
              z-index: 10;
            }

            .banner-badges {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .badge-code {
              font-family: var(--font-mono, monospace);
              font-size: 0.75rem;
              font-weight: 700;
              padding: 4px 8px;
              background: rgba(255, 255, 255, 0.2);
              color: #FFFFFF;
              border-radius: 6px;
              backdrop-filter: blur(4px);
            }

            .badge-cat {
              font-size: 0.75rem;
              font-weight: 600;
              padding: 4px 10px;
              background: var(--accent-primary, #0066CC);
              color: #FFFFFF;
              border-radius: 6px;
            }

            .badge-format {
              font-size: 0.75rem;
              font-weight: 500;
              padding: 4px 10px;
              background: rgba(255, 255, 255, 0.15);
              color: #E2E8F0;
              border-radius: 6px;
              backdrop-filter: blur(4px);
            }

            .badge-status {
              display: flex;
              align-items: center;
              gap: 6px;
              font-family: var(--font-mono, monospace);
              font-size: 0.75rem;
              font-weight: 600;
              color: #4ADE80;
              background: rgba(34, 197, 94, 0.15);
              border: 1px solid rgba(74, 222, 128, 0.3);
              padding: 4px 10px;
              border-radius: 9999px;
            }

            .status-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #4ADE80;
              box-shadow: 0 0 8px #4ADE80;
            }

            .banner-bottom-info {
              position: absolute;
              bottom: 16px;
              left: 24px;
              right: 24px;
              z-index: 10;
            }

            .banner-title {
              font-size: 1.85rem;
              font-weight: 700;
              color: #FFFFFF;
              letter-spacing: -0.02em;
              margin: 0 0 4px;
              line-height: 1.2;
            }

            .banner-subtitle {
              font-size: 0.95rem;
              color: #93C5FD;
              font-weight: 500;
              margin: 0;
            }

            /* Quick Details Strip */
            .quick-details-strip {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
              padding: 16px 24px;
              background: #F8FAFC;
              border-bottom: 1px solid #E2E8F0;
            }

            .detail-item {
              display: flex;
              align-items: flex-start;
              gap: 10px;
            }

            :global(.detail-icon) {
              color: var(--accent-primary, #0066CC);
              flex-shrink: 0;
              margin-top: 2px;
            }

            .detail-label {
              font-family: var(--font-mono, monospace);
              font-size: 0.65rem;
              font-weight: 700;
              color: #64748B;
              letter-spacing: 0.05em;
            }

            .detail-value {
              font-size: 0.8125rem;
              font-weight: 600;
              color: #0F172A;
              line-height: 1.3;
              margin-top: 2px;
            }

            /* Navigation Tabs */
            .modal-nav-tabs {
              display: flex;
              gap: 8px;
              padding: 12px 24px 0;
              border-bottom: 1px solid #E2E8F0;
              overflow-x: auto;
              background: #FFFFFF;
            }

            .tab-btn {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 10px 14px;
              font-size: 0.85rem;
              font-weight: 600;
              color: #64748B;
              border: none;
              background: transparent;
              border-bottom: 2px solid transparent;
              cursor: pointer;
              white-space: nowrap;
              transition: all 0.2s ease;
            }

            .tab-btn:hover {
              color: #0F172A;
            }

            .tab-btn.active {
              color: var(--accent-primary, #0066CC);
              border-bottom-color: var(--accent-primary, #0066CC);
            }

            /* Body */
            .modal-body-content {
              padding: 20px 24px;
              max-height: 380px;
              overflow-y: auto;
            }

            .tab-panel {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .prize-callout {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 14px 18px;
              background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.12) 100%);
              border: 1px solid rgba(245, 158, 11, 0.3);
              border-radius: 12px;
            }

            :global(.prize-icon) {
              color: #D97706;
              flex-shrink: 0;
            }

            .prize-title {
              font-family: var(--font-mono, monospace);
              font-size: 0.7rem;
              font-weight: 700;
              color: #B45309;
              letter-spacing: 0.05em;
            }

            .prize-text {
              font-size: 0.875rem;
              font-weight: 600;
              color: #78350F;
              margin-top: 2px;
            }

            .content-section {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .section-title {
              font-size: 0.875rem;
              font-weight: 700;
              color: #0F172A;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              margin: 0;
              font-family: var(--font-mono, monospace);
            }

            .body-text {
              font-size: 0.925rem;
              line-height: 1.6;
              color: #334155;
              margin: 0;
            }

            .highlights-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }

            .highlight-pill {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              padding: 10px 12px;
              background: #F8FAFC;
              border: 1px solid #E2E8F0;
              border-radius: 8px;
              font-size: 0.8125rem;
              color: #1E293B;
              line-height: 1.4;
            }

            :global(.highlight-check) {
              color: #10B981;
              flex-shrink: 0;
              margin-top: 2px;
            }

            .tags-row {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }

            .tech-badge {
              padding: 4px 10px;
              background: #EFF6FF;
              border: 1px solid #DBEAFE;
              border-radius: 6px;
              font-family: var(--font-mono, monospace);
              font-size: 0.75rem;
              font-weight: 600;
              color: var(--accent-primary, #0066CC);
            }

            /* Timeline */
            .agenda-timeline-box {
              display: flex;
              flex-direction: column;
            }

            .timeline-node {
              display: flex;
              gap: 16px;
              position: relative;
            }

            .node-marker {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 16px;
              flex-shrink: 0;
            }

            .marker-dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: var(--accent-primary, #0066CC);
              border: 2px solid #FFFFFF;
              box-shadow: 0 0 0 2px var(--accent-primary, #0066CC);
              margin-top: 4px;
            }

            .marker-line {
              width: 2px;
              flex-grow: 1;
              background: #CBD5E1;
              margin: 4px 0;
              min-height: 32px;
            }

            .node-content {
              padding-bottom: 20px;
            }

            .node-time {
              font-family: var(--font-mono, monospace);
              font-size: 0.75rem;
              font-weight: 700;
              color: var(--accent-primary, #0066CC);
            }

            .node-topic {
              font-size: 0.9rem;
              font-weight: 600;
              color: #0F172A;
              margin-top: 2px;
            }

            .node-speaker {
              font-size: 0.8rem;
              color: #64748B;
              margin-top: 2px;
            }

            /* Speakers Grid */
            .speakers-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }

            .speaker-card {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px 14px;
              background: #F8FAFC;
              border: 1px solid #E2E8F0;
              border-radius: 12px;
            }

            .speaker-avatar {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: linear-gradient(135deg, #0066CC 0%, #60A5FA 100%);
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 1.1rem;
              flex-shrink: 0;
            }

            .speaker-name {
              font-size: 0.9rem;
              font-weight: 700;
              color: #0F172A;
              margin: 0;
            }

            .speaker-role {
              font-size: 0.775rem;
              color: #64748B;
              margin: 2px 0 4px;
            }

            .speaker-company {
              font-family: var(--font-mono, monospace);
              font-size: 0.7rem;
              font-weight: 600;
              color: var(--accent-primary, #0066CC);
              background: #EFF6FF;
              padding: 2px 6px;
              border-radius: 4px;
            }

            /* Prerequisites */
            .prereq-list {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .prereq-row {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              padding: 12px 14px;
              background: #F8FAFC;
              border: 1px solid #E2E8F0;
              border-radius: 10px;
            }

            .prereq-num {
              font-family: var(--font-mono, monospace);
              font-size: 0.75rem;
              font-weight: 700;
              color: var(--accent-primary, #0066CC);
              background: #EFF6FF;
              padding: 2px 6px;
              border-radius: 4px;
            }

            .prereq-text {
              font-size: 0.875rem;
              color: #1E293B;
              line-height: 1.4;
            }

            .info-box-note {
              padding: 12px 14px;
              background: #FEF3C7;
              border: 1px solid #FCD34D;
              border-radius: 8px;
              font-size: 0.8125rem;
              color: #92400E;
            }

            /* Footer */
            .modal-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
              padding: 16px 24px;
              background: #F8FAFC;
              border-top: 1px solid #E2E8F0;
              flex-wrap: wrap;
            }

            .footer-left-actions {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .footer-btn-secondary {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 8px 14px;
              background: #FFFFFF;
              border: 1px solid #CBD5E1;
              border-radius: 8px;
              font-size: 0.8125rem;
              font-weight: 600;
              color: #334155;
              cursor: pointer;
              text-decoration: none;
              transition: all 0.2s ease;
            }

            .footer-btn-secondary:hover {
              background: #F1F5F9;
              border-color: #94A3B8;
              color: #0F172A;
            }

            .footer-btn-primary {
              padding: 10px 22px;
              background: var(--accent-primary, #0066CC);
              color: #FFFFFF;
              border: none;
              border-radius: 8px;
              font-size: 0.875rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0 4px 12px rgba(0, 102, 204, 0.25);
            }

            .footer-btn-primary:hover {
              background: var(--accent-hover, #0071E3);
              transform: translateY(-1px);
              box-shadow: 0 6px 16px rgba(0, 102, 204, 0.35);
            }

            :global([data-theme="dark"]) .modal-card,
            :global(html.dark) .modal-card {
              background: #111522 !important;
              border-color: rgba(255, 255, 255, 0.1) !important;
              color: #F3F4F6 !important;
            }

            :global([data-theme="dark"]) .quick-details-strip,
            :global(html.dark) .quick-details-strip {
              background: #0F131D !important;
              border-bottom-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .detail-value,
            :global(html.dark) .detail-value {
              color: #F8FAFC !important;
            }

            :global([data-theme="dark"]) .modal-nav-tabs,
            :global(html.dark) .modal-nav-tabs {
              background: #111522 !important;
              border-bottom-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .tab-btn,
            :global(html.dark) .tab-btn {
              color: #94A3B8 !important;
            }

            :global([data-theme="dark"]) .tab-btn.active,
            :global(html.dark) .tab-btn.active {
              color: #A78BFA !important;
            }

            :global([data-theme="dark"]) .modal-body-content,
            :global(html.dark) .modal-body-content {
              background: #111522 !important;
            }

            :global([data-theme="dark"]) .section-title,
            :global(html.dark) .section-title {
              color: #FFFFFF !important;
            }

            :global([data-theme="dark"]) .overview-desc,
            :global(html.dark) .overview-desc {
              color: #94A3B8 !important;
            }

            :global([data-theme="dark"]) .highlight-card,
            :global(html.dark) .highlight-card {
              background: #181F30 !important;
              border-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .highlight-title,
            :global(html.dark) .highlight-title {
              color: #FFFFFF !important;
            }

            :global([data-theme="dark"]) .highlight-desc,
            :global(html.dark) .highlight-desc {
              color: #94A3B8 !important;
            }

            :global([data-theme="dark"]) .speaker-card,
            :global(html.dark) .speaker-card {
              background: #181F30 !important;
              border-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .speaker-name,
            :global(html.dark) .speaker-name {
              color: #FFFFFF !important;
            }

            :global([data-theme="dark"]) .agenda-item,
            :global(html.dark) .agenda-item {
              background: #181F30 !important;
              border-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .agenda-title,
            :global(html.dark) .agenda-title {
              color: #FFFFFF !important;
            }

            :global([data-theme="dark"]) .modal-footer,
            :global(html.dark) .modal-footer {
              background: #0F131D !important;
              border-top-color: rgba(255, 255, 255, 0.08) !important;
            }

            :global([data-theme="dark"]) .footer-btn-secondary,
            :global(html.dark) .footer-btn-secondary {
              background: #181F30 !important;
              border-color: rgba(255, 255, 255, 0.1) !important;
              color: #F8FAFC !important;
            }

            @media (max-width: 768px) {
              .quick-details-strip {
                grid-template-columns: 1fr 1fr;
              }
              .highlights-grid,
              .speakers-grid {
                grid-template-columns: 1fr;
              }
              .modal-footer {
                flex-direction: column;
                align-items: stretch;
              }
              .footer-left-actions {
                justify-content: space-between;
              }
              .footer-btn-primary {
                width: 100%;
                text-align: center;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
