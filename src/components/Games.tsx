import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bug, Feather, X } from "lucide-react";
import { useT } from "../lib/useT";

type GameId = "flappy" | "invaders";

export function Games({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useT();
  const [game, setGame] = useState<GameId | null>(null);

  useEffect(() => {
    if (!open) setGame(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (game) setGame(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, game, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm dark:bg-black/70"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-2xl shadow-accent/10 dark:border-ink-dark/10 dark:bg-paper-dark"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 dark:border-ink-dark/10">
              <div className="flex items-center gap-2">
                {game && (
                  <button
                    onClick={() => setGame(null)}
                    aria-label="Geri"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:text-accent dark:text-ink-dark/60"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <span className="font-display font-semibold tracking-tight">
                  {t({ tr: "Armağan Arcade", en: "Armagan's Arcade" })}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Kapat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:text-accent dark:text-ink-dark/60"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              {!game && <Picker onPick={setGame} t={t} />}
              {game === "flappy" && <FlappyGame />}
              {game === "invaders" && <InvadersGame />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Picker({
  onPick,
  t,
}: {
  onPick: (g: GameId) => void;
  t: (v: { tr: string; en: string }) => string;
}) {
  return (
    <div className="space-y-3">
      <p className="mb-1 text-sm text-ink/60 dark:text-ink-dark/60">
        {t({
          tr: "Boş zamanda yaptığım iki mini oyun — içinde benden izler var.",
          en: "Two little games I made for fun — with a few easter eggs about me.",
        })}
      </p>
      <button
        onClick={() => onPick("flappy")}
        className="card card-hover group flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-deep dark:bg-accent/15 dark:text-accent-bright">
          <Feather size={22} />
        </span>
        <span className="flex-1">
          <span className="block font-display text-lg font-medium group-hover:text-accent">
            Flappy Armağan
          </span>
          <span className="text-sm text-ink/55 dark:text-ink-dark/55">
            {t({ tr: "“a” topunu engellere çarpmadan uçur.", en: "Fly the “a” ball through the gaps." })}
          </span>
        </span>
      </button>
      <button
        onClick={() => onPick("invaders")}
        className="card card-hover group flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-deep dark:bg-accent/15 dark:text-accent-bright">
          <Bug size={22} />
        </span>
        <span className="flex-1">
          <span className="block font-display text-lg font-medium group-hover:text-accent">
            Bug Invaders
          </span>
          <span className="text-sm text-ink/55 dark:text-ink-dark/55">
            {t({ tr: "Bug'ları temizle — debug'lamayı severim.", en: "Clear the bugs — I do love debugging." })}
          </span>
        </span>
      </button>
    </div>
  );
}

/* ----------------------------- Flappy Armağan ----------------------------- */

function FlappyGame() {
  const { t } = useT();
  const W = 320;
  const H = 440;
  const GAP = 172;
  const PW = 54;
  const BX = 74;
  const BR = 13;

  const ref = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "play" | "dead">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const g = useRef({
    y: H / 2,
    vy: 0,
    pipes: [] as { x: number; gap: number; scored: boolean }[],
    t: 0,
    phase: "ready" as "ready" | "play" | "dead",
    score: 0,
  });

  const reset = () => {
    g.current = { y: H / 2, vy: 0, pipes: [], t: 0, phase: "ready", score: 0 };
    setScore(0);
    setPhase("ready");
  };
  const flap = () => {
    const s = g.current;
    if (s.phase === "dead") return;
    if (s.phase === "ready") {
      s.phase = "play";
      setPhase("play");
    }
    s.vy = -5;
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let acc = 0;
    let last = performance.now();
    const TICK = 1000 / 60; // fixed simulation step → same speed at any refresh rate
    const die = () => {
      const s = g.current;
      s.phase = "dead";
      setPhase("dead");
      setBest((b) => Math.max(b, s.score));
    };
    const update = () => {
      const s = g.current;
      if (s.phase !== "play") return;
      s.vy += 0.34;
      s.y += s.vy;
      s.t++;
      if (s.t % 118 === 0)
        s.pipes.push({ x: W + 10, gap: 55 + Math.random() * (H - GAP - 110), scored: false });
      for (const p of s.pipes) p.x -= 1.95;
      s.pipes = s.pipes.filter((p) => p.x > -PW);
      for (const p of s.pipes) {
        if (!p.scored && p.x + PW < BX) {
          p.scored = true;
          s.score++;
          setScore(s.score);
        }
        const inX = BX + BR > p.x && BX - BR < p.x + PW;
        const inGap = s.y - BR > p.gap && s.y + BR < p.gap + GAP;
        if (inX && !inGap) die();
      }
      if (s.y + BR > H - 16 || s.y - BR < 0) die();
    };
    const render = () => {
      const s = g.current;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0E1E24");
      bg.addColorStop(1, "#0B6F7E");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#0FA4B7";
      for (const p of s.pipes) {
        ctx.fillRect(p.x, 0, PW, p.gap);
        ctx.fillRect(p.x, p.gap + GAP, PW, H - (p.gap + GAP));
      }
      ctx.fillStyle = "#22C4D6";
      ctx.fillRect(0, H - 16, W, 16);
      ctx.save();
      ctx.translate(BX, s.y);
      ctx.rotate(Math.max(-0.5, Math.min(0.9, s.vy / 12)));
      ctx.fillStyle = "#22C4D6";
      ctx.beginPath();
      ctx.arc(0, 0, BR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0E1E24";
      ctx.font = "bold 15px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("a", 0, 1);
      ctx.restore();
      ctx.fillStyle = "#E8F1F2";
      ctx.font = "bold 22px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(s.score), W / 2, 38);
    };
    const frame = (now: number) => {
      acc += now - last;
      last = now;
      if (acc > 250) acc = 250; // clamp catch-up after a tab switch / stutter
      while (acc >= TICK) {
        update();
        acc -= TICK;
      }
      render();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const key = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div>
      <div className="relative mx-auto" style={{ maxWidth: W }}>
        <canvas
          ref={ref}
          width={W}
          height={H}
          onPointerDown={(e) => {
            e.preventDefault();
            if (phase !== "dead") flap();
          }}
          className="w-full rounded-xl"
          style={{ touchAction: "none" }}
        />
        {phase !== "play" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-ink/45 p-6 text-center text-white backdrop-blur-[1px]">
            {phase === "ready" ? (
              <>
                <p className="font-display text-xl font-semibold">Flappy Armağan</p>
                <p className="text-sm text-white/80">
                  {t({ tr: "Tıkla / Space ile uç", en: "Click / Space to fly" })}
                </p>
                <button onClick={flap} className="btn-primary mt-1">
                  {t({ tr: "Başla", en: "Start" })}
                </button>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-semibold">
                  {t({ tr: "Skor", en: "Score" })} {score} ·{" "}
                  {t({ tr: "Rekor", en: "Best" })} {best}
                </p>
                <p className="max-w-[15rem] text-sm text-white/80">
                  {t({
                    tr: "Pes etme — iki hackathonu da ikinci bitirdik 🥈",
                    en: "Don't give up — we placed 2nd in two hackathons 🥈",
                  })}
                </p>
                <button onClick={reset} className="btn-primary mt-1">
                  {t({ tr: "Tekrar oyna", en: "Play again" })}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Bug Invaders ------------------------------ */

function InvadersGame() {
  const { t } = useT();
  const W = 360;
  const H = 440;
  const ROWS = 4;
  const COLS = 7;
  const SHIP_Y = H - 30;

  const ref = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "play" | "win" | "dead">("ready");
  const [score, setScore] = useState(0);
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const g = useRef({
    x: W / 2,
    bullets: [] as { x: number; y: number }[],
    alive: [] as boolean[],
    ox: 0,
    oy: 0,
    dir: 1,
    cool: 0,
    phase: "ready" as "ready" | "play" | "win" | "dead",
    score: 0,
  });
  const keys = useRef({ left: false, right: false, fire: false });

  const start = () => {
    g.current = {
      x: W / 2,
      bullets: [],
      alive: Array(ROWS * COLS).fill(true),
      ox: 0,
      oy: 0,
      dir: 1,
      cool: 0,
      phase: "play",
      score: 0,
    };
    setScore(0);
    setPhase("play");
  };

  const invPos = (i: number, s: typeof g.current) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    return { x: 40 + col * 42 + s.ox, y: 44 + row * 36 + s.oy };
  };

  const fire = () => {
    const s = g.current;
    if (s.phase !== "play") return;
    if (s.cool > 0) return;
    s.bullets.push({ x: s.x, y: SHIP_Y - 16 });
    s.cool = 14;
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let acc = 0;
    let last = performance.now();
    const TICK = 1000 / 60; // fixed simulation step → same speed at any refresh rate
    const update = () => {
      const s = g.current;
      if (s.phase !== "play") return;
      if (keys.current.left) s.x -= 5;
      if (keys.current.right) s.x += 5;
      s.x = Math.max(16, Math.min(W - 16, s.x));
      if (s.cool > 0) s.cool--;
      if (keys.current.fire) fire(); // held fire button auto-shoots on cooldown

      // bullets
      for (const b of s.bullets) b.y -= 7;
      s.bullets = s.bullets.filter((b) => b.y > -10);

      // invader movement
      s.ox += s.dir * 0.7;
      let edge = false;
      let lowest = 0;
      s.alive.forEach((a, i) => {
        if (!a) return;
        const p = invPos(i, s);
        if (p.x < 18 || p.x > W - 18) edge = true;
        if (p.y > lowest) lowest = p.y;
      });
      if (edge) {
        s.dir *= -1;
        s.oy += 14;
      }

      // collisions
      s.alive.forEach((a, i) => {
        if (!a) return;
        const p = invPos(i, s);
        for (const b of s.bullets) {
          if (Math.abs(b.x - p.x) < 16 && Math.abs(b.y - p.y) < 14) {
            s.alive[i] = false;
            b.y = -100;
            s.score += 10;
            setScore(s.score);
          }
        }
      });

      if (lowest > SHIP_Y - 18) {
        s.phase = "dead";
        setPhase("dead");
      } else if (s.alive.every((a) => !a)) {
        s.phase = "win";
        setPhase("win");
      }
    };
    const render = () => {
      const s = g.current;
      // draw
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0E1E24");
      bg.addColorStop(1, "#08131A");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      // stars
      ctx.fillStyle = "rgba(232,241,242,0.18)";
      for (let i = 0; i < 24; i++)
        ctx.fillRect((i * 53) % W, (i * 71) % (H - 40), 2, 2);
      // invaders
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      s.alive.forEach((a, i) => {
        if (!a) return;
        const p = invPos(i, s);
        ctx.fillText("🐛", p.x, p.y);
      });
      // bullets
      ctx.fillStyle = "#22C4D6";
      for (const b of s.bullets) ctx.fillRect(b.x - 1.5, b.y - 8, 3, 10);
      // ship (a teal triangle with "a")
      ctx.fillStyle = "#0FA4B7";
      ctx.beginPath();
      ctx.moveTo(s.x, SHIP_Y - 14);
      ctx.lineTo(s.x - 14, SHIP_Y + 10);
      ctx.lineTo(s.x + 14, SHIP_Y + 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px 'Outfit', sans-serif";
      ctx.fillText("a", s.x, SHIP_Y - 1);
      // score
      ctx.fillStyle = "#E8F1F2";
      ctx.font = "bold 16px 'Outfit', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(String(s.score), 12, 22);
    };
    const frame = (now: number) => {
      acc += now - last;
      last = now;
      if (acc > 250) acc = 250; // clamp catch-up after a tab switch / stutter
      while (acc >= TICK) {
        update();
        acc -= TICK;
      }
      render();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const kd = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") keys.current.left = true;
      if (e.code === "ArrowRight") keys.current.right = true;
      if (e.code === "Space") {
        e.preventDefault();
        fire();
      }
    };
    const ku = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") keys.current.left = false;
      if (e.code === "ArrowRight") keys.current.right = false;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, []);

  const movePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    g.current.x = ((e.clientX - rect.left) / rect.width) * W;
  };

  return (
    <div>
      <div className="relative mx-auto" style={{ maxWidth: W }}>
        <canvas
          ref={ref}
          width={W}
          height={H}
          onPointerMove={(e) => g.current.phase === "play" && movePointer(e)}
          onPointerDown={(e) => {
            e.preventDefault();
            if (g.current.phase === "play") {
              movePointer(e);
              fire();
            }
          }}
          className="w-full rounded-xl"
          style={{ touchAction: "none" }}
        />
        {phase !== "play" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-ink/55 p-6 text-center text-white backdrop-blur-[1px]">
            {phase === "ready" && (
              <>
                <p className="font-display text-xl font-semibold">Bug Invaders</p>
                <p className="max-w-[15rem] text-sm text-white/80">
                  {t({
                    tr: "← → hareket · boşluk ateş · mobilde aşağıdaki ◀ ▶ ve A tuşları",
                    en: "← → move · space to fire · on mobile use the ◀ ▶ and A buttons below",
                  })}
                </p>
                <button onClick={start} className="btn-primary mt-1">
                  {t({ tr: "Başla", en: "Start" })}
                </button>
              </>
            )}
            {phase === "win" && (
              <>
                <p className="font-display text-xl font-semibold">
                  {t({ tr: "Bütün bug'lar temiz! 🎉", en: "All bugs squashed! 🎉" })}
                </p>
                <p className="max-w-[15rem] text-sm text-white/80">
                  {t({
                    tr: "Skor " + score + " — tıpkı bir release öncesi gibi.",
                    en: "Score " + score + " — just like the night before a release.",
                  })}
                </p>
                <button onClick={start} className="btn-primary mt-1">
                  {t({ tr: "Tekrar", en: "Again" })}
                </button>
              </>
            )}
            {phase === "dead" && (
              <>
                <p className="font-display text-xl font-semibold">
                  {t({ tr: "Bug'lar geçti 🐛", en: "The bugs got through 🐛" })}
                </p>
                <p className="text-sm text-white/80">
                  {t({ tr: "Skor", en: "Score" })} {score}
                </p>
                <button onClick={start} className="btn-primary mt-1">
                  {t({ tr: "Tekrar dene", en: "Try again" })}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile touch controls: ◀ ▶ move, A (Ateş) fire */}
      {touch && (
        <div className="mt-3 flex select-none items-center justify-between gap-3 px-1">
          <div className="flex gap-3">
            <PadButton
              label="Sol"
              onPress={() => (keys.current.left = true)}
              onRelease={() => (keys.current.left = false)}
            >
              ◀
            </PadButton>
            <PadButton
              label="Sağ"
              onPress={() => (keys.current.right = true)}
              onRelease={() => (keys.current.right = false)}
            >
              ▶
            </PadButton>
          </div>
          <PadButton
            fire
            label="Ateş"
            onPress={() => {
              keys.current.fire = true;
              fire();
            }}
            onRelease={() => (keys.current.fire = false)}
          >
            A
          </PadButton>
        </div>
      )}
    </div>
  );
}

/** On-screen hold-to-press button for the mobile Bug Invaders controls. */
function PadButton({
  onPress,
  onRelease,
  fire,
  label,
  children,
}: {
  onPress: () => void;
  onRelease: () => void;
  fire?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const release = (e: React.PointerEvent) => {
    e.preventDefault();
    onRelease();
  };
  return (
    <button
      type="button"
      aria-label={label}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        onPress();
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      className={`flex touch-none select-none items-center justify-center rounded-full font-display font-bold text-white shadow-md transition-transform active:scale-90 ${
        fire
          ? "h-16 w-16 bg-accent text-xl shadow-accent/40"
          : "h-14 w-14 bg-ink/75 text-lg dark:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}
