import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 max-w-2xl">
        <span className="eyebrow">
          <span className="text-accent/50">{index}</span> / {eyebrow}
        </span>
        <h2 className="display mt-3 text-[clamp(1.9rem,4.5vw,3.1rem)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-ink/60 dark:text-ink-dark/60">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}
