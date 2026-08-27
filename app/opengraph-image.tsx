import { ImageResponse } from "next/og";

export const alt = "Nick Fan - Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#7facfafa",
          }}
        >
          Nick Fan
        </div>
        <div style={{ fontSize: 36, marginTop: 16 }}>
          Full-Stack Software Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
