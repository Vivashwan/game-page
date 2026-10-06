"use client";

import { Icon } from "./Icons";
import { shortDate, useApp } from "./AppProvider";

export default function FloatingBar() {
  const { range, days, openPicker } = useApp();
  return (
    <>
      <button className="float-pill" onClick={openPicker}>
        <Icon id="cal" />
        <span>
          {days
            ? `${shortDate(range.start)} → ${shortDate(range.end)} · ${days} day${days > 1 ? "s" : ""}`
            : "Select rental dates to view prices"}
        </span>
      </button>
      <button className="chat-fab" aria-label="Chat">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M30 8c13 0 24 8 24 19s-11 19-24 19c-3 0-6-.4-8-1l-10 6 3-9C10 38 6 33 6 27 6 16 17 8 30 8z" fill="#1945e8" />
          <path d="M26 22c11 0 20 7 20 16s-9 16-20 16c-2 0-5-.3-7-1l-9 5 3-8C9 47 6 43 6 38c0-9 9-16 20-16z" fill="#7ed321" />
          <circle cx="17" cy="38" r="3" fill="#fff" />
          <circle cx="26" cy="38" r="3" fill="#fff" />
          <circle cx="35" cy="38" r="3" fill="#fff" />
        </svg>
      </button>
    </>
  );
}
