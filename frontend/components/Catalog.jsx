"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { api, isoDate } from "@/lib/api";
import { useApp } from "./AppProvider";
import ProductCard from "./ProductCard";
import { LendPromo, PartnerPromo } from "./Promos";

const PAGE_SIZE = 12;

export default function Catalog({ categories, initialPage, children }) {
  const { range, toast } = useApp();
  const [category, setCategory] = useState(""); // "" = all
  const [items, setItems] = useState(initialPage.items);
  const [total, setTotal] = useState(initialPage.total);
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  const dateParams = { start: isoDate(range.start), end: isoDate(range.end) };

  async function load({ offset, append }) {
    setLoading(true);
    try {
      const page = await api("/products", { params: { category, offset, limit: PAGE_SIZE, ...dateParams } });
      setItems((prev) => (append ? [...prev, ...page.items] : page.items));
      setTotal(page.total);
    } catch (e) {
      toast(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Reload from the first page when the category or the rental dates change.
  // (The server already rendered page 1 for "all, no dates", so skip that first run.)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    load({ offset: 0, append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, range.start, range.end]);

  const sidebar = [{ slug: "", name: "All", icon: "smile" }, ...categories];

  return (
    <div className="layout">
      <aside className="sidebar" aria-label="Sub-categories">
        <ul>
          {sidebar.map((c) => (
            <li key={c.slug || "all"}>
              <button className={c.slug === category ? "active" : undefined} onClick={() => setCategory(c.slug)}>
                <span className="thumb"><svg aria-hidden="true"><use href={`#i-${c.icon}`} /></svg></span>
                <span className="lbl">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        {children}

        <div className="listing-head">
          <h2>Gaming Gadgets On Rent</h2>
          <span className="muted">Total items: <b>{total}</b> items</span>
        </div>

        <div className={`grid${loading ? " grid--loading" : ""}`}>
          {items.length === 0 && <p className="muted">No products in this category yet.</p>}
          {items.map((p, i) => (
            <Fragment key={p.id}>
              <ProductCard product={p} />
              {!category && i === 3 && <PartnerPromo />}
              {!category && i === 7 && <LendPromo />}
            </Fragment>
          ))}
        </div>

        <div className="showing">
          <p>Showing {items.length} of {total} results</p>
          {items.length < total && (
            <button className="btn-outline" disabled={loading} onClick={() => load({ offset: items.length, append: true })}>
              {loading ? "Loading…" : "Show More"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
