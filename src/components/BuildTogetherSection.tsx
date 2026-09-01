'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PixelCard from './PixelCard';
import MotionButton from './MotionButton';

interface PillarItem {
  index: string;
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  tagline: string;
  description: string;
  itemsTitle: string;
  items: string[];
}

const PILLARS: PillarItem[] = [
  {
    index: '01',
    label: 'PRINCIPLE',
    title: 'LEARN',
    metric: '42+',
    metricLabel: 'SESSIONS RUN',
    tagline: 'Deep technical foundations.',
    description:
      'Zero fluff. Rigorous masterclasses on systems architecture, transformer neural networks, and modern software craft led by peers and industry veterans.',
    itemsTitle: 'CURRICULUM & INITIATIVES',
    items: [
      'Weekly Hands-on Workshops',
      'Peer-to-Peer 1:1 Mentorship',
      'Algorithmic Masterclasses',
      'Architecture Deep-dives'
    ]
  },
  {
    index: '02',
    label: 'PRINCIPLE',
    title: 'BUILD',
    metric: '84+',
    metricLabel: 'REPOS SHIPPED',
    tagline: 'Software that real people use.',
    description:
      'We don\u2019t build throwaway tutorial clones. We build high-throughput campus infrastructure, open-source libraries, and production MVPs deployed to thousands.',
    itemsTitle: 'ENGINEERING OUTPUT',
    items: [
      'Campus-wide Infrastructure',
      'Open Source Upstream Repos',
      'Full-stack Production MVPs',
      'Hardware & IoT Testbeds'
    ]
  },
  {
    index: '03',
    label: 'PRINCIPLE',
    title: 'COMPETE',
    metric: '34+',
    metricLabel: 'PODIUM WINS',
    tagline: 'High-stakes execution.',
    description:
      'From 36-hour national hackathons to ICPC regionals, ACC squads consistently place on the podium through rapid prototyping and algorithmic grit.',
    itemsTitle: 'ARENAS & TOURNAMENTS',
    items: [
      'Annual 36h Hackathon 3.0',
      'ICPC & Codeforces Squads',
      'Weekly Bug Bounty Duels',
      'DevHunt Hackathon Matching'
    ]
  },
  {
    index: '04',
    label: 'PRINCIPLE',
    title: 'CONNECT',
    metric: '1,240+',
    metricLabel: 'ACTIVE DEVELOPERS',
    tagline: 'A lifelong developer network.',
    description:
      'Bridge the gap between campus and Tier-1 engineering teams. Our alumni work across Google, Microsoft, Uber, Razorpay, and high-growth YC startups.',
    itemsTitle: 'NETWORK & ECOSYSTEM',
    items: [
      'Staff Engineer AMAs',
      'Alumni Referral Pipeline',
      'Active 1.2K+ Discord Guild',
      'Collaborative Demo Nights'
    ]
  }
];

export default function BuildTogetherSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0001
  });

  // 6 slides total, translate from 0% to -500vw
  const trackX = useTransform(smoothProgress, [0, 1], ['0vw', '-500vw']);

  return (
    <div
      ref={containerRef}
      className="deck-shell"
      aria-label="We Build Together Horizontal Deck"
    >
      {/* Sticky viewport */}
      <div className="deck-sticky-window">
        {/* Ambient glow */}
        <div className="deck-ambient-glow" />

        {/* Horizontal track — using inline style because styled-jsx can't scope motion.div */}
        <motion.div
          className="deck-track"
          style={{
            x: trackX,
            display: 'flex',
            flexDirection: 'row' as const,
            flexWrap: 'nowrap' as const,
            width: '600vw',
            minWidth: '600vw',
            height: '100vh',
            willChange: 'transform',
          }}
        >
          {/* SLIDE 00: INTRO */}
          <section className="deck-slide deck-slide--intro">
            <div className="deck-slide-inner">
              <div className="deck-meta">
                <span className="deck-meta__dot" />
                <span>00 // ACC PHILOSOPHY</span>
              </div>
              <h2 className="deck-intro__headline">
                <span>WE BUILD</span>
                <span className="deck-intro__accent">TOGETHER.</span>
              </h2>
              <p className="deck-intro__body">
                Amity Coding Club brings together curious minds who want to master fundamentals,
                architect real-world software, and push technical boundaries without compromise.
              </p>
              <div className="deck-intro__prompt">
                <span className="deck-intro__arrow">&rarr;</span>
                <span>SCROLL TO EXPLORE THE PILLARS</span>
              </div>
            </div>
          </section>

          {/* SLIDES 01–04: PILLARS */}
          {PILLARS.map((p) => (
            <section key={p.title} className="deck-slide deck-slide--pillar">
              <div className="deck-pillar__bg-word" aria-hidden="true">
                <span>{p.title}</span>
              </div>
              <div className="deck-slide-inner">
                <div className="deck-meta">
                  <span className="deck-meta__index">{p.index}</span>
                  <span className="deck-meta__sep" />
                  <span>{p.label}</span>
                </div>
                <div className="deck-pillar__grid">
                  <div className="deck-pillar__left">
                    <h3 className="deck-pillar__title">{p.title}</h3>
                    <div className="deck-pillar__metric">
                      <span className="deck-pillar__number">{p.metric}</span>
                      <span className="deck-pillar__label">{p.metricLabel}</span>
                    </div>
                    <p className="deck-pillar__tagline">{p.tagline}</p>
                    <p className="deck-pillar__desc">{p.description}</p>
                  </div>
                  <PixelCard variant="purple" className="deck-pillar__right">
                    <div className="deck-pillar__right-content">
                      <span className="deck-pillar__right-hdr">{p.itemsTitle}</span>
                      <ul className="deck-pillar__list">
                        {p.items.map((item) => (
                          <li key={item}>
                            <span className="deck-pillar__slash">/</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PixelCard>
                </div>
              </div>
            </section>
          ))}

          {/* SLIDE 05: CREED */}
          <section className="deck-slide deck-slide--creed">
            <div className="deck-slide-inner deck-creed__inner">
              <div className="deck-meta">
                <span className="deck-meta__dot" />
                <span>05 // THE CREED</span>
              </div>
              <h2 className="deck-creed__headline">
                <span className="deck-creed__sub">WE DON&apos;T JUST WRITE CODE.</span>
                <span className="deck-creed__main">WE BUILD TOGETHER.</span>
              </h2>
              <p className="deck-creed__body">
                Join Amity&apos;s premier community of builders, researchers, and competitive
                coders shipping the next generation of software.
              </p>
              <div className="deck-creed__actions">
                <MotionButton
                  label="Join the Community"
                  href="/join"
                />
              </div>
            </div>
          </section>
        </motion.div>

        {/* Bottom progress rail */}
        <div className="deck-rail" aria-hidden="true">
          <div className="deck-rail__inner">
            <span className="deck-rail__label">
              <span className="deck-rail__dot" />
              <span>HORIZONTAL EXPERIENCE</span>
            </span>
            <div className="deck-rail__track">
              <motion.span
                className="deck-rail__fill"
                style={{ scaleX: smoothProgress }}
              />
            </div>
            <span className="deck-rail__index">00 — 05</span>
          </div>
        </div>
      </div>
    </div>
  );
}
