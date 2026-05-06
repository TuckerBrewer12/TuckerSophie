"use client";

import { useState } from "react";

type Point = { m: string; c: number; note?: string };

export function TimelineChart({ points }: { points: Point[] }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: Point } | null>(null);

  const max = Math.max(...points.map((p) => p.c));
  const W = 1000;
  const PAD_T = 55; // extra headroom for staggered labels
  const PAD_B = 50;
  const CHART_H = 240;
  const H = PAD_T + CHART_H + PAD_B;

  const xAt = (i: number) => (i / (points.length - 1)) * W;
  const yAt = (c: number) => PAD_T + CHART_H - (c / max) * CHART_H;

  // Stagger annotated points so labels don't collide
  // Assign each annotated point a "lane" (0 = closest to line, 1 = mid, 2 = highest)
  const annotated = points.map((p, i) => ({ p, i })).filter(({ p }) => p.note);
  // explicit lift per annotation — large variation so nearby labels don't touch
  const laneHeights = [38, 100, 55, 80, 42, 38];
  const lanes = annotated.map((_, j) => Math.min(j, laneHeights.length - 1));

  // Text anchor: clamp near edges
  const anchorFor = (i: number) => {
    const x = xAt(i);
    if (x < 80) return "start";
    if (x > W - 80) return "end";
    return "middle";
  };

  const path = points
    .map((p, i) => {
      const x = xAt(i);
      const y = yAt(p.c);
      if (i === 0) return `M ${x} ${y}`;
      const px = xAt(i - 1);
      const py = yAt(points[i - 1].c);
      const cx = (px + x) / 2;
      return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${path} L ${xAt(points.length - 1)} ${PAD_T + CHART_H} L ${xAt(0)} ${PAD_T + CHART_H} Z`;

  return (
    <div style={{ position: "relative" }}>
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: `${(tooltip.x / W) * 100}%`,
            top: `${(tooltip.y / H) * 100}%`,
            transform: "translate(-50%, -130%)",
            background: "var(--ink)",
            color: "white",
            borderRadius: 10,
            padding: "8px 14px",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(43,31,28,0.18)",
          }}
        >
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 18 }}>{tooltip.point.m}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, opacity: 0.8 }}>
            {tooltip.point.c.toLocaleString()} messages
          </div>
        </div>
      )}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", minWidth: 700, height: "auto", display: "block", overflow: "visible" }}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e85d6f" stopOpacity="0.35" />
            <stop offset="1" stopColor="#e85d6f" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={0} x2={W}
            y1={PAD_T + CHART_H * (1 - t)}
            y2={PAD_T + CHART_H * (1 - t)}
            stroke="#b39e98" strokeWidth="1" strokeDasharray="2 6" opacity="0.5"
          />
        ))}

        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={path} fill="none" stroke="#e85d6f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Annotations with staggered heights */}
        {annotated.map(({ p, i }, j) => {
          const x = xAt(i);
          const y = yAt(p.c);
          const lift = laneHeights[lanes[j]];
          const anchor = anchorFor(i);
          // clamp text x so it doesn't overflow
          const textX = anchor === "start" ? Math.max(x, 4) : anchor === "end" ? Math.min(x, W - 4) : x;
          return (
            <g key={`n-${i}`}>
              <line
                x1={x} y1={y - 10}
                x2={x} y2={y - lift + 14}
                stroke="#b76b2e" strokeWidth="1.4" strokeDasharray="2 3"
              />
              <text
                x={textX} y={y - lift}
                textAnchor={anchor}
                fontFamily="Caveat, cursive"
                fontSize="21"
                fill="#b76b2e"
              >
                {p.note}
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        {points.map((p, i) =>
          i % 4 === 0 || i === points.length - 1 ? (
            <text
              key={`x-${i}`}
              x={xAt(i)} y={PAD_T + CHART_H + 26}
              textAnchor={anchorFor(i)}
              fontFamily="Nunito, sans-serif"
              fontSize="13" fill="#6a544f"
            >
              {p.m}
            </text>
          ) : null
        )}

        {/* Dots + hit targets */}
        {points.map((p, i) => (
          <g key={`dot-${i}`}>
            <circle
              cx={xAt(i)} cy={yAt(p.c)}
              r={p.note ? 6 : 3.2}
              fill={p.note ? "#fff" : "#e85d6f"}
              stroke="#e85d6f" strokeWidth="2.5"
            />
            <circle
              cx={xAt(i)} cy={yAt(p.c)} r={16}
              fill="transparent" style={{ cursor: "pointer" }}
              onMouseEnter={() => setTooltip({ x: xAt(i), y: yAt(p.c), point: p })}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
