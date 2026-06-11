"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Pause,
  Play,
  SkipForward,
  X,
} from "lucide-react";
import { BreathingOrb } from "@/components/BreathingOrb";
import { ProgressRing } from "@/components/ProgressRing";
import { SoundToggle } from "@/components/SoundToggle";
import { cardById } from "@/lib/cards";

export default function PlayPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const card = useMemo(() => cardById(params?.id), [params]);

  const [stepIdx, setStepIdx] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);

  const step = card?.steps[stepIdx];
  const isTimed = !!step && step.seconds > 0;

  useEffect(() => {
    if (!step) return;
    setRemaining(step.seconds);
    setPaused(false);
  }, [stepIdx, step]);

  useEffect(() => {
    if (!card || !step || step.seconds === 0 || paused) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setStepIdx((i) => Math.min(i + 1, card.steps.length - 1));
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [card, step, paused, stepIdx]);

  if (!card || !step) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-ink-soft">ไม่พบการ์ดนี้</p>
        <Link href="/cards" className="btn-primary">
          กลับไปเลือกการ์ด
        </Link>
      </main>
    );
  }

  const isLast = stepIdx === card.steps.length - 1;
  const overall = (stepIdx + (isTimed ? 1 - remaining / step.seconds : 0)) /
    card.steps.length;

  const goNext = () => {
    if (isLast) {
      router.push("/reflect");
      return;
    }
    setStepIdx((i) => Math.min(i + 1, card.steps.length - 1));
  };

  return (
    <main
      className="relative min-h-dvh overflow-hidden"
      style={{
        background:
          "radial-gradient(1100px 700px at 50% -10%, rgba(124,107,240,0.12), transparent 60%)",
      }}
    >
      {/* ambient blobs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${card.accent}22` }}
      />

      {/* header */}
      <div className="section flex items-center justify-between pt-6">
        <button
          onClick={() => router.push("/cards")}
          className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-ink-soft shadow-soft transition hover:-translate-y-0.5"
        >
          <X className="h-4 w-4" /> ออก
        </button>
        <div className="text-center">
          <div className="font-display text-sm font-600 text-ink">
            {card.emoji} {card.title}
          </div>
          <div className="text-[11px] text-ink-muted">
            สเต็ป {stepIdx + 1} / {card.steps.length}
          </div>
        </div>
        <SoundToggle />
      </div>

      {/* overall progress */}
      <div className="section mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, overall * 100)}%`,
              background: card.accent,
            }}
          />
        </div>
      </div>

      {/* stage */}
      <div className="section flex min-h-[62vh] flex-col items-center justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-lg flex-col items-center text-center"
          >
            {/* visual */}
            {step.kind === "breath" && step.breath ? (
              <BreathingOrb
                key={stepIdx}
                pattern={step.breath}
                accent={card.accent}
                running={!paused}
              />
            ) : isTimed ? (
              <ProgressRing
                progress={1 - remaining / step.seconds}
                accent={card.accent}
                size={236}
              >
                <div className="text-center">
                  <div className="font-display text-5xl font-700 tabular-nums text-ink">
                    {remaining}
                  </div>
                  <div className="text-xs text-ink-muted">วินาที</div>
                </div>
              </ProgressRing>
            ) : (
              <div
                className="flex h-44 w-44 items-center justify-center rounded-full text-6xl shadow-glow"
                style={{
                  background: `radial-gradient(circle at 32% 28%, #fff, ${card.accent}26)`,
                }}
              >
                {isLast ? "🌷" : card.emoji}
              </div>
            )}

            {/* text */}
            <h2 className="mt-8 font-display text-2xl font-700 text-ink sm:text-3xl">
              {step.title}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft text-balance">
              {step.text}
            </p>
            {step.cue && (
              <span className="mt-4 pill bg-white/70 text-ink-soft shadow-soft">
                {step.cue}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="section pb-28">
        <div className="mx-auto flex max-w-lg items-center justify-center gap-3">
          {isTimed && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="glass inline-flex h-12 w-12 items-center justify-center rounded-full text-ink-soft shadow-soft transition hover:-translate-y-0.5"
              aria-label={paused ? "เล่นต่อ" : "พัก"}
            >
              {paused ? (
                <Play className="h-5 w-5" />
              ) : (
                <Pause className="h-5 w-5" />
              )}
            </button>
          )}

          <button onClick={goNext} className="btn-primary min-w-[200px] text-base">
            {isLast ? (
              <>
                ทบทวนความรู้สึก
                <ArrowRight className="h-5 w-5" />
              </>
            ) : isTimed ? (
              <>
                ข้ามไปต่อ
                <SkipForward className="h-5 w-5" />
              </>
            ) : (
              <>
                พร้อมแล้ว ไปต่อ
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
