'use client';

import React from 'react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/data/events';

interface EventsRibbonProps {
  onSelectEvent?: (eventId: string) => void;
}

export default function EventsRibbon({ onSelectEvent }: EventsRibbonProps) {
  const homeEvents = EVENTS_DATA.filter((e) => e.featuredOnHome);

  return (
    <section className="events-ribbon-section" aria-label="Upcoming Events Ribbon">
      <div className="container">
        <div className="events-ribbon-box">
          {/* Ribbon Header */}
          <div className="ribbon-header">
            <div className="ribbon-meta">
              <span className="ribbon-dot" />
              <span>03 / UPCOMING EVENTS</span>
            </div>
            <Link href="/events" className="ribbon-view-all">
              <span>View all events</span>
              <span className="arrow">→</span>
            </Link>
          </div>

          {/* Events Horizontal Grid */}
          <div className="events-ribbon-grid">
            {homeEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/events#${evt.id}`}
                className="ribbon-event-card"
                onClick={() => onSelectEvent && onSelectEvent(evt.id)}
              >
                <div className="event-date-box">
                  <span className="event-month">{evt.month}</span>
                  <span className="event-day">{evt.day}</span>
                </div>

                <div className="event-info-box">
                  <div className="event-title-row">
                    <h4 className="event-title">{evt.title}</h4>
                    <span className="event-arrow-icon">↗</span>
                  </div>
                  <p className="event-sub">{evt.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .events-ribbon-section {
          padding-bottom: 72px;
          background-color: var(--canvas-primary);
        }

        .events-ribbon-box {
          background-color: #0F1115;
          border-radius: 16px;
          padding: 24px 28px 28px;
          border: 1px solid #1F242F;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.25);
        }

        .ribbon-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid #1C202B;
        }

        .ribbon-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 0.06em;
        }

        .ribbon-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #60A5FA;
        }

        .ribbon-view-all {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #94A3B8;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .ribbon-view-all:hover {
          color: #FFFFFF;
        }

        .ribbon-view-all .arrow {
          transition: transform var(--transition-fast);
        }

        .ribbon-view-all:hover .arrow {
          transform: translateX(3px);
        }

        .events-ribbon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .ribbon-event-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #141720;
          border: 1px solid #202534;
          border-radius: 10px;
          padding: 14px 16px;
          text-decoration: none;
          transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
        }

        .ribbon-event-card:hover {
          background: #1C212E;
          border-color: #374151;
          transform: translateY(-2px);
        }

        .event-date-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          padding: 4px;
          background: #1D2230;
          border-radius: 6px;
          border: 1px solid #2C3446;
          user-select: none;
        }

        .event-month {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 0.05em;
        }

        .event-day {
          font-size: 1.125rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1;
        }

        .event-info-box {
          flex: 1;
          min-width: 0;
        }

        .event-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-bottom: 2px;
        }

        .event-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-arrow-icon {
          color: #64748B;
          font-size: 0.875rem;
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .ribbon-event-card:hover .event-arrow-icon {
          color: #60A5FA;
          transform: translate(2px, -2px);
        }

        .event-sub {
          font-size: 0.75rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1024px) {
          .events-ribbon-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .events-ribbon-grid {
            grid-template-columns: 1fr;
          }
          .events-ribbon-box {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
}
