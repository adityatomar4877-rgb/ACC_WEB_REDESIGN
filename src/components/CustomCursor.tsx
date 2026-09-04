'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId: number;
    let currentX = -100;
    let currentY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = currentX;
        ringY = currentY;
      }
    };

    const renderLoop = () => {
      // Smooth lerp for ring, instant for dot
      ringX += (currentX - ringX) * 0.25;
      ringY += (currentY - ringY) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .interactive')
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--accent-primary)' : 'var(--ink-primary)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '44px' : '32px',
          height: isHovered ? '44px' : '32px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'var(--accent-primary)' : 'var(--cursor-ring)'}`,
          backgroundColor: isHovered ? 'var(--accent-purple-light)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
}
