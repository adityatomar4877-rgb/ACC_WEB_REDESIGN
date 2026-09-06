export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  restDelta?: number;
}

export interface MotionTransitions {
  ui?: SpringConfig;
  gentle?: SpringConfig;
  snap?: SpringConfig;
  lively?: SpringConfig;
  ambient?: SpringConfig;
  [key: string]: SpringConfig | undefined;
}

export interface MotionStagger {
  base?: number;
  fast?: number;
  slow?: number;
}

export interface MotionTravel {
  enter?: number;
  section?: number;
  card?: number;
  [key: string]: number | undefined;
}

export interface MotionInView {
  amount?: number | 'some' | 'all';
  once?: boolean;
  margin?: string;
}

export type ReducedMotionBehavior = 'calm' | 'off' | 'user';

export interface MotionTheme {
  transitions: MotionTransitions;
  stagger: MotionStagger;
  travel: MotionTravel;
  inView: MotionInView;
  reducedMotion: ReducedMotionBehavior;
}

export const DEFAULT_MOTION_THEME: MotionTheme = {
  transitions: {
    ui: { stiffness: 250, damping: 28 },
    gentle: { stiffness: 90, damping: 18 },
    snap: { stiffness: 400, damping: 30 },
    lively: { stiffness: 300, damping: 15 },
    ambient: { stiffness: 40, damping: 12 }
  },
  stagger: {
    base: 0.1,
    fast: 0.05,
    slow: 0.18
  },
  travel: {
    enter: 32,
    section: 64,
    card: 16
  },
  inView: {
    amount: 0.35,
    once: true
  },
  reducedMotion: 'calm'
};
