"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { FlowProgress } from "@/components/FlowProgress";
import { CardTile } from "@/components/CardTile";
import { FadeIn } from "@/components/Reveal";
import { CARDS, CATEGORIES, type Card, type CategoryId } from "@/lib/cards";
import { useSession } from "@/lib/session";
import { moodById } from "@/lib/moods";

type Filter = CategoryId | "all";

export default function CardsPage() {
  const router = useRouter();
  const { selectCard, moodBefore, moodId } = useSession();
  const [filter, setFilter] = useState<Filter>("all");

  const mood = moodById(moodId);

  const list = useMemo(
    () => (filter === "all" ? CARDS : CARDS.filter((c) => c.category === filter)),
    [filter]
  );

  const handle = (card: Card) => {
    selectCard(card.id);
    router.push(moodBefore == null ? "/check-in" : `/play/${card.id}`);
  };

  return (
    <main className="min-h-dvh pb-28">
      <TopBar cta={false} />

      <section className="section mt-8 sm:mt-12">
        <FlowProgress current="choose" />

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <FadeIn>
            <h1 className="font-display text-3xl font-700 text-ink sm:text-4xl">
              เลือกการ์ดที่อยากเล่น
            </h1>
            <p className="mt-3 text-ink-soft">
              {mood ? (
                <>
                  ตอนนี้คุณรู้สึก{" "}
                  <span className="font-600 text-lavender-600">
                    {mood.emoji} {mood.label}
                  </span>{" "}
                  — ลองการ์ดที่ช่วยเรื่องนี้ดูไหม
                </>
              ) : (
                "แต่ละการ์ดใช้เวลาแค่ 2–4 นาที ไม่ต้องเตรียมอะไรเลย"
              )}
            </p>
          </FadeIn>
        </div>

        {/* category filter */}
        <FadeIn delay={0.08}>
          <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="✨ ทั้งหมด"
            />
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
                label={`${c.emoji} ${c.label}`}
              />
            ))}
          </div>
        </FadeIn>

        <div className="mx-auto mt-9 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((card, i) => (
            <CardTile key={card.id} card={card} index={i} onSelect={handle} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-500 transition-all ${
        active
          ? "bg-lavender-500 text-white shadow-soft"
          : "glass text-ink-soft hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}
