import { ArrowUpRight, Github } from "lucide-react";
import { profile, projects, ui } from "../data/content";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Work() {
  const { t } = useT();

  return (
    <section id="work" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading
        index="02"
        eyebrow={t(ui.nav.work)}
        title={t({ tr: "Seçili işler", en: "Selected work" })}
        subtitle={t({
          tr: "Çoğu fikir, çalışan bir ürüne dönüşene kadar peşini bırakmadığım projeler.",
          en: "Projects I chased until the idea became something that actually runs.",
        })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.06, 0.3)}>
            <article
              className={`card card-hover group flex h-full flex-col p-6 ${
                p.featured ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {t(p.kind)}
                  </span>
                  <h3 className="mt-1.5 font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — ${t(ui.sourceCode)}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-accent hover:text-accent dark:border-ink-dark/10 dark:text-ink-dark/60"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — ${t(ui.visitSite)}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-accent hover:text-accent dark:border-ink-dark/10 dark:text-ink-dark/60"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="leading-relaxed text-ink/65 dark:text-ink-dark/65">
                {t(p.summary)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                {p.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-ink/70 transition-colors hover:text-accent dark:text-ink-dark/70"
        >
          <Github size={16} />
          {t(ui.moreOnGithub)}
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </section>
  );
}
