import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Glitchcn/ui";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        <div style={{ position: "absolute", top: 60, left: 60, width: 1080, height: 24, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 84, left: 60, width: 24, height: 462, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 84, left: 1116, width: 24, height: 462, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 546, left: 60, width: 1080, height: 24, background: "#10b981", display: "flex" }} />

        <div style={{ position: "absolute", top: 160, left: 140, width: 180, height: 30, background: "#06b6d4", display: "flex" }} />
        <div style={{ position: "absolute", top: 220, left: 140, width: 270, height: 30, background: "#06b6d4", display: "flex" }} />
        <div style={{ position: "absolute", top: 280, left: 140, width: 135, height: 30, background: "#06b6d4", display: "flex" }} />

        <div style={{ position: "absolute", top: 340, left: 140, width: 68, height: 30, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 340, left: 230, width: 45, height: 30, background: "#10b981", display: "flex" }} />

        <div
          style={{
            position: "absolute",
            top: 220,
            left: 560,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "#10b981", fontSize: 88, fontWeight: 700, letterSpacing: "-3px", display: "flex" }}>
            Glitchcn/ui
          </div>
          <div style={{ color: "#06b6d4", fontSize: 24, opacity: 0.7, marginTop: 20, display: "flex" }}>
            cyberpunk components for shadcn/ui
          </div>
        </div>
      </div>
    ),
    size
  );
}