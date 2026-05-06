import { Reveal, CountUp, SophieTag, TuckerTag, Squiggle, FloatingHearts } from "./primitives";
import type { Data } from "@/data/types";

// ============================================================
// I LOVE YOU SLIDE
// ============================================================
export function ILoveYouSlide({ data }: { data: Data }) {
  const ily = data.iLoveYou;
  return (
    <section className="slide heart-bg">
      <FloatingHearts count={18} />
      <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 2 }}>
        <Reveal>
          <p className="eyebrow" style={{ fontSize: 32 }}>also,</p>
          <h2 style={{ fontStyle: "italic", marginBottom: 8 }}>
            we&apos;ve said <span className="scribble">i love you</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <div className="big-number italic" style={{ color: "var(--heart)", margin: "32px 0" }}>
            <CountUp to={ily.total} duration={2400} />
          </div>
          <p className="lead" style={{ fontSize: 22, margin: "0 auto 56px", maxWidth: "40ch" }}>
            times. give or take. that&apos;s about{" "}
            {Math.round((ily.total / data.meta.days) * 10) / 10} a day.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div
            className="grid-2"
            style={{
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            <div className="card tilt-l" style={{ textAlign: "center", padding: 28 }}>
              <SophieTag />
              <div className="stat-num" style={{ color: "var(--sophie)", marginTop: 12 }}>
                {ily.sophie.toLocaleString()}
              </div>
              <div className="stat-label">times</div>
            </div>
            <div className="card tilt-r" style={{ textAlign: "center", padding: 28 }}>
              <TuckerTag />
              <div className="stat-num" style={{ color: "var(--tucker)", marginTop: 12 }}>
                {ily.tucker.toLocaleString()}
              </div>
              <div className="stat-label">times</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 18, color: "var(--ink-soft)", marginTop: 12 }}>
                i still love you more
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={700}>
          <p
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: 26,
              color: "var(--ink-soft)",
              marginTop: 56,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            {ily.firstSaid.who} said it first, on {ily.firstSaid.date}.
            <br /> {ily.firstSaid.days} days in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// EMOJIS
// ============================================================
export function Emojis({ data }: { data: Data }) {
  const renderColumn = (
    list: { e: string; n: number }[],
    color: string,
    tag: React.ReactNode
  ) => (
    <div className="card" style={{ padding: 32 }}>
      {tag}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {list.map((row, i) => {
          const max = list[0].n;
          const pct = (row.n / max) * 100;
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr 80px",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 36, lineHeight: 1, textAlign: "center" }}>{row.e}</div>
              <div
                style={{
                  height: 18,
                  background: "var(--cream-deep)",
                  borderRadius: 999,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${pct}%`,
                    background: color,
                    borderRadius: 999,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--ink-soft)",
                  textAlign: "right",
                }}
              >
                {row.n.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section>
      <Reveal>
        <p className="eyebrow">our emojis</p>
        <h2>
          The little pictures we <span className="scribble">overuse.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="grid-2">
          {renderColumn(data.emojis.sophie, "var(--sophie)", <SophieTag />)}
          {renderColumn(data.emojis.tucker, "var(--tucker)", <TuckerTag />)}
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// WORDS
// ============================================================
export function Words({ data }: { data: Data }) {
  const lang = data.language;

  const renderWords = (list: { w: string; n: number }[], color: string) => {
    const max = Math.max(...list.map((w) => w.n));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((row, i) => {
          const pct = (row.n / max) * 100;
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(60px,100px) 1fr minmax(44px,70px)",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic" }}>
                {row.w}
              </div>
              <div
                style={{
                  height: 14,
                  background: "var(--cream-deep)",
                  borderRadius: 999,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${pct}%`,
                    background: color,
                    borderRadius: 999,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                  textAlign: "right",
                }}
              >
                {row.n.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <Reveal>
        <p className="eyebrow">what we say</p>
        <h2>
          Our <em className="italic">most-used</em> words.
        </h2>
        <p className="lead" style={{ marginBottom: 48 }}>
          Common words filtered out. Names kept in. Counts are over the whole thread.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="grid-2">
          <div className="card tilt-l">
            <SophieTag />
            <div style={{ marginTop: 20 }}>{renderWords(data.topWords.sophie, "var(--sophie)")}</div>
          </div>
          <div className="card tilt-r">
            <TuckerTag />
            <div style={{ marginTop: 20 }}>{renderWords(data.topWords.tucker, "var(--tucker)")}</div>
          </div>
        </div>
      </Reveal>

      <Squiggle />

      <Reveal>
        <h3 style={{ marginBottom: 24 }}>The way we type, compared.</h3>
        <div className="grid-4">
          <StatVS
            label="words per message"
            sophie={lang.avgLen.sophie}
            tucker={lang.avgLen.tucker}
            suffix=""
            decimals={1}
          />
          <StatVS
            label="unique words used"
            sophie={lang.vocab.sophie}
            tucker={lang.vocab.tucker}
          />
          <StatVS
            label="one-word replies"
            sophie={Math.round(lang.oneWord.sophie * 100)}
            tucker={Math.round(lang.oneWord.tucker * 100)}
            suffix="%"
          />
          <StatVS
            label="messages w/ '!'"
            sophie={Math.round(lang.exclamations.sophie * 100)}
            tucker={Math.round(lang.exclamations.tucker * 100)}
            suffix="%"
          />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="card" style={{ marginTop: 40, padding: 32 }}>
          <p className="eyebrow" style={{ marginBottom: 0 }}>things we say a lot</p>
          <h3 style={{ marginTop: 4 }}>Phrases that come up again and again.</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
            {data.insideJokes.map((j, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 18px",
                  background: i % 2 ? "var(--sophie-soft)" : "var(--tucker-soft)",
                  borderRadius: 999,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 22,
                  transform: `rotate(${(i % 2 ? -1 : 1) * (1 + (i % 3) * 0.5)}deg)`,
                }}
              >
                &ldquo;{j.phrase}&rdquo;{" "}
                <span style={{ fontFamily: "var(--font-hand)", fontSize: 18, opacity: 0.7 }}>
                  ×{j.n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function StatVS({
  label,
  sophie,
  tucker,
  suffix = "",
  decimals = 0,
}: {
  label: string;
  sophie: number;
  tucker: number;
  suffix?: string;
  decimals?: number;
}) {
  const fmt = (n: number) =>
    (decimals ? n.toFixed(decimals) : n.toLocaleString()) + suffix;
  return (
    <div className="card" style={{ padding: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: 18,
          color: "var(--ink-soft)",
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              color: "var(--sophie)",
              lineHeight: 1,
            }}
          >
            {fmt(sophie)}
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--sophie)" }}>S</div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--ink-faint)",
            fontSize: 18,
          }}
        >
          vs
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              color: "var(--tucker)",
              lineHeight: 1,
            }}
          >
            {fmt(tucker)}
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--tucker)" }}>T</div>
        </div>
      </div>
    </div>
  );
}
