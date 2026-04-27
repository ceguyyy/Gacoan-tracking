import React, { createContext, useContext, useState } from 'react';
import { token, darkToken, makeS } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; }
    catch { return false; }
  });

  const toggleTheme = () => setIsDark(d => {
    const next = !d;
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    return next;
  });

  const t = isDark ? darkToken : token;
  const s = makeS(t);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, t, s }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
