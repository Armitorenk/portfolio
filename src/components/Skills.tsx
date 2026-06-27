import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import {
  levelLabel,
  skills,
  ui,
  type Level,
  type Skill,
} from "../data/content";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Varied hues so the section isn't all-teal. Expert = gold.
const levelStyle: Record<Level, string> = {
  expert: "text-amber-500 dark:text-amber-300",
  advanced: "text-emerald-500 dark:text-emerald-400",
  intermediate: "text-accent dark:text-accent-bright",
  familiar: "text-ink/40 dark:text-ink-dark/40",
};
const dotStyle: Record<Level, string> = {
  expert: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  advanced: "bg-emerald-500 dark:bg-emerald-400",
  intermediate: "bg-accent",
  familiar: "bg-ink/30 dark:bg-ink-dark/30",
};

function SkillLogo({ skill, dark }: { skill: Skill; dark: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!skill.logo || failed)
    return <Sparkles size={16} className="text-accent" />;
  // Near-black brand marks get a light tint so they read in dark mode.
  const src =
    skill.darkLogo && dark
      ? `https://cdn.simpleicons.org/${skill.logo}/e8f1f2`
      : `https://cdn.simpleicons.org/${skill.logo}`;
  return (
    <img
      src={src}
      alt=""
      width={22}
      height={22}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-[22px] w-[22px] object-contain"
    />
  );
}

export function Skills() {
  const { t } = useT();
  const { theme } = useApp();
  const dark = theme === "dark";

  return (
    <section id="stack" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading
        index="04"
        eyebrow={t(ui.nav.stack)}
        title={t({ tr: "Kullandığım araçlar", en: "Tools of the trade" })}
        subtitle={t({
          tr: "Tasarlamak, geliştirmek ve yayınlamak için kullandığım yığın.",
          en: "The stack I use to design, build and ship.",
        })}
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={gi} delay={Math.min(gi * 0.06, 0.25)}>
            <div className="card h-full p-5">
              <h3 className="eyebrow mb-4">{t(group.label)}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-ink/[0.03] dark:hover:bg-ink-dark/[0.04]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      <SkillLogo skill={skill} dark={dark} />
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {skill.name}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold ${levelStyle[skill.level]}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${dotStyle[skill.level]}`}
                      />
                      {t(levelLabel[skill.level])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
