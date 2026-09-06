'use client';

import React from 'react';
import Link from 'next/link';
import SplitFlapText from '@/components/SplitFlapText';
import ScrollStrokeTimeline from '@/components/ScrollStrokeTimeline';
import SchemaValuesSection from '@/components/SchemaValuesSection';
import TextType from '@/components/TextType';
import { Sparkles, Terminal, Code2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    {
      year: '2022',
      title: 'Club Inception & First Terminal Sessions',
      desc: 'Founded by 6 passionate sophomore software engineers tired of generic theoretical coursework. Hosted the first terminal-only C++ and Linux workshop in CS Lab 102.'
    },
    {
      year: '2023',
      title: 'First Campus-wide Hackathon (HackAmity 1.0)',
      desc: 'Scaled to 250+ active participants. Built open-source student utilities and launched the club mentorship program.'
    },
    {
      year: '2024',
      title: 'AI Campus Navigator & Production Deployment',
      desc: 'Shipped AI Campus Navigator across the entire 60-block university campus, serving 4,000+ daily active student routing requests.'
    },
    {
      year: '2025',
      title: 'National Podium Victories & Tier-1 Alumni Network',
      desc: 'ACC squads clinched top 3 finishes across 12 national hackathons. ACC alumni joined Google, Razorpay, Uber, and YC startups.'
    },
    {
      year: '2026',
      title: '1,240+ Active Builders & Open Source Guild',
      desc: 'Expanded into distributed systems, AI agent orchestration, and hardware IoT telemetry grids with 84+ shipped repositories.'
    }
  ];

  const values: Array<{
    num: string;
    tag: string;
    title: string;
    desc: string;
    variant: 'purple' | 'amber' | 'emerald' | 'rose';
  }> = [
    {
      num: '01',
      tag: 'CRAFTSMANSHIP',
      title: 'Craftsmanship Over Mediocrity',
      desc: 'We care deeply about clean architectures, accessible semantics, responsive layouts, and performant code. No cut corners.',
      variant: 'purple'
    },
    {
      num: '02',
      tag: 'PRODUCTION',
      title: 'Ship Real Products',
      desc: 'Tutorials don’t teach resilience; production traffic does. We build software that real students, faculty, and engineers rely on.',
      variant: 'amber'
    },
    {
      num: '03',
      tag: 'OPEN SOURCE',
      title: 'Open Source First',
      desc: 'Knowledge belongs in the public square. We contribute upstream, open-source our internal tooling, and write comprehensive documentation.',
      variant: 'emerald'
    },
    {
      num: '04',
      tag: 'RIGOR',
      title: 'Radical Inclusivity & Rigor',
      desc: 'Whether you are writing your first Python loop or optimizing a CUDA kernel, curiosity and relentless consistency are what matter.',
      variant: 'rose'
    }
  ];

  return (
    <div className="about-page">
      {/* Page Hero with Split-Flap Display */}
      <section className="subpage-hero">
        <div className="container">

          <div className="hero-heading-layout">
            <h1 className="subpage-hero-title">
              We are a community of
            </h1>

            {/* SplitFlap Interactive Display Banner */}
            <div className="hero-split-flap-card">
              <div className="flap-display-wrapper">
                <SplitFlapText
                  words={["BUILDERS", "PROBLEM SOLVERS", "ENGINEERS", "INVENTORS"]}
                  flipDuration={0.11}
                  stagger={0.05}
                  cycleDelay={2400}
                  charset="alphanumeric"
                  flipsPerChar={7}
                  tileColor="#111827"
                  textColor="#F8FAFC"
                  tileRadius={8}
                  gap={6}
                  fontSize={40}
                  loop
                  padTo={15}
                />
              </div>
            </div>

            <p className="subpage-hero-lead">
              Founded in 2022 at Amity University, Noida, Amity Coding Club exists to bridge the gap
              between academic theory and real-world engineering craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Origin & Philosophy Section with Mechanical SplitFlap Doctrine */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-left">
              <span className="story-index">01 / OUR PHILOSOPHY</span>

              {/* Redesigned Philosophy Doctrine Card */}
              <div className="philosophy-doctrine-card">
                <div className="doctrine-tag">CORE TENET</div>
                <h2 className="doctrine-lead">Technology is learned by</h2>
                <div className="doctrine-flap-box">
                  <SplitFlapText
                    words={["BUILDING", "SHIPPING", "DEBUGGING", "PROTOTYPING"]}
                    flipDuration={0.12}
                    stagger={0.06}
                    cycleDelay={2200}
                    charset="alphanumeric"
                    flipsPerChar={8}
                    tileColor="#5B3DF5"
                    textColor="#FFFFFF"
                    tileRadius={8}
                    gap={5}
                    fontSize={32}
                    loop
                    padTo={11}
                  />
                </div>
                <div className="doctrine-footer-accent">
                  <span className="not-watching-badge">...NOT WATCHING.</span>
                </div>
              </div>
            </div>

            <div className="story-right">
              <p className="story-p">
                Most computer science education stops at slides and multiple-choice quizzes.
                We believe true mastery is forged in the terminal: debugging race conditions at 2:00 AM,
                optimizing database indices, deploying edge microservices, and receiving honest pull-request feedback.
              </p>
              <p className="story-p">
                At ACC, senior students mentor freshmen, competitive programmers share mathematical insights,
                and designers pair with full-stack engineers to ship polished digital tools.
              </p>
              <div className="story-stat-row">
                <div className="mini-stat">
                  <span className="mini-val">1,240+</span>
                  <span className="mini-lbl">Active Members</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-val">84+</span>
                  <span className="mini-lbl">Shipped Projects</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-val">100%</span>
                  <span className="mini-lbl">Student-Led</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section with Skiper 19 Scroll Stroke */}
      <ScrollStrokeTimeline milestones={milestones} />

      {/* Core Values Section with Continuous Background Sine-Wave Canvas & Schema Cards */}
      <SchemaValuesSection />

      {/* Join CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-box">
            <TextType
              as="h2"
              className="about-cta-title"
              text={[
                "Ready to write code with us?",
                "Ready to build real software?",
                "Ready to ship to production?",
                "Ready to join Amity Coding Club?",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              deletingSpeed={50}
              showCursor
              cursorCharacter="_"
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
              startOnVisible
            />
            <p className="about-cta-sub">
              Applications are reviewed on a rolling basis. Join our Discord community or apply for core team membership.
            </p>
            <div className="cta-btn-row">
              <Link href="/join" className="btn btn-primary btn-lg">
                Join the Club <span className="arrow-icon">→</span>
              </Link>
              <Link href="/team" className="btn btn-secondary btn-lg">
                Meet the Team <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          background-color: var(--canvas-primary);
          min-height: 100vh;
        }

        .subpage-hero {
          padding: 64px 0 48px;
          background: linear-gradient(180deg, var(--canvas-secondary) 0%, var(--canvas-primary) 100%);
          border-bottom: 1px solid var(--hairline-ultra-light);
        }

        .section-meta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.08em;
          margin-bottom: 16px;
          background: rgba(91, 61, 245, 0.08);
          padding: 4px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(91, 61, 245, 0.2);
        }

        :global(.meta-icon) {
          color: var(--accent-yellow-warm);
        }

        .hero-heading-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 920px;
        }

        .subpage-hero-title {
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          font-weight: 800;
          color: var(--ink-heading);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
        }

        /* Hero Split Flap Card */
        .hero-split-flap-card {
          display: inline-flex;
          flex-direction: column;
          background: #0B0F1A;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.2);
          max-width: 100%;
          overflow-x: auto;
          margin: 6px 0 12px;
        }

        .flap-display-wrapper {
          display: flex;
          align-items: center;
          overflow-x: auto;
          padding: 2px 0;
        }

        .subpage-hero-lead {
          font-size: 1.125rem;
          color: var(--ink-secondary);
          line-height: 1.65;
          max-width: 720px;
          margin: 8px 0 0;
        }

        /* Origin & Philosophy */
        .story-section {
          padding: 88px 0;
          border-bottom: 1px solid var(--hairline);
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.4fr;
          gap: 64px;
          align-items: center;
        }

        .story-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .story-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.06em;
          display: block;
        }

        /* Philosophy Doctrine Card */
        .philosophy-doctrine-card {
          background: var(--card-bg, #FFFFFF);
          border: 1px solid var(--card-border, rgba(226, 232, 240, 0.9));
          border-radius: 20px;
          padding: 28px 26px;
          box-shadow: var(--shadow-card, 0 10px 30px -4px rgba(91, 61, 245, 0.08));
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .doctrine-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          font-weight: 800;
          color: #5B3DF5;
          background: var(--canvas-subtle, #EEF0FF);
          padding: 3px 8px;
          border-radius: 4px;
          align-self: flex-start;
          letter-spacing: 0.05em;
        }

        .doctrine-lead {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--ink-heading, #0F172A);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .doctrine-flap-box {
          display: flex;
          align-items: center;
          padding: 6px 0;
          overflow-x: auto;
        }

        .doctrine-footer-accent {
          display: flex;
          align-items: center;
          margin-top: 4px;
        }

        .not-watching-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.9375rem;
          font-weight: 800;
          color: #EF4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid rgba(239, 68, 68, 0.25);
          letter-spacing: 0.02em;
        }

        .story-p {
          font-size: 1.0625rem;
          color: var(--ink-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .story-stat-row {
          display: flex;
          gap: 40px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--hairline);
        }

        .mini-stat {
          display: flex;
          flex-direction: column;
        }

        .mini-val {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--ink-heading);
          letter-spacing: -0.02em;
        }

        .mini-lbl {
          font-size: 0.8125rem;
          color: var(--ink-secondary);
          font-weight: 500;
        }

        /* Values */
        .values-section {
          padding: 80px 0;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .value-card {
          background: var(--card-bg, #FFFFFF);
          border: 1px solid var(--card-border, var(--hairline));
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-subtle);
        }

        .val-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--accent-primary);
          margin-bottom: 16px;
        }

        .val-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--ink-heading);
          margin-bottom: 10px;
        }

        .val-desc {
          font-size: 0.875rem;
          color: var(--ink-secondary);
          line-height: 1.55;
        }

        /* About CTA */
        .about-cta-section {
          padding: 40px 0 80px;
        }

        .about-cta-box {
          background: #0B0F1A;
          color: #FFFFFF;
          border-radius: 24px;
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .about-cta-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          min-height: 1.25em;
          display: inline-block;
        }

        .about-cta-sub {
          font-size: 1.0625rem;
          color: #94A3B8;
          max-width: 540px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .cta-btn-row {
          display: flex;
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 640px) {
          .subpage-hero {
            padding: 44px 0 32px;
          }
          .values-grid {
            grid-template-columns: 1fr;
          }
          .cta-btn-row {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
