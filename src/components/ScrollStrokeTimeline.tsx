'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Users, Zap, Box, Trophy } from 'lucide-react';
import styles from './ScrollStrokeTimeline.module.css';

export interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
}

interface ScrollStrokeTimelineProps {
  milestones?: MilestoneItem[];
}

const DEFAULT_MILESTONES: MilestoneItem[] = [
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
  }
];

/* ── 1. Terminal Preview (2022) ── */
function TerminalPreview() {
  return (
    <div className={styles.terminalPreview}>
      <div className={styles.terminalBar}>
        <span className={styles.dotRed} />
        <span className={styles.dotYellow} />
        <span className={styles.dotGreen} />
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.terminalCommand}>
          <span className={styles.terminalPrompt}>&gt;</span> ./begin
        </div>
        <div className={styles.terminalOutput}>
          community initialized<span className={styles.cursorBlink}>_</span>
        </div>
      </div>
    </div>
  );
}

/* ── 2. HackAmity Stage Preview (2023) ── */
function HackathonPreview() {
  return (
    <div className={styles.hackathonPreview}>
      <div className={styles.projectorScreen}>
        <span className={styles.projectorMain}>HACKAMITY 1.0</span>
      </div>
      <svg className={styles.audienceSilhouette} viewBox="0 0 200 40" fill="none">
        <path
          d="M0 40 C10 28, 20 28, 30 40 C40 25, 50 25, 60 40 C75 22, 90 22, 105 40 C120 24, 135 24, 150 40 C165 26, 180 26, 200 40 Z"
          fill="#06050C"
        />
        <circle cx="15" cy="24" r="5" fill="#0A0914" />
        <circle cx="45" cy="22" r="6" fill="#0A0914" />
        <circle cx="90" cy="18" r="7" fill="#0A0914" />
        <circle cx="135" cy="21" r="6" fill="#0A0914" />
        <circle cx="175" cy="23" r="5" fill="#0A0914" />
        <path d="M102 24 L107 40 L97 40 Z" fill="#141224" />
        <circle cx="102" cy="19" r="3.5" fill="#1A182E" />
      </svg>
    </div>
  );
}

