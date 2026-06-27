import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { hero, heroStats, profile, ui } from "../data/content";
import { CV_PATH, CV_DOWNLOAD_NAME } from "../lib/config";
import { useT } from "../lib/useT";

export function Hero() {
  const { lang, t } = useT();
  const words = hero.rotating[lang];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  useEffect(() => setIdx(0), [lang]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center pt-24 pb-16 text-center"
    >
      <div className="site-container flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-xs tracking-wide text-emerald-700 dark:text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          {t(ui.availability)}
        </motion.div>

        {/* leading-[1.12] + py give Turkish descenders (ş, ç, ğ) room */}
        <h1 className="font-display font-medium tracking-[-0.02em] leading-[1.12] text-[clamp(2.5rem,8vw,6.5rem)]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="block"
          >
            {t(hero.lead)}
          </motion.span>
          <span className="block py-[0.06em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: "-0.4em", filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bg-gradient-to-r from-accent-bright to-accent-deep bg-clip-text pb-[0.12em] text-transparent"
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="block"
          >
            {t(hero.trail)}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 max-w-xl text-base leading-relaxed text-ink/70 dark:text-ink-dark/70 md:text-lg"
        >
          {t(hero.intro)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#work" className="btn-primary group">
            {t(ui.viewWork)}
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a href="#contact" className="btn-ghost group">
            {t(ui.getInTouch)}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={CV_PATH}
            download={CV_DOWNLOAD_NAME}
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-ink/70 underline-offset-4 transition-colors hover:text-accent hover:underline dark:text-ink-dark/70"
          >
            <Download size={16} />
            {t(ui.downloadCV)}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-ink/10 pt-7 dark:border-ink-dark/10"
        >
          {heroStats.map((s) => (
            <div key={s.value}>
              <div className="font-display text-3xl font-semibold text-accent">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 dark:text-ink-dark/50">
                {t(s.label)}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-ink/45 dark:text-ink-dark/45"
        >
          {t(hero.role)} · {t(hero.domains)} · {t(profile.location)}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 dark:text-ink-dark/40">
          {t(ui.scrollHint)} ↓
        </span>
      </div>
    </section>
  );
}
