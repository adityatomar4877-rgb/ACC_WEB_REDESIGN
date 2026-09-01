'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import './PixelCard.css';

/* ------------------------------------------------------------------ */
/*  Pixel particle                                                    */
/* ------------------------------------------------------------------ */

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.rand(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function effectiveSpeed(value: number, reduced: boolean): number {
  const throttle = 0.001;
  if (value <= 0 || reduced) return 0;
  if (value >= 100) return 100 * throttle;
  return value * throttle;
}

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

const VARIANTS: Record<string, { gap: number; speed: number; colors: string; noFocus: boolean }> = {
  default: { gap: 5, speed: 35, colors: '#f8fafc,#f1f5f9,#cbd5e1', noFocus: false },
  blue:    { gap: 10, speed: 25, colors: '#e0f2fe,#7dd3fc,#0ea5e9', noFocus: false },
  yellow:  { gap: 3, speed: 20, colors: '#fef08a,#fde047,#eab308', noFocus: false },
  pink:    { gap: 6, speed: 80, colors: '#fecdd3,#fda4af,#e11d48', noFocus: true },
  purple:  { gap: 6, speed: 40, colors: '#ede9fe,#c4b5fd,#8b5cf6', noFocus: false },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface PixelCardProps {
  variant?: string;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function PixelCard({
  variant = 'default',
  gap,
  speed,
  colors,
  noFocus,
  className = '',
  children,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const timePrevRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0);
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const cfg = VARIANTS[variant] || VARIANTS.default;
  const g = gap ?? cfg.gap;
  const s = speed ?? cfg.speed;
  const c = colors ?? cfg.colors;
  const nf = noFocus ?? cfg.noFocus;

  const initPixels = () => {
    const el = containerRef.current;
    const cv = canvasRef.current;
    if (!el || !cv) return;

    const rect = el.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    cv.width = w;
    cv.height = h;
    cv.style.width = `${w}px`;
    cv.style.height = `${h}px`;

    const palette = c.split(',');
    const pxs: Pixel[] = [];
    for (let x = 0; x < w; x += g) {
      for (let y = 0; y < h; y += g) {
        const color = palette[Math.floor(Math.random() * palette.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        pxs.push(new Pixel(cv, ctx, x, y, color, effectiveSpeed(s, reduced), reduced ? 0 : dist));
      }
    }
    pixelsRef.current = pxs;
  };

  const loop = (fn: 'appear' | 'disappear') => {
    animationRef.current = requestAnimationFrame(() => loop(fn));
    const now = performance.now();
    const dt = now - timePrevRef.current;
    if (dt < 1000 / 60) return;
    timePrevRef.current = now - (dt % (1000 / 60));

    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!ctx || !cv) return;

    ctx.clearRect(0, 0, cv.width, cv.height);
    let allIdle = true;
    for (const px of pixelsRef.current) {
      px[fn]();
      if (!px.isIdle) allIdle = false;
    }
    if (allIdle) cancelAnimationFrame(animationRef.current);
  };

  const animate = (name: 'appear' | 'disappear') => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => loop(name));
  };

  useEffect(() => {
    initPixels();
    const obs = new ResizeObserver(() => initPixels());
    if (containerRef.current) obs.observe(containerRef.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g, s, c, nf]);

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      onMouseEnter={() => animate('appear')}
      onMouseLeave={() => animate('disappear')}
      onFocus={nf ? undefined : (e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) animate('appear'); }}
      onBlur={nf ? undefined : (e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) animate('disappear'); }}
      tabIndex={nf ? -1 : 0}
    >
      <canvas className="pixel-canvas" ref={canvasRef} />
      {children}
    </div>
  );
}
