import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "tr" | "en";
export type Theme = "light" | "dark";

interface AppState {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppState | null>(null);

function getInitialLang(): Lang {
  const stored = localStorage.getItem("lang");
  if (stored === "tr" || stored === "en") return stored;
  // Default to Turkish, fall back to English for non-TR browsers
  return navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "tr";
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta)
      meta.setAttribute("content", theme === "dark" ? "#0E0D0B" : "#FBFAF7");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((p) => (p === "tr" ? "en" : "tr"));
  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider
      value={{ lang, theme, toggleLang, setLang, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
