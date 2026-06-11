"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  CalendarHeart,
  Heart,
  Layers,
  Sparkles,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Reveal } from "@/components/Reveal";
import { useSession, type HistoryEntry } from "@/lib/session";
import { cardById } from "@/lib/cards";
import { moodById } from "@/lib/moods";

export default function DashboardPage() {
  const { history } = useSession();

  const sorted = useMemo(
    () => [...history].sort((a, b) => a.ts - b.ts),
    [history]
  );

  const stats = useMemo(() => {
    const total = sorted.length;
    const cards = new Set(sorted.map((h) => h.cardId)).size;
    const days = new Set(sorted.map((h) => new Date(h.ts).toDateString())).size;
    return { total, cards, days };
  }, [sorted]);

  const byCard = useMemo(() => {
    const map = new Map<string, { count: number; title: string }>();
    sorted.forEach((h) => {
      const cur = map.get(h.cardId) ?? { count: 0, title: h.cardTitle };
      cur.count += 1;
      map.set(h.cardId, cur);
    });
    return Array.from(map.entries())
      .map(([id, v]) => ({ id, title: v.title, count: v.count }))
      .sort((a, b) => b.count - a.count);
  }, [sorted]);

  const topCard = byCard[0] ? cardById(byCard[0].id) : undefined;
  const maxCount = Math.max(1, ...byCard.map((c) => c.count));

  return (
    <main className="min-h-dvh pb-28">
      <TopBar />

      <section className="section mt-8 sm:mt-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="pill bg-lavender-100 text-lavender-700">
                <Sparkles className="h-3.5 w-3.5" /> บันทึกใจ
              </span>
              <h1 className="mt-3 font-display text-3xl font-700 text-ink sm:text-4xl">
                พื้นที่ของเธอ
              </h1>
              <p className="mt-1 text-ink-soft">
                ทุกครั้งที่แวะมา คือการที่เธอเลือกอยู่ข้างตัวเอง
              </p>
            </div>
            <Link href="/check-in" className="btn-primary">
              <Heart className="h-4 w-4" /> แวะมาเช็คอิน
            </Link>
          </div>
        </Reveal>

        {/* gentle, non-evaluative stats — no scores, no streaks */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Heart}
            tint="from-blush-200 to-lavender-200"
            value={`${stats.total}`}
            unit="ครั้ง"
            label="ที่เธอแวะมาดูแลใจ"
            delay={0}
          />
          <StatCard
            icon={Layers}
            tint="from-lavender-200 to-sky-200"
            value={`${stats.cards}`}
            unit="แบบ"
            label="การ์ดที่ได้ลอง"
            delay={0.05}
          />
          <StatCard
            icon={CalendarHeart}
            tint="from-mint-200 to-mint-100"
            value={`${stats.days}`}
            unit="วัน"
            label="วันที่ได้แวะมา"
            delay={0.1}
          />
          <StatCard
            icon={Sparkles}
            tint="from-peach-200 to-blush-200"
            value={topCard?.emoji ?? "🤍"}
            unit=""
            label="การ์ดที่กลับมาหาบ่อย"
            delay={0.15}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* mood journal — framed as normal ups & downs, not performance */}
          <Reveal>
            <div className="card-surface h-full p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-600 text-ink">
                  ใจของเธอในแต่ละครั้ง
                </h2>
              </div>
              <TrendChart data={sorted} />
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                ใจเรามีขึ้นมีลงเป็นเรื่องธรรมดา ไม่มีกราฟไหนต้องสวยตลอดเวลา
                และไม่มีจุดไหนที่ “ผิด”
              </p>
            </div>
          </Reveal>

          {/* week dots — visiting, never “missing” */}
          <Reveal delay={0.05}>
            <div className="card-surface flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <CalendarHeart className="h-5 w-5 text-lavender-500" />
                <h2 className="font-display text-lg font-600 text-ink">
                  วันที่เธอแวะมา
                </h2>
              </div>
              <WeekDots data={sorted} />
              <div className="mt-auto rounded-3xl bg-lavender-50 p-4">
                <p className="text-sm leading-relaxed text-ink-soft">
                  “ไม่ต้องมาทุกวันก็ได้ การดูแลใจไม่มีกำหนดส่ง
                  แค่กลับมาหาตัวเองเมื่อไหวก็พอ”
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* cards breakdown — frequency only, no “lift” score */}
        <Reveal>
          <div className="card-surface mt-6 p-6 sm:p-7">
            <h2 className="font-display text-lg font-600 text-ink">
              การ์ดที่เธอกลับไปหาบ่อย ๆ
            </h2>
            <div className="mt-5 space-y-3">
              {byCard.map((c) => {
                const card = cardById(c.id);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-canvas text-2xl">
                      {card?.emoji ?? "🃏"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-600 text-ink">
                          {c.title}
                        </span>
                        <span className="shrink-0 text-xs text-ink-muted">
                          {c.count} ครั้ง
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-canvas">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-lavender-400 to-mint-400"
                          style={{ width: `${(c.count / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* recent — before → now moods, no points */}
        <Reveal>
          <div className="mt-6">
            <h2 className="mb-3 font-display text-lg font-600 text-ink">
              ครั้งล่าสุด
            </h2>
            <div className="space-y-2.5">
              {[...sorted]
                .reverse()
                .slice(0, 5)
                .map((h) => {
                  const card = cardById(h.cardId);
                  const before = moodById(h.moodId);
                  const after = moodById(h.afterMoodId);
                  return (
                    <div
                      key={h.ts}
                      className="flex items-center gap-3 rounded-3xl bg-white/70 px-4 py-3 shadow-soft ring-1 ring-white"
                    >
                      <span className="text-2xl">{card?.emoji ?? "🃏"}</span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-600 text-ink">
                          {h.cardTitle}
                        </div>
                        <div className="text-xs text-ink-muted">
                          {formatDate(h.ts)}
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full bg-canvas px-3 py-1.5 text-sm">
                        {before?.emoji ?? "🙂"}{" "}
                        <span className="text-ink-muted">→</span>{" "}
                        {after?.emoji ?? "🙂"}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function StatCard({
  icon: Icon,
  tint,
  value,
  unit,
  label,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  value: string;
  unit: string;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-4xl bg-white p-5 shadow-card ring-1 ring-white">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${tint}`}
        >
          <Icon className="h-5 w-5 text-ink" />
        </div>
        <div className="mt-3 font-display text-3xl font-700 text-ink">
          {value}
          {unit && (
            <span className="ml-1 text-sm font-500 text-ink-muted">{unit}</span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-ink-soft">{label}</p>
      </div>
    </Reveal>
  );
}

function TrendChart({ data }: { data: HistoryEntry[] }) {
  const W = 320;
  const H = 150;
  const pad = 10;
  if (data.length < 2) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-ink-muted">
        แวะมาสักสองสามครั้ง แล้วบันทึกใจจะค่อย ๆ เล่าเรื่องของเธอเอง
      </div>
    );
  }
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (W - pad * 2));
  const ys = data.map((h) => pad + (1 - h.after / 100) * (H - pad * 2));
  const linePts = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const areaPts = `${pad},${H - pad} ${linePts} ${W - pad},${H - pad}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full">
      <defs>
        <linearGradient id="area-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9683F1" stopOpacity="0.28" />
          <stop offset="1" stopColor="#9683F1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={pad}
          x2={W - pad}
          y1={pad + g * (H - pad * 2)}
          y2={pad + g * (H - pad * 2)}
          stroke="#E7E3FD"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      ))}
      <polygon points={areaPts} fill="url(#area-g)" />
      <polyline
        points={linePts}
        fill="none"
        stroke="#9683F1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r="3.5"
          fill="#fff"
          stroke="#9683F1"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function WeekDots({ data }: { data: HistoryEntry[] }) {
  const days = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
  const today = new Date();
  const set = new Set(data.map((h) => new Date(h.ts).toDateString()));
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return { d, active: set.has(d.toDateString()) };
  });
  return (
    <div className="my-5 flex justify-between">
      {last7.map(({ d, active }, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-600 ${
              active
                ? "bg-gradient-to-br from-lavender-400 to-mint-400 text-white shadow-soft"
                : "bg-canvas text-ink-muted"
            }`}
          >
            {active ? "♥" : ""}
          </div>
          <span className="text-[11px] text-ink-muted">
            {days[(d.getDay() + 6) % 7]}
          </span>
        </div>
      ))}
    </div>
  );
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}
