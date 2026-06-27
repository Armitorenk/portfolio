import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Send,
} from "lucide-react";
import { contact, profile, ui } from "../data/content";
import { CV_DOWNLOAD_NAME, CV_PATH } from "../lib/config";
import { useT } from "../lib/useT";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

const MAPS_BODRUM =
  "https://www.google.com/maps/search/?api=1&query=Bodrum%2C%20Mu%C4%9Fla%2C%20T%C3%BCrkiye";

export function Contact() {
  const { t } = useT();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");

    // FormSubmit delivers straight to the inbox — no mail client, no key.
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: fd.get("name"),
            email: fd.get("email"),
            message: fd.get("message"),
            _subject: `Portfolyo mesajı — ${fd.get("name") || ""}`,
            _template: "table",
            _captcha: "false",
          }),
        }
      );
      const data = await res.json();
      if (data.success === true || data.success === "true") {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const channels = [
    { icon: Github, label: "GitHub", value: `@${profile.githubUser}`, href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "Armağan Aydoğan", href: profile.linkedin },
    {
      icon: MapPin,
      label: t({ tr: "Konum", en: "Location" }),
      value: t(profile.location),
      href: MAPS_BODRUM,
    },
  ];

  return (
    <section id="contact" className="site-container scroll-mt-24 py-24 md:py-28">
      <SectionHeading
        index="06"
        eyebrow={t(ui.nav.contact)}
        title={t(contact.heading)}
        subtitle={t(contact.body)}
      />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Form — the writing surface stays white in both themes */}
        <Reveal className="md:col-span-7">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-ink/10 bg-white p-6 text-ink shadow-sm dark:border-ink-dark/10 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" type="text" label={t(contact.form.name)} required />
              <Field name="email" type="email" label={t(contact.form.email)} required />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                {t(contact.form.message)}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary group disabled:opacity-60"
              >
                {status === "sending" ? t(contact.form.sending) : t(contact.form.send)}
                <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              {status === "sent" && (
                <span className="text-sm font-medium text-emerald-600">
                  {t(contact.form.sent)}
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-ink/70">
                  {t(contact.form.error)}{" "}
                  <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                    {profile.email}
                  </a>
                </span>
              )}
            </div>
          </form>
        </Reveal>

        {/* Channels + CV */}
        <div className="space-y-4 md:col-span-5">
          {channels.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="card card-hover group flex items-center gap-4 p-5">
                <Icon size={18} className="shrink-0 text-accent" />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 dark:text-ink-dark/45">
                    {c.label}
                  </div>
                  <div className="truncate text-sm">{c.value}</div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-ink/30 transition-colors group-hover:text-accent dark:text-ink-dark/30"
                />
              </div>
            );
            return (
              <Reveal key={i} delay={i * 0.06}>
                <a href={c.href} target="_blank" rel="noreferrer" className="block">
                  {inner}
                </a>
              </Reveal>
            );
          })}

          <Reveal delay={0.18}>
            <a
              href={CV_PATH}
              download={CV_DOWNLOAD_NAME}
              className="card card-hover group flex items-center gap-4 border-accent/30 bg-accent-soft p-5 dark:bg-accent/10"
            >
              <Download size={18} className="shrink-0 text-accent" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-deep dark:text-accent-bright">
                  PDF
                </div>
                <div className="text-sm font-medium text-accent-deep dark:text-accent-bright">
                  {t(ui.downloadCV)}
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="ml-auto shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  type,
  label,
  required,
}: {
  name: string;
  type: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
      />
    </div>
  );
}
