"use client";

import { useState } from "react";

const INITIAL = 5;

export default function Faq({ faqs }) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? faqs : faqs.slice(0, INITIAL);
  return (
    <section className="faq">
      <h2>Frequently Asked Questions (FAQs)</h2>
      {shown.map((f) => (
        <details key={f.id}>
          <summary>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
      {!showAll && faqs.length > INITIAL && (
        <button className="btn-ghost" onClick={() => setShowAll(true)}>View more FAQ&apos;s</button>
      )}
    </section>
  );
}
