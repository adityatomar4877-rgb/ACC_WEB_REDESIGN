'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerConfetti } from '@/lib/confetti';
import SmoothInput from '@/components/SmoothInput';
import TextType from '@/components/TextType';
import StarBorder from '@/components/StarBorder';
import { FaqAccordion } from '@/components/FaqAccordion';
import styles from './ContactPage.module.css';
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
  Radio,
  Github,
  Building2,
  Zap,
  Users,
  Laptop
} from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export default function ContactPage() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('General Inquiry');
  const [customSubject, setCustomSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');

  // Toast feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live Campus Clock State
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const topics = [
    { label: 'General Inquiry', icon: MessageSquare },
    { label: 'Hackathon & SIH', icon: Zap },
    { label: 'Sponsorship / Partner', icon: Building2 },
    { label: 'Speaker / Workshop', icon: Laptop },
    { label: 'Club Membership', icon: Users },
  ];

  const faqs: FaqItem[] = [
    {
      category: 'SLA & RESPONSE',
      q: 'How fast does the ACC leadership team reply?',
      a: 'We monitor inbound communications continuously. For standard inquiries, our domain coordinators reply within 2 to 6 hours during weekdays. Priority hackathon and corporate partnership requests are escalated immediately to executive leads.',
    },
    {
      category: 'PARTNERSHIPS',
      q: 'How can companies or tech startups partner with ACC?',
      a: 'We partner with cloud providers, dev tooling companies, and VC-backed startups for campus hackathons, bounties, and technical bootcamps. Select "Sponsorship / Partner" in the form or email our corporate relations desk directly.',
    },
    {
      category: 'ELIGIBILITY',
      q: 'Can students from outside Amity University participate in ACC events?',
      a: 'Yes! Major events including our flagship annual Hackathon, open developer bootcamps, and global webinars are open to developers worldwide. On-campus physical sessions require simple guest registration clearance.',
    },
    {
      category: 'CAMPUS ACCESS',
      q: 'Where can I meet the core engineering team on campus?',
      a: 'Our core mentors and domain leads host open office hours from Monday to Friday, 3:30 PM to 7:00 PM at Amity University Gwalior campus, Innovation Block (Room E3-304). Drop by for code reviews, architecture discussions, or team matching.',
    },
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
      alert('Please complete all required fields (First Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicket = `ACC-COMM-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTicketId(generatedTicket);
      setSubmissionTime(`${now} IST`);
      setIsSubmitting(false);
      setIsSubmitted(true);

      triggerConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5B3DF5', '#A855F7', '#F59E0B', '#10B981'],
      });
    }, 700);
  };

  const handleResetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setSelectedTopic('General Inquiry');
    setCustomSubject('');
    setMessage('');
    setIsPriority(false);
    setIsSubmitted(false);
  };

  return (
    <div className={styles.contactPage}>
      {/* Ambient Radial Background & Grid */}
      <div className={styles.ambientBackdrop}>
        <div className={styles.ambientGlow1} />
        <div className={styles.ambientGlow2} />
        <div className={styles.ambientGridPattern} />
      </div>

      {/* 01. Subpage Hero Section */}
      <section className={styles.heroSection} aria-label="Contact Overview">
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.metaBadge}>
              <span className={styles.livePulseDot} />
              <span>04 / COMMUNICATION NEXUS • CHANNELS ACTIVE</span>
            </div>

            <div className={styles.heroTitleWrapper}>
              <TextType
                as="h1"
                className={styles.heroHeadline}
                text={[
                  "Let's build something exceptional.",
                  "Inquire about hackathons & sponsorships.",
                  "Collaborate on research & open-source.",
                  "Connect with Amity's top engineers."
                ]}
                typingSpeed={65}
                pauseDuration={1800}
                deletingSpeed={45}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                startOnVisible
              />
            </div>

            <p className={styles.heroLead}>
              Whether you want to sponsor our next hackathon, partner on engineering research, propose a workshop, or join our core guild — our transmission line is always open.
            </p>
          </div>
        </div>
      </section>

      {/* 02. Main Two-Column Grid */}
      <section className={styles.mainSection} aria-label="Contact Channels & Transmission Form">
        <div className="container">
          <div className={styles.mainGrid}>
            
            {/* LEFT COLUMN: The Transmission Form Card with StarBorder */}
            <StarBorder
              as="div"
              color="#A855F7"
              speed="5s"
              thickness={1.5}
              borderRadius={24}
              className={styles.formStarWrap}
              contentClassName={styles.formCard}
            >

              <div className={styles.formHeader}>
                <div>
                  <h2 className={styles.formTitle}>Transmit a Message</h2>
                  <p className={styles.formDesc}>
                    Your submission is routed immediately to the active domain lead.
                  </p>
                </div>
                <div className={styles.slaBadge}>
                  <span className={styles.slaDot} />
                  <span>SLA: &lt; 2h</span>
                </div>
              </div>

              {isSubmitted ? (
                /* Submission Confirmed Receipt Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={styles.receiptCard}
                >
                  <div className={styles.receiptIconWrap}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className={styles.receiptTitle}>Transmission Confirmed</h3>
                  <p className={styles.receiptLead}>
                    Thank you, <strong>{firstName}</strong>. Your note regarding &ldquo;{customSubject || selectedTopic}&rdquo; has been logged into the ACC dispatch pipeline.
                  </p>

                  <div className={styles.receiptTelemetryBox}>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>Reference ID</span>
                      <span className={styles.receiptValue}>{ticketId}</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>Sender</span>
                      <span className={styles.receiptValue}>{firstName} {lastName} ({email})</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>Domain Queue</span>
                      <span className={styles.receiptValue}>{selectedTopic}</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>Logged Timestamp</span>
                      <span className={styles.receiptValue}>{submissionTime}</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>Dispatch Status</span>
                      <span className={styles.receiptQueueStatus}>● Queued for Coordinator Review</span>
                    </div>
                  </div>

                  <div className={styles.receiptActions}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={() => handleCopy(ticketId, 'ticket')}
                    >
                      {copiedField === 'ticket' ? (
                        <>
                          <Check size={14} className="text-emerald" />
                          <span>Copied Reference ID</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Reference ID</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className={styles.submitBtn}
                      onClick={handleResetForm}
                    >
                      Send Another Note
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className={styles.formFields}>
                  
                  {/* Category Selection Tabs */}
                  <div className={styles.categorySection}>
                    <span className={styles.sectionSublabel}>Select Communication Domain</span>
                    <div className={styles.categoryGrid}>
                      {topics.map((t) => {
                        const IconComponent = t.icon;
                        const isSelected = selectedTopic === t.label;
                        return (
                          <button
                            type="button"
                            key={t.label}
                            className={`${styles.categoryPill} ${isSelected ? styles.categoryPillActive : ''}`}
                            onClick={() => setSelectedTopic(t.label)}
                          >
                            <IconComponent size={13} />
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className={styles.doubleFieldRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="firstName" className={styles.fieldLabel}>
                        First Name <span className={styles.requiredStar}>*</span>
                      </label>
                      <SmoothInput
                        id="firstName"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ada"
                        className="field-input"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="lastName" className={styles.fieldLabel}>
                        Last Name <span className={styles.optionalTag}>(Optional)</span>
                      </label>
                      <SmoothInput
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Lovelace"
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.fieldLabel}>
                      Email Address <span className={styles.requiredStar}>*</span>
                    </label>
                    <SmoothInput
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@lovelace.dev"
                      className="field-input"
                    />
                  </div>

                  {/* Custom Subject */}
                  <div className={styles.fieldGroup}>
                    <div className={styles.fieldLabelRow}>
                      <label htmlFor="subject" className={styles.fieldLabel}>
                        Subject Headline
                      </label>
                      <span className={styles.optionalTag}>Optional</span>
                    </div>
                    <SmoothInput
                      id="subject"
                      type="text"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder={`e.g. Question regarding ${selectedTopic}`}
                      className="field-input"
                    />
                  </div>

                  {/* Message Field with Character Counter */}
                  <div className={styles.fieldGroup}>
                    <div className={styles.fieldLabelRow}>
                      <label htmlFor="message" className={styles.fieldLabel}>
                        Message Transmission <span className={styles.requiredStar}>*</span>
                      </label>
                      <span className={styles.charCounter}>{message.length} / 1200</span>
                    </div>
                    <div className={styles.textareaWrap}>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        maxLength={1200}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide details about your project, hackathon sponsorship, or technical inquiry..."
                        className={styles.customTextarea}
                      />
                    </div>
                  </div>

                  {/* Time-Sensitive Priority Toggle */}
                  <div className={styles.priorityToggleBar}>
                    <div className={styles.priorityInfo}>
                      <span className={styles.priorityTitle}>Time-Sensitive Inquiry</span>
                      <span className={styles.prioritySub}>Flag for immediate review by executive leads</span>
                    </div>
                    <label className={styles.switchToggle} aria-label="Toggle Time-Sensitive Priority">
                      <input
                        type="checkbox"
                        checked={isPriority}
                        onChange={(e) => setIsPriority(e.target.checked)}
                      />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinnerIcon}>
                          <Zap size={16} />
                        </span>
                        <span>Transmitting Note...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </StarBorder>

            {/* RIGHT COLUMN: Frequency Hubs & Live Telemetry */}
            <div className={styles.channelDeck}>
              
              {/* 1. Live Telemetry Clock & Lab Status Card */}
              <StarBorder
                as="div"
                color="#10B981"
                speed="6s"
                thickness={1.5}
                borderRadius={20}
                className={styles.cardStarWrap}
                contentClassName={styles.clockWidgetCard}
              >
                <div className={styles.clockTopRow}>
                  <div className={styles.clockCityTag}>
                    <Radio size={13} className={styles.livePulseDot} />
                    <span>GWALIOR LAB • TELEMETRY</span>
                  </div>
                  <div className={styles.liveBeaconWrap}>
                    <span className={styles.livePulseDot} />
                    <span>ACTIVE</span>
                  </div>
                </div>

                <div className={styles.clockDigitalDisplay}>
                  {currentTime || '12:00:00 PM'}
                </div>
                <div className={styles.clockZoneText}>
                  {currentDate ? `${currentDate} • India Standard Time (UTC+05:30)` : 'India Standard Time (UTC+05:30)'}
                </div>

                <div className={styles.clockDivider} />

                <div className={styles.labStatusFlex}>
                  <Building2 size={16} className={styles.labIcon} />
                  <span>Innovation Lab Room E3-304 • Open for walk-ins (3:30 - 7:00 PM IST)</span>
                </div>
              </StarBorder>

              {/* 2. Official Email Desk Card */}
              <StarBorder
                as="div"
                color="#EF4444"
                speed="5s"
                thickness={1.5}
                borderRadius={18}
                className={styles.cardStarWrap}
                contentClassName={styles.channelTile}
              >
                <div className={styles.channelTileHeader}>
                  <div className={styles.channelIdentity}>
                    <div className={`${styles.channelIconBox} ${styles.iconEmail}`}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className={styles.channelName}>Official Email</h3>
                      <span className={styles.channelTag}>Direct Dispatch</span>
                    </div>
                  </div>
                  <span className={styles.channelBadge}>Primary</span>
                </div>

                <a
                  href="mailto:amitycodingclub@gmail.com"
                  className={styles.channelLink}
                >
                  amitycodingclub@gmail.com
                </a>
                <p className={styles.channelSubdesc}>
                  Monitored continuously for official university partnerships, hackathon sponsorships, and guest sessions.
                </p>

                <div className={styles.channelActionRow}>
                  <button
                    type="button"
                    className={styles.channelBtn}
                    onClick={() => handleCopy('amitycodingclub@gmail.com', 'email')}
                    title="Copy Email Address"
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
                    className={`${styles.channelBtn} ${styles.channelBtnPrimary}`}
                  >
                    <span>Write Email</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </StarBorder>

              {/* 3. Campus Coordinates & Headquarters Card */}
              <StarBorder
                as="div"
                color="#3B82F6"
                speed="6.5s"
                thickness={1.5}
                borderRadius={18}
                className={styles.cardStarWrap}
                contentClassName={styles.channelTile}
              >
                <div className={styles.channelTileHeader}>
                  <div className={styles.channelIdentity}>
                    <div className={`${styles.channelIconBox} ${styles.iconLocation}`}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 className={styles.channelName}>Campus Headquarters</h3>
                      <span className={styles.channelTag}>26°13&apos;06&quot;N 78°10&apos;58&quot;E</span>
                    </div>
                  </div>
                  <span className={styles.channelBadge}>Campus Hub</span>
                </div>

                <address className={styles.channelAddressText}>
                  Opposite Airport, Maharajpura,<br />
                  Gwalior, Madhya Pradesh 474005<br />
                  <span style={{ color: 'var(--ink-secondary)', fontSize: '0.8rem' }}>Innovation Block • Room E3-304</span>
                </address>

                <div className={styles.channelActionRow}>
                  <a
                    href="https://maps.google.com/?q=Amity+University+Gwalior+Madhya+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.channelBtn} ${styles.channelBtnPrimary}`}
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </StarBorder>

              {/* 4. Executive Professional Networks (LinkedIn & Instagram) */}
              <StarBorder
                as="div"
                color="#0A66C2"
                speed="6s"
                thickness={1.5}
                borderRadius={18}
                className={styles.cardStarWrap}
                contentClassName={styles.channelTile}
              >
                <div className={styles.channelTileHeader}>
                  <div className={styles.channelIdentity}>
                    <div className={`${styles.channelIconBox} ${styles.iconLinkedIn}`}>
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <h3 className={styles.channelName}>LinkedIn Network</h3>
                      <span className={styles.channelTag}>Professional Updates</span>
                    </div>
                  </div>
                  <a
                    href="https://linkedin.com/company/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelBtn}
                    style={{ flex: 'none', padding: '6px 12px' }}
                  >
                    <span>Visit</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </StarBorder>

              <StarBorder
                as="div"
                color="#E1306C"
                speed="5.5s"
                thickness={1.5}
                borderRadius={18}
                className={styles.cardStarWrap}
                contentClassName={styles.channelTile}
              >
                <div className={styles.channelTileHeader}>
                  <div className={styles.channelIdentity}>
                    <div className={`${styles.channelIconBox} ${styles.iconInstagram}`}>
                      <Instagram size={18} />
                    </div>
                    <div>
                      <h3 className={styles.channelName}>Instagram</h3>
                      <span className={styles.channelTag}>Stories &amp; Student Spotlights</span>
                    </div>
                  </div>
                  <a
                    href="https://instagram.com/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelBtn}
                    style={{ flex: 'none', padding: '6px 12px' }}
                  >
                    <span>Follow</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </StarBorder>

              {/* 5. Live Developer Community Card (Discord & GitHub) */}
              <StarBorder
                as="div"
                color="#818CF8"
                speed="5s"
                thickness={1.5}
                borderRadius={20}
                className={styles.cardStarWrap}
                contentClassName={styles.devCommunityTile}
              >
                <div className={styles.devCommunityTop}>
                  <div className={styles.devCommunityHeader}>
                    <Radio size={16} className={styles.devRadioPulse} />
                    <span>Developer Guild</span>
                  </div>
                  <span className={styles.devOnlineBadge}>● 1,200+ ONLINE</span>
                </div>
                <p className={styles.devCommunityDesc}>
                  Need instant peer code-reviews, hackathon teammate matching, or open-source repo discussions? Join our Discord server.
                </p>
                <div className={styles.devActionButtons}>
                  <a
                    href="https://discord.gg/amitycodingclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.discordJoinBtn}
                  >
                    <MessageSquare size={14} />
                    <span>Join Discord</span>
                    <ArrowRight size={13} />
                  </a>
                  <a
                    href="https://github.com/amity-coding-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubJoinBtn}
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                </div>
              </StarBorder>

            </div>
          </div>
        </div>
      </section>

      {/* 03. Interactive FAQ Chat-Accordion Section */}
      <section className={styles.faqSection} aria-label="Frequently Asked Questions">
        <div className="container">
          <div className={styles.faqHeader}>
            <div className={styles.metaBadge} style={{ margin: '0 auto 12px' }}>
              <span>CLARIFICATIONS &amp; POLICIES</span>
            </div>
            <h2 className={styles.faqTitle}>Frequently Answered Questions</h2>
            <p className={styles.faqLead}>
              Detailed information on response SLAs, corporate sponsorships, workshop bookings, and campus access.
            </p>
          </div>

          <FaqAccordion
            data={faqs.map((faq, idx) => ({
              id: idx + 1,
              category: faq.category,
              question: faq.q,
              answer: faq.a,
              icon: idx === 0 ? '⚡' : idx === 1 ? '🤝' : idx === 2 ? '🎓' : '📍',
              iconPosition: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
            }))}
            timestamp="ACC Support Desk • Active 24/7"
          />
        </div>
      </section>
    </div>
  );
}
