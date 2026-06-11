"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Heart, NotebookPen, Phone, RefreshCw } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { FlowProgress } from "@/components/FlowProgress";
import { FadeIn } from "@/components/Reveal";
import { useSession } from "@/lib/session";
import { cardById } from "@/lib/cards";
import { moodById } from "@/lib/moods";

type Direction = "lighter" | "same" | "heavier";

function readDirection(delta: number): Direction {
  if (delta > 6) return "lighter";
  if (delta < -6) return "heavier";
  return "same";
}

// Validation-first, never evaluative, never framed as success/failure.
const COPY: Record<Direction, { title: string; body: string; note: string }> = {
  lighter: {
    title: "ใจขยับเบาลงนิดนึง 🌿",
    body: "ไม่ว่าจะเปลี่ยนไปมากหรือน้อย เธอก็ได้ลองดูแลตัวเองแล้วจริง ๆ",
    note: "ค่อย ๆ แบบนี้แหละ ไม่ต้องรีบให้หายทันที",
  },
  same: {
    title: "เธอได้ให้เวลากับตัวเองแล้ว 🤍",
    body: "ใจยังรู้สึกเหมือนเดิมก็ไม่เป็นไรเลย บางวันแค่ได้หยุดหายใจก็มากพอแล้ว",
    note: "ความรู้สึกไม่ได้หายไปในทันทีเสมอ และนั่นเป็นเรื่องปกติ",
  },
  heavier: {
    title: "ตอนนี้ใจอาจจะยังหนักอยู่ 🌙",
    body: "บางทีพอเราเริ่มหันมาฟังใจตัวเอง มันก็รู้สึกชัดขึ้น นั่นไม่ใช่ความผิดของเธอเลย",
    note: "เธอไม่จำเป็นต้องผ่านมันคนเดียวนะ",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const {
    moodId,
    moodAfterId,
    moodBefore,
    moodAfter,
    cardId,
    history,
    resetFlow,
  } = useSession();

  const beforeMood = moodById(moodId);
  const afterMood = moodById(moodAfterId);
  const delta = (moodAfter ?? 0) - (moodBefore ?? 0);
  const dir = readDirection(delta);
  const card = cardById(cardId);
  const copy = COPY[dir];

  // gentle, non-punishing cumulative count (never a streak that can "break")
  const times = Math.max(1, history.length);

  const showSupport =
    dir === "heavier" ||
    moodAfterId === "overwhelmed" ||
    moodAfterId === "anxious";

  const playAnother = () => {
    resetFlow();
    router.push("/cards");
  };

  return (
    <main className="relative min-h-dvh overflow-hidden pb-28">
      <TopBar cta={false} />

      <section className="section mt-8 sm:mt-12">
        <FlowProgress current="result" />

        <div className="mx-auto mt-10 max-w-xl">
          <FadeIn>
            <div className="card-surface overflow-hidden p-7 text-center sm:p-9">
              <span className="pill bg-lavender-100 text-lavender-700">
                <Heart className="h-3.5 w-3.5" /> ขอบคุณที่ให้เวลาตัวเองนะ
              </span>
              <h1 className="mt-3 font-display text-3xl font-700 text-ink">
                {copy.title}
              </h1>
              <p className="mt-2 leading-relaxed text-ink-soft">{copy.body}</p>

              {/* before → now reflection (no scores, no numbers) */}
              {beforeMood && afterMood && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-7 flex items-center justify-center gap-4"
                >
                  <MoodChip emoji={beforeMood.emoji} label="ก่อนหน้า" />
                  <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted" />
                  <MoodChip emoji={afterMood.emoji} label="ตอนนี้" highlight />
                </motion.div>
              )}

              <p className="mt-5 rounded-2xl bg-canvas/70 px-4 py-3 text-sm leading-relaxed text-ink-soft">
                {copy.note}
              </p>

              {card && (
                <div className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-muted">
                  <span className="text-lg">{card.emoji}</span>
                  ฝึกการ์ด “{card.title}” · {card.skill}
                </div>
              )}
            </div>
          </FadeIn>

          {/* gentle support nudge — only when still heavy (chatsafe-aligned) */}
          {showSupport && (
            <FadeIn delay={0.1}>
              <div className="mt-4 rounded-4xl bg-blush-100/70 p-5 ring-1 ring-blush-200">
                <p className="text-sm leading-relaxed text-ink-soft">
                  ถ้าตอนนี้ยังหนักอยู่ การบอกใครสักคนไม่ใช่เรื่องน่าอายเลย
                  มีคนที่พร้อมรับฟังเธอจริง ๆ ฟรีและเป็นความลับ
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="tel:1387"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-600 text-ink shadow-soft transition hover:-translate-y-0.5"
                  >
                    <Phone className="h-3.5 w-3.5 text-blush-300" /> สายเด็ก 1387
                  </a>
                  <a
                    href="tel:1323"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-600 text-ink shadow-soft transition hover:-translate-y-0.5"
                  >
                    <Phone className="h-3.5 w-3.5 text-lavender-500" /> สุขภาพจิต 1323
                  </a>
                </div>
              </div>
            </FadeIn>
          )}

          {/* gentle cumulative note — non-punishing, never a breakable streak */}
          <FadeIn delay={0.12}>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-3xl bg-white/70 px-5 py-3 text-center text-sm text-ink-soft shadow-soft ring-1 ring-white">
              🤍 นี่คือครั้งที่{" "}
              <span className="font-700 text-lavender-600">{times}</span>{" "}
              ที่เธอแวะมาดูแลใจตัวเอง — แค่นี้ก็มีความหมายแล้ว
            </div>
          </FadeIn>

          {/* actions — no pressure */}
          <FadeIn delay={0.16}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={playAnother}
                className="btn-ghost flex-1 justify-center text-base"
              >
                <RefreshCw className="h-4 w-4" /> ลองการ์ดอื่น
              </button>
              <Link
                href="/dashboard"
                className="btn-primary flex-1 justify-center text-base"
              >
                <NotebookPen className="h-4 w-4" /> ดูบันทึกใจ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-3 text-center">
              <Link
                href="/"
                className="text-sm text-ink-muted underline-offset-4 hover:underline"
              >
                หรือพักก่อนก็ได้ ไว้ค่อยกลับมาใหม่
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-5 text-center text-xs leading-relaxed text-ink-muted">
              สิ่งที่เห็นตรงนี้คือความรู้สึกที่เธอบอกเอง เป็นการได้ทบทวนใจตัวเอง
              ไม่ใช่การให้คะแนนหรือวินิจฉัยใด ๆ
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function MoodChip({
  emoji,
  label,
  highlight = false,
}: {
  emoji: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-3xl text-3xl shadow-soft ${
          highlight ? "bg-gradient-to-br from-lavender-100 to-mint-100" : "bg-canvas"
        }`}
      >
        {emoji}
      </div>
      <span className="text-xs text-ink-muted">{label}</span>
    </div>
  );
}
