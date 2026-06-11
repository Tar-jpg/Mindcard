import Link from "next/link";
import {
  Activity,
  BrainCircuit,
  HeartHandshake,
  LineChart,
  ListChecks,
  Music4,
  ShieldCheck,
  Sparkles,
  Timer,
  Wind,
  ArrowRight,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Reveal } from "@/components/Reveal";
import { FeaturedCards } from "@/components/FeaturedCards";

const STATS = [
  { value: "295", unit: "คน", label: "จิตแพทย์เด็กทั่วประเทศ — ยังไม่พอจริง ๆ" },
  { value: "30%", unit: "", label: "ของคนที่มีเรื่องในใจ ได้เข้าถึงการดูแล" },
  { value: "3", unit: "นาที", label: "เริ่มดูแลใจได้ทันที ทุกที่ทุกเวลา" },
  { value: "ฟรี", unit: "", label: "ไม่ต้องบอกชื่อ และเป็นความลับเสมอ" },
];

const FLOW = [
  {
    icon: Sparkles,
    step: "01",
    title: "เช็คอินใจ",
    desc: "“ตอนนี้รู้สึกยังไง?” เลือกอารมณ์แบบไม่ต้องอธิบาย ไม่มีคำว่าเครียดให้กดดัน",
    tint: "from-lavender-200 to-lavender-100",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "เลือกการ์ด",
    desc: "เลือกการ์ดฝึกใจสั้น ๆ ที่เหมาะกับสิ่งที่กำลังรู้สึก ใช้เวลาแค่ 2–4 นาที",
    tint: "from-mint-200 to-mint-100",
  },
  {
    icon: Wind,
    step: "03",
    title: "ฝึกใจทีละสเต็ป",
    desc: "มีภาพหายใจ ไทม์เมอร์ และเสียงบรรยากาศพาไปทีละขั้น ไม่ต้องคิดเอง",
    tint: "from-sky-200 to-sky-100",
  },
  {
    icon: Activity,
    step: "04",
    title: "ทบทวนความรู้สึก",
    desc: "เช็คอินอีกครั้งหลังเล่นจบ เพื่อให้เห็นว่าใจขยับไปทางไหน",
    tint: "from-peach-200 to-peach-100",
  },
  {
    icon: LineChart,
    step: "05",
    title: "สรุปอย่างอ่อนโยน",
    desc: "ไม่มีคะแนน ไม่มีถูกผิด มีแค่บันทึกใจที่ค่อย ๆ สะสมโดยไม่กดดัน",
    tint: "from-blush-200 to-blush-100",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "เช็คอินอารมณ์",
    desc: "ใช้ภาษาเป็นกลาง เลี่ยงคำว่า “เครียด” เพื่อไม่ให้รู้สึกถูกตัดสิน",
  },
  {
    icon: Wind,
    title: "การ์ดฝึกใจ DBT",
    desc: "หายใจ · Body Scan · Grounding อิงหลัก Dialectical Behavior Therapy",
  },
  {
    icon: Timer,
    title: "โหมดฝึกมีไทม์เมอร์",
    desc: "พาไปทีละสเต็ปพร้อมภาพหายใจ ทำตามได้แม้ในวินาทีที่หัวยุ่งที่สุด",
  },
  {
    icon: HeartHandshake,
    title: "ตัวช่วยเมื่อหนักเกินไป",
    desc: "ปุ่มขอความช่วยเหลือพร้อมสายเด็ก 1387 และ 1323 อยู่ทุกหน้า กดโทรได้ทันที",
  },
  {
    icon: LineChart,
    title: "บันทึกใจส่วนตัว",
    desc: "เห็นความรู้สึกที่ค่อย ๆ สะสม โดยไม่มีคะแนน ไม่มีการตัดสิน",
  },
  {
    icon: Music4,
    title: "เสียง & ธีมสบายตา",
    desc: "เสียงบรรยากาศกล่อมใจและโทนสีอ่อนโยน ออกแบบให้รู้สึกปลอดภัย",
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh pb-24">
      <TopBar />

      {/* HERO */}
      <section className="section relative pt-10 sm:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-lavender-200/40 blur-3xl" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="pill glass text-ink-soft shadow-soft">
                <span className="h-2 w-2 rounded-full bg-mint-400" />
                พื้นที่พักใจสำหรับวัยรุ่น 13–17 ปี
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-700 leading-tight text-ink sm:text-5xl lg:text-6xl">
                วันที่ทุกอย่าง
                <br />
                <span className="heading-gradient">หนักเกินจะแบก</span>
                <br />
                พักใจ 3 นาทีก่อน
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft text-balance">
                MindCard คือการ์ดฝึกใจสั้น ๆ ที่หยิบมาเล่นได้ทันที
                ในจังหวะที่ยังไม่มีใครรับฟัง ทุกการ์ดอ้างอิงจาก DBT
                และงานวิจัย EEG ของคณะแพทยศาสตร์ จุฬาฯ
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/check-in" className="btn-primary text-base">
                  เริ่มเช็คอินใจ
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/cards" className="btn-ghost text-base">
                  ดูการ์ดทั้งหมด
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-4 text-sm text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-mint-500" /> ไม่ต้องสมัคร
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <HeartHandshake className="h-4 w-4 text-blush-300" /> ฟรี
                  ไม่มีโฆษณา
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BrainCircuit className="h-4 w-4 text-lavender-500" /> อิงงานวิจัย
                </span>
              </div>
            </Reveal>
          </div>

          {/* Hero visual: floating cards + breathing hint */}
          <Reveal delay={0.15}>
            <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-lavender-300/50 to-mint-300/50 blur-2xl" />
              {/* breathing orb */}
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-lavender-400 to-mint-400 shadow-glow animate-floaty">
                <div className="absolute inset-0 rounded-full bg-lavender-300/40 animate-pulseRing" />
                <div className="text-center text-white">
                  <div className="font-display text-lg font-600">หายใจเข้า</div>
                  <div className="text-5xl font-700">4</div>
                </div>
              </div>
              {/* floating mini cards */}
              <div className="absolute -left-2 top-6 w-36 rotate-[-8deg] rounded-3xl bg-white p-3 shadow-card animate-floatySlow">
                <div className="flex h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mint-200 to-mint-100 text-3xl">
                  🌿
                </div>
                <div className="mt-2 text-xs font-600 text-ink">5-4-3-2-1</div>
                <div className="text-[10px] text-ink-muted">ดึงใจกลับมา</div>
              </div>
              <div
                className="absolute -right-2 bottom-8 w-36 rotate-[7deg] rounded-3xl bg-white p-3 shadow-card animate-floaty"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="flex h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-200 to-peach-100 text-3xl">
                  🍵
                </div>
                <div className="mt-2 text-xs font-600 text-ink">ปลอบใจ</div>
                <div className="text-[10px] text-ink-muted">5 ผัสสะ</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="section mt-16 sm:mt-24">
        <Reveal>
          <div className="card-surface grid grid-cols-2 gap-6 p-7 sm:p-9 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-3xl font-700 text-lavender-600 sm:text-4xl">
                  {s.value}
                  <span className="ml-0.5 text-base font-500 text-ink-muted">
                    {s.unit}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-snug text-ink-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-3 text-center text-xs text-ink-muted">
          MindCard อยากเป็นก้าวแรกเล็ก ๆ ที่เข้าถึงง่าย ในวันที่ยังไม่พร้อมไปหาใคร
        </p>
      </section>

      {/* HOW IT WORKS — UX แต่ละขั้นตอน */}
      <section className="section mt-20 sm:mt-28">
        <Reveal>
          <div className="text-center">
            <span className="pill bg-lavender-100 text-lavender-700">
              UX แต่ละขั้นตอน
            </span>
            <h2 className="mt-3 font-display text-3xl font-700 text-ink sm:text-4xl">
              5 ก้าวเล็ก ๆ จาก “ท่วมท้น” สู่ “พอหายใจได้”
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
              ออกแบบให้จบใน 3 นาที ทำตามได้แม้ในวันที่หัวยุ่งที่สุด
              ทุกหน้าจอพูดกับผู้ใช้อย่างอ่อนโยน
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FLOW.map((f, i) => (
            <Reveal key={f.step} delay={i * 0.07}>
              <div className="relative h-full overflow-hidden rounded-4xl bg-white p-5 shadow-card ring-1 ring-white">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.tint}`}
                >
                  <f.icon className="h-6 w-6 text-ink" />
                </div>
                <div className="font-display text-sm font-600 text-lavender-400">
                  {f.step}
                </div>
                <h3 className="mt-0.5 font-display text-lg font-600 text-ink">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED CARDS */}
      <section className="section mt-20 sm:mt-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="pill bg-mint-100 text-mint-600">
                คลังการ์ดฝึกใจ
              </span>
              <h2 className="mt-3 font-display text-3xl font-700 text-ink sm:text-4xl">
                หยิบการ์ดที่ใช่กับสิ่งที่รู้สึก
              </h2>
            </div>
            <Link
              href="/cards"
              className="inline-flex items-center gap-1.5 text-sm font-600 text-lavender-600 hover:gap-2.5"
            >
              ดูทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8">
          <FeaturedCards limit={3} />
        </div>
      </section>

      {/* WHY IT WORKS — research */}
      <section className="section mt-20 sm:mt-28">
        <Reveal>
          <div className="card-surface overflow-hidden p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="pill bg-lavender-100 text-lavender-700">
                  ทำไมถึงได้ผล
                </span>
                <h2 className="mt-3 font-display text-3xl font-700 text-ink">
                  ไม่ใช่แค่แอปทำให้รู้สึกดี แต่มีงานวิจัยรองรับ
                </h2>
                <div className="mt-6 space-y-5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lavender-100">
                      <BrainCircuit className="h-5 w-5 text-lavender-600" />
                    </div>
                    <div>
                      <h3 className="font-600 text-ink">
                        อ้างอิง DBT ที่มีหลักฐานทางคลินิก
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        ทุกการ์ดสร้างจากทักษะ Distress Tolerance &amp;
                        Mindfulness ของ Dialectical Behavior Therapy
                        ที่ใช้จริงในการบำบัด
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint-100">
                      <Activity className="h-5 w-5 text-mint-600" />
                    </div>
                    <div>
                      <h3 className="font-600 text-ink">
                        วัดคลื่นสมองจริงด้วย EEG
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        งานวิจัยร่วมกับคณะแพทยศาสตร์ จุฬาฯ พบว่า Structured
                        Card Interaction กระตุ้น Alpha Wave และลดวงจรความคิด
                        วนซ้ำใน Loop สมอง
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-600 text-lavender-600 hover:gap-2.5"
                >
                  อ่านเบื้องหลังงานวิจัย <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* EEG-ish visual */}
              <div className="relative">
                <div className="rounded-4xl bg-gradient-to-br from-ink to-lavender-700 p-7 text-white shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">
                      Alpha Wave · ขณะเล่นการ์ด
                    </span>
                    <span className="pill bg-white/15 text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
                      live
                    </span>
                  </div>
                  <svg viewBox="0 0 320 120" className="mt-5 w-full">
                    <polyline
                      fill="none"
                      stroke="#74DECB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      points="0,80 20,70 40,90 60,40 80,95 100,60 120,85 140,55 160,75 180,45 200,82 220,58 240,78 260,50 280,72 300,60 320,70"
                    />
                    <polyline
                      fill="none"
                      stroke="#9683F1"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      points="0,60 30,64 60,58 90,66 120,60 150,70 180,62 210,68 240,60 270,66 300,62 320,64"
                    />
                  </svg>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <div className="font-display text-2xl font-700 text-mint-300">
                        +
                      </div>
                      <div className="text-[11px] text-white/70">Alpha</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      <div className="font-display text-2xl font-700 text-blush-200">
                        −
                      </div>
                      <div className="text-[11px] text-white/70">
                        ความคิดวนซ้ำ
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      <div className="font-display text-2xl font-700 text-peach-200">
                        ↑
                      </div>
                      <div className="text-[11px] text-white/70">
                        Prefrontal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="section mt-20 sm:mt-28">
        <Reveal>
          <div className="text-center">
            <span className="pill bg-peach-100 text-peach-500">
              ฟีเจอร์ในตัวต้นแบบ
            </span>
            <h2 className="mt-3 font-display text-3xl font-700 text-ink sm:text-4xl">
              ครบทุกอย่างที่ใจต้องการในที่เดียว
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-4xl bg-white/70 p-6 shadow-soft ring-1 ring-white backdrop-blur transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-100">
                  <f.icon className="h-6 w-6 text-lavender-600" />
                </div>
                <h3 className="mt-4 font-display text-lg font-600 text-ink">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section mt-20 sm:mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-gradient-to-br from-lavender-500 via-lavender-500 to-mint-500 p-10 text-center shadow-lift sm:p-16">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative font-display text-3xl font-700 text-white sm:text-4xl">
              ใจคุณก็สำคัญพอที่จะได้พัก
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/85">
              ไม่ต้องรอให้ถึงจุดที่ทนไม่ไหว เริ่มดูแลใจตัวเองได้ตั้งแต่วันนี้
              ใช้เวลาแค่ 3 นาที
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/check-in"
                className="btn bg-white px-8 py-3.5 text-base font-600 text-lavender-600 shadow-soft hover:-translate-y-0.5"
              >
                เริ่มเช็คอินใจ
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="btn border border-white/40 px-8 py-3.5 text-base font-600 text-white hover:bg-white/10"
              >
                ดูแดชบอร์ดตัวอย่าง
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="section mt-16 text-center">
        <p className="text-sm text-ink-muted">
          MindCard · ต้นแบบเพื่อ HacKaTech — PEOPLE Track · ดูแลใจวัยรุ่นกรุงเทพฯ
        </p>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-ink-muted">
          เครื่องมือดูแลใจเบื้องต้น ไม่ใช่บริการทางการแพทย์
          หากต้องการความช่วยเหลือเร่งด่วน โทร 1323 (กรมสุขภาพจิต) ตลอด 24 ชม.
        </p>
      </footer>
    </main>
  );
}
