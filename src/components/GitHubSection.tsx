import { useEffect, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { profile, ui } from "../data/content";
import { GITHUB_CHART_URL, GITHUB_USER } from "../lib/config";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type GhData = { public_repos: number; followers: number; following: number };

export function GitHubSection() {
  const { t } = useT();
  const [data, setData] = useState<GhData | null>(null);
  const [chartOk, setChartOk] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: GhData) => alive && setData(d))
      .catch(() => {
        /* rate-limited or offline — fall back to static numbers */
      });
    return () => {
      alive = false;
    };
  }, []);

  const stats = [
    {
      value: data ? String(data.public_repos) : "5",
      label: { tr: "Public repo", en: "Public repos" },
    },
    {
      value: data ? String(data.followers) : "—",
      label: { tr: "Takipçi", en: "Followers" },
    },
    {
      value: "100%",
      label: { tr: "Açık kaynak", en: "Open source" },
    },
  ];

  return (
    <section id="github" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading
        index="05"
        eyebrow={t(ui.nav.github)}
        title={t({ tr: "GitHub'da", en: "On GitHub" })}
        subtitle={t({
          tr: "Kodun çoğu açık. Aşağısı doğrudan GitHub'dan canlı çekiliyor.",
          en: "Most of the code is public. The numbers below are pulled live from GitHub.",
        })}
      />

      <Reveal>
        <div className="card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="font-display text-3xl font-semibold text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 dark:text-ink-dark/50">
                    {t(s.label)}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost group"
            >
              <Github size={16} />@{GITHUB_USER}
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Contribution heatmap */}
          <div className="mt-8 border-t border-ink/10 pt-6 dark:border-ink-dark/10">
            <div className="mb-4 eyebrow">
              {t({ tr: "Katkı grafiği", en: "Contribution graph" })}
            </div>
            {chartOk ? (
              <img
                src={GITHUB_CHART_URL}
                alt={`${GITHUB_USER} GitHub contribution graph`}
                loading="lazy"
                onError={() => setChartOk(false)}
                className="w-full"
              />
            ) : (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-accent hover:underline"
              >
                {t({
                  tr: "Grafiği GitHub'da gör →",
                  en: "View the graph on GitHub →",
                })}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
