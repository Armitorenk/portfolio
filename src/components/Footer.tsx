import { Github, Linkedin, Mail } from "lucide-react";
import { profile, ui } from "../data/content";
import { useT } from "../lib/useT";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 dark:border-ink-dark/10">
      <div className="site-container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <a href="#top" className="font-display text-lg font-semibold tracking-tight">
            Armağan Aydoğan<span className="text-accent">.</span>
          </a>
          <p className="mt-2 max-w-sm font-mono text-xs leading-relaxed text-ink/45 dark:text-ink-dark/45">
            {t(ui.builtWith)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink/60 transition-colors hover:text-accent dark:text-ink-dark/60"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink/60 transition-colors hover:text-accent dark:text-ink-dark/60"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-ink/60 transition-colors hover:text-accent dark:text-ink-dark/60"
          >
            <Mail size={18} />
          </a>
          <span className="ml-2 font-mono text-xs text-ink/40 dark:text-ink-dark/40">
            © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
