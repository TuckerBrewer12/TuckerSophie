import React from "react";
import { Reveal, CountUp, SophieTag, TuckerTag, Squiggle } from "./primitives";
import { TimelineChart } from "./TimelineChart";
import { HeatmapGrid } from "./HeatmapGrid";
import type { Data } from "@/data/types";

// ============================================================
// COVER
// ============================================================
export function Cover({ data }: { data: Data }) {
  return (
    <section
      className="full"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 80 }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: 40 }}>
          <svg
            width="80"
            height="72"
            viewBox="0 0 24 22"
            aria-hidden="true"
            style={{ filter: "drop-shadow(0 6px 0 rgba(232,93,111,0.15))" }}
          >
            <path
              d="M12 21 C 4 14, 1 10, 1 6 C 1 2.5, 4 1, 6.5 1 C 9 1, 11 2.5, 12 5 C 13 2.5, 15 1, 17.5 1 C 20 1, 23 2.5, 23 6 C 23 10, 20 14, 12 21 Z"
              fill="#e85d6f"
            />
          </svg>
        </div>
        <p className="eyebrow" style={{ fontSize: 36 }}>for Sophie,</p>
        <h1 style={{ fontStyle: "italic", marginBottom: 32, fontSize: "clamp(36px, 8vw, 96px)" }}>
          a little record of <span className="scribble">everything we&apos;ve said.</span>
        </h1>
        <p className="lead" style={{ margin: "0 auto 60px", maxWidth: "44ch" }}>
          I love you Soph!
        </p>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "var(--ink-faint)",
          }}
        >
          <span
            className="tag"
            style={{ background: "transparent", color: "var(--ink-soft)", fontSize: 18 }}
          >
            {data.meta.startDate} → {data.meta.endDate}
          </span>
          <svg
            width="20"
            height="36"
            viewBox="0 0 20 36"
            aria-hidden="true"
            style={{ marginTop: 12, animation: "bob 2.4s ease-in-out infinite" }}
          >
            <path
              d="M10 2 V 30 M 4 24 L 10 32 L 16 24"
              stroke="#b39e98"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontFamily: "var(--font-hand)", fontSize: 20, color: "var(--ink-soft)" }}>
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// VOLUME
// ============================================================
export function Volume({ data }: { data: Data }) {
  const v = data.volume;
  const sophiePct = (v.sophie / v.total) * 100;
  return (
    <section>
      <Reveal>
        <p className="eyebrow">how much we talk</p>
        <h2>
          We sent each other <em className="italic">{v.total.toLocaleString()}</em> messages.
        </h2>
        <p className="lead" style={{ marginBottom: 56 }}>
          That&apos;s about {Math.round(v.total / data.meta.days)} a day, every day,
          for {data.meta.days} days. Even on the days we were together.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="card" style={{ padding: "48px 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 24, color: "var(--sophie)" }}>
                Sophie sent
              </div>
              <div className="stat-num" style={{ color: "var(--sophie)" }}>
                <CountUp to={v.sophie} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 24, color: "#b76b2e" }}>
                Tucker sent
              </div>
              <div className="stat-num" style={{ color: "var(--tucker)" }}>
                <CountUp to={v.tucker} />
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              height: 36,
              borderRadius: 999,
              overflow: "hidden",
              background: "var(--cream-deep)",
              boxShadow: "inset 0 2px 0 rgba(43,31,28,0.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${sophiePct}%`,
                background: "var(--sophie)",
                borderRadius: "999px 0 0 999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${sophiePct}%`,
                right: 0,
                background: "var(--tucker)",
                borderRadius: "0 999px 999px 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 12,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                color: "white",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {v.sophie.toLocaleString()}
            </div>
            <div
              style={{
                position: "absolute",
                right: 12,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                color: "white",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {v.tucker.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              fontFamily: "var(--font-hand)",
              fontSize: 20,
              color: "var(--ink-soft)",
            }}
          >
            <span>{sophiePct.toFixed(1)}%</span>
            <span style={{ textAlign: "center", flex: 1 }}>
              i talk a little more. sorry about that.
            </span>
            <span>{(100 - sophiePct).toFixed(1)}%</span>
          </div>
        </div>
      </Reveal>

      <Squiggle />

      <Reveal>
        <div className="grid-3">
          <div className="card tilt-l" style={{ textAlign: "center" }}>
            <div className="stat-num">{v.total.toLocaleString()}</div>
            <div className="stat-label">total texts</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-num">{Math.round(v.total / data.meta.days)}</div>
            <div className="stat-label">a day, on average</div>
          </div>
          <div className="card tilt-r" style={{ textAlign: "center" }}>
            <div className="stat-num">{data.meta.days.toLocaleString()}</div>
            <div className="stat-label">days of you &amp; me</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-faint)", marginTop: 6 }}>
              {(data.meta.days / 365.25).toFixed(2)} years
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// TIMELINE
// ============================================================
export function Timeline({ data }: { data: Data }) {
  const points = data.timeline;

  return (
    <section>
      <Reveal>
        <p className="eyebrow">our timeline</p>
        <h2>
          Some months we couldn&apos;t <span className="scribble">stop typing.</span>
        </h2>
        <p className="lead" style={{ marginBottom: 48 }}>
          Each point is a month. The notes are moments I remember.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="card" style={{ padding: "32px 24px 24px" }}>
          <div className="chart-scroll">
            <TimelineChart points={points} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// HEATMAP
// ============================================================
export function Heatmap({ data }: { data: Data }) {
  const grid = data.heatmap;

  // Find peak hour and day for callout cards
  let peakDay = 0, peakHour = 0, peakVal = 0;
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 24; c++) {
      if (grid[r][c] > peakVal) {
        peakVal = grid[r][c];
        peakDay = r;
        peakHour = c;
      }
    }
  }
  const hourLabel = peakHour === 0 ? "midnight" : peakHour < 12 ? `${peakHour}am` : peakHour === 12 ? "noon" : `${peakHour - 12}pm`;
  const dayLabel = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][peakDay];

  return (
    <section>
      <Reveal>
        <p className="eyebrow">when we talk</p>
        <h2>
          We&apos;re loudest at <em className="italic">{hourLabel}.</em>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="card" style={{ padding: "32px 28px" }}>
          <div className="chart-scroll">
            <HeatmapGrid grid={grid} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="grid-3" style={{ marginTop: 32 }}>
          <div className="card tilt-l" style={{ textAlign: "center" }}>
            <div className="stat-num">{hourLabel}</div>
            <div className="stat-label">our prime hour</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-num">{dayLabel}</div>
            <div className="stat-label">our chattiest day</div>
          </div>
          <div className="card tilt-r" style={{ textAlign: "center" }}>
            <div className="stat-num">{Math.round(data.volume.total / data.meta.days)}</div>
            <div className="stat-label">messages a day</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
