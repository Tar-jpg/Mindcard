"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { type Card, categoryLabel } from "@/lib/cards";

export function CardTile({
  card,
  index = 0,
  onSelect,
}: {
  card: Card;
  index?: number;
  onSelect: (card: Card) => void;
}) {
  const cat = categoryLabel(card.category);
  return (
    <motion.button
      onClick={() => onSelect(card)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex w-full flex-col overflow-hidden rounded-4xl bg-white p-5 text-left shadow-card ring-1 ring-white transition-shadow hover:shadow-lift"
    >
      {/* card face */}
      <div
        className={`relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient}`}
      >
        <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/30 blur-xl" />
        <span className="text-5xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110">
          {card.emoji}
        </span>
        <span className="absolute left-3 top-3 pill bg-white/70 text-ink-soft backdrop-blur">
          {cat.emoji} {cat.label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="font-display text-lg font-600 text-ink">{card.title}</h3>
      </div>
      <p className="mt-0.5 text-xs font-500 uppercase tracking-wide text-ink-muted">
        {card.en}
      </p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {card.blurb}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {card.goodFor.slice(0, 2).map((g) => (
          <span key={g} className="pill bg-canvas text-ink-muted">
            {g}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-canvas pt-3">
        <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
          <Clock className="h-4 w-4 text-lavender-400" />
          {card.minutes} นาที
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-lavender-50 px-3 py-1.5 text-sm font-600 text-lavender-600 transition-colors group-hover:bg-lavender-500 group-hover:text-white">
          เริ่มเล่น
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}
