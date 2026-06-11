"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSession } from "@/lib/session";

export function SoundToggle({ className = "" }: { className?: string }) {
  const { soundOn, toggleSound } = useSession();
  return (
    <button
      onClick={toggleSound}
      aria-pressed={soundOn}
      aria-label={soundOn ? "ปิดเสียงบรรยากาศ" : "เปิดเสียงบรรยากาศ"}
      className={`glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-ink-soft shadow-soft transition-all hover:-translate-y-0.5 ${className}`}
    >
      {soundOn ? (
        <Volume2 className="h-4 w-4 text-lavender-500" />
      ) : (
        <VolumeX className="h-4 w-4 text-ink-muted" />
      )}
      <span className="hidden sm:inline">
        {soundOn ? "เสียงเปิดอยู่" : "เสียงบรรยากาศ"}
      </span>
    </button>
  );
}
