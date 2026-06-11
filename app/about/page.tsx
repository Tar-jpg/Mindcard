import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  FlaskConical,
  HeartHandshake,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Reveal } from "@/components/Reveal";

const SOURCES = [
  {
    title: "กรมสุขภาพจิต — สถิติโรคซึมเศร้าในสังคมไทย",
    href: "https://dmh.go.th/news-dmh/view.asp?id=31459",
  },
  {
    title: "Hfocus — เด็กไทยป่วยซึมเศร้าสูง 2,200 ต่อแสนคน",
    href: "https://www.hfocus.org/content/2025/01/32784",
  },
  {
    title: "Mental Health Check-In — ระบบประเมินสุขภาพจิต",
    href: "https://checkin.dmh.go.th/dashboards/dash07",
  },
  {
    title: "PHQ-9 Depression Assessment Dataset",
    href: "https://www.kaggle.com/datasets/thedevastator/phq-9-depression-assessment/data",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh pb-28">
      <TopBar />

      <section className="section mt-10 sm:mt-14">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="pill bg-lavender-100 text-lavender-700">
              <FlaskConical className="h-3.5 w-3.5" /> เบื้องหลังงานวิจัย
            </span>
            <h1 className="mt-4 font-display text-4xl font-700 leading-tight text-ink sm:text-5xl">
              ทำไม “การ์ด” ถึง
              <span className="heading-gradient"> เปลี่ยนคลื่นสมอง</span> ได้
            </h1>
            <p className="mt-4 text-lg text-ink-soft text-balance">
              MindCard ไม่ได้ออกแบบจากความรู้สึก แต่สร้างบนทักษะบำบัดที่มี
              หลักฐาน และงานวิจัยที่วัดคลื่นสมองจริง
            </p>
          </div>
        </Reveal>

        {/* two pillars */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-100">
                <BrainCircuit className="h-6 w-6 text-lavender-600" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-700 text-ink">
                อ้างอิง DBT
              </h2>
              <p className="mt-1 text-sm font-600 uppercase tracking-wide text-lavender-500">
                Dialectical Behavior Therapy
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                ทุกการ์ดถอดมาจากทักษะ <b>Distress Tolerance</b> และ{" "}
                <b>Mindfulness</b> ของ DBT — แนวบำบัดที่มีงานวิจัยทางคลินิก
                รองรับว่าได้ผลกับภาวะอารมณ์แปรปรวนและความคิดทำร้ายตัวเอง
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {[
                  "เทคนิคการหายใจ (Paced Breathing · TIPP)",
                  "Grounding 5-4-3-2-1 ดึงสติกลับสู่ปัจจุบัน",
                  "Body Scan & Self-Soothe ด้วย 5 ผัสสะ",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-surface h-full overflow-hidden p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-100">
                <Activity className="h-6 w-6 text-mint-600" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-700 text-ink">
                วัดด้วย EEG จริง
              </h2>
              <p className="mt-1 text-sm font-600 uppercase tracking-wide text-mint-600">
                ร่วมกับคณะแพทยศาสตร์ จุฬาฯ
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                โครงการวิจัยวัดคลื่นสมองขณะเล่นการ์ดพบว่า{" "}
                <b>Structured Card Interaction</b> ช่วย:
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-mint-50 p-4 text-center">
                  <div className="font-display text-3xl font-700 text-mint-600">
                    ↑
                  </div>
                  <div className="text-xs text-ink-soft">
                    กระตุ้น Alpha Wave (สมองสงบ)
                  </div>
                </div>
                <div className="rounded-2xl bg-blush-100 p-4 text-center">
                  <div className="font-display text-3xl font-700 text-blush-300">
                    ↓
                  </div>
                  <div className="text-xs text-ink-soft">
                    ลดวงจรความคิดวนซ้ำ (Loop)
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                และเพราะทั้ง <b>ภาวะสมองเสื่อม</b> และ{" "}
                <b>ซึมเศร้าในวัยรุ่น</b> ต่างมีปัญหาการทำงานของ{" "}
                <b>Prefrontal Cortex</b> เหมือนกัน กลไกนี้จึงทำงานได้ข้ามช่วงอายุ
              </p>
            </div>
          </Reveal>
        </div>

        {/* mechanism strip */}
        <Reveal>
          <div className="mt-6 overflow-hidden rounded-4xl bg-gradient-to-br from-ink to-lavender-700 p-7 text-white sm:p-9">
            <div className="flex items-center gap-2 text-white/70">
              <Layers className="h-5 w-5" />
              <span className="text-sm">กลไกการทำงาน</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-4">
              {[
                { n: "1", t: "เล่นการ์ดเป็นจังหวะ", d: "Structured interaction" },
                { n: "2", t: "สมองมีโครงให้จับ", d: "ลดภาระ Prefrontal" },
                { n: "3", t: "Alpha Wave สูงขึ้น", d: "เข้าสู่โหมดสงบ" },
                { n: "4", t: "ความคิดวนซ้ำลดลง", d: "ออกจาก Loop" },
              ].map((s, i) => (
                <div key={s.n} className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-display font-700">
                    {s.n}
                  </div>
                  <div className="mt-2.5 font-600">{s.t}</div>
                  <div className="text-sm text-white/60">{s.d}</div>
                  {i < 3 && (
                    <ArrowRight className="absolute -right-3 top-1.5 hidden h-5 w-5 text-white/30 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* safety + sources */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blush-100">
                <ShieldCheck className="h-5 w-5 text-blush-300" />
              </div>
              <h2 className="mt-4 font-display text-xl font-700 text-ink">
                ความปลอดภัย & จริยธรรม
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
                {[
                  "ไม่เก็บข้อมูลส่วนตัว — ความรู้สึกอยู่แค่ในเครื่องผู้ใช้",
                  "ปุ่มขอความช่วยเหลือพร้อมสายด่วน 1323 ทุกหน้า",
                  "ใช้ภาษาเชิงบวก เลี่ยงการตีตราหรือวินิจฉัย",
                  "ระบุชัดว่าเป็นเครื่องมือเบื้องต้น ไม่ทดแทนแพทย์",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-blush-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-surface h-full p-7">
              <h2 className="font-display text-xl font-700 text-ink">
                แหล่งข้อมูลอ้างอิง
              </h2>
              <div className="mt-3 space-y-2.5">
                {SOURCES.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl bg-canvas/60 px-4 py-3 text-sm text-ink-soft transition hover:bg-lavender-50"
                  >
                    <span>{s.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-lavender-400" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 text-center">
            <Link href="/check-in" className="btn-primary text-base">
              ลองเล่นด้วยตัวเอง <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
