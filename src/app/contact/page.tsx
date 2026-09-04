'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { triggerConfetti } from '@/lib/confetti';
import SmoothInput from '@/components/SmoothInput';
import {
  Mail,
  Linkedin,
  Instagram,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  X,
  Radio,
  Github,
  Building2,
  Compass
} from 'lucide-react';

export default function ContactPage() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('General Inquiry');
  const [customSubject, setCustomSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toast feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const topics = [
    'General Inquiry',
    'SIH & Hackathons',
    'Sponsorship / Partnership',
    'Speaker / Workshop',
    'Club Membership'
  ];

  const faqs = [
    {
      q: 'How fast does the ACC leadership team reply?',
      a: 'We review inbound emails and inquiry submissions daily. You will typically hear back from our communications lead or relevant domain coordinator within 2 to 6 hours during weekdays.'
    },
    {
      q: 'How can our company or startup sponsor ACC events?',
      a: 'We partner with leading tech companies, dev tooling providers, and cloud platforms for hackathons, prizes, and sponsored bootcamps. Select "Sponsorship / Partnership" in the form or email us directly at amitycodingclub@gmail.com.'
    },
    {
      q: 'Can students from other colleges participate in ACC workshops & hackathons?',
      a: 'Yes! Major events like our flagship annual Hackathon and open webinar sessions are open to students from all universities globally. Physical campus meetups may require prior registration badge clearance.'
    },
    {
      q: 'Where can I meet the team in person on campus?',
      a: 'Our core team and mentors host open office hours from Monday to Friday, 3:30 PM to 7:00 PM at Amity University Gwalior campus, Innovation Block (Room E3-304).'
    }
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all required fields (First Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      triggerConfetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5B3DF5', '#F5B51B', '#3B82F6', '#10B981']
      });
    }, 800);
  };

  const handleResetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setSelectedTopic('General Inquiry');
    setCustomSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* 01. Subpage Hero Section (Consistent with About, Events, Projects, Team) */}
      <section className="subpage-hero contact-hero">
        <div className="container">
          <div className="section-meta">
            <Sparkles size={13} className="meta-icon" />
            <span>REACH OUT &amp; CONNECT</span>
          </div>
          <h1 className="subpage-hero-title">
            Contact <span className="title-accent">Us</span>
          </h1>
          <p className="subpage-hero-lead">
            Have questions or need support? We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* 03. Main Two-Column Content Grid */}
      <section className="contact-body-section">
        <div className="container">
          <div className="contact-grid-layout">
            
            {/* LEFT COLUMN: Message Form Card */}
            <div className="form-card-container">
              <div className="content-card form-box-card">
                <div className="form-card-header">
                  <div>
                    <h2 className="form-heading">Send us a message</h2>
                    <p className="form-subheading">Fill in the details below and we&apos;ll respond to your email.</p>
                  </div>
                  <div className="sla-pill" title="Average response time during active hours">
                    <span className="sla-dot" />
                    <span>Avg reply: &lt; 2 hrs</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="success-state-container">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="success-heading">Message Sent Successfully!</h3>
                    <p className="success-desc">
                      Thank you, <strong>{firstName}</strong>. Your note regarding <em>&ldquo;{customSubject || selectedTopic}&rdquo;</em> has been transmitted to the ACC leadership desk.
                    </p>
                    <div className="success-meta-box">
                      <div className="meta-line">
                        <span className="m-label">Sender:</span>
                        <span className="m-val">{firstName} {lastName} ({email})</span>
                      </div>
                      <div className="meta-line">
                        <span className="m-label">Category:</span>
                        <span className="m-val">{selectedTopic}</span>
                      </div>
                      <div className="meta-line">
                        <span className="m-label">Status:</span>
                        <span className="m-val status-green">● Queued for Coordinator Review</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-full"
                      onClick={handleResetForm}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="message-form">
                    {/* Name Fields Row */}
                    <div className="form-double-row">
                      <div className="form-field-wrap">
                        <label htmlFor="firstName" className="field-label">
                          First Name <span className="required-star">*</span>
                        </label>
                        <SmoothInput
                          id="firstName"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Your first name"
                          className="field-input"
                        />
                      </div>
                      <div className="form-field-wrap">
                        <label htmlFor="lastName" className="field-label">
                          Last Name <span className="required-star">*</span>
                        </label>
                        <SmoothInput
                          id="lastName"
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Your last name"
                          className="field-input"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="form-field-wrap">
                      <label htmlFor="email" className="field-label">
                        Email Address <span className="required-star">*</span>
                      </label>
                      <SmoothInput
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="field-input"
                      />
                    </div>

                    {/* Topic / Category Selection */}
                    <div className="form-field-wrap">
                      <label className="field-label">Topic / Category</label>
                      <div className="category-pill-group">
                        {topics.map((t) => (
                          <button
                            type="button"
                            key={t}
                            className={`topic-select-pill ${selectedTopic === t ? 'selected' : ''}`}
                            onClick={() => setSelectedTopic(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="form-field-wrap">
                      <label htmlFor="subject" className="field-label">
                        Subject <span className="field-optional">(Optional)</span>
                      </label>
                      <SmoothInput
                        id="subject"
                        type="text"
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        placeholder="What is this regarding?"
                        className="field-input"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="form-field-wrap">
                      <div className="field-label-split">
                        <label htmlFor="message" className="field-label">
                          Message <span className="required-star">*</span>
                        </label>
                        <span className="message-counter">{message.length} / 1200</span>
                      </div>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        maxLength={1200}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your question, partnership proposal, or feedback here..."
                        className="field-textarea"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary btn-submit ${isSubmitting ? 'disabled' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="submit-loading-flex">
                          <span className="btn-spinner" />
                          <span>Sending message...</span>
                        </span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} className="btn-send-icon" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Channels & Location Cards */}
            <div className="contact-channels-container">
              
              {/* 1. Email Card */}
              <div className="channel-box email-box">
                <div className="channel-icon-pill icon-bg-red">
                  <Mail size={20} />
                </div>
                <div className="channel-info">
                  <div className="channel-heading-row">
                    <h3 className="channel-name">Email</h3>
                    <span className="channel-badge">Official</span>
                  </div>
                  <a
                    href="mailto:amitycodingclub@gmail.com"
                    className="channel-link email-link"
                  >
                    amitycodingclub@gmail.com
                  </a>
                  <p className="channel-caption">For collaborations, event inquiries &amp; official notes</p>
                </div>
                <div className="channel-btn-group">
                  <button
                    type="button"
                    className="channel-action-btn copy-action"
                    onClick={() => handleCopy('amitycodingclub@gmail.com', 'email')}
                    title="Copy email to clipboard"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check size={13} className="text-emerald" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:amitycodingclub@gmail.com"
                    className="channel-action-btn write-action"
                    title="Compose email"
                  >
                    <span>Write</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* 2. LinkedIn Card */}
              <div className="channel-box linkedin-box">
                <div className="channel-icon-pill icon-bg-blue">
                  <Linkedin size={20} />
                </div>
                <div className="channel-info">
                  <div className="channel-heading-row">
                    <h3 className="channel-name">LinkedIn</h3>
                    <span className="channel-badge">Network</span>
                  </div>
                  <a
                    href="https://linkedin.com/company/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link"
                  >
                    /company/amity-coding-club
                  </a>
                  <p className="channel-caption">Professional updates, hackathon recaps &amp; internships</p>
                </div>
                <div className="channel-btn-group">
                  <a
                    href="https://linkedin.com/company/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-action-btn write-action"
                  >
                    <span>Visit</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* 3. Instagram Card */}
              <div className="channel-box instagram-box">
                <div className="channel-icon-pill icon-bg-pink">
                  <Instagram size={20} />
                </div>
                <div className="channel-info">
                  <div className="channel-heading-row">
                    <h3 className="channel-name">Instagram</h3>
                    <span className="channel-badge">Social</span>
                  </div>
                  <a
                    href="https://instagram.com/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link"
                  >
                    @amitycodingclub
                  </a>
                  <p className="channel-caption">Workshop reels, event photos &amp; student spotlights</p>
                </div>
                <div className="channel-btn-group">
                  <a
                    href="https://instagram.com/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-action-btn write-action"
                  >
                    <span>Follow</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* 4. Address & Campus Card */}
              <div className="channel-box address-box">
                <div className="channel-icon-pill icon-bg-emerald">
                  <MapPin size={20} />
                </div>
                <div className="channel-info">
                  <div className="channel-heading-row">
                    <h3 className="channel-name">Address</h3>
                    <span className="channel-badge">Campus Hub</span>
                  </div>
                  <address className="channel-address">
                    Opposite Airport, Maharajpura,<br />
                    Gwalior, Madhya Pradesh 474005
                  </address>
                  <p className="channel-caption">Amity University Campus • Innovation Block Room E3-304</p>
                </div>
                <div className="channel-btn-group">
                  <a
                    href="https://maps.google.com/?q=Amity+University+Gwalior+Madhya+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-action-btn write-action"
                  >
                    <span>Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* 5. Live Discord & GitHub Banner (ACC Theme Accent) */}
              <div className="developer-hub-card">
                <div className="dev-hub-top">
                  <div className="dev-hub-title-group">
                    <Radio size={16} className="dev-radio-icon" />
                    <h4>Developer Community</h4>
                  </div>
                  <span className="dev-online-tag">● 1,200+ Members Online</span>
                </div>
                <p className="dev-hub-text">
                  Need instant coding help, peer code-reviews, or hackathon team matching? Join the conversation on Discord.
                </p>
                <div className="dev-hub-buttons">
                  <a
                    href="https://discord.gg/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-discord-join"
                  >
                    <MessageSquare size={15} />
                    <span>Join Discord Server</span>
                    <ArrowRight size={13} />
                  </a>
                  <a
                    href="https://github.com/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-view"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 04. FAQ Section */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="faq-section-header">
            <div className="section-meta center-meta">
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="section-title">Everything you need to know.</h2>
            <p className="section-description">
              Common questions regarding hackathon sponsorships, response times, and campus visits.
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className={`faq-card ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-toggle-button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`faq-arrow ${isOpen ? 'open' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Team Roster Link Callout */}
          <div className="team-roster-box">
            <div className="roster-callout-left">
              <h3 className="roster-callout-title">Looking for specific domain mentors?</h3>
              <p className="roster-callout-desc">
                Meet our Core Leads in Systems, AI/ML, Modern Frontend, and Competitive Programming.
              </p>
            </div>
            <Link href="/team" className="btn btn-secondary roster-callout-btn">
              <span>View Team Roster</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scoped CSS Stylesheet (100% Theme Consistent with ACC Design System) */}
      <style jsx>{`
        .contact-page {
          background-color: var(--canvas-primary);
          color: var(--ink-primary);
          min-height: 100vh;
        }

        /* 01. Subpage Hero */
        .subpage-hero {
          padding: 56px 0 40px;
          background: var(--canvas-primary);
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .section-meta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          color: var(--accent-yellow-warm);
        }

        .center-meta {
          justify-content: center;
        }

        .subpage-hero-title {
          font-size: clamp(2.25rem, 4.5vw, 3.25rem);
          font-weight: 800;
          color: var(--ink-heading);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .title-accent {
          color: var(--accent-primary);
        }

        .subpage-hero-lead {
          font-size: 1.0625rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          max-width: 620px;
        }

        /* 03. Main Content Grid */
        .contact-body-section {
          padding: 40px 0 72px;
          background: var(--canvas-secondary);
        }

        .contact-grid-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 32px;
          align-items: start;
        }

        /* Content Card Styling */
        .content-card {
          background: var(--canvas-card);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-xl);
          padding: 36px;
          box-shadow: var(--shadow-card);
        }

        .form-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .form-heading {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .form-subheading {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          margin: 0;
        }

        .sla-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-pill);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          font-weight: 600;
          color: #059669;
          white-space: nowrap;
        }

        .sla-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
        }

        /* Form Controls */
        .message-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-double-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-field-wrap {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--ink-primary);
        }

        .required-star {
          color: #EF4444;
          margin-left: 2px;
        }

        .field-optional {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--ink-muted);
          margin-left: 4px;
        }

        .field-label-split {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .message-counter {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--ink-muted);
        }

        .field-input,
        .field-textarea {
          width: 100%;
          background: var(--canvas-subtle);
          border: 1px solid var(--hairline-medium);
          border-radius: var(--radius-md);
          padding: 11px 14px;
          font-size: 0.9375rem;
          color: var(--ink-primary);
          outline: none;
          font-family: var(--font-sans);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: var(--ink-subtle);
        }

        .field-input:focus,
        .field-textarea:focus {
          border-color: var(--accent-primary);
          background: var(--canvas-card);
          box-shadow: 0 0 0 3px var(--accent-purple-light);
        }

        .field-textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.5;
        }

        /* Topic Chips */
        .category-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .topic-select-pill {
          background: var(--canvas-subtle);
          border: 1px solid var(--hairline);
          color: var(--ink-secondary);
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .topic-select-pill:hover {
          color: var(--ink-primary);
          border-color: var(--ink-secondary);
          background: var(--canvas-secondary);
        }

        .topic-select-pill.selected {
          background: var(--accent-primary);
          color: #FFFFFF;
          border-color: var(--accent-primary);
          box-shadow: 0 2px 8px rgba(91, 61, 245, 0.25);
        }

        .btn-submit {
          margin-top: 8px;
          width: 100%;
          padding: 13px 20px;
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn-send-icon {
          transition: transform var(--transition-fast);
        }

        .btn-submit:hover .btn-send-icon {
          transform: translateX(3px) translateY(-1px);
        }

        .btn-submit.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-loading-flex {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        /* Success View */
        .success-state-container {
          padding: 24px 0 10px;
          text-align: center;
        }

        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .success-heading {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink-heading);
          margin-bottom: 8px;
        }

        .success-desc {
          font-size: 0.9375rem;
          color: var(--ink-secondary);
          line-height: 1.55;
          max-width: 440px;
          margin: 0 auto 20px;
        }

        .success-meta-box {
          background: var(--canvas-subtle);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          margin-bottom: 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
        }

        .m-label {
          color: var(--ink-muted);
          font-family: var(--font-mono);
        }

        .m-val {
          color: var(--ink-primary);
          font-weight: 500;
        }

        .status-green {
          color: #059669;
          font-weight: 600;
        }

        .btn-full {
          width: 100%;
        }

        /* RIGHT COLUMN: Contact Channels */
        .contact-channels-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .channel-box {
          background: var(--canvas-card);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          padding: 18px 22px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          box-shadow: var(--shadow-subtle);
          transition: all var(--transition-fast);
        }

        .channel-box:hover {
          border-color: rgba(17, 24, 39, 0.18);
          box-shadow: var(--shadow-card);
          transform: translateY(-1px);
        }

        .channel-icon-pill {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-bg-red {
          background: rgba(239, 68, 68, 0.08);
          color: #DC2626;
          border: 1px solid rgba(239, 68, 68, 0.18);
        }

        .icon-bg-blue {
          background: rgba(10, 102, 194, 0.08);
          color: #0A66C2;
          border: 1px solid rgba(10, 102, 194, 0.18);
        }

        .icon-bg-pink {
          background: rgba(225, 48, 108, 0.08);
          color: #E1306C;
          border: 1px solid rgba(225, 48, 108, 0.18);
        }

        .icon-bg-emerald {
          background: rgba(16, 185, 129, 0.08);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.18);
        }

        .channel-info {
          overflow: hidden;
        }

        .channel-heading-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .channel-name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--ink-heading);
          margin: 0;
        }

        .channel-badge {
          font-size: 0.625rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          background: var(--canvas-subtle);
          color: var(--ink-secondary);
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .channel-link {
          display: block;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--ink-primary);
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color var(--transition-fast);
        }

        .channel-link:hover {
          color: var(--accent-primary);
        }

        .channel-address {
          font-style: normal;
          line-height: 1.4;
          font-size: 0.84375rem;
          color: var(--ink-primary);
          font-weight: 500;
        }

        .channel-caption {
          font-size: 0.75rem;
          color: var(--ink-muted);
          margin: 3px 0 0;
        }

        .channel-btn-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .channel-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 11px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .copy-action {
          background: var(--canvas-subtle);
          border-color: var(--hairline);
          color: var(--ink-secondary);
        }

        .copy-action:hover {
          background: var(--canvas-subtle);
          color: var(--ink-primary);
          border-color: var(--hairline-medium);
        }

        .text-emerald {
          color: #059669;
        }

        .write-action {
          background: var(--accent-purple-light);
          border-color: var(--accent-purple-border);
          color: var(--accent-primary);
        }

        .write-action:hover {
          background: var(--accent-primary);
          color: #FFFFFF;
          border-color: var(--accent-primary);
        }

        /* Developer Hub Box */
        .developer-hub-card {
          background: #0F1115;
          color: #FFFFFF;
          border: 1px solid #1F242F;
          border-radius: var(--radius-lg);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--shadow-card);
        }

        .dev-hub-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dev-hub-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dev-hub-title-group h4 {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .dev-radio-icon {
          color: #60A5FA;
        }

        .dev-online-tag {
          font-size: 0.6875rem;
          font-family: var(--font-mono);
          font-weight: 600;
          color: #34D399;
        }

        .dev-hub-text {
          font-size: 0.8125rem;
          color: #94A3B8;
          line-height: 1.45;
          margin: 0;
        }

        .dev-hub-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-discord-join {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          background: #5865F2;
          color: #FFFFFF;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          transition: background var(--transition-fast);
        }

        .btn-discord-join:hover {
          background: #4752C4;
        }

        .btn-github-view {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 9px 12px;
          background: #1F242F;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-github-view:hover {
          background: #2D3748;
          color: #FFFFFF;
        }

        /* 04. FAQ Section */
        .contact-faq-section {
          padding: 72px 0 88px;
          background: var(--canvas-primary);
          border-top: 1px solid var(--hairline);
        }

        .faq-section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 44px;
        }

        .section-title {
          font-size: clamp(1.75rem, 3.5vw, 2.25rem);
          font-weight: 800;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .section-description {
          font-size: 0.9375rem;
          color: var(--ink-secondary);
          line-height: 1.55;
        }

        .faq-container {
          max-width: 760px;
          margin: 0 auto 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-card {
          background: var(--canvas-card);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .faq-card.active {
          border-color: var(--accent-purple-border);
          box-shadow: 0 4px 14px rgba(91, 61, 245, 0.06);
        }

        .faq-toggle-button {
          width: 100%;
          padding: 18px 22px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-align: left;
          cursor: pointer;
          color: var(--ink-heading);
        }

        .faq-question-text {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--ink-heading);
        }

        .faq-arrow {
          color: var(--ink-secondary);
          transition: transform var(--transition-base);
          flex-shrink: 0;
        }

        .faq-arrow.open {
          transform: rotate(180deg);
          color: var(--accent-primary);
        }

        .faq-answer-panel {
          padding: 0 22px 18px;
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          border-top: 1px solid var(--hairline-ultra-light);
          padding-top: 12px;
        }

        /* Team Roster Callout Box */
        .team-roster-box {
          max-width: 760px;
          margin: 0 auto;
          background: var(--canvas-secondary);
          border: 1px dashed var(--hairline-medium);
          border-radius: var(--radius-lg);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .roster-callout-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink-heading);
          margin-bottom: 4px;
        }

        .roster-callout-desc {
          font-size: 0.8125rem;
          color: var(--ink-secondary);
          margin: 0;
        }

        .roster-callout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        /* Keyframes */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 5px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .content-card {
            padding: 28px 22px;
          }
        }

        @media (max-width: 640px) {
          .subpage-hero {
            padding: 40px 0 28px;
          }
          .form-double-row {
            grid-template-columns: 1fr;
          }
          .team-roster-box {
            flex-direction: column;
            align-items: flex-start;
          }
          .channel-box {
            grid-template-columns: auto 1fr;
            gap: 12px;
          }
          .channel-btn-group {
            grid-column: span 2;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
