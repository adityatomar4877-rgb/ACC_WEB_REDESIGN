'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './SchemaValuesSection.module.css';

/* ── 1. Database & Architecture Visual Screen ── */
function DatabaseSchemaVisual() {
  return (
    <div className={styles.visualCanvas}>
      <div className={styles.screenGridOverlay} />
      <div className={styles.screenAmbientGlow} />

      <svg className={styles.visualSvg} viewBox="0 0 280 160" fill="none">
        {/* Connecting wire with glow */}
        <path
          d="M 95 65 C 135 65, 135 105, 175 105"
          stroke="rgba(99, 102, 241, 0.4)"
          strokeWidth="3"
        />
        <path
          d="M 95 65 C 135 65, 135 105, 175 105"
          stroke="#818CF8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle cx="135" cy="85" r="3" fill="#A5B4FC" className={styles.pulseDotSlow} />

        {/* Table 1: users */}
        <g transform="translate(18, 20)">
          <rect width="90" height="68" rx="8" fill="#0E1326" stroke="rgba(99, 102, 241, 0.35)" strokeWidth="1" />
          <path d="M 0 20 H 90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          <text x="10" y="14" fill="#E2E8F0" fontSize="9" fontWeight="700" fontFamily="monospace">users</text>
          <circle cx="78" cy="11" r="2.5" fill="#10B981" />
          <text x="10" y="32" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">id: uuid PK</text>
          <text x="10" y="46" fill="#818CF8" fontSize="7.5" fontFamily="monospace">cluster_id FK</text>
          <text x="10" y="60" fill="#64748B" fontSize="7.5" fontFamily="monospace">role: enum</text>
        </g>

        {/* Table 2: clusters */}
        <g transform="translate(160, 68)">
          <rect width="100" height="72" rx="8" fill="#0E1326" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1" />
          <path d="M 0 20 H 100" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          <text x="10" y="14" fill="#FBBF24" fontSize="9" fontWeight="700" fontFamily="monospace">clusters</text>
          <circle cx="88" cy="11" r="2.5" fill="#F59E0B" />
          <text x="10" y="32" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">id: uuid PK</text>
          <text x="10" y="46" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">region: ap-south</text>
          <text x="10" y="60" fill="#10B981" fontSize="7.5" fontFamily="monospace">status: active</text>
        </g>
      </svg>

      <div className={styles.floatingPill}>
        <span>INDEX: BTREE</span>
      </div>
    </div>
  );
}

/* ── 2. Production & Scale Telemetry Screen ── */
function ProductionScaleVisual() {
  return (
    <div className={styles.visualCanvas}>
      <div className={styles.screenGridOverlay} />
      <div className={styles.screenAmbientGlow} />

      <svg className={styles.visualSvg} viewBox="0 0 280 160" fill="none">
        {/* Edge Region Nodes */}
        <g transform="translate(20, 16)">
          <rect width="70" height="22" rx="6" fill="#0E1326" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <circle cx="10" cy="11" r="2.5" fill="#10B981" />
          <text x="18" y="14" fill="#E2E8F0" fontSize="8" fontFamily="monospace">us-east-1</text>
        </g>
        <g transform="translate(105, 16)">
          <rect width="70" height="22" rx="6" fill="#0E1326" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <circle cx="10" cy="11" r="2.5" fill="#10B981" />
          <text x="18" y="14" fill="#E2E8F0" fontSize="8" fontFamily="monospace">eu-central</text>
        </g>
        <g transform="translate(190, 16)">
          <rect width="70" height="22" rx="6" fill="#0E1326" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
          <circle cx="10" cy="11" r="2.5" fill="#F59E0B" />
          <text x="18" y="14" fill="#FBBF24" fontSize="8" fontFamily="monospace">ap-south-1</text>
        </g>

        {/* Real-time traffic waveform chart */}
        <path
          d="M 20 115 C 50 115, 60 75, 90 85 C 120 95, 140 50, 170 65 C 200 80, 220 40, 260 45"
          stroke="rgba(245, 158, 11, 0.2)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 20 115 C 50 115, 60 75, 90 85 C 120 95, 140 50, 170 65 C 200 80, 220 40, 260 45"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="260" cy="45" r="4" fill="#FBBF24" />
        <circle cx="260" cy="45" r="8" stroke="#F59E0B" strokeWidth="1" opacity="0.5" className={styles.radarWave} />

        {/* Live Traffic metrics bar */}
        <g transform="translate(20, 134)">
          <text x="0" y="12" fill="#E2E8F0" fontSize="9" fontWeight="700" fontFamily="monospace">TRAFFIC: 14.8k req/s</text>
          <text x="170" y="12" fill="#10B981" fontSize="9" fontWeight="700" fontFamily="monospace">p99: 4.2ms</text>
        </g>
      </svg>
    </div>
  );
}

