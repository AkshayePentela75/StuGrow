import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card used by every page: logo mark, name, tagline, rising bars. */
export default async function OpengraphImage() {
  const mark = await readFile(path.join(process.cwd(), "public/brand/stugro-mark-inverse.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0f2f45",
          color: "#f2f5f1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={150} height={90} alt="" />
          <span style={{ fontSize: 56, fontWeight: 800, color: "#77be9b" }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
            <span style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>Start early.</span>
            <span style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>Let it compound.</span>
            <span style={{ fontSize: 30, marginTop: 28, color: "#a9bccb" }}>{site.tagline}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            {[120, 170, 230].map((h) => (
              <div key={h} style={{ width: 56, height: h, background: "#1c4461", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
