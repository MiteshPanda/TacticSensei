"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RevealOverlayProps {
  title: string;
  /** Labels cycled through while the overlay is shown. */
  steps: string[];
  durationMs: number;
}

export default function RevealOverlay({ title, steps, durationMs }: RevealOverlayProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const every = durationMs / steps.length;
    const timer = setInterval(() => setIndex((i) => Math.min(i + 1, steps.length - 1)), every);
    return () => clearInterval(timer);
  }, [durationMs, steps.length]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 px-6 backdrop-blur-sm"
    >
      <div className="text-6xl mb-6 animate-float" aria-hidden>⚽</div>
      <p className="text-2xl font-bold mb-2 text-center">{title}</p>
      <p className="text-foreground-muted mb-6 tabular-nums">{steps[index]}</p>
      <div className="h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-success"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