/* ── 3. Open Source Git Graph Screen ── */
function OpenSourceVisual() {
  return (
    <div className={styles.visualCanvas}>
      <div className={styles.screenGridOverlay} />
      <div className={styles.screenAmbientGlow} />

      <svg className={styles.visualSvg} viewBox="0 0 280 160" fill="none">
        {/* Main Branch line */}
        <path d="M 25 55 L 255 55" stroke="#34D399" strokeWidth="2.5" />

        {/* Feature Branch curving out and merging back in */}
        <path
          d="M 75 55 C 95 55, 105 105, 135 105 L 185 105 C 205 105, 215 55, 235 55"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Commit Nodes on Main */}
        <circle cx="45" cy="55" r="5" fill="#10B981" stroke="#0E1326" strokeWidth="2" />
        <circle cx="75" cy="55" r="5" fill="#34D399" stroke="#0E1326" strokeWidth="2" />
        <circle cx="155" cy="55" r="5" fill="#10B981" stroke="#0E1326" strokeWidth="2" />
        <circle cx="235" cy="55" r="6" fill="#34D399" stroke="#0E1326" strokeWidth="2" />
        <circle cx="235" cy="55" r="10" stroke="#34D399" strokeWidth="1" opacity="0.6" className={styles.radarWave} />

        {/* Commit Nodes on Feature Branch */}
        <circle cx="135" cy="105" r="4.5" fill="#FBBF24" stroke="#0E1326" strokeWidth="2" />
        <circle cx="185" cy="105" r="4.5" fill="#FBBF24" stroke="#0E1326" strokeWidth="2" />

        {/* Commit message chip */}
        <g transform="translate(115, 120)">
          <rect width="110" height="22" rx="6" fill="#0E1326" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1" />
          <text x="10" y="14" fill="#34D399" fontSize="8" fontFamily="monospace">⑂ PR #84: MERGED</text>
        </g>

        {/* Branch Labels */}
        <text x="25" y="42" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="monospace">branch: main</text>
      </svg>
    </div>
  );
}

/* ── 4. Neural Rigor / Tensor Matrix Screen ── */
function RigorComputeVisual() {
  return (
    <div className={styles.visualCanvas}>
      <div className={styles.screenGridOverlay} />
      <div className={styles.screenAmbientGlow} />

      <svg className={styles.visualSvg} viewBox="0 0 280 160" fill="none">
        {/* Layer 1 Input Nodes */}
        <g transform="translate(30, 20)">
          <circle cx="10" cy="20" r="4" fill="#F472B6" />
          <circle cx="10" cy="50" r="4" fill="#F472B6" />
          <circle cx="10" cy="80" r="4" fill="#F472B6" />
          <circle cx="10" cy="110" r="4" fill="#F472B6" />
        </g>

        {/* Layer 2 Hidden Nodes */}
        <g transform="translate(130, 20)">
          <circle cx="10" cy="30" r="5" fill="#EC4899" />
          <circle cx="10" cy="65" r="5" fill="#EC4899" />
          <circle cx="10" cy="100" r="5" fill="#EC4899" />
        </g>

        {/* Layer 3 Output Node */}
        <g transform="translate(230, 20)">
          <circle cx="10" cy="65" r="6" fill="#F472B6" />
          <circle cx="10" cy="65" r="12" stroke="#EC4899" strokeWidth="1" opacity="0.6" className={styles.radarWave} />
        </g>

        {/* Synaptic interconnect wires */}
        <path d="M 40 40 L 140 50 M 40 40 L 140 85 M 40 70 L 140 50 M 40 70 L 140 85 M 40 70 L 140 120 M 40 100 L 140 85 M 40 100 L 140 120" stroke="rgba(236, 72, 153, 0.25)" strokeWidth="1" />
        <path d="M 140 50 L 240 85 M 140 85 L 240 85 M 140 120 L 240 85" stroke="rgba(244, 114, 182, 0.45)" strokeWidth="1.5" />

        {/* Compute badge */}
        <g transform="translate(30, 134)">
          <text x="0" y="12" fill="#F472B6" fontSize="8.5" fontWeight="700" fontFamily="monospace">CUDA MATRIX: [1024 x 1024] FP16</text>
        </g>
      </svg>
    </div>
  );
}

