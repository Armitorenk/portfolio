import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Gamepad2,
  Github,
  Languages,
  Linkedin,
  Mail,
  MoonStar,
  Search,
  type LucideIcon,
} from "lucide-react";
import { profile, ui } from "../data/content";
import { CV_DOWNLOAD_NAME, CV_PATH } from "../lib/config";
import { useApp } from "../context/AppContext";
import { useT } from "../lib/useT";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onOpenGames,
}: {
  open: boolean;
  onClose: () => void;
  onOpenGames: () => void;
}) {
  const { lang, toggleTheme, toggleLang } = useApp();
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    );
  };

  const commands: Cmd[] = useMemo(() => {
    const nav = [
      { id: "about", label: ui.nav.about },
      { id: "work", label: ui.nav.work },
      { id: "experience", label: ui.nav.experience },
      { id: "stack", label: ui.nav.stack },
      { id: "github", label: ui.nav.github },
      { id: "contact", label: ui.nav.contact },
    ].map<Cmd>((s) => ({
      id: `go-${s.id}`,
      label: `${t({ tr: "Git", en: "Go to" })}: ${t(s.label)}`,
      icon: ArrowRight,
      run: () => go(s.id),
    }));

    const openLabel = t({ tr: "Aç", en: "Open" });
    const actions: Cmd[] = [
      {
        id: "games",
        label: `${openLabel}: ${t(ui.nav.games)}`,
        hint: t({ tr: "Armağan Arcade", en: "Armagan's Arcade" }),
        icon: Gamepad2,
        run: () => {
          onClose();
          onOpenGames();
        },
      },
      {
        id: "cv",
        label: `${openLabel}: ${t(ui.downloadCV)}`,
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = CV_PATH;
          a.download = CV_DOWNLOAD_NAME;
          a.click();
          onClose();
        },
      },
      {
        id: "email",
        label: `${openLabel}: E-mail`,
        hint: profile.email,
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
          onClose();
        },
      },
      {
        id: "github",
        label: `${openLabel}: GitHub`,
        hint: `@${profile.githubUser}`,
        icon: Github,
        run: () => {
          window.open(profile.github, "_blank");
          onClose();
        },
      },
      {
        id: "linkedin",
        label: `${openLabel}: LinkedIn`,
        icon: Linkedin,
        run: () => {
          window.open(profile.linkedin, "_blank");
          onClose();
        },
      },
      {
        id: "theme",
        label: t({ tr: "Temayı değiştir", en: "Toggle theme" }),
        icon: MoonStar,
        run: () => toggleTheme(),
      },
      {
        id: "lang",
        label: t({ tr: "Dili değiştir (EN)", en: "Switch language (TR)" }),
        icon: Languages,
        run: () => toggleLang(),
      },
    ];

    return [...nav, ...actions];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm dark:bg-black/50"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-2xl shadow-accent/10 dark:border-ink-dark/10 dark:bg-paper-dark"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 dark:border-ink-dark/10">
              <Search size={16} className="text-ink/40 dark:text-ink-dark/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({
                  tr: "Komut ara veya bir bölüme git…",
                  en: "Search commands or jump to a section…",
                })}
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink/40 dark:placeholder:text-ink-dark/40"
              />
              <kbd className="hidden shrink-0 rounded border border-ink/10 px-1.5 py-0.5 font-mono text-[10px] text-ink/40 dark:border-ink-dark/10 dark:text-ink-dark/40 sm:block">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs text-ink/40 dark:text-ink-dark/40">
                  {t({ tr: "Sonuç yok", en: "No results" })}
                </li>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => c.run()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        active === i
                          ? "bg-accent/10 text-accent"
                          : "text-ink/80 dark:text-ink-dark/80"
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="flex-1">{c.label}</span>
                      {c.hint && (
                        <span className="font-mono text-[11px] text-ink/40 dark:text-ink-dark/40">
                          {c.hint}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
