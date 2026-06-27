import { useEffect, useState } from "react";
import { BackgroundFX } from "./components/BackgroundFX";
import { EasterEggs } from "./components/EasterEggs";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Work } from "./components/Work";
import { GitHubSection } from "./components/GitHubSection";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import { CommandBall } from "./components/CommandBall";
import { Games } from "./components/Games";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  // Global ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Honor a deep link like /#work on first load (target exists only after mount)
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el)
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "auto", block: "start" })
      );
  }, []);

  return (
    <>
      <BackgroundFX />
      <EasterEggs />

      <Nav
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenGames={() => setGamesOpen(true)}
      />

      <main className="relative">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />

      <CommandBall open={paletteOpen} onOpen={() => setPaletteOpen(true)} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenGames={() => setGamesOpen(true)}
      />
      <Games open={gamesOpen} onClose={() => setGamesOpen(false)} />
    </>
  );
}
