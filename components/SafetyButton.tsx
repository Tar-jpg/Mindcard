"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, Phone, X, MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Hotline {
  name: string;
  detail: string;
  number: string;
  tel: string;
}

const HOTLINES: Hotline[] = [
  {
    name: "สายเด็ก 1387",
    detail: "สำหรับคนอายุต่ำกว่า 18 · ฟรี 24 ชม. · เป็นความลับ",
    number: "1387",
    tel: "1387",
  },
  {
    name: "สายด่วนสุขภาพจิต",
    detail: "กรมสุขภาพจิต · ฟรี 24 ชม. · โทรหรือแชทออนไลน์ก็ได้",
    number: "1323",
    tel: "1323",
  },
  {
    name: "เจ็บป่วยฉุกเฉิน",
    detail: "ถ้าตอนนี้รู้สึกไม่ปลอดภัย โทรได้เลยทันที",
    number: "1669",
    tel: "1669",
  },
];

export function SafetyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-3 text-sm font-medium text-ink shadow-card backdrop-blur-xl ring-1 ring-blush-200 transition-all hover:-translate-y-0.5 hover:shadow-lift"
      >
        <HeartHandshake className="h-4 w-4 text-blush-300" />
        <span className="hidden sm:inline">ต้องการคุยกับใครสักคน</span>
        <span className="sm:hidden">ขอความช่วยเหลือ</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-md overflow-hidden rounded-4xl bg-white p-6 shadow-lift sm:p-7"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="ปิด"
                className="absolute right-4 top-4 rounded-full p-1.5 text-ink-muted transition hover:bg-canvas"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-blush-100 px-3 py-1 text-xs font-medium text-blush-300">
                <MessageCircleHeart className="h-3.5 w-3.5" />
                คุณไม่ได้อยู่คนเดียว
              </div>
              <h2 className="mt-2 font-display text-2xl font-600 text-ink">
                ถ้าตอนนี้มันหนักอยู่
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                สิ่งที่เธอกำลังรู้สึกอยู่มันสำคัญ และเธอไม่ต้องรับมือกับมันคนเดียว
                มีคนที่พร้อมรับฟังเธอจริง ๆ โดยไม่ตัดสิน โทรฟรีและเป็นความลับ
                จะโทรเพื่อแค่ระบายก็ได้
              </p>

              <div className="mt-5 space-y-2.5">
                {HOTLINES.map((h) => (
                  <a
                    key={h.number}
                    href={`tel:${h.tel}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-canvas bg-canvas/60 px-4 py-3 transition hover:border-lavender-200 hover:bg-lavender-50"
                  >
                    <div>
                      <div className="text-sm font-600 text-ink">{h.name}</div>
                      <div className="text-xs text-ink-muted">{h.detail}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-500 px-3 py-1.5 text-sm font-600 text-white">
                      <Phone className="h-3.5 w-3.5" />
                      {h.number}
                    </span>
                  </a>
                ))}
              </div>

              <Link
                href="/play/cold-reset"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-mint-50 px-4 py-3 text-sm font-600 text-mint-600 transition hover:bg-mint-100"
              >
                ❄️ ระหว่างรอ ลองการ์ดรีเซ็ตด่วน 2 นาที
              </Link>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-muted">
                MindCard เป็นเครื่องมือดูแลใจเบื้องต้น ไม่ใช่บริการทางการแพทย์
                และไม่ทดแทนการพบผู้เชี่ยวชาญ
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
