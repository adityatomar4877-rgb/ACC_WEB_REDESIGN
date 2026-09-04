'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './StackingNavbar.module.css';

export interface NavItem {
  href: string;
  label: string;
}

export interface StackingNavbarProps {
  items?: NavItem[];
  className?: string;
  stepOffset?: number;
}

const DEFAULT_ITEMS: NavItem[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' }
];

export default function StackingNavbar({
  items = DEFAULT_ITEMS,
  className = '',
  stepOffset = 70
}: StackingNavbarProps) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 150);
  };

  const handleFocus = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExpanded(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setHoveredIndex(null);
      setExpanded(false);
    }
  };

  // Find active index based on route
  const activeIndex = items.findIndex((item) =>
    item.href === '/'
      ? pathname === '/'
      : item.href !== '#' && pathname?.startsWith(item.href)
  );

  return (
    <nav
      className={`${styles.navbarRoot} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label="Navigation"
    >
      <div className={styles.flexContainer}>
        {items.map((item, index) => {
          // When expanded:
          // If a pill is specifically hovered, highlight it.
          // Otherwise, if this pill matches current route (or index 0 if activeIndex === -1), highlight it.
          const isHighlighted =
            expanded &&
            (hoveredIndex !== null
              ? hoveredIndex === index
              : activeIndex === -1
                ? index === 0
                : activeIndex === index);

          return (
            <StackingNavbarItem
              key={item.href + index}
              href={item.href}
              expanded={expanded}
              index={index}
              total={items.length}
              stepOffset={stepOffset}
              isHighlighted={isHighlighted}
              onItemMouseEnter={() => setHoveredIndex(index)}
              onItemMouseLeave={() => setHoveredIndex(null)}
            >
              {item.label}
            </StackingNavbarItem>
          );
        })}
      </div>
    </nav>
  );
}

interface StackingNavbarItemProps {
  href: string;
  children: React.ReactNode;
  expanded: boolean;
  index: number;
  total: number;
  stepOffset: number;
  isHighlighted: boolean;
  onItemMouseEnter: () => void;
  onItemMouseLeave: () => void;
  style?: React.CSSProperties;
}

export function StackingNavbarItem({
  href,
  children,
  expanded,
  index,
  total,
  stepOffset,
  isHighlighted,
  onItemMouseEnter,
  onItemMouseLeave,
  style
}: StackingNavbarItemProps) {
  // Collapsed: Each item shifts left by -stepOffset * index
  // This creates the fan stack where each item's border peeks out to the right
  const collapsedX = -stepOffset * index;

  return (
    <motion.div
      className={styles.motionNode}
      initial={{ x: collapsedX }}
      animate={{ x: expanded ? 0 : collapsedX }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
        mass: 0.8,
        delay: expanded ? 0.07 * index : 0.04 * (total - 1 - index)
      }}
      style={{
        zIndex: total - index,
        position: 'relative',
        ...style
      }}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
    >
      <Link
        href={href}
        className={`${styles.pillLink} ${isHighlighted ? styles.highlighted : ''}`}
        style={{
          border: isHighlighted
            ? '1.5px solid rgba(255, 255, 255, 0.45)'
            : '1.5px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px'
        }}
      >
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}

export { StackingNavbar };
