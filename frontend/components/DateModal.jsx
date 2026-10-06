"use client";

import { useEffect, useState } from "react";
import { api, isoDate } from "@/lib/api";
import { longDate, useApp } from "./AppProvider";
import { Icon } from "./Icons";

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAY = 864e5;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function Month({ first, today, start, end, onPick }) {
  const lead = first.getDay();
  const cells = Array.from({ length: 42 }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i - lead + 1));
  return (
    <div className="month">
      <h5>{first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h5>
      <div className="dow">{DOW.map((d) => <span key={d}>{d}</span>)}</div>
      <div className="days">
        {cells.map((d) => {
          const t = d.getTime();
          const outside = d.getMonth() !== first.getMonth();
          let cls = "";
          if (start && t === start.getTime()) cls = "start";
          else if (end && t === end.getTime()) cls = "end";
          else if (start && end && t > start && t < end && !outside) cls = "in-range";
          return (
            <button key={t} className={cls} disabled={outside || d < today} onClick={() => onPick(d)}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Mounted only while open, so each opening starts from the dates already confirmed.
export default function DateModal() {
  const { pickerOpen } = useApp();
  return pickerOpen ? <Picker /> : null;
}

function Picker() {
  const { closePicker, range, setRange, toast } = useApp();
  const [today] = useState(startOfToday);
  const [start, setStart] = useState(range.start);
  const [end, setEnd] = useState(range.end);
  const [view, setView] = useState(() => {
    const base = range.start ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closePicker();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePicker]);

  const days = start && end ? Math.round((end - start) / DAY) : 0;
  const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
  const atCurrentMonth = view <= new Date(today.getFullYear(), today.getMonth(), 1);

  function pick(d) {
    if (!start || end || d <= start) {
      setStart(d);
      setEnd(null);
    } else {
      setEnd(d);
    }
  }

  async function confirm() {
    setSaving(true);
    try {
      // The backend owns the date rules; it rejects past or reversed ranges.
      await api("/quote", { params: { start: isoDate(start), end: isoDate(end) } });
      setRange({ start, end });
      closePicker();
      toast(`Dates set: ${longDate(start)} → ${longDate(end)}`);
    } catch (e) {
      toast(e.message);
    } finally {
      setSaving(false);
    }
  }

  const chargeable = days
    ? `${longDate(new Date(+start + DAY))} – ${longDate(new Date(+end - (days > 1 ? DAY : 0)))}`
    : "—";

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && closePicker()}>
      <div className="modal__card" role="dialog" aria-modal="true" aria-labelledby="dm-title">
        <button className="modal__close" onClick={closePicker} aria-label="Close">×</button>
        <div className="modal__left">
          <h3 id="dm-title">Select your Dates</h3>
          <div className="date-fields">
            <label>
              Delivery Date <i>*</i>
              <span className={`field${start ? " filled" : ""}`}><Icon id="cal" /><em>{start ? longDate(start) : "Select delivery date"}</em></span>
            </label>
            <label>
              Pickup Date <i>*</i>
              <span className={`field${end ? " filled" : ""}`}><Icon id="cal" /><em>{end ? longDate(end) : "Select pickup date"}</em></span>
            </label>
          </div>
          <p className="note">
            <b>Same-day delivery</b> between <b>5PM and 11PM</b>. For future dates, choose a time slot at checkout.
            Pickups happen between <b>9AM to 1PM</b>.
          </p>
          <p className="label">Your Rental Period:</p>
          <div className="period">
            <strong>{String(days).padStart(2, "0")}</strong>
            <small>Day</small>
            <div><small>Chargeable Period:</small><span>{chargeable}</span></div>
          </div>
          <div className="save-box">
            <p className="save-box__title">Save more with us!</p>
            <p>Longer rentals get bigger discounts, and delivery &amp; pickup days are never charged.</p>
          </div>
          <button className="btn-primary" disabled={!days || saving} onClick={confirm}>
            {saving ? "Checking…" : "Continue"}
          </button>
        </div>
        <div className="modal__right">
          <div className="cal-nav">
            <button aria-label="Previous month" disabled={atCurrentMonth} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>‹</button>
            <button aria-label="Next month" onClick={() => setView(next)}>›</button>
          </div>
          <div className="months">
            <Month first={view} today={today} start={start} end={end} onPick={pick} />
            <Month first={next} today={today} start={start} end={end} onPick={pick} />
          </div>
        </div>
      </div>
    </div>
  );
}
