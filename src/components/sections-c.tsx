import { Reveal, SophieTag, TuckerTag } from "./primitives";
import type { Data } from "@/data/types";

// ============================================================
// RESPONSE PATTERNS
// ============================================================
export function Response({ data }: { data: Data }) {
  const r = data.response;
  return (
    <section>
      <Reveal>
        <p className="eyebrow">response patterns</p>
        <h2>
          One of us replies <em className="italic">faster.</em>
        </h2>
        <p className="lead" style={{ marginBottom: 48 }}>
          (it&apos;s me. you&apos;re welcome.)
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="grid-2">
          <div className="card tilt-l" style={{ padding: 36 }}>
            <SophieTag />
            <div style={{ marginTop: 20 }}>
              <div className="stat-num" style={{ color: "var(--sophie)" }}>
                {r.avgMin.sophie} min
              </div>
              <div className="stat-label">average reply time</div>
            </div>
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1.5px dashed var(--cream-deep)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontStyle: "italic",
                }}
              >
                {Math.round(r.firstText.sophie * 100)}%
              </div>
              <div className="stat-label">of the time, you text first</div>
            </div>
          </div>

          <div className="card tilt-r" style={{ padding: 36 }}>
            <TuckerTag />
            <div style={{ marginTop: 20 }}>
              <div className="stat-num" style={{ color: "var(--tucker)" }}>
                {r.avgMin.tucker} min
              </div>
              <div className="stat-label">average reply time</div>
            </div>
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1.5px dashed var(--cream-deep)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontStyle: "italic",
                }}
              >
                {Math.round(r.firstText.tucker * 100)}%
              </div>
              <div className="stat-label">of the time, i text first</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={280}>
        <div className="grid-2" style={{ marginTop: 32 }}>
          <div className="card" style={{ padding: 28, textAlign: "center" }}>
            <div className="stat-num" style={{ color: "var(--sophie)" }}>
              {r.doubleTexts.sophie.toLocaleString()}
            </div>
            <div className="stat-label">times Sophie sent two in a row</div>
          </div>
          <div className="card" style={{ padding: 28, textAlign: "center" }}>
            <div className="stat-num" style={{ color: "var(--tucker)" }}>
              {r.doubleTexts.tucker.toLocaleString()}
            </div>
            <div className="stat-label">times Tucker did</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// QUIRKS
// ============================================================
export function Quirks({ data }: { data: Data }) {
  const q = data.quirks;

  function Bar({
    label,
    sophie,
    tucker,
    note,
  }: {
    label: string;
    sophie: number;
    tucker: number;
    note: string;
  }) {
    const total = sophie + tucker;
    const sPct = (sophie / total) * 100;
    return (
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 8,
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic" }}>
            {label}
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 18, color: "var(--ink-soft)" }}>
            {note}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            height: 28,
            borderRadius: 999,
            overflow: "hidden",
            background: "var(--cream-deep)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${sPct}%`,
              background: "var(--sophie)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sPct}%`,
              right: 0,
              background: "var(--tucker)",
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
            {sophie.toLocaleString()}
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
            {tucker.toLocaleString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <Reveal>
        <p className="eyebrow">our little tells</p>
        <h2>
          The things we say <span className="scribble">a lot.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="card" style={{ marginTop: 40, padding: 36 }}>
          <Bar label="said sorry" sophie={q.sorry.sophie} tucker={q.sorry.tucker} note="" />
          <Bar label="said something kind" sophie={q.compliments.sophie} tucker={q.compliments.tucker} note="" />
          <Bar label="cursed at something" sophie={q.swears.sophie} tucker={q.swears.tucker} note="" />
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="grid-2" style={{ marginTop: 32 }}>
          <div className="card tilt-l" style={{ textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 40 }}>☀️</div>
            <div className="stat-num" style={{ marginTop: 8 }}>
              {q.goodMornings.total.toLocaleString()}
            </div>
            <div className="stat-label">good mornings</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--sophie)" }}>{q.goodMornings.sophie}</div>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--sophie)" }}>Sophie</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--tucker)" }}>{q.goodMornings.tucker}</div>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--tucker)" }}>Tucker</div>
              </div>
            </div>
          </div>
          <div className="card tilt-r" style={{ textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 40 }}>🌙</div>
            <div className="stat-num" style={{ marginTop: 8 }}>
              {q.goodNights.total.toLocaleString()}
            </div>
            <div className="stat-label">good nights</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--sophie)" }}>{q.goodNights.sophie}</div>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--sophie)" }}>Sophie</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--tucker)" }}>{q.goodNights.tucker}</div>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--tucker)" }}>Tucker</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// MEDIA
