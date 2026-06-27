import { useEffect, useState } from "react";
import { Command, Download, Gamepad2 } from "lucide-react";
import { ui } from "../data/content";
import { CV_PATH, CV_DOWNLOAD_NAME } from "../lib/config";
import { useT } from "../lib/useT";
import { Controls } from "./Controls";

const sections = [
  { id: "about", label: ui.nav.about },
  { id: "work", label: ui.nav.work },
  { id: "experience", label: ui.nav.experience },
  { id: "stack", label: ui.nav.stack },
  { id: "github", label: ui.nav.github },
  { id: "contact", label: ui.nav.contact },
];

export function Nav({
  onOpenPalette,
  onOpenGames,
}: {
  onOpenPalette: () => void;
  onOpenGames: () => void;
}) {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/80 backdrop-blur-md dark:border-ink-dark/10 dark:bg-paper-dark/80"
          : "border-b border-transparent"
      }`}
    >
      <nav className="site-container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Armağan<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-ink/70 transition-colors hover:text-accent dark:text-ink-dark/70"
            >
              {t(s.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGames}
            aria-label={t(ui.nav.games)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <Gamepad2 size={14} className="transition-transform group-hover:-rotate-12" />
            <span className="hidden sm:inline">{t(ui.nav.games)}</span>
          </button>
          <a
            href={CV_PATH}
            download={CV_DOWNLOAD_NAME}
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent dark:border-ink-dark/15 sm:inline-flex"
          >
            <Download size={13} />
            {t(ui.downloadCV)}
          </a>
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-2.5 py-1.5 font-mono text-xs text-ink/60 transition-colors hover:border-accent hover:text-accent dark:border-ink-dark/15 dark:text-ink-dark/60 sm:flex"
          >
            <Command size={13} />K
          </button>
          <Controls />
        </div>
      </nav>
    </header>
  );
}
