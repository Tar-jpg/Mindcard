export type StepKind = "prompt" | "breath" | "timer" | "close";

export interface BreathPattern {
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

export interface CardStep {
  kind: StepKind;
  title: string;
  text: string;
  /** auto-advance seconds. 0 = wait for tap. */
  seconds: number;
  breath?: BreathPattern;
  cue?: string; // tiny helper line
}

export type CategoryId =
  | "breath"
  | "ground"
  | "body"
  | "soothe"
  | "reset";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: "breath", label: "หายใจ", emoji: "🫧" },
  { id: "ground", label: "ดึงใจกลับ", emoji: "🌿" },
  { id: "body", label: "ผ่อนกาย", emoji: "🌙" },
  { id: "soothe", label: "ปลอบใจ", emoji: "🍵" },
  { id: "reset", label: "รีเซ็ตด่วน", emoji: "❄️" },
];

export interface Card {
  id: string;
  title: string;
  en: string;
  category: CategoryId;
  emoji: string;
  minutes: number;
  goodFor: string[];
  blurb: string;
  /** DBT skill this card is built on */
  skill: string;
  gradient: string; // tailwind classes for the card face
  accent: string; // hex used for orbs / progress
  steps: CardStep[];
}

export const CARDS: Card[] = [
  {
    id: "box-breath",
    title: "หายใจสี่เหลี่ยม",
    en: "Box Breathing",
    category: "breath",
    emoji: "🫧",
    minutes: 3,
    goodFor: ["ใจเต้นแรง", "ก่อนพรีเซนต์", "คิดไม่หยุด"],
    blurb: "หายใจเป็นจังหวะเท่า ๆ กัน 4 ด้าน ช่วยบอกสมองว่า ‘ตอนนี้ปลอดภัยแล้วนะ’",
    skill: "DBT · TIPP — Paced Breathing",
    gradient: "from-lavender-200 via-lavender-100 to-sky-100",
    accent: "#7C6BF0",
    steps: [
      {
        kind: "prompt",
        title: "นั่งลงสบาย ๆ ก่อน",
        text: "วางเท้าทั้งสองข้างลงกับพื้น ปล่อยไหล่ลง ไม่ต้องนั่งตรงเป๊ะ เอาที่รู้สึกสบายพอ",
        seconds: 0,
        cue: "แตะเพื่อไปต่อเมื่อพร้อม",
      },
      {
        kind: "breath",
        title: "หายใจตามวงกลม",
        text: "ค่อย ๆ ทำตามจังหวะ ไม่ต้องฝืน ถ้าเวียนหัวให้กลับมาหายใจปกติได้เลย",
        seconds: 80,
        breath: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
        cue: "เข้า 4 · ค้าง 4 · ออก 4 · ค้าง 4",
      },
      {
        kind: "prompt",
        title: "สังเกตตัวเองสักนิด",
        text: "ไหล่เบาลงไหม? ลมหายใจช้าลงหรือเปล่า? ไม่ต้องตอบให้ถูก แค่รับรู้เฉย ๆ",
        seconds: 0,
        cue: "แตะเพื่อไปต่อ",
      },
      {
        kind: "close",
        title: "ขอบคุณที่ให้เวลาตัวเองนะ",
        text: "ไม่ว่าตอนนี้จะรู้สึกยังไง การที่เธอลองหยุดมาหายใจสักครู่ก็มีความหมายแล้ว",
        seconds: 0,
      },
    ],
  },
  {
    id: "ground-54321",
    title: "5-4-3-2-1 ดึงใจกลับ",
    en: "5-4-3-2-1 Grounding",
    category: "ground",
    emoji: "🌿",
    minutes: 3,
    goodFor: ["คิดวนอดีต/อนาคต", "หลุดโฟกัส", "แพนิก"],
    blurb: "ใช้ประสาทสัมผัสทั้ง 5 พาความคิดที่ลอยไกล กลับมาอยู่ตรงนี้ ตอนนี้",
    skill: "DBT · Mindfulness — Grounding",
    gradient: "from-mint-200 via-mint-100 to-lavender-100",
    accent: "#34BBA6",
    steps: [
      {
        kind: "prompt",
        title: "มองรอบ ๆ ตัวช้า ๆ",
        text: "ไม่ต้องรีบ เราจะค่อย ๆ ไล่ทีละอย่าง ให้ใจมีอะไรจับ",
        seconds: 0,
        cue: "แตะเพื่อเริ่ม",
      },
      {
        kind: "timer",
        title: "👀 มองหา 5 สิ่งที่เห็น",
        text: "อะไรก็ได้รอบตัว — สีของกำแพง เงาตรงมุมห้อง รอยบนโต๊ะ ค่อย ๆ นับในใจ 1…2…3…4…5",
        seconds: 25,
      },
      {
        kind: "timer",
        title: "✋ สัมผัส 4 สิ่ง",
        text: "เนื้อผ้าที่ใส่ ผิวโต๊ะเย็น ๆ พื้นใต้เท้า ลองรับรู้ผิวสัมผัสของมันจริง ๆ",
        seconds: 22,
      },
      {
        kind: "timer",
        title: "👂 ฟัง 3 เสียง",
        text: "เสียงไกล ๆ เสียงใกล้ตัว หรือแม้แต่เสียงลมหายใจตัวเอง",
        seconds: 20,
      },
      {
        kind: "timer",
        title: "👃 ได้กลิ่น 2 อย่าง",
        text: "ถ้าไม่มีกลิ่นชัด ลองหายใจเข้าลึก ๆ แล้วสังเกตอากาศที่ผ่านจมูก",
        seconds: 16,
      },
      {
        kind: "timer",
        title: "👅 รับรส 1 อย่าง",
        text: "รสในปากตอนนี้ หรือจิบน้ำสักอึก แล้วรู้สึกถึงมัน",
        seconds: 12,
      },
      {
        kind: "close",
        title: "กลับมาอยู่ตรงนี้แล้วนะ",
        text: "ไม่ว่าความคิดจะยังวนอยู่บ้างหรือเบาลง เธอก็ได้ลองพาตัวเองกลับมาที่ปัจจุบันแล้ว",
        seconds: 0,
      },
    ],
  },
  {
    id: "body-scan",
    title: "สแกนร่างกายเบา ๆ",
    en: "Body Scan",
    category: "body",
    emoji: "🌙",
    minutes: 4,
    goodFor: ["เกร็งโดยไม่รู้ตัว", "นอนไม่หลับ", "ปวดหัวจากความคิด"],
    blurb: "ไล่ความสนใจจากปลายเท้าถึงหัว คลายจุดที่เกร็งค้างไว้โดยไม่รู้ตัว",
    skill: "DBT · Mindfulness — Body Awareness",
    gradient: "from-sky-200 via-lavender-100 to-mint-100",
    accent: "#6A55E0",
    steps: [
      {
        kind: "prompt",
        title: "เอนหลังหรือเอนหัวลง",
        text: "หลับตาได้ถ้าสะดวก หรือมองต่ำ ๆ ก็ได้ เราจะเดินทางไปทั่วร่างกายช้า ๆ",
        seconds: 0,
        cue: "แตะเพื่อเริ่ม",
      },
      {
        kind: "timer",
        title: "🦶 ปลายเท้า & ขา",
        text: "รู้สึกถึงเท้าที่แตะพื้น น่อง ต้นขา ถ้ามีจุดไหนเกร็ง ลองคลายมันลงตอนหายใจออก",
        seconds: 40,
      },
      {
        kind: "timer",
        title: "🫁 ท้อง & หน้าอก",
        text: "สังเกตท้องที่พองขึ้นยุบลงตามลมหายใจ ไม่ต้องบังคับ แค่ดูมันเคลื่อนไหว",
        seconds: 38,
      },
      {
        kind: "timer",
        title: "🤲 ไหล่ & แขน",
        text: "ไหล่หลายคนชอบยกค้างไว้ตลอดวัน ลองปล่อยมันไหลลง… เบาขึ้นเยอะเลย",
        seconds: 36,
      },
      {
        kind: "timer",
        title: "😶 ใบหน้า & กราม",
        text: "คลายหว่างคิ้ว คลายกราม ปล่อยลิ้นให้นิ่ง บริเวณนี้เก็บความตึงไว้เยอะกว่าที่คิด",
        seconds: 34,
      },
      {
        kind: "close",
        title: "ค่อย ๆ ลืมตาขึ้นมานะ",
        text: "ร่างกายที่ได้ผ่อนคลายแม้เพียงนิดเดียว ก็ช่วยกระซิบบอกใจเบา ๆ ว่า ‘ไม่เป็นไรนะ’",
        seconds: 0,
      },
    ],
  },
  {
    id: "breath-478",
    title: "หายใจ 4-7-8 ก่อนหลับ",
    en: "4-7-8 Breath",
    category: "breath",
    emoji: "😴",
    minutes: 3,
    goodFor: ["นอนไม่หลับ", "คิดมากตอนดึก", "อยากสงบเร็ว"],
    blurb: "ลมหายใจออกที่ยาวกว่าเข้า ช่วยเหยียบเบรกระบบประสาท ให้ร่างกายพร้อมพัก",
    skill: "DBT · TIPP — Paced Breathing",
    gradient: "from-lavender-300 via-lavender-100 to-sky-200",
    accent: "#5942C2",
    steps: [
      {
        kind: "prompt",
        title: "หรี่ไฟ ลดเสียงรอบตัว",
        text: "เอาตัวให้สบายที่สุด เอาลิ้นแตะเพดานปากเบา ๆ ไว้ตลอดการฝึก (เทคนิคนี้ช่วยได้)",
        seconds: 0,
        cue: "แตะเพื่อเริ่ม",
      },
      {
        kind: "breath",
        title: "หายใจออกให้ยาว",
        text: "เป่าลมออกทางปากช้า ๆ เหมือนเป่าเทียนเบา ๆ ปล่อยให้ออกยาวกว่าเข้าเสมอ",
        seconds: 76,
        breath: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
        cue: "เข้า 4 · ค้าง 7 · ออก 8",
      },
      {
        kind: "close",
        title: "ร่างกายเริ่มโหมดพักผ่อน",
        text: "ถ้ารู้สึกง่วง ปล่อยตัวเองหลับไปได้เลย ไม่ต้องเล่นต่อก็ได้ ฝันดีนะ",
        seconds: 0,
      },
    ],
  },
  {
    id: "self-soothe",
    title: "ปลอบใจด้วย 5 ผัสสะ",
    en: "Self-Soothe",
    category: "soothe",
    emoji: "🍵",
    minutes: 3,
    goodFor: ["เสียใจ", "รู้สึกโดดเดี่ยว", "อยากใจดีกับตัวเอง"],
    blurb: "ดูแลตัวเองผ่านประสาทสัมผัส เหมือนปฏิบัติกับเพื่อนที่กำลังเศร้าด้วยความอ่อนโยน",
    skill: "DBT · Self-Soothe with Five Senses",
    gradient: "from-blush-200 via-peach-100 to-lavender-100",
    accent: "#F2719C",
    steps: [
      {
        kind: "prompt",
        title: "พูดกับตัวเองสักประโยค",
        text: "ลองพูดในใจว่า ‘ตอนนี้มันยากจริง ๆ และไม่เป็นไรที่จะรู้สึกแบบนี้’",
        seconds: 0,
        cue: "แตะเพื่อไปต่อ",
      },
      {
        kind: "timer",
        title: "🤍 อ้อมกอดตัวเอง",
        text: "ลองวางมือบนหน้าอกหรือกอดแขนตัวเองเบา ๆ สัมผัสที่อบอุ่นช่วยให้ใจสงบได้จริง",
        seconds: 30,
      },
      {
        kind: "timer",
        title: "🌸 นึกถึงสิ่งที่ชอบ",
        text: "กลิ่นที่ชอบ เพลงที่ฟังแล้วอุ่นใจ ของชิ้นโปรด ค่อย ๆ นึกภาพมันชัด ๆ",
        seconds: 28,
      },
      {
        kind: "timer",
        title: "💬 ให้กำลังใจตัวเอง",
        text: "ถ้าเพื่อนรู้สึกแบบนี้ คุณจะพูดอะไรกับเขา? ลองพูดแบบนั้นกับตัวเองดู",
        seconds: 26,
      },
      {
        kind: "close",
        title: "ใจดีกับตัวเองได้เสมอนะ",
        text: "ในวันที่รู้สึกเหมือนไม่มีใครเข้าใจ เธอยังเลือกอ่อนโยนกับตัวเอง แค่นี้ก็พอแล้ว",
        seconds: 0,
      },
    ],
  },
  {
    id: "cold-reset",
    title: "รีเซ็ตด้วยความเย็น",
    en: "Cold Reset · TIPP",
    category: "reset",
    emoji: "❄️",
    minutes: 2,
    goodFor: ["อารมณ์พุ่งสุด", "อยากร้องไห้", "ต้องสงบเดี๋ยวนี้"],
    blurb: "เมื่ออารมณ์แรงมากจนคิดไม่ออก ความเย็นช่วยรีเซ็ตระบบประสาทได้เร็วที่สุด",
    skill: "DBT · TIPP — Temperature",
    gradient: "from-sky-200 via-mint-100 to-lavender-100",
    accent: "#239585",
    steps: [
      {
        kind: "prompt",
        title: "นี่คือการ์ดสำหรับช่วงที่หนักจริง ๆ",
        text: "ถ้าตอนนี้รู้สึกท่วมท้นมาก เราจะใช้ความเย็นช่วยเบรกอารมณ์ก่อน แล้วค่อยคิดต่อ",
        seconds: 0,
        cue: "แตะเพื่อเริ่ม",
      },
      {
        kind: "timer",
        title: "❄️ หาความเย็นมาแตะหน้า",
        text: "น้ำเย็นลูบหน้า ผ้าเย็น หรือถือแก้วน้ำเย็นแนบแก้ม โดยเฉพาะรอบดวงตาและโหนกแก้ม",
        seconds: 30,
      },
      {
        kind: "breath",
        title: "หายใจออกยาว ๆ ตาม",
        text: "พร้อมกับความเย็น ค่อย ๆ ผ่อนลมหายใจออกให้ยาว ร่างกายจะเริ่มสงบลงเอง",
        seconds: 38,
        breath: { inhale: 4, hold1: 2, exhale: 7, hold2: 0 },
        cue: "เข้า 4 · ออก 7 ยาว ๆ",
      },
      {
        kind: "close",
        title: "อารมณ์เหมือนคลื่น เดี๋ยวมันก็ลง",
        text: "คลื่นที่แรง ๆ ไม่ได้อยู่กับเราตลอดไป และถ้าตอนนี้ยังหนักอยู่ การบอกใครสักคนก็โอเคนะ",
        seconds: 0,
      },
    ],
  },
];

export function cardById(id: string | null | undefined): Card | undefined {
  if (!id) return undefined;
  return CARDS.find((c) => c.id === id);
}

export function categoryLabel(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

/** Total practice seconds for the timed/breath steps (used for the play bar). */
export function cardTotalSeconds(card: Card): number {
  return card.steps.reduce((sum, s) => sum + (s.seconds || 0), 0);
}
