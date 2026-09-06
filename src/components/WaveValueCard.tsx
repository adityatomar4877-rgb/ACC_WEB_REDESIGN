'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './WaveValueCard.module.css';

export type ValueColorVariant = 'purple' | 'amber' | 'emerald' | 'rose';

export interface WaveValueCardProps {
  num: string;
  tag: string;
  title: string;
  desc: string;
  variant?: ValueColorVariant;
  index?: number;
}

const COLOR_CONFIG: Record<
  ValueColorVariant,
  {
    themeClass: string;
    tagClass: string;
    rgb: [number, number, number];
  }
> = {
  purple: {
    themeClass: styles.themePurple,
    tagClass: styles.tagPurple,
    rgb: [124, 77, 255],
  },
  amber: {
    themeClass: styles.themeAmber,
    tagClass: styles.tagAmber,
    rgb: [245, 158, 11],
  },
  emerald: {
    themeClass: styles.themeEmerald,
    tagClass: styles.tagEmerald,
    rgb: [16, 185, 129],
  },
  rose: {
    themeClass: styles.themeRose,
    tagClass: styles.tagRose,
    rgb: [236, 72, 153],
  },
};

export default function WaveValueCard({
  num,
  tag,
  title,
  desc,
  variant = 'purple',
  index = 0,
}: WaveValueCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  const config = COLOR_CONFIG[variant] || COLOR_CONFIG.purple;
  const [baseR, baseG, baseB] = config.rgb;

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let width = 0;
    let height = 0;

    // 8 frequency layers as in the SchemaCard sine-wave algorithm
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

      // Dark oscilloscope canvas surface
      ctx.fillStyle = '#080A14';
      ctx.fillRect(0, 0, width, height);

      // Render 8 harmonic wave frequencies
      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
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
        const r = Math.min(255, Math.round(baseR + intensity * 60));
        const g = Math.min(255, Math.round(baseG + intensity * 60));
        const b = Math.min(255, Math.round(baseB));

        ctx.lineWidth = 1 + i * 0.25;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.65)`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time += isHoveredRef.current ? 0.038 : 0.018;
      updateWaveData();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseR, baseG, baseB]);

  return (
    <motion.div
      className={`${styles.cardRoot} ${config.themeClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Top Animated Waveform Canvas Container */}
      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.waveCanvas} />
        <div className={styles.gridOverlay} />
        <div className={styles.canvasVignette} />

        {/* Live Radar Status Indicator */}
        <div className={styles.liveStatusBadge}>
          <span className={styles.liveIndicatorDot} />
          <span>ACTIVE</span>
        </div>
      </div>

      {/* Radiant Gradient Divider Line */}
      <div className={styles.dividerLine} />

      {/* Card Content Body */}
      <div className={styles.cardBody}>
        <div className={styles.tagRow}>
          <span className={`${styles.numBadge} ${config.tagClass}`}>{num}</span>
          <span className={styles.categoryTag}>{tag}</span>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </motion.div>
  );
}
