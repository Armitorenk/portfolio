/**
 * Calm, airy background: a faint dotted grid plus three slowly drifting,
 * low-opacity colour washes. The hues are deliberately mixed (violet · rose ·
 * mint, with a touch of teal) so dark mode doesn't read as "all blue".
 * Purely decorative; reduced-motion users get a still version (CSS).
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft central lift (violet-tinted) so dark mode breathes */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_70%_55%_at_50%_15%,rgba(139,92,246,0.10),transparent_70%)]" />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          color: "rgba(15,164,183,0.14)",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 0%, black 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 65% at 50% 0%, black 25%, transparent 78%)",
        }}
      />

      {/* Drifting multi-hue washes — airy and well spread out */}
      <div className="absolute -left-40 -top-36 h-[44rem] w-[44rem] animate-aurora-1 rounded-full bg-glow-violet/[0.06] blur-[120px] dark:bg-glow-violet/[0.14]" />
      <div className="absolute -right-48 top-1/4 h-[40rem] w-[40rem] animate-aurora-2 rounded-full bg-glow-rose/[0.05] blur-[120px] dark:bg-glow-rose/[0.10]" />
      <div className="absolute bottom-[-14rem] left-1/3 h-[40rem] w-[40rem] animate-aurora-3 rounded-full bg-glow-mint/[0.06] blur-[120px] dark:bg-glow-mint/[0.12]" />
    </div>
  );
}
