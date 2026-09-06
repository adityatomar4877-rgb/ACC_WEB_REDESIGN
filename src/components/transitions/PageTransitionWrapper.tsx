'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePageTransition } from './PageTransitionContext';
import styles from './PageTransitionWrapper.module.css';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { status } = usePageTransition();
  const pathname = usePathname();
  const [isEntering, setIsEntering] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsEntering(true);
      const timer = setTimeout(() => {
        setIsEntering(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const isOutgoing = status === 'covering' || status === 'covered';
  const showEntering = isEntering || status === 'revealing';

  return (
    <div
      key={pathname}
      className={`${styles.pageShell} ${isOutgoing ? styles.outgoing : ''} ${
        showEntering ? styles.entering : ''
      }`}
    >
      {children}
    </div>
  );
}
