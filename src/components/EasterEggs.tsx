import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../context/AppContext";

/**
 * Tiny dark-mode-only surprises. Each time you switch into dark mode there's
 * roughly a 1-in-20 chance one of these shows up quietly in the background,
 * then drifts away on its own. There are a handful of them — keep flipping
 * the theme if you want to collect them all. 🌙
 */

const EGGS: Array<() => ReactNode> = [
  // 0 — shooting star
  () => (
    <motion.div
      className="absolute right-[12%] top-[14%] text-2xl"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x: -380, y: 260, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, ease: "easeIn" }}
    >
      💫
    </motion.div>
  ),
  // 1 — UFO drifting across with a beam
  () => (
    <motion.div
      className="absolute top-[18%] flex flex-col items-center"
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 8, ease: "linear" }}
    >
      <span className="text-3xl">🛸</span>
      <span className="h-16 w-10 bg-gradient-to-b from-accent/40 to-transparent [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)]" />
    </motion.div>
  ),
  // 2 — sleepy moon with floating z's
  () => (
    <motion.div
      className="absolute bottom-[12%] left-[8%] text-3xl"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
      transition={{ duration: 6 }}
    >
      🌙
      <motion.span
        className="absolute -right-5 -top-3 font-mono text-sm text-accent"
        animate={{ y: [-2, -16], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: 2 }}
      >
        z
      </motion.span>
    </motion.div>
  ),
  // 3 — ghost floating up
  () => (
    <motion.div
      className="absolute bottom-0 left-[42%] text-4xl"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: -340, opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 6, ease: "easeOut" }}
    >
      👻
    </motion.div>
  ),
  // 4 — cat walking along the bottom
  () => (
    <motion.div
      className="absolute bottom-3 text-3xl"
      initial={{ x: "-8vw", opacity: 0 }}
      animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 9, ease: "linear" }}
    >
      <motion.span
        className="inline-block"
        animate={{ rotate: [0, -6, 0, 6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        🐈‍⬛
      </motion.span>
    </motion.div>
  ),
  // 5 — table flip, then sets it back
  () => (
    <motion.div
      className="absolute bottom-[16%] left-[10%] font-mono text-lg text-accent"
      initial={{ opacity: 0, rotate: -4 }}
      animate={{ opacity: [0, 1, 1, 1, 0], rotate: [-4, 4, -2, 0, 0] }}
      transition={{ duration: 5, times: [0, 0.1, 0.5, 0.85, 1] }}
    >
      (╯°□°)╯︵ ┻━┻
    </motion.div>
  ),
  // 6 — rocket launch
  () => (
    <motion.div
      className="absolute bottom-0 right-[14%] text-3xl"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: -360, x: 60, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4.5, ease: "easeIn" }}
    >
      🚀
    </motion.div>
  ),
];

const CHANCE = 1 / 20;

export function EasterEggs() {
  const { theme } = useApp();
  const [egg, setEgg] = useState<number | null>(null);

  useEffect(() => {
    if (theme !== "dark") {
      setEgg(null);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (Math.random() >= CHANCE) return;

    const pick = Math.floor(Math.random() * EGGS.length);
    setEgg(pick);
    const id = setTimeout(() => setEgg(null), 9500);
    return () => clearTimeout(id);
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <AnimatePresence>
        {egg !== null && (
          <motion.div key={egg} exit={{ opacity: 0 }} className="h-full w-full">
            {EGGS[egg]()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
