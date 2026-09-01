'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

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
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          backgroundColor: isHovered ? 'var(--accent-primary)' : 'var(--ink-primary)',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '44px' : '32px',
          height: isHovered ? '44px' : '32px',
          borderColor: isHovered ? 'var(--accent-primary)' : 'rgba(17, 17, 17, 0.25)',
          backgroundColor: isHovered ? 'rgba(0, 102, 204, 0.05)' : 'transparent',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}
