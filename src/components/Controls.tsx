import { Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

/** Language (TR/EN) + theme toggles. */
export function Controls() {
  const { lang, setLang, theme, toggleTheme } = useApp();

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center rounded-full border border-ink/15 p-0.5 font-mono text-xs dark:border-ink-dark/15">
        {(["tr", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
              lang === l
                ? "bg-accent text-white"
                : "text-ink/50 hover:text-ink dark:text-ink-dark/50 dark:hover:text-ink-dark"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-accent hover:text-accent dark:border-ink-dark/15 dark:text-ink-dark/70"
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </div>
  );
}
