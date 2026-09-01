'use client';

import React, { useState } from 'react';
import { EVENTS_DATA, EventItem } from '@/data/events';
import RsvpModal from '@/components/Modals/RsvpModal';
import EventDetailModal from '@/components/Modals/EventDetailModal';
import HoverExpandEvents from '@/components/HoverExpandEvents';
import { Sparkles, Layers } from 'lucide-react';
import s from './page.module.css';

export default function EventsPage() {
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<EventItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRsvpEvent, setSelectedRsvpEvent] = useState<EventItem | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const handleOpenDetails = (event: EventItem) => {
    setSelectedDetailEvent(event);
    setIsDetailOpen(true);
  };

  const handleOpenRsvp = (event: EventItem) => {
    setSelectedRsvpEvent(event);
    setIsRsvpOpen(true);
  };

  return (
    <div className={s.eventsPage}>
      {/* ── Page Hero ── */}
      <section className={s.hero}>
        <div className="container">
          <div className={s.sectionMeta}>
            <Sparkles size={13} />
            <span>EVENTS &amp; HACKATHONS 2026</span>
          </div>
          <h1 className={s.heroTitle}>
            Workshops, Hackathons &amp; Keynotes
          </h1>
          <p className={s.heroLead}>
            Every session is hands-on. Hover over any card below to preview agenda highlights, then click to register.
          </p>
        </div>
      </section>

      {/* ── Main Expanding Deck ── */}
      <section className={s.deckSection}>
        <div className="container">
          <div className={s.deckInfoBar}>
            <div className={s.deckCount}>
              Showing <strong>{EVENTS_DATA.length}</strong> upcoming sessions
            </div>
            <div className={s.deckHint}>
              <Layers size={13} />
              <span>Hover to expand</span>
            </div>
          </div>

          <HoverExpandEvents
            events={EVENTS_DATA}
            onSelectEvent={handleOpenDetails}
            onOpenRsvp={handleOpenRsvp}
          />
        </div>
      </section>

      {/* Modals */}
      <EventDetailModal
        event={selectedDetailEvent}
        isOpen={isDetailOpen}
        onClose={() => { setIsDetailOpen(false); setSelectedDetailEvent(null); }}
        onOpenRsvp={handleOpenRsvp}
      />
      <RsvpModal
        event={selectedRsvpEvent}
        isOpen={isRsvpOpen}
        onClose={() => { setIsRsvpOpen(false); setSelectedRsvpEvent(null); }}
      />
    </div>
  );
}
