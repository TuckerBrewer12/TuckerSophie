"use client";

import React, { useState } from "react";

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type Tooltip = { row: number; col: number; value: number };

export function HeatmapGrid({ grid }: { grid: number[][] }) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const max = Math.max(...grid.flat());

  const colorFor = (v: number) => {
    if (v === 0) return "var(--cream-deep)";
    const t = v / max;
    return `oklch(${0.94 - t * 0.32} ${0.04 + t * 0.14} 22)`;
  };

  const hourLabel = (h: number) => {
    if (h === 0) return "12am";
    if (h === 12) return "12pm";
    return h < 12 ? `${h}am` : `${h - 12}pm`;
  };

  return (
    <div style={{ position: "relative" }}>
      {tooltip && (
        <div
          style={{
            position: "absolute",
            top: -48,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ink)",
            color: "white",
            borderRadius: 10,
            padding: "7px 14px",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(43,31,28,0.18)",
            fontFamily: "var(--font-hand)",
            fontSize: 18,
          }}
        >
          {DAYS[tooltip.row]} {hourLabel(tooltip.col)} — {tooltip.value.toLocaleString()} messages
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44px repeat(24, 1fr)",
          gap: 4,
          minWidth: 520,
        }}
      >
        <div />
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={`h-${h}`}
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              textAlign: "center",
              color: "var(--ink-faint)",
              paddingBottom: 4,
            }}
          >
            {h % 6 === 0 ? (h === 0 ? "12a" : h === 12 ? "12p" : h > 12 ? `${h - 12}p` : `${h}a`) : ""}
          </div>
        ))}

        {grid.map((row, r) => (
          <React.Fragment key={r}>
            <div
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: 18,
                color: "var(--ink-soft)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {DAYS[r]}
            </div>
            {row.map((v, c) => (
              <div
                key={`${r}-${c}`}
                aria-label={`${DAYS[r]} ${hourLabel(c)}, ${v} messages`}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 6,
                  background: colorFor(v),
                  border: "1px solid rgba(43,31,28,0.04)",
                  transition: "transform 0.12s",
                  cursor: "default",
                }}
                onMouseEnter={() => setTooltip({ row: r, col: c, value: v })}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 24,
          fontFamily: "var(--font-hand)",
          fontSize: 18,
          color: "var(--ink-soft)",
        }}
      >
        <span>quiet</span>
        <div style={{ display: "flex", gap: 3 }}>
          {[0.05, 0.25, 0.5, 0.75, 1].map((t) => (
            <div
              key={t}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                background: `oklch(${0.94 - t * 0.32} ${0.04 + t * 0.14} 22)`,
              }}
            />
          ))}
        </div>
        <span>loud</span>
      </div>
    </div>
  );
}
