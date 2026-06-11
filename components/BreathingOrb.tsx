"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BreathPattern } from "@/lib/cards";

interface Phase {
  name: string;
  dur: number;
  scale: number;
}

export function BreathingOrb({
  pattern,
  accent,
  running = true,
}: {
  pattern: BreathPattern;
  accent: string;
  running?: boolean;
}) {
  const phases = useMemo<Phase[]>(() => {
    const all: Phase[] = [
      { name: "หายใจเข้า", dur: pattern.inhale, scale: 1 },
      { name: "กลั้นไว้เบา ๆ", dur: pattern.hold1, scale: 1 },
      { name: "หายใจออก", dur: pattern.exhale, scale: 0.6 },
      { name: "พักนิ่ง", dur: pattern.hold2, scale: 0.6 },
    ];
    return all.filter((p) => p.dur > 0);
  }, [pattern]);

  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(phases[0]?.dur ?? 4);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running || phases.length === 0) return;
    let i = 0;
    let remaining = phases[0].dur;
    setPhaseIdx(0);
    setCount(remaining);

    tick.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        i = (i + 1) % phases.length;
        remaining = phases[i].dur;
        setPhaseIdx(i);
      }
      setCount(remaining);
    }, 1000);

    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running, phases]);

  const phase = phases[phaseIdx] ?? phases[0];

  return (
    <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
      {/* echo rings */}
      <motion.span
        className="absolute rounded-full"
        style={{ width: "70%", height: "70%", background: accent, opacity: 0.16 }}
        animate={{ scale: phase.scale * 1.35 }}
        transition={{ duration: phase.dur, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute rounded-full blur-2xl"
        style={{ width: "80%", height: "80%", background: accent, opacity: 0.28 }}
        animate={{ scale: phase.scale * 1.1 }}
        transition={{ duration: phase.dur, ease: "easeInOut" }}
      />
      {/* main orb */}
      <motion.div
        className="relative flex items-center justify-center rounded-full shadow-glow"
        style={{
          width: "58%",
          height: "58%",
          background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${accent}cc 60%, ${accent} 100%)`,
        }}
        animate={{ scale: phase.scale }}
        transition={{ duration: phase.dur, ease: "easeInOut" }}
      >
        <div className="text-center text-white">
          <div className="font-display text-lg font-600 drop-shadow-sm">
            {phase.name}
          </div>
          <div className="mt-0.5 text-4xl font-700 tabular-nums drop-shadow-sm">
            {count}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