interface ValueCardItem {
  tag: string;
  title: string;
  desc: string;
  screenVisual: React.ReactNode;
}

const CARDS_DATA: ValueCardItem[] = [
  {
    tag: 'Database & Craft',
    title: 'Craftsmanship Over Mediocrity',
    desc: 'Design, optimize and maintain clean architectures with zero cut corners. We believe true mastery is forged in the terminal.',
    screenVisual: <DatabaseSchemaVisual />,
  },
  {
    tag: 'Production & Scale',
    title: 'Ship Real Products',
    desc: 'Tutorials don’t teach resilience; production traffic does. We build software that thousands of students and faculty rely on.',
    screenVisual: <ProductionScaleVisual />,
  },
  {
    tag: 'Open Ecosystem',
    title: 'Open Source First',
    desc: 'Knowledge belongs in the public square. We contribute upstream, open-source our internal tools, and document transparently.',
    screenVisual: <OpenSourceVisual />,
  },
  {
    tag: 'Culture & Rigor',
    title: 'Radical Inclusivity & Rigor',
    desc: 'From writing your first Python loop to optimizing a CUDA kernel, curiosity and relentless consistency are what matter.',
    screenVisual: <RigorComputeVisual />,
  },
];

export default function SchemaValuesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;
    let isVisible = false;
    let width = 0;
    let height = 0;

    // 8 frequency waves
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) {
          data.targetValue = Math.random() * 0.7 + 0.1;
        }
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      if (!ctx) return;

      // Solid pitch black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Render 8 harmonic frequency waves
      // Optimized: step by 3px for high performance with identical visual fidelity
      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const nx = (x / width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = ((py + 1) * height) / 2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const intensity = Math.min(1, freq * 0.3);
        const r = Math.min(255, Math.round(79 + intensity * 100));
        const g = Math.min(255, Math.round(70 + intensity * 130));
        const b = 229;

        // Dual-pass GPU-friendly glow (replaces sluggish Gaussian shadowBlur)
        ctx.lineWidth = 3 + i * 0.4;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.stroke();

        ctx.lineWidth = 1 + i * 0.25;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.75)`;
        ctx.stroke();
      });
    }

    function animate() {
      if (isVisible) {
        time += 0.02;
        updateWaveData();
        draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    // Optimization: Pause animation loop when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.schemaSection} aria-label="Core Values & Culture">
      {/* Background Animated Sine-Wave Canvas (Flows behind all cards) */}
      <canvas ref={canvasRef} className={styles.waveCanvas} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionMeta}>
            <span>03 / CORE VALUES</span>
          </div>
          <h2 className={styles.sectionTitle}>What guides our code &amp; culture.</h2>
          <p className={styles.sectionLead}>
            The engineering principles and craftsmanship standards that define everything we ship.
          </p>
        </div>

        {/* 4 Cards Grid - Sitting on top of the waves */}
        <div className={styles.cardsGrid}>
          {CARDS_DATA.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.schemaCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Top Screen Display with Gradient Border, Blueprint Grid & Rich Vector Visual */}
              <div className={styles.screenContainer}>
                <div className={styles.screenBox}>
                  {item.screenVisual}
                </div>
              </div>

              {/* Radiant Divider Line */}
              <div className={styles.cardDivider} />

              {/* Card Body */}
              <div className={styles.cardBody}>
                <span className={styles.tagBadge}>{item.tag}</span>
                <h3 className={styles.cardHeading}>{item.title}</h3>
                <p className={styles.cardParagraph}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
