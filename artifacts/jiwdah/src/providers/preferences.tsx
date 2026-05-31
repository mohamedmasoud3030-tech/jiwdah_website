import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppTheme = "dark" | "light";
export type AppLocale = "ar" | "en";

type PreferencesContextValue = {
  theme: AppTheme;
  locale: AppLocale;
  direction: "rtl" | "ltr";
  setTheme: (theme: AppTheme) => void;
  setLocale: (locale: AppLocale) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const THEME_STORAGE_KEY = "mohamed-masoud-platform.theme";
const LOCALE_STORAGE_KEY = "mohamed-masoud-platform.locale";

function getInitialTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getInitialLocale(): AppLocale {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "en" ? "en" : "ar";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);
  const [locale, setLocale] = useState<AppLocale>(getInitialLocale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = direction;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [direction, locale]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      theme,
      locale,
      direction,
      setTheme,
      setLocale,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      toggleLocale: () => setLocale((current) => (current === "ar" ? "en" : "ar")),
    }),
    [direction, locale, theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used within PreferencesProvider");
  return value;
}
