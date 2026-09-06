'use client';

import React from 'react';
import { usePageTransition } from './PageTransitionContext';
import styles from './CinematicCurtain.module.css';

export default function CinematicCurtain() {
  const { status } = usePageTransition();

  let stateClass = '';
  if (status === 'covering') {
    stateClass = styles.covering;
  } else if (status === 'covered') {
    stateClass = styles.covered;
  } else if (status === 'revealing') {
    stateClass = styles.revealing;
  }

  return (
    <div
      className={`${styles.curtainLayer} ${stateClass}`}
      aria-hidden="true"
      data-testid="cinematic-curtain"
    >
      <div className={styles.leadingEdge} />
      <div className={styles.ambientSheen} />
    </div>
  );
}
