"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { FlowProgress } from "@/components/FlowProgress";
import { MoodPicker } from "@/components/MoodPicker";
import { FadeIn } from "@/components/Reveal";
import { useSession } from "@/lib/session";
import type { Mood } from "@/lib/moods";

export default function CheckInPage() {
  const router = useRouter();
  const { setMoodBefore, cardId } = useSession();
  const [selected, setSelected] = useState<Mood | null>(null);

  const pick = (m: Mood) => setSelected(m);

  const next = () => {
    if (!selected) return;
    setMoodBefore(selected.id, selected.energy);
    router.push(cardId ? `/play/${cardId}` : "/cards");
  };

  return (
    <main className="min-h-dvh pb-28">
      <TopBar cta={false} />

      <section className="section mt-8 sm:mt-12">
        <FlowProgress current="checkin" />

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <FadeIn>
            <span className="pill glass text-ink-soft shadow-soft">
              เช็คอินใจ · ใช้เวลา 10 วินาที
            </span>
            <h1 className="mt-4 font-display text-3xl font-700 text-ink sm:text-4xl">
              ตอนนี้รู้สึกยังไง?
            </h1>
            <p className="mt-3 text-ink-soft">
              ไม่มีคำตอบถูกหรือผิด เลือกอันที่ใกล้เคียงที่สุดก็พอ
              <br className="hidden sm:block" />
              เราแค่อยากรู้จักใจคุณ ณ ตอนนี้
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto mt-9 max-w-2xl">
          <FadeIn delay={0.1}>
            <MoodPicker value={selected?.id ?? null} onSelect={pick} />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={next}
                disabled={!selected}
                className="btn-primary w-full max-w-xs text-base disabled:cursor-not-allowed disabled:opacity-40"
              >
                {selected ? "ไปต่อกันเลย" : "เลือกความรู้สึกก่อนนะ"}
                {selected && <ArrowRight className="h-5 w-5" />}
              </button>
              <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Lock className="h-3.5 w-3.5" />
                ความรู้สึกนี้อยู่แค่ในเครื่องคุณ ไม่มีใครเห็น
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