/* ── 3. AI Campus Navigator Preview (2024) ── */
function NavigatorPreview() {
  return (
    <div className={styles.navigatorPreview}>
      <div className={styles.navigatorHeading}>
        Navigating a smarter campus.
      </div>
      <svg className={styles.navigatorSvg} viewBox="0 0 204 104" fill="none">
        <path d="M0 32 H204 M0 68 H204 M50 0 V104 M120 0 V104 M165 0 V104" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M25 15 L80 15 L80 85 M120 45 L180 45" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <path
          d="M 30 78 L 75 78 L 115 48 L 155 48"
          stroke="#A855F7"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="78" r="3.5" fill="#C084FC" />
        <circle cx="155" cy="48" r="14" stroke="#A855F7" strokeWidth="1" opacity="0.4" className={styles.radarPulse} />
        <circle cx="155" cy="48" r="5" fill="#A855F7" />
        <circle cx="155" cy="48" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/* ── 4. National Podium & Trophy Preview (2025) ── */
function TrophyPreview() {
  return (
    <div className={styles.trophyPreview}>
      <div className={styles.trophyTaglines}>
        <span className={styles.trophyTag}>Build</span>
        <span className={styles.trophyTag}>Compete</span>
        <span className={styles.trophyTag}>Belong</span>
      </div>
      <div className={styles.trophyStageWrap}>
        <Trophy size={28} className={styles.goldenTrophyIcon} />
        <div className={styles.podiumSteps}>
          <div className={styles.stepTwo} />
          <div className={styles.stepOne} />
          <div className={styles.stepThree} />
        </div>
      </div>
    </div>
  );
}

/* ── Spine Node that responds dynamically to the advancing beam ── */
function SpineNodeItem({
  year,
  index,
  total,
  isAmber,
  scrollYProgress,
}: {
  year: string;
  index: number;
  total: number;
  isAmber: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const threshold = (index + 0.35) / total;

  const dotScale = useTransform(scrollYProgress, (v) => (v >= threshold ? 1.25 : 0.85));
  const dotOpacity = useTransform(scrollYProgress, (v) => (v >= threshold ? 1 : 0.4));
  const yearOpacity = useTransform(scrollYProgress, (v) => (v >= threshold ? 1 : 0.45));
  const haloScale = useTransform(scrollYProgress, (v) => (v >= threshold ? 1 : 0.6));
  const haloOpacity = useTransform(scrollYProgress, (v) => (v >= threshold ? 1 : 0));

  return (
    <div className={styles.spineYearRow}>
      <motion.span
        className={styles.yearLabel}
        style={{ opacity: yearOpacity }}
      >
        {year}
      </motion.span>

      <div className={styles.nodeHaloContainer}>
        {/* Halo ring expanding when beam arrives */}
        <motion.div
          className={`${styles.nodeHaloRing} ${isAmber ? styles.haloAmber : styles.haloPurple}`}
          style={{ scale: haloScale, opacity: haloOpacity }}
        />
        {/* Node dot */}
        <motion.span
          className={`${styles.nodeDot} ${isAmber ? styles.nodeAmber : styles.nodePurple}`}
          style={{
            scale: dotScale,
            opacity: dotOpacity,
          }}
        />
      </div>
    </div>
  );
}

export default function ScrollStrokeTimeline({ milestones = DEFAULT_MILESTONES }: ScrollStrokeTimelineProps) {
  const items = milestones && milestones.length > 0 ? milestones : DEFAULT_MILESTONES;
  const featured = items.slice(0, 4);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure dynamic height of the cards deck (Aceternity pattern)
  useEffect(() => {
    const updateHeight = () => {
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Aceternity useScroll & transform animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 25%', 'end 75%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const cardConfig = [
    {
      badgeClass: styles.badgePurple,
      icon: <Users size={22} />,
      isAmber: false,
      preview: <TerminalPreview />
    },
    {
      badgeClass: styles.badgeAmber,
      icon: <Zap size={22} />,
      isAmber: true,
      preview: <HackathonPreview />
    },
    {
      badgeClass: styles.badgePurple,
      icon: <Box size={22} />,
      isAmber: false,
      preview: <NavigatorPreview />
    },
    {
      badgeClass: styles.badgeAmber,
      icon: <Trophy size={22} />,
      isAmber: true,
      preview: <TrophyPreview />
    }
  ];

  return (
    <section ref={containerRef} className={styles.timelineSection} aria-label="Our Journey Timeline">
      <div className={styles.timelineWrapper}>
        
        {/* ── Column 1: Left Sticky Hero ── */}
        <div className={styles.leftColumn}>
          <div>
            <div className={styles.journeyTag}>OUR JOURNEY</div>
            <h2 className={styles.mainHeadline}>
              Milestones<br />
              That <span className={styles.matterWord}>Matter</span><span className={styles.amberDot}>.</span>
            </h2>
            <p className={styles.leadDescription}>
              From a small group of curious minds to a thriving community of builders — here&apos;s how we&apos;ve grown, learned and made an impact.
            </p>
          </div>

          {/* Bottom Left: Cosmic Orbit Rings & Tomorrow Tag */}
          <div className={styles.bottomLeftWidget}>
            <div className={styles.orbitBox}>
              <svg className={styles.orbitSvg} viewBox="0 0 160 100" fill="none">
                <ellipse cx="20" cy="110" rx="120" ry="85" strokeWidth="1" className={styles.orbitArcOuter} />
                <ellipse cx="20" cy="110" rx="90" ry="62" strokeWidth="1" className={styles.orbitArcInner} />
                <circle cx="82" cy="62" r="4" fill="#A855F7" className={styles.satelliteBeacon} />
                <circle cx="82" cy="62" r="1.5" fill="#FFFFFF" />
              </svg>
            </div>
            <div className={styles.brighterTag}>
              BUILDING<br />
              A BRIGHTER<br />
              TOMORROW
            </div>
            <div className={styles.brighterLine} />
          </div>
        </div>

        {/* ── Column 2: Center Spine Axis (Aceternity Animated Beam Track) ── */}
        <div className={styles.spineColumn} aria-hidden="true">
          {/* Aceternity Base Ghost Track with Animated Beam */}
          <div
            style={{
              height: height > 0 ? `${height}px` : '100%',
            }}
            className={styles.spineTrackBase}
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className={styles.spineAnimatedBeam}
            >
              <div className={styles.spineBeamHead} />
            </motion.div>
          </div>
          
          {/* Interactive Nodes along the spine */}
          {featured.map((item, idx) => {
            const config = cardConfig[idx % cardConfig.length];
            return (
              <SpineNodeItem
                key={item.year}
                year={item.year}
                index={idx}
                total={featured.length}
                isAmber={config.isAmber}
                scrollYProgress={scrollYProgress}
              />
            );
          })}

          {/* Bottom dashed continuation */}
          <div className={styles.spineDashedTail} />
          <div className={styles.spineCircleTerminus} />
        </div>

        {/* ── Column 3: Right Milestone Cards Deck ── */}
        <div ref={cardsRef} className={styles.cardsColumn}>
          {featured.map((item, idx) => {
            const config = cardConfig[idx % cardConfig.length];
            return (
              <motion.div
                key={item.year}
                className={styles.milestoneCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-25px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Icon Badge */}
                <div className={`${styles.cardIconBadge} ${config.badgeClass}`}>
                  {config.icon}
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>

                {/* Visual Preview Widget */}
                <div className={styles.previewContainer}>
                  {config.preview}
                </div>
              </motion.div>
            );
          })}

          {/* Bottom "And many more milestones ahead..." row */}
          <div className={styles.aheadRow}>
            <span className={styles.aheadText}>AND MANY MORE MILESTONES AHEAD...</span>
          </div>
        </div>

        {/* ── Column 4: Far Right Editorial Typography ── */}
        <div className={styles.rightColumn} aria-hidden="true">
          <div className={styles.editorialBlock}>
            <div className={styles.editorialWord}>SAME</div>
            <div className={styles.editorialWord}>PEOPLE</div>
            <div className={styles.editorialWord}>BIGGER</div>
            <div className={styles.editorialWord}>IDEAS</div>
            <div className={styles.editorialDivider} />
          </div>

          <div className={styles.editorialBlock}>
            <div className={styles.editorialSlash}>///</div>
            <div className={styles.editorialWord}>CODE</div>
            <div className={styles.editorialWord}>COLLABORATE</div>
            <div className={styles.editorialWord}>CREATE</div>
            <div className={styles.editorialDivider} />
          </div>
        </div>

      </div>
    </section>
  );
}
