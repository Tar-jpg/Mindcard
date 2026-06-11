"use client";

import { motion } from "framer-motion";
import { MOODS, type Mood } from "@/lib/moods";

export function MoodPicker({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (mood: Mood) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {MOODS.map((m, i) => {
        const active = value === m.id;
        return (
          <motion.button
            key={m.id}
            onClick={() => onSelect(m)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileTap={{ scale: 0.96 }}
            className={`relative flex flex-col items-center gap-1.5 rounded-3xl bg-white p-4 text-center shadow-soft ring-2 transition-all ${
              active
                ? `${m.ring} -translate-y-1 shadow-card`
                : "ring-transparent hover:-translate-y-0.5"
            }`}
            style={active ? { boxShadow: `0 18px 40px -20px ${m.glow}` } : undefined}
          >
            {active && (
              <motion.span
                layoutId="mood-glow"
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{ background: `${m.glow}22` }}
              />
            )}
            <span className="text-4xl">{m.emoji}</span>
            <span className="font-display text-base font-600 text-ink">
              {m.label}
            </span>
            <span className="text-[11px] leading-tight text-ink-muted">
              {m.sub}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
