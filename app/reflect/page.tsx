"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { FlowProgress } from "@/components/FlowProgress";
import { MoodPicker } from "@/components/MoodPicker";
import { FadeIn } from "@/components/Reveal";
import { useSession } from "@/lib/session";
import type { Mood } from "@/lib/moods";

export default function ReflectPage() {
  const router = useRouter();
  const { setMoodAfter, commit } = useSession();
  const [selected, setSelected] = useState<Mood | null>(null);

  const next = () => {
    if (!selected) return;
    setMoodAfter(selected.id, selected.energy);
    // commit reads latest state on next tick — set then commit via microtask
    setTimeout(() => {
      commit();
      router.push("/result");
    }, 0);
  };

  return (
    <main className="min-h-dvh pb-28">
      <TopBar cta={false} />

      <section className="section mt-8 sm:mt-12">
        <FlowProgress current="reflect" />

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <FadeIn>
            <span className="pill bg-mint-100 text-mint-600">
              <Sparkles className="h-3.5 w-3.5" /> ขอบคุณที่อยู่กับมันจนจบนะ
            </span>
            <h1 className="mt-4 font-display text-3xl font-700 text-ink sm:text-4xl">
              ตอนนี้เป็นยังไงบ้าง?
            </h1>
            <p className="mt-3 text-ink-soft">
              ลองสังเกตใจตัวเองอีกครั้ง ไม่ว่าคำตอบจะเป็นแบบไหน ก็ไม่มีผิดหรือถูกนะ
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto mt-9 max-w-2xl">
          <FadeIn delay={0.1}>
            <MoodPicker value={selected?.id ?? null} onSelect={setSelected} />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 flex justify-center">
              <button
                onClick={next}
                disabled={!selected}
                className="btn-primary w-full max-w-xs text-base disabled:cursor-not-allowed disabled:opacity-40"
              >
                {selected ? "ดูผลลัพธ์" : "เลือกความรู้สึกก่อนนะ"}
                {selected && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
