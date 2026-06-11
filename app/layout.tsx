import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, Mali } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/lib/session";
import { SafetyButton } from "@/components/SafetyButton";

const body = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Mali({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindCard — พื้นที่พักใจ 3 นาที สำหรับวัยรุ่น",
  description:
    "เว็บแอปการ์ดฝึกใจสั้น ๆ อ้างอิง DBT และงานวิจัย EEG จุฬาฯ ช่วยวัยรุ่น 13–17 ปี กลับมาสงบในวันที่หนักเกินไป",
  metadataBase: new URL("https://mindcard.vercel.app"),
  openGraph: {
    title: "MindCard — พื้นที่พักใจ 3 นาที",
    description:
      "การ์ดฝึกใจสั้น ๆ อ้างอิง DBT + งานวิจัย EEG จุฬาฯ สำหรับวัยรุ่นกรุงเทพฯ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7C6BF0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${body.variable} ${display.variable}`}>
      <body className="relative">
        <div className="pointer-events-none fixed inset-0 grain -z-10" />
        <SessionProvider>
          {children}
          <SafetyButton />
        </SessionProvider>
      </body>
    </html>
  );
}