// ============================================================
export function Media({ data }: { data: Data }) {
  const v = data.volume;

  function Stat({
    icon,
    label,
    sophie,
    tucker,
  }: {
    icon: string;
    label: string;
    sophie: number;
    tucker: number;
  }) {
    return (
      <div className="card" style={{ padding: 28 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
        <div
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 22,
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
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                color: "var(--sophie)",
                lineHeight: 1,
              }}
            >
              {sophie.toLocaleString()}
            </div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--sophie)" }}>
              Sophie
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                color: "var(--tucker)",
                lineHeight: 1,
                textAlign: "right",
              }}
            >
              {tucker.toLocaleString()}
            </div>
            <div
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: 16,
                color: "var(--tucker)",
                textAlign: "right",
              }}
            >
              Tucker
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <Reveal>
        <p className="eyebrow">photos &amp; links</p>
        <h2>
          The stuff we sent <em className="italic">alongside</em> the words.
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="grid-2" style={{ marginTop: 40 }}>
          <Stat icon="📷" label="photos &amp; attachments" sophie={v.photos.sophie} tucker={v.photos.tucker} />
          <Stat icon="🔗" label="links shared" sophie={v.links.sophie} tucker={v.links.tucker} />
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
// BOOKENDS SLIDE
// ============================================================
export function Bookends({ data }: { data: Data }) {
  const { first, recent } = data.bookends;

  function Bubble({
    from,
    text,
    side,
  }: {
    from: string;
    text: string;
    side: "left" | "right";
  }) {
    const isSophie = from === "Sophie";
    const bg = isSophie ? "var(--sophie)" : "#e8e6e3";
    const textColor = isSophie ? "white" : "var(--ink)";
    return (
      <div
        style={{
          display: "flex",
          justifyContent: side === "right" ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            maxWidth: "80%",
            background: bg,
            color: textColor,
            padding: "14px 20px",
            borderRadius: 22,
            borderBottomRightRadius: side === "right" ? 6 : 22,
            borderBottomLeftRadius: side === "left" ? 6 : 22,
            fontSize: 17,
            lineHeight: 1.4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <section
      className="slide"
      style={{
        background: "linear-gradient(180deg, var(--cream-deep) 0%, var(--cream) 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <Reveal>
          <p
            className="eyebrow"
            style={{ fontSize: 28, textAlign: "center", display: "block" }}
          >
            then &amp; now
          </p>
          <h2 style={{ textAlign: "center", marginBottom: 8 }}>
            The first thing we said, <br />
            and the <span className="scribble">most recent.</span>
          </h2>
        </Reveal>

        <div className="grid-2" style={{ marginTop: 64, gap: 48, alignItems: "start" }}>
          <Reveal delay={200}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p
                className="eyebrow"
                style={{ fontSize: 24, color: "var(--ink-soft)" }}
              >
                the very first one
              </p>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--ink-faint)",
                  marginBottom: 20,
                }}
              >
                {first.date}
              </div>
            </div>
            <div className="card tilt-l" style={{ padding: 28, background: "white" }}>
              <Bubble from={first.from} text={first.text} side="left" />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p
                className="eyebrow"
                style={{ fontSize: 24, color: "var(--ink-soft)" }}
              >
                the most recent
              </p>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--ink-faint)",
                  marginBottom: 20,
                }}
              >
                {recent.date}
              </div>
            </div>
            <div className="card tilt-r" style={{ padding: 28, background: "white" }}>
              <Bubble from={recent.from} text={recent.text} side="right" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={600}>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-hand)",
              fontSize: 30,
              color: "var(--ink-soft)",
              marginTop: 64,
            }}
          >
            {data.meta.days.toLocaleString()} days between them.
            <br />
            <span style={{ color: "var(--sophie)" }}>and counting.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// FINALE
// ============================================================
export function Finale({ data }: { data: Data }) {
  return (
    <section style={{ textAlign: "center", paddingTop: 80, paddingBottom: 120 }}>
      <Reveal>
        <div style={{ marginBottom: 32 }}>
          <svg width="56" height="50" viewBox="0 0 24 22" aria-hidden="true">
            <path
              d="M12 21 C 4 14, 1 10, 1 6 C 1 2.5, 4 1, 6.5 1 C 9 1, 11 2.5, 12 5 C 13 2.5, 15 1, 17.5 1 C 20 1, 23 2.5, 23 6 C 23 10, 20 14, 12 21 Z"
              fill="#e85d6f"
            />
          </svg>
        </div>
        <h2 style={{ fontStyle: "italic" }}>
          Anyway. Just thought you should know <br />
          <span className="scribble">how much we&apos;ve said.</span>
        </h2>
        <p className="lead" style={{ margin: "32px auto 0", maxWidth: "44ch" }}>
          Looking forward to the next {data.volume.total.toLocaleString()}.
        </p>
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 32,
            color: "var(--sophie)",
            marginTop: 56,
          }}
        >
          -Tuck
        </p>
      </Reveal>
    </section>
  );
}
