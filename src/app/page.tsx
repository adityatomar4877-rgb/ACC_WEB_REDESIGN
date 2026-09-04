'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ScrollReveal from '@/components/ScrollReveal';
import PillarsSection from '@/components/PillarsSection';
import FlowingMenu from '@/components/FlowingMenu';
import TechStackGrid from '@/components/TechStackGrid';
import RsvpModal from '@/components/Modals/RsvpModal';
import SplitFlapText from '@/components/SplitFlapText';
import StrokeText from '@/components/StrokeText';
import { EVENTS_DATA, EventItem } from '@/data/events';

const demoItems = [
  { link: '#', text: 'CODE()' },
  { link: '#', text: 'LEARN()' },
  { link: '#', text: 'BUILD()' },
  { link: '#', text: 'REPEAT()' }
];

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const handleSelectEvent = (eventId: string) => {
    const found = EVENTS_DATA.find((e) => e.id === eventId);
    if (found) {
      setSelectedEvent(found);
      setIsRsvpOpen(true);
    }
  };

  return (
    <div className="home-page">
      {/* 01 REDESIGNED HERO SECTION */}
      <HeroSection />

      {/* 02 SCROLL REVEAL SECTION */}
      <div id="scroll-reveal-quote">
        <ScrollReveal baseOpacity={0.12}>
          When does a coder become a developer? When he writes his first line of code? No! When he builds something that actually works? No! When he solves a problem nobody else could solve? No! A developer is born when he stops just writing code and starts creating.
        </ScrollReveal>
      </div>

      {/* 05 ABOUT / COMMUNITY PILLARS */}
      <PillarsSection />

      {/* 06 FLOWING MENU SHOWCASE */}
      <section className="flowing-menu-section" aria-label="Interactive Flowing Menu">
        <div className="container">
          <div className="flowing-section-header">
            <div className="section-meta">
              <span>05 / INTERACTIVE EXPERIENCE</span>
            </div>
            <h2 className="section-title">Flowing Architecture</h2>
            <p className="section-description">
              Hover across tracks to experience fluid, hardware-accelerated kinetic typography and live interactive visual reveals.
            </p>
          </div>

          <div className="flowing-menu-wrapper" style={{ height: '600px', position: 'relative' }}>
            <FlowingMenu
              items={demoItems}
              speed={15}
              textColor="#ffffff"
              bgColor="#120F17"
              marqueeBgColor="#ffffff"
              marqueeTextColor="#120F17"
              borderColor="#ffffff"
            />
          </div>
        </div>
      </section>

      {/* 07 TECHNOLOGIES ECOSYSTEM */}
      <TechStackGrid />

      {/* 08 CLOSING CTA SECTION WITH SPLIT-FLAP EFFECT */}
      <section className="cta-section" aria-label="Join Community Call to Action">
        <div className="container">
          <div className="cta-card">
            <div className="cta-meta">
              <span>06 / NEXT COHORT</span>
            </div>

            {/* Interactive Stroke & Split-Flap Headline */}
            <div className="cta-flap-headline-block">
              <div className="cta-stroke-headline">
                <StrokeText
                  text="BUILD SOMETHING"
                  strokeColor="#A78BFA"
                  fillColor="#FFFFFF"
                  strokeWidth={2.0}
                  drawDuration={2.2}
                  fillDelay={0.35}
                  stagger={0.055}
                  ease="power2.out"
                  trigger="scroll"
                  fillMode="wipe"
                  fontSize={52}
                  fontWeight={900}
                  letterSpacing={-2}
                  reverse={false}
                />
              </div>
              <div className="cta-flap-display">
                <SplitFlapText
                  words={["GREAT", "IMPACTFUL", "TIMELESS", "PRODUCTION"]}
                  flipDuration={0.12}
                  stagger={0.06}
                  cycleDelay={2400}
                  charset="alphanumeric"
                  flipsPerChar={8}
                  tileColor="#141A28"
                  textColor="#F8FAFC"
                  tileRadius={8}
                  gap={6}
                  fontSize={46}
                  loop
                  padTo={10}
                />
              </div>
            </div>

            <p className="cta-sub">
              Join a community of ambitious students who learn, build and ship together.
              Open to developers, designers, and AI tinkerers.
            </p>
            <div className="cta-btn-row">
              <Link href="/join" className="btn btn-primary btn-lg">
                Join the Club <span className="arrow-icon">→</span>
              </Link>
              <a
                href="https://discord.gg/amitycodingclub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Join Discord ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic RSVP Modal */}
      <RsvpModal
        event={selectedEvent}
        isOpen={isRsvpOpen}
        onClose={() => {
          setIsRsvpOpen(false);
          setSelectedEvent(null);
        }}
      />

      <style jsx>{`
        .home-page {
          background-color: var(--canvas-primary);
        }

        .flowing-menu-section {
          padding: 80px 0 96px;
          background-color: var(--canvas-primary);
          border-top: 1px solid var(--hairline-ultra-light);
        }

        .flowing-section-header {
          margin-bottom: 36px;
        }

        .flowing-menu-wrapper {
          border-radius: 20px;
          overflow: hidden;
        }

        /* Closing CTA Section */
        .cta-section {
          padding: 80px 0 100px;
          background-color: var(--canvas-primary);
        }

        .cta-card {
          background-color: #0F1115;
          border-radius: 24px;
          padding: 64px 56px;
          color: #FFFFFF;
          border: 1px solid #1F242F;
          box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .cta-card::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(91, 61, 245, 0.16) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-meta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: #A78BFA;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .cta-flap-headline-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 24px;
        }

        .cta-stroke-headline {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .cta-flap-display {
          display: flex;
          align-items: center;
          overflow-x: auto;
          padding: 4px 0;
        }

        .cta-sub {
          font-size: 1.125rem;
          color: #94A3B8;
          max-width: 540px;
          line-height: 1.6;
          margin-bottom: 36px;
        }

        .cta-btn-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .cta-card {
            padding: 40px 32px;
          }
          .flowing-menu-wrapper {
            height: 500px !important;
          }
        }

        @media (max-width: 640px) {
          .cta-btn-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .flowing-menu-wrapper {
            height: 450px !important;
          }
        }
      `}</style>
    </div>
  );
}
