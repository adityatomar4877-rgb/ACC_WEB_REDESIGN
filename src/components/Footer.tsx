'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Calendar,
  Folder,
  Users,
  Mail,
  Rocket,
  Trophy,
  Navigation as NavigationIcon,
  Sparkles,
  Github,
  Linkedin,
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';
import { triggerConfetti } from '@/lib/confetti';
import SmoothInput from './SmoothInput';
import styles from './Footer.module.css';

// Custom Discord Icon
function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.itemIcon}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Custom X (Twitter) Icon
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.itemIcon}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setEmail('');

      triggerConfetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#5B3DF5', '#8B5CF6', '#A78BFA', '#10B981']
      });

      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 800);
  };

  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        {/* Top Grid: Brand on Left, 4 Columns on Right */}
        <div className={styles.footerLayout}>
          {/* Brand & Left Info */}
          <div className={styles.footerBrandSide}>
            <Link href="/" className={styles.footerLogoLink} aria-label="Amity Coding Club Home">
              <span className={styles.footerLogoIcon}>
                <svg width="40" height="28" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 6L4 16L13 26"
                    stroke="url(#footerLogoGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 28L25 4"
                    stroke="url(#footerLogoGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31 6L40 16L31 26"
                    stroke="url(#footerLogoGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#5B3DF5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className={styles.footerLogoText}>
                <span className={styles.brandTitle}>AMITY</span>
                <span className={styles.brandSubtitle}>CODING CLUB</span>
              </span>
            </Link>

            {/* Accent Line Under Logo */}
            <div className={styles.brandAccentLine} />

            <h2 className={styles.footerHeadline}>
              Build. Learn. Ship.
              <br />
              Create Tomorrow.
            </h2>

            <p className={styles.footerTaglineText}>
              A community of student builders creating real-world impact through code.
            </p>

            {/* Status Pill Badge */}
            <div className={styles.footerStatusBadge}>
              <span className={styles.statusIndicatorDot} />
              <span className={styles.statusText}>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Right Columns Grid */}
          <div className={styles.footerNavGrid}>
            {/* 01 NAVIGATION */}
            <div className={styles.footerNavCol}>
              <div className={styles.colHeaderGroup}>
                <h3 className={styles.colTitle}>NAVIGATION</h3>
                <div className={styles.colAccentBar} />
              </div>
              <ul className={styles.colList}>
                <li>
                  <a href="/about" className={styles.colLink}>
                    <User size={16} className={styles.itemIcon} />
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a href="/events" className={styles.colLink}>
                    <Calendar size={16} className={styles.itemIcon} />
                    <span>Events</span>
                  </a>
                </li>
                <li>
                  <a href="/projects" className={styles.colLink}>
                    <Folder size={16} className={styles.itemIcon} />
                    <span>Projects</span>
                  </a>
                </li>
                <li>
                  <a href="/team" className={styles.colLink}>
                    <Users size={16} className={styles.itemIcon} />
                    <span>Team</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className={styles.colLink}>
                    <Mail size={16} className={styles.itemIcon} />
                    <span>Contact</span>
                  </a>
                </li>
                <li>
                  <a href="/join" className={styles.colLink}>
                    <Rocket size={16} className={styles.itemIcon} />
                    <span>Join Us</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* 02 INITIATIVES */}
            <div className={styles.footerNavCol}>
              <div className={styles.colHeaderGroup}>
                <h3 className={styles.colTitle}>INITIATIVES</h3>
                <div className={styles.colAccentBar} />
              </div>
              <ul className={styles.colList}>
                <li>
                  <a href="/events#hackathon-3-0" className={styles.colLink}>
                    <Trophy size={16} className={styles.itemIcon} />
                    <span>Hackathon 3.0</span>
                  </a>
                </li>
                <li>
                  <a href="/projects#ai-campus-navigator" className={styles.colLink}>
                    <NavigationIcon size={16} className={styles.itemIcon} />
                    <span>Campus Navigator</span>
                  </a>
                </li>
                <li>
                  <a href="/join" className={styles.colLink}>
                    <Sparkles size={16} className={styles.itemIcon} />
                    <span>Join ACC 2026</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* 03 CONNECT */}
            <div className={styles.footerNavCol}>
              <div className={styles.colHeaderGroup}>
                <h3 className={styles.colTitle}>CONNECT</h3>
                <div className={styles.colAccentBar} />
              </div>
              <ul className={styles.colList}>
                <li>
                  <a
                    href="https://github.com/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.colLink}
                  >
                    <Github size={16} className={styles.itemIcon} />
                    <span>GitHub ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.colLink}
                  >
                    <DiscordIcon size={16} />
                    <span>Discord ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.colLink}
                  >
                    <Linkedin size={16} className={styles.itemIcon} />
                    <span>LinkedIn ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.colLink}
                  >
                    <XIcon size={16} />
                    <span>X (Twitter) ↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card: Quote + Newsletter */}
        <div className={styles.footerBottomCard}>
          {/* Left Quote Section with Glowing Star Icon */}
          <div className={styles.quoteSection}>
            <div className={styles.quoteStarBadge} aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M12 6L13 10L17 11L13 12L12 16L11 12L7 11L11 10L12 6Z"
                  fill="rgba(255,255,255,0.85)"
                />
              </svg>
            </div>
            <p className={styles.quoteText}>
              <span>Great code starts with curiosity.</span>
              <br />
              <span>It grows with <strong className={styles.quotePurple}>community.</strong></span>
              <br />
              <span>We build <strong className={styles.quotePurple}>the future together.</strong></span>
            </p>
          </div>

          {/* Middle Text: Join our community */}
          <div className={styles.communityInfo}>
            <h4 className={styles.communityTitle}>Join our community</h4>
            <p className={styles.communitySubtitle}>Get updates on events, projects and more.</p>
          </div>

          {/* Right: Email Subscription Form */}
          <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
            <div className={`${styles.newsletterInputWrap} ${status === 'error' ? styles.hasError : ''}`}>
              <SmoothInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.newsletterInput}
                disabled={status === 'loading' || status === 'success'}
                aria-label="Email subscription"
              />
              <button
                type="submit"
                className={`${styles.newsletterSubmitBtn} ${status === 'success' ? styles.isSuccess : ''}`}
                disabled={status === 'loading' || status === 'success'}
                aria-label="Subscribe to newsletter"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className={styles.btnSpinner} />
                ) : status === 'success' ? (
                  <Check size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
            {errorMessage && <span className={styles.newsletterErrorText}>{errorMessage}</span>}
          </form>
        </div>

        {/* Bottom Legal Row */}
        <div className={styles.footerLegalRow}>
          <p className={styles.copyrightText}>
            © 2026 Amity Coding Club. Built for software craft & engineering excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
