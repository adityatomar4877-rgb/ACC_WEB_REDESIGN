'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from '@/data/events';
import {
  Calendar,
  MapPin,
  Users,
  ArrowUpRight,
  Award,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import styles from './HoverExpandEvents.module.css';

interface HoverExpandEventsProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onOpenRsvp: (event: EventItem) => void;
}

/* Luxury Category Accent Colors */
const ACCENT: Record<string, { main: string; bg: string; glow: string }> = {
  Hackathons: {
    main: '#5B3DF5',
    bg: '#EEF0FF',
    glow: 'rgba(91, 61, 245, 0.18)'
  },
  'AI / ML': {
    main: '#2563EB',
    bg: '#EFF6FF',
    glow: 'rgba(37, 99, 235, 0.18)'
  },
  Workshops: {
    main: '#D97706',
    bg: '#FFFBEB',
    glow: 'rgba(217, 119, 6, 0.18)'
  },
  'Open Source': {
    main: '#059669',
    bg: '#ECFDF5',
    glow: 'rgba(5, 150, 105, 0.18)'
  },
  Keynotes: {
    main: '#DB2777',
    bg: '#FDF2F8',
    glow: 'rgba(219, 39, 119, 0.18)'
  },
};

function getTheme(cat: string) {
  return (
    ACCENT[cat] ?? {
      main: '#5B3DF5',
      bg: '#EEF0FF',
      glow: 'rgba(91, 61, 245, 0.18)'
    }
  );
}

// Spring physics curve tuned for fluid, organic card expansion
const cardSpringTransition = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 32,
  mass: 0.85
};

export default function HoverExpandEvents({
  events,
  onSelectEvent,
  onOpenRsvp,
}: HoverExpandEventsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <div className={styles.deckStack}>
      {events.map((evt, idx) => {
        const isActive = activeIdx === idx;
        const theme = getTheme(evt.category);

        return (
          <motion.div
            key={evt.id}
            className={`${styles.card} ${isActive ? styles.cardExpanded : ''}`}
            initial={false}
            animate={{
              height: isActive ? 410 : 80,
            }}
            transition={cardSpringTransition}
            onMouseEnter={() => setActiveIdx(idx)}
            onClick={() => (isActive ? onSelectEvent(evt) : setActiveIdx(idx))}
          >
            {/* Ambient subtle glow when expanded */}
            {isActive && (
              <motion.div
                className={styles.ambientGlow}
                style={{ backgroundColor: theme.main }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.16 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* ─── COLLAPSED STRIP ─── */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  className={styles.collapsedStrip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.stripLeft}>
                    <span
                      className={styles.stripIndex}
                      style={{ color: theme.main }}
                    >
                      {evt.code}
                    </span>
                    <div className={styles.stripDatePill}>
                      <span className={styles.stripMonth}>{evt.month}</span>
                      <span className={styles.stripDay}>{evt.day}</span>
                    </div>
                    <span className={styles.stripTitle}>{evt.title}</span>
                  </div>

                  <div className={styles.stripCenter}>
                    <span className={styles.stripSubtitle}>{evt.subtitle}</span>
                  </div>

                  <div className={styles.stripRight}>
                    <span
                      className={styles.stripCatPill}
                      style={{
                        backgroundColor: theme.bg,
                        color: theme.main,
                        borderColor: theme.glow,
                      }}
                    >
                      {evt.category}
                    </span>
                    <span className={styles.stripFormat}>{evt.format}</span>
                    <span className={styles.stripExpand}>
                      <span>Details</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── EXPANDED VIEW ─── */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className={styles.expandedView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top Badges Row */}
                  <div className={styles.expTopRow}>
                    <div className={styles.expBadges}>
                      <span
                        className={styles.expCodePill}
                        style={{ background: theme.main }}
                      >
                        {evt.code}
                      </span>
                      <span className={styles.expCatBadge}>{evt.category}</span>
                      <span className={styles.expFormatBadge}>{evt.format}</span>
                      {evt.prizes && (
                        <span className={styles.expPrizeBadge}>
                          <Award size={12} /> {evt.prizes.split('+')[0]}
                        </span>
                      )}
                    </div>
                    <span className={styles.expStatus}>
                      <span className={styles.statusDot} />
                      {evt.status}
                    </span>
                  </div>

                  {/* Middle Split Grid: Left Details + Right Featured Poster */}
                  <div className={styles.expMiddleGrid}>
                    <div className={styles.expHeadlineGroup}>
                      <h2 className={styles.expTitle}>{evt.title}</h2>
                      <h3
                        className={styles.expSubtitle}
                        style={{ color: theme.main }}
                      >
                        {evt.subtitle}
                      </h3>
                      <p className={styles.expDesc}>{evt.description}</p>

                      {/* Tech Tags */}
                      <div className={styles.expTagsRow}>
                        {evt.tags.slice(0, 5).map((t) => (
                          <span key={t} className={styles.expTagPill}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Featured Poster Artwork */}
                    <div
                      className={styles.expPosterCard}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(evt);
                      }}
                    >
                      <img
                        src={evt.banner}
                        alt={evt.title}
                        className={styles.posterImg}
                      />
                      <div className={styles.posterOverlay} />
                      <div className={styles.posterBadge}>
                        <span>SESSION #{evt.code.replace('#', '')}</span>
                      </div>
                      <div className={styles.posterInfo}>
                        <span className={styles.posterCode}>{evt.category}</span>
                        <span className={styles.posterTitle}>{evt.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Meta & Actions Row */}
                  <div
                    className={styles.expBottomRow}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.expMetaList}>
                      <span className={styles.expMetaItem}>
                        <Calendar size={14} style={{ color: theme.main }} />
                        {evt.month} {evt.day}, {evt.year}
                      </span>
                      <span className={styles.expMetaItem}>
                        <Clock size={14} style={{ color: theme.main }} />
                        {evt.time.split('(')[0].trim()}
                      </span>
                      <span className={styles.expMetaItem}>
                        <MapPin size={14} style={{ color: theme.main }} />
                        {evt.location.split(',')[0]}
                      </span>
                      <span className={styles.expMetaItem}>
                        <Users size={14} style={{ color: theme.main }} />
                        {evt.attendeesCount}
                      </span>
                    </div>

                    <div className={styles.expActionsGroup}>
                      <button
                        type="button"
                        className={styles.btnDetails}
                        onClick={() => onSelectEvent(evt)}
                      >
                        <span>Full Agenda</span>
                        <ArrowUpRight size={14} />
                      </button>

                      <button
                        type="button"
                        className={styles.btnRegister}
                        style={{
                          background: `linear-gradient(135deg, ${theme.main} 0%, #4324EB 100%)`,
                          boxShadow: `0 4px 16px ${theme.glow}`,
                        }}
                        onClick={() => onOpenRsvp(evt)}
                      >
                        <span>Register RSVP</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
