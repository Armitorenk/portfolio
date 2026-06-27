import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "section" | "li" | "span";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
} as const;

/** Subtle "rise + fade" reveal as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
