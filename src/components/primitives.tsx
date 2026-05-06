"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function CountUp({
  to,
  duration = 1600,
  format = (n: number) => n.toLocaleString(),
}: {
  to: number;
  duration?: number;
  format?: (n: number) => string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{format(n)}</span>;
}

export function SophieTag() {
  return (
    <span className="tag sophie">
      <span className="dot sophie" /> Sophie
    </span>
  );
}

export function TuckerTag() {
  return (
    <span className="tag tucker">
      <span className="dot tucker" /> Tucker
    </span>
  );
}

export function Squiggle() {
  return (
    <svg className="squiggle" viewBox="0 0 200 18" fill="none" aria-hidden="true">
      <path
        d="M2 9 Q 18 2, 34 9 T 66 9 T 98 9 T 130 9 T 162 9 T 198 9"
        stroke="#e85d6f"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = (i * 7.3 + 4) % 96;
    const delay = (i * 0.4) % 6;
    const dur = 8 + ((i * 1.7) % 6);
    const size = 14 + ((i * 5) % 22);
    return (
      <svg
        key={i}
        viewBox="0 0 24 22"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: `${left}%`,
          bottom: -40,
          width: size,
          height: size,
          opacity: 0.55,
          animation: `floatUp ${dur}s linear ${delay}s infinite`,
        }}
      >
        <path
          d="M12 21 C 4 14, 1 10, 1 6 C 1 2.5, 4 1, 6.5 1 C 9 1, 11 2.5, 12 5 C 13 2.5, 15 1, 17.5 1 C 20 1, 23 2.5, 23 6 C 23 10, 20 14, 12 21 Z"
          fill="#e85d6f"
        />
      </svg>
    );
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {hearts}
    </div>
  );
}
