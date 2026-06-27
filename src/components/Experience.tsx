import {
  ArrowUpRight,
  Award as AwardIcon,
  Briefcase,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import {
  awards,
  education,
  experience,
  languages,
  ui,
} from "../data/content";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Photo; falls back to a styled gradient tile when no image is set.
 *  Full-width banner on mobile, larger square alongside the text on desktop. */
function Photo({ src, icon: Icon }: { src?: string; icon: LucideIcon }) {
  if (src)
    return (
      <img
        src={src}
        alt=""
        className="h-52 w-full shrink-0 rounded-xl object-cover ring-1 ring-ink/10 dark:ring-ink-dark/10 sm:h-44 sm:w-44"
      />
    );
  return (
    <div className="flex h-44 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-glow-mint/15 text-accent dark:from-accent/25 dark:to-glow-mint/10 dark:text-accent-bright sm:h-44 sm:w-44">
      <Icon size={40} />
    </div>
  );
}

export function Experience() {
  const { t } = useT();

  return (
    <section id="experience" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading
        index="03"
        eyebrow={t(ui.nav.experience)}
        title={t({ tr: "Deneyim & başarılar", en: "Experience & milestones" })}
      />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="space-y-10 md:col-span-7">
          <div>
            <h3 className="eyebrow mb-5">
              {t({ tr: "İş Deneyimi", en: "Working experience" })}
            </h3>
            <div className="space-y-4">
              {experience.map((e, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="card flex flex-col gap-5 p-6 sm:flex-row">
                    <Photo src={e.image} icon={Briefcase} />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-display text-xl font-medium">
                          {t(e.role)}{" "}
                          <span className="text-accent">— {e.org}</span>
                        </h4>
                        <span className="font-mono text-xs text-ink/50 dark:text-ink-dark/50">
                          {t(e.meta)}
                        </span>
                      </div>
                      <p className="mt-2 leading-relaxed text-ink/65 dark:text-ink-dark/65">
                        {t(e.body)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-5">
              {t({ tr: "Ödüller & Yarışmalar", en: "Awards & competitions" })}
            </h3>
            <div className="space-y-4">
              {awards.map((a, i) => {
                const inner = (
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <Photo src={a.image} icon={AwardIcon} />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="flex items-center gap-2 font-display text-xl font-medium">
                          {t(a.title)}
                          {a.link && (
                            <ArrowUpRight
                              size={15}
                              className="text-ink/30 transition-colors group-hover:text-accent dark:text-ink-dark/30"
                            />
                          )}
                        </h4>
                        <span className="font-mono text-xs text-ink/50 dark:text-ink-dark/50">
                          {a.place}
                        </span>
                      </div>
                      <p className="mt-2 leading-relaxed text-ink/65 dark:text-ink-dark/65">
                        {t(a.body)}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    {a.link ? (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="card card-hover group block p-6"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="card p-6">{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-10 md:col-span-5">
          <div>
            <h3 className="eyebrow mb-5">
              {t({ tr: "Eğitim", en: "Education" })}
            </h3>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="card flex items-start gap-3 p-5">
                    <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <h4 className="font-display text-lg font-medium leading-snug">
                        {ed.school}
                      </h4>
                      <p className="mt-0.5 text-sm text-ink/55 dark:text-ink-dark/55">
                        {t(ed.detail)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-5">
              {t({ tr: "Diller", en: "Languages" })}
            </h3>
            <Reveal>
              <div className="card divide-y divide-ink/10 p-2 dark:divide-ink-dark/10">
                {languages.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between px-4 py-3"
                  >
                    <span className="font-display text-lg">{t(l.name)}</span>
                    <span className="font-mono text-xs text-ink/50 dark:text-ink-dark/50">
                      {t(l.level)}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
