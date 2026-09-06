import { MotionTheme, DEFAULT_MOTION_THEME } from './types';

export * from './types';

/**
 * Merges partial user-provided motion tokens over standard Motion UI defaults.
 * Can be safely called in Server Components, Client Components, or build configs.
 */
export function defineTheme(userTheme: Partial<MotionTheme>): MotionTheme {
  return {
    ...DEFAULT_MOTION_THEME,
    ...userTheme,
    transitions: {
      ...DEFAULT_MOTION_THEME.transitions,
      ...(userTheme.transitions || {})
    },
    stagger: {
      ...DEFAULT_MOTION_THEME.stagger,
      ...(userTheme.stagger || {})
    },
    travel: {
      ...DEFAULT_MOTION_THEME.travel,
      ...(userTheme.travel || {})
    },
    inView: {
      ...DEFAULT_MOTION_THEME.inView,
      ...(userTheme.inView || {})
    },
    reducedMotion: userTheme.reducedMotion ?? DEFAULT_MOTION_THEME.reducedMotion
  };
}
