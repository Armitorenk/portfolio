import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A throwable "command ball" with a little face that watches your cursor.
 * Drag to fling it (bounces off every edge with a ripple), click to shatter it
 * open into the command palette. Throwing or shaking it makes it dizzy. If you
 * ignore it for 10s it gets sad and vanishes for the rest of the session.
 * Works on touch too.
 */

const D = 60;
const R = D / 2;
const IDLE_MS = 10_000;
// minimum gap between ripples — only to de-dupe two walls hit on the same frame
// (corners); every real bounce still ripples.
const RIPPLE_MIN_GAP = 90;
// only a genuinely fast fling (release speed, px/frame) makes it dizzy — a slow
// drag-and-drop just relocates it.
const THROW_DIZZY_SPEED = 26;

type Mood = "watch" | "happy" | "dizzy" | "ouch" | "sad";
type Ripple = { id: number; x: number; y: number };

export function CommandBall({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  const [bursting, setBursting] = useState(false);
  const [gone, setGone] = useState(false);
  const [mood, setMood] = useState<Mood>("watch");
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const ballRef = useRef<HTMLDivElement>(null);
  const lPupil = useRef<HTMLSpanElement>(null);
  const rPupil = useRef<HTMLSpanElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const lastPtr = useRef({ x: 0, y: 0 });
  const down = useRef({ t: 0, moved: 0 });
  const lastDirX = useRef(0);
  const reversals = useRef(0);
  const shakeT = useRef(0);
  const raf = useRef(0);
  const rid = useRef(0);
  const lastRipple = useRef(0);
  const lastInteract = useRef(0);
  const phase = useRef<"active" | "sulking">("active");
  const openRef = useRef(open);
  const reduce = useRef(false);

  useEffect(() => {
    openRef.current = open;
    if (open) lastInteract.current = performance.now();
  }, [open]);

  const flash = useCallback((m: Mood, back: Mood = "watch", ms = 1100) => {
    setMood(m);
    window.setTimeout(() => setMood((cur) => (cur === m ? back : cur)), ms);
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    if (reduce.current) return;
    const now = performance.now();
    if (now - lastRipple.current < RIPPLE_MIN_GAP) return;
    lastRipple.current = now;
    const id = rid.current++;
    setRipples((r) => [...r, { id, x, y }]);
    window.setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 1000);
  }, []);

  // track pointer for eye-gaze
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lastInteract.current = performance.now();
    pos.current = { x: window.innerWidth - 92, y: window.innerHeight - 132 };
    const move = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // physics + eye-gaze loop
  useEffect(() => {
    const loop = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (!dragging.current) {
        let { x, y } = pos.current;
        const v = vel.current;
        x += v.x;
        y += v.y;
        v.x *= 0.99;
        v.y *= 0.99;
        if (x < R) { x = R; if (Math.abs(v.x) > 2.5) addRipple(0, y); v.x = Math.abs(v.x) * 0.8; }
        else if (x > W - R) { x = W - R; if (Math.abs(v.x) > 2.5) addRipple(W, y); v.x = -Math.abs(v.x) * 0.8; }
        if (y < R) { y = R; if (Math.abs(v.y) > 2.5) addRipple(x, 0); v.y = Math.abs(v.y) * 0.8; }
        else if (y > H - R) { y = H - R; if (Math.abs(v.y) > 2.5) addRipple(x, H); v.y = -Math.abs(v.y) * 0.8; }
        if (Math.abs(v.x) < 0.03) v.x = 0;
        if (Math.abs(v.y) < 0.03) v.y = 0;
        pos.current = { x, y };
      }
      if (ballRef.current)
        ballRef.current.style.transform = `translate(${pos.current.x - R}px, ${pos.current.y - R}px)`;

      // eye gaze toward cursor
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      const dist = Math.hypot(dx, dy) || 1;
      const off = Math.min(3, dist / 30);
      const tx = (dx / dist) * off;
      const ty = (dy / dist) * off;
      if (lPupil.current) lPupil.current.style.transform = `translate(${tx}px, ${ty}px)`;
      if (rPupil.current) rPupil.current.style.transform = `translate(${tx}px, ${ty}px)`;

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [addRipple]);

  // ignored for 10s → it gets sad and vanishes for the rest of the session
  useEffect(() => {
    const iv = window.setInterval(() => {
      if (phase.current !== "active") return;
      if (dragging.current || openRef.current) {
        lastInteract.current = performance.now();
        return;
      }
      if (performance.now() - lastInteract.current > IDLE_MS) {
        phase.current = "sulking";
        setMood("sad");
        window.setTimeout(() => setGone(true), 1100);
        window.clearInterval(iv);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const burst = useCallback(() => {
    flash("happy", "watch", 700);
    setBursting(true);
    window.setTimeout(() => onOpen(), 130);
    window.setTimeout(() => setBursting(false), 650);
  }, [onOpen, flash]);

  const onPointerDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastInteract.current = performance.now();
    offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
    lastPtr.current = { x: e.clientX, y: e.clientY };
    down.current = { t: performance.now(), moved: 0 };
    vel.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPtr.current.x;
    const dy = e.clientY - lastPtr.current.y;
    down.current.moved += Math.hypot(dx, dy);
    vel.current = { x: dx, y: dy };
    lastPtr.current = { x: e.clientX, y: e.clientY };

    // shake detection — only FAST left/right reversals while dragging → dizzy
    const now = performance.now();
    if (now - shakeT.current > 600) reversals.current = 0;
    const dir = Math.sign(dx);
    if (dir !== 0 && dir === -lastDirX.current && Math.abs(dx) > 11) {
      reversals.current += 1;
      shakeT.current = now;
      if (reversals.current >= 5) {
        reversals.current = 0;
        flash("dizzy", "watch", 2600);
      }
    }
    if (dir !== 0) lastDirX.current = dir;
    const W = window.innerWidth;
    const H = window.innerHeight;
    pos.current = {
      x: Math.min(Math.max(e.clientX - offset.current.x, R), W - R),
      y: Math.min(Math.max(e.clientY - offset.current.y, R), H - R),
    };
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    lastInteract.current = performance.now();
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const dt = performance.now() - down.current.t;
    if (down.current.moved < 6 && dt < 350) {
      vel.current = { x: 0, y: 0 };
      burst();
    } else {
      const max = 46;
      vel.current.x = Math.max(-max, Math.min(max, vel.current.x));
      vel.current.y = Math.max(-max, Math.min(max, vel.current.y));
      const speed = Math.hypot(vel.current.x, vel.current.y);
      if (speed > THROW_DIZZY_SPEED) flash("dizzy", "watch", 2800);
    }
  };

  const show = !open && !bursting && !gone;

  return (
    <>
      {/* edge ripples — fire on every bounce */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full border-[3px] border-accent/60"
              style={{ left: r.x, top: r.y, width: 22, height: 22, marginLeft: -11, marginTop: -11 }}
              initial={{ scale: 0, opacity: 0.55 }}
              animate={{ scale: 15, opacity: 0 }}
              transition={{ duration: 0.95, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* shatter fragments */}
      <AnimatePresence>
        {bursting && (
          <div className="pointer-events-none fixed inset-0 z-40">
            {Array.from({ length: 12 }).map((_, i) => {
              const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
              const dD = 55 + Math.random() * 75;
              return (
                <motion.span
                  key={i}
                  className="absolute h-2.5 w-2.5 rounded-sm bg-gradient-to-br from-accent-bright to-accent-deep"
                  style={{ left: pos.current.x - 5, top: pos.current.y - 5 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  animate={{ x: Math.cos(ang) * dD, y: Math.sin(ang) * dD, opacity: 0, scale: 0.3, rotate: Math.random() * 360 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* the ball */}
      <div
        ref={ballRef}
        className="pointer-events-none fixed left-0 top-0 z-40"
        style={{ width: D, height: D }}
      >
        <button
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          aria-label="Komut paleti — sürükle ya da tıkla"
          className={`group relative flex h-full w-full touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-accent-bright to-accent text-white shadow-lg shadow-accent/40 transition-[transform,opacity] duration-300 ${
            show
              ? "pointer-events-auto scale-100 cursor-grab opacity-100 active:cursor-grabbing"
              : "pointer-events-none scale-0 opacity-0"
          }`}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40 [animation-duration:2.8s]" />
          <Face mood={mood} lPupil={lPupil} rPupil={rPupil} />
        </button>
      </div>
    </>
  );
}

function Eye({
  pupilRef,
  down,
}: {
  pupilRef: React.RefObject<HTMLSpanElement>;
  down?: boolean;
}) {
  return (
    <span className="relative flex h-[13px] w-[13px] items-center justify-center rounded-full bg-white">
      <span
        ref={pupilRef}
        className="absolute h-[6px] w-[6px] rounded-full bg-ink"
        style={down ? { transform: "translateY(3px)" } : undefined}
      />
    </span>
  );
}

function Face({
  mood,
  lPupil,
  rPupil,
}: {
  mood: Mood;
  lPupil: React.RefObject<HTMLSpanElement>;
  rPupil: React.RefObject<HTMLSpanElement>;
}) {
  if (mood === "dizzy") return <DizzyFace />;
  const sad = mood === "sad";
  return (
    <span className="relative flex flex-col items-center gap-[3px]">
      <span className="flex gap-[5px]">
        <Eye pupilRef={lPupil} down={sad} />
        <Eye pupilRef={rPupil} down={sad} />
      </span>
      <Mouth mood={mood} />
      {sad && (
        <span className="absolute left-[6px] top-[12px] h-[5px] w-[4px] rounded-b-full bg-white/90" />
      )}
    </span>
  );
}

/** Dizzy: spinning spiral eyes, a wavy dazed mouth, and stars orbiting overhead. */
function DizzyFace() {
  return (
    <span className="relative flex flex-col items-center gap-[3px]">
      {/* stars orbiting around the head — more, bigger, wider orbit */}
      <span className="pointer-events-none absolute -top-[22px] left-1/2 h-[44px] w-[44px] -translate-x-1/2 animate-spin [animation-duration:1s]">
        <Star className="absolute left-1/2 top-0 -translate-x-1/2" size={11} />
        <Star className="absolute right-0 top-[26%]" size={9} />
        <Star className="absolute right-[16%] bottom-0" size={10} />
        <Star className="absolute left-[16%] bottom-0" size={9} />
        <Star className="absolute left-0 top-[26%]" size={10} />
      </span>
      <span className="flex gap-[5px]">
        <SwirlEye />
        <SwirlEye />
      </span>
      <span className="inline-block animate-wobble">
        <svg width="18" height="7" viewBox="0 0 18 7" fill="none">
          <path
            d="M2 4 Q4.5 1 7 4 T12 4 T17 4"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}

function SwirlEye() {
  return (
    <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white">
      <svg
        viewBox="0 0 14 14"
        className="h-[14px] w-[14px] animate-spin [animation-duration:0.45s]"
        fill="none"
      >
        <path
          d="M7 7 C7 6 8.2 6 8.2 7 C8.2 8.5 5.5 8.5 5.5 6.6 C5.5 4.2 9.7 4.2 9.7 7 C9.7 10.2 3.8 10.2 3.8 6.2"
          stroke="#0C1719"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Star({ className = "", size = 5 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      className={`${className} text-amber-300`}
      fill="currentColor"
    >
      <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" />
    </svg>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  // round mouths for dizzy / ouch
  if (mood === "dizzy" || mood === "ouch")
    return <span className="h-[6px] w-[6px] rounded-full border-2 border-white" />;
  const d =
    mood === "happy"
      ? "M2 1 Q9 9 16 1" // big grin
      : mood === "sad"
      ? "M2 6 Q9 0 16 6" // frown
      : "M3 2 Q9 6 15 2"; // gentle smile (watch)
  return (
    <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
      <path d={d} stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
