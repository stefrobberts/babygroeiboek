import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2662E",
        borderRadius: "50%",
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
      >
        <path
          d="M12 21c-4.5-2.7-8-6.4-8-10.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 8 4.5c0 4.1-3.5 7.8-8 10.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { ...size }
  )
}
