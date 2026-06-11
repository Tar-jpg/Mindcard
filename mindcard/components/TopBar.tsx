"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SoundToggle } from "./SoundToggle";

const LINKS = [
  { href: "/cards", label: "การ์ดทั้งหมด" },
  { href: "/dashboard", label: "แดชบอร์ด" },
  { href: "/about", label: "งานวิจัย" },
];

export function TopBar({ cta = true }: { cta?: boolean }) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 w-full">
      <div className="section mt-3">
        <div className="glass flex items-center justify-between rounded-full px-3 py-2 pl-4 shadow-soft">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-lavender-100 font-600 text-lavender-700"
                      : "text-ink-soft hover:bg-white/70"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <SoundToggle />
            {cta && (
              <Link
                href="/check-in"
                className="hidden rounded-full bg-gradient-to-r from-lavender-500 to-lavender-400 px-5 py-2 text-sm font-600 text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex"
              >
                เริ่มเช็คอิน
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
