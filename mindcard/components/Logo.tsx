import Link from "next/link";

export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="mc-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9683F1" />
          <stop offset="0.55" stopColor="#7C6BF0" />
          <stop offset="1" stopColor="#4FCFBA" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="4"
        width="30"
        height="40"
        rx="9"
        fill="url(#mc-g)"
        transform="rotate(-8 21 24)"
      />
      <rect
        x="12"
        y="6"
        width="30"
        height="40"
        rx="9"
        fill="white"
        fillOpacity="0.92"
        transform="rotate(6 27 26)"
      />
      {/* sprout / calm heart */}
      <path
        d="M27 34c-5-3.4-9-6.6-9-11a4.6 4.6 0 0 1 9-1.6A4.6 4.6 0 0 1 36 23c0 4.4-4 7.6-9 11Z"
        fill="#7C6BF0"
        transform="rotate(6 27 26)"
      />
      <circle cx="33.5" cy="15.5" r="2.2" fill="#4FCFBA" transform="rotate(6 27 26)" />
    </svg>
  );
}

export function Logo({ withWord = true }: { withWord?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <Mark className="h-9 w-9 drop-shadow-sm transition-transform group-hover:-rotate-3" />
      {withWord && (
        <span className="font-display text-xl font-600 text-ink">
          Mind<span className="text-lavender-500">Card</span>
        </span>
      )}
    </Link>
  );
}
