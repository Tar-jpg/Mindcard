import { Check } from "lucide-react";

const STEPS = [
  { key: "checkin", label: "เช็คอินใจ" },
  { key: "choose", label: "เลือกการ์ด" },
  { key: "play", label: "ฝึกใจ" },
  { key: "reflect", label: "ทบทวน" },
  { key: "result", label: "สรุปผล" },
] as const;

export type FlowStep = (typeof STEPS)[number]["key"];

export function FlowProgress({ current }: { current: FlowStep }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-600 transition-all ${
                    active
                      ? "bg-lavender-500 text-white shadow-glow ring-4 ring-lavender-100"
                      : done
                        ? "bg-mint-400 text-white"
                        : "bg-white/70 text-ink-muted ring-1 ring-white"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`hidden text-[11px] sm:block ${
                    active ? "font-600 text-ink" : "text-ink-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-1.5 mb-5 h-0.5 flex-1 overflow-hidden rounded-full bg-white/70 sm:mx-2">
                  <div
                    className="h-full rounded-full bg-mint-400 transition-all duration-500"
                    style={{ width: done ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
