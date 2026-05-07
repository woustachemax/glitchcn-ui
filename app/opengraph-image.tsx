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
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 2, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 60, left: 60, bottom: 60, width: 2, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", top: 60, right: 60, bottom: 60, width: 2, background: "#10b981", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 60, left: 60, right: 60, height: 2, background: "#10b981", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <div style={{ color: "#10b981", fontSize: 22, opacity: 0.6, marginBottom: 8, display: "flex" }}>
            [ OK ] DECRYPTING_ASSETS
          </div>
          <div style={{ color: "#10b981", fontSize: 22, opacity: 0.6, marginBottom: 60, display: "flex" }}>
            [ OK ] ESTABLISHING_UPLINK
          </div>

          <div style={{ color: "#10b981", fontSize: 108, fontWeight: 700, marginBottom: 28, display: "flex", letterSpacing: "-2px" }}>
            Glitchcn/ui
          </div>

          <div style={{ color: "#06b6d4", fontSize: 30, marginBottom: 44, display: "flex" }}>
            $ npx shadcn@latest add @glitchcn/all
          </div>

          <div style={{ color: "#10b981", fontSize: 24, opacity: 0.7, marginBottom: 8, display: "flex" }}>
            Cyberpunk React components.
          </div>
          <div style={{ color: "#10b981", fontSize: 24, opacity: 0.7, display: "flex" }}>
            Glitch effects. Terminal UIs. Neon accents.
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 90, right: 90, color: "#10b981", fontSize: 18, opacity: 0.5, display: "flex" }}>
          v1.0.0
        </div>
      </div>
    ),
    size
  );
}
