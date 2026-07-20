import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: "#F8F5F1",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "#6D5B4B",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="58"
          height="58"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FBF9F6"
          strokeWidth="1.4"
        >
          <path
            d="M12 21c-4.5-2.7-8-6.4-8-10.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 8 4.5c0 4.1-3.5 7.8-8 10.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 500,
          color: "#2E2620",
          letterSpacing: "-0.02em",
        }}
      >
        {siteConfig.fullName}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#7A6E61",
          textAlign: "center",
          maxWidth: 780,
        }}
      >
        {siteConfig.tagline}
      </div>
    </div>,
    { ...size }
  )
}
