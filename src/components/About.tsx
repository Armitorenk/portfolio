import { about, ui } from "../data/content";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { lang, t } = useT();

  return (
    <section id="about" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading index="01" eyebrow={t(ui.nav.about)} title={t(about.heading)} />

      <div className="max-w-3xl space-y-6">
        {about.body[lang].map((para, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-lg leading-relaxed text-ink/75 dark:text-ink-dark/75">
              {para}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
