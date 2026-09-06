'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type TransitionStatus = 'idle' | 'covering' | 'covered' | 'revealing';

interface PageTransitionContextType {
  status: TransitionStatus;
  isTransitioning: boolean;
  targetUrl: string | null;
  navigateWithTransition: (url: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  status: 'idle',
  isTransitioning: false,
  targetUrl: null,
  navigateWithTransition: () => {}
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<TransitionStatus>('idle');
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentPathRef = useRef(pathname);
  currentPathRef.current = pathname;

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const navigateWithTransition = useCallback(
    (url: string) => {
      // Avoid re-navigating to current path
      if (url === currentPathRef.current || status !== 'idle') {
        return;
      }

      clearAllTimeouts();
      setTargetUrl(url);
      setStatus('covering');

      // Phase 1: Outgoing scale & curtain sweep up to 100% cover (420ms)
      const t1 = setTimeout(() => {
        setStatus('covered');
        router.push(url);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Phase 2: Once covered, begin revealing new page after brief safety interval
        const t2 = setTimeout(() => {
          setStatus('revealing');

          // Phase 3: Curtain clears and finishes (450ms)
          const t3 = setTimeout(() => {
            setStatus('idle');
            setTargetUrl(null);
          }, 450);

          timeoutsRef.current.push(t3);
        }, 120);

        timeoutsRef.current.push(t2);
      }, 420);

      timeoutsRef.current.push(t1);
    },
    [router, status]
  );

  // When pathname changes while covered, advance to revealing smoothly
  useEffect(() => {
    if (status === 'covered') {
      const t = setTimeout(() => {
        setStatus('revealing');
        const endTimeout = setTimeout(() => {
          setStatus('idle');
          setTargetUrl(null);
        }, 450);
        timeoutsRef.current.push(endTimeout);
      }, 60);
      timeoutsRef.current.push(t);
    }
  }, [pathname, status]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Global anchor click listener for seamless Next.js navigation interception
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore anchor jumps, protocols, blank targets, modifier keys
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check for internal path
      if (href.startsWith('/')) {
        const cleanHref = href.split('#')[0] || '/';
        const cleanCurrent = (window.location.pathname || '/').split('#')[0];

        if (cleanHref !== cleanCurrent) {
          e.preventDefault();
          navigateWithTransition(href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, [navigateWithTransition]);

  return (
    <PageTransitionContext.Provider
      value={{
        status,
        isTransitioning: status !== 'idle',
        targetUrl,
        navigateWithTransition
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}
