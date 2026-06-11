export interface Mood {
  id: string;
  emoji: string;
  label: string;
  sub: string;
  /** baseline "ใจ" energy 0–100 — never shown as "stress" to the user */
  energy: number;
  ring: string; // tailwind ring/border color
  glow: string; // hex for soft glow
}

// Neutral, non-clinical language. We never use the word "เครียด" on screen.
export const MOODS: Mood[] = [
  {
    id: "overwhelmed",
    emoji: "😵‍💫",
    label: "ท่วมท้น",
    sub: "ทุกอย่างมันเยอะไปหมด",
    energy: 18,
    ring: "ring-blush-300",
    glow: "#F29BBA",
  },
  {
    id: "anxious",
    emoji: "😟",
    label: "ใจไม่นิ่ง",
    sub: "คิดวนไปวนมา หยุดไม่ได้",
    energy: 32,
    ring: "ring-peach-300",
    glow: "#FFA985",
  },
  {
    id: "heavy",
    emoji: "😔",
    label: "เหนื่อยใจ",
    sub: "หนัก ๆ บอกไม่ถูก",
    energy: 42,
    ring: "ring-lavender-300",
    glow: "#B3A6F6",
  },
  {
    id: "meh",
    emoji: "😐",
    label: "เฉย ๆ",
    sub: "ก็เรื่อย ๆ ไม่มีอะไร",
    energy: 56,
    ring: "ring-sky-300",
    glow: "#8FC8EE",
  },
  {
    id: "okay",
    emoji: "🙂",
    label: "พอไหว",
    sub: "โอเคอยู่ แค่อยากพัก",
    energy: 72,
    ring: "ring-mint-300",
    glow: "#74DECB",
  },
  {
    id: "calm",
    emoji: "😌",
    label: "สบายใจ",
    sub: "รู้สึกเบา ๆ กำลังดี",
    energy: 86,
    ring: "ring-mint-400",
    glow: "#4FCFBA",
  },
];

export function moodById(id: string | null): Mood | undefined {
  if (!id) return undefined;
  return MOODS.find((m) => m.id === id);
}
