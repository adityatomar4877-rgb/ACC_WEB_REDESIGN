'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import ThemeToggle from './ThemeToggle';
import StackingNavbar from './StackingNavbar';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const desktopNavItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Events', href: '/events' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const mobileNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Events', href: '/events' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Brand Logo & Text */}
          <NextLink href="/" className="brand-logo-group" aria-label="Amity Coding Club Home">
            <div className="acc-nav-mark">
              <svg viewBox="0 0 100 60" className="nav-logo-svg" fill="none">
                <defs>
                  <linearGradient id="navAccGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5B51B" />
                    <stop offset="45%" stopColor="#F59E0B" />
                    <stop offset="70%" stopColor="#7C4DFF" />
                    <stop offset="100%" stopColor="#5B3DF5" />
                  </linearGradient>
                </defs>
                {/* stylized ACC letters */}
                <path
                  d="M 18 30 C 18 20, 28 14, 38 14 C 48 14, 56 20, 56 30 C 56 40, 48 46, 38 46 C 28 46, 18 40, 18 30 Z"
                  stroke="url(#navAccGrad)"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M 48 16 L 48 46"
                  stroke="url(#navAccGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 18 C 64 15, 57 22, 57 30 C 57 38, 64 45, 74 42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  className="logo-c-path"
                />
                <path
                  d="M 90 18 C 80 15, 73 22, 73 30 C 73 38, 80 45, 90 42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  className="logo-c-path"
                />
              </svg>
            </div>
            <span className="brand-org-name">Amity Coding Club</span>
          </NextLink>

          {/* Desktop Stacking Navigation */}
          <div className="desktop-nav-menu">
            <StackingNavbar items={desktopNavItems} />
          </div>

          {/* Right Action: Theme Toggle */}
          <div className="nav-right-actions">
            <ThemeToggle size="md" />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-hamburger-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          {mobileNavItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <NextLink
                  href={item.href}
                  className={`mobile-drawer-anchor ${isActive ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  <span className="arrow-icon">→</span>
                </NextLink>
              </li>
            );
          })}
        </ul>

        <div className="mobile-drawer-footer-block">
          <div className="mobile-theme-row">
            <span className="mobile-theme-label">Appearance</span>
            <ThemeToggle size="md" showLabel />
          </div>

          <div className="mobile-drawer-cta">
            <NextLink href="/join" className="btn-mobile-join">
              Join Club →
            </NextLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          z-index: 1000;
          background-color: var(--nav-bg, rgba(255, 255, 255, 0.9));
          backdrop-filter: saturate(180%) blur(16px);
          -webkit-backdrop-filter: saturate(180%) blur(16px);
          border-bottom: 1px solid var(--nav-border, rgba(17, 24, 39, 0.05));
          transition: all 0.25s ease;
        }

        .site-header.scrolled {
          height: var(--nav-height-scrolled);
          background-color: var(--nav-bg-scrolled, rgba(255, 255, 255, 0.96));
          border-bottom: 1px solid var(--nav-border, rgba(17, 24, 39, 0.08));
          box-shadow: var(--shadow-subtle, 0 2px 10px rgba(0, 0, 0, 0.03));
        }

        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Brand */
        .brand-logo-group {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
        }

        .acc-nav-mark {
          width: 36px;
          height: 24px;
          display: flex;
          align-items: center;
        }

        .nav-logo-svg {
          width: 100%;
          height: 100%;
        }

        .logo-c-path {
          color: var(--ink-heading, #111827);
          transition: color 0.2s ease;
        }

        .brand-org-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--ink-heading, #111827);
          letter-spacing: -0.02em;
          transition: color 0.2s ease;
        }

        /* Navigation */
        .desktop-nav-menu {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Right Actions */
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .btn-nav-join {
          background-color: #5B3DF5;
          color: #FFFFFF;
          border: 1px solid #5B3DF5;
          padding: 8px 20px;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(91, 61, 245, 0.28);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-nav-join:hover {
          background-color: #4C2BE6;
          box-shadow: 0 6px 18px rgba(91, 61, 245, 0.38);
          transform: translateY(-1px);
        }

        .join-arrow {
          transition: transform 0.2s ease;
        }

        .btn-nav-join:hover .join-arrow {
          transform: translateX(3px);
        }

        /* Mobile Hamburger */
        .mobile-hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid var(--hairline-medium, rgba(17, 24, 39, 0.1));
          background: transparent;
          gap: 5px;
          cursor: pointer;
        }

        .mobile-hamburger-btn span {
          display: block;
          width: 18px;
          height: 1.5px;
          background-color: var(--ink-heading, #111827);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .mobile-hamburger-btn.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }

        .mobile-hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-hamburger-btn.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--canvas-primary, #FFFFFF);
          z-index: 990;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 88px 24px 36px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: all 0.25s ease;
        }

        .mobile-nav-drawer.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .mobile-drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-drawer-anchor {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--ink-heading, #111827);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--hairline, rgba(17, 24, 39, 0.06));
          text-decoration: none;
        }

        .mobile-drawer-anchor.active {
          color: #5B3DF5;
        }

        .mobile-drawer-footer-block {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .mobile-theme-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: var(--canvas-subtle);
          border: 1px solid var(--hairline-medium);
          border-radius: 12px;
        }

        .mobile-theme-label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--ink-heading);
        }

        .btn-mobile-join {
          width: 100%;
          background: #5B3DF5;
          color: #FFFFFF;
          padding: 14px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(91, 61, 245, 0.3);
        }

        @media (max-width: 960px) {
          .desktop-nav-menu {
            display: none;
          }
          .mobile-hamburger-btn {
            display: flex;
          }
          .btn-nav-join {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
