import { useApp } from "../context/AppContext";
import type { L } from "../data/content";

/** Returns the current language and a translator that picks the right string. */
export function useT() {
  const { lang } = useApp();
  const t = (v: L) => v[lang];
  return { lang, t };
}
