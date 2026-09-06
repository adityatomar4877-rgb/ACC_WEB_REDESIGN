'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { MotionTheme, DEFAULT_MOTION_THEME } from './types';

const MotionUIThemeContext = createContext<MotionTheme>(DEFAULT_MOTION_THEME);

export function MotionUIThemeProvider({
  theme = DEFAULT_MOTION_THEME,
  children
}: {
  theme?: MotionTheme;
  children: React.ReactNode;
}) {
  const value = useMemo(() => theme, [theme]);
  return (
    <MotionUIThemeContext.Provider value={value}>
      {children}
    </MotionUIThemeContext.Provider>
  );
}

export function useMotionTheme(): MotionTheme {
  return useContext(MotionUIThemeContext);
}
