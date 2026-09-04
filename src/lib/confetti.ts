'use client';

type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  angle?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  ticks?: number;
};

export async function triggerConfetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return;

  try {
    const canvasConfettiModule = await import('canvas-confetti');
    const confetti =
      typeof canvasConfettiModule === 'function'
        ? canvasConfettiModule
        : (canvasConfettiModule as any).default || canvasConfettiModule;

    if (typeof confetti === 'function') {
      confetti(options);
    }
  } catch (error) {
    console.debug('Confetti effect unavailable:', error);
  }
}

export default triggerConfetti;
