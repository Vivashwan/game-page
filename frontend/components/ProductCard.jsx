"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useApp } from "./AppProvider";
import { Icon } from "./Icons";

const ICONS = { console: "console", vr: "vr", pad: "pad", wheel: "wheel", screen: "screen" };
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function Price({ product, days }) {
  if (!days) {
    return (
      <>
        <small>Select Dates to view price</small>
        <div className="price">₹<span className="blur">N/A</span></div>
      </>
    );
  }
  if (product.total_price == null) {
    return (
      <>
        <small>Price on request</small>
        <div className="price">₹ N/A</div>
      </>
    );
  }
  return (
    <>
      <small>{inr(product.per_day_rent)}/day × {days}d</small>
      <div className="price">{inr(product.total_price)}</div>
    </>
  );
}

export default function ProductCard({ product }) {
  const { days, openPicker, toast } = useApp();
  const [voted, setVoted] = useState(false);
  const tagKey = product.tag.toLowerCase().replace(/\s+/g, "-");

  async function vote() {
    try {
      await api(`/products/${product.id}/vote`, { method: "POST" });
      setVoted(true);
      toast("Thanks! We'll notify you when it launches.");
    } catch (e) {
      toast(e.message);
    }
  }

  let action;
  if (product.out_of_stock) {
    action = <button className="add-btn" disabled aria-label="Out of stock"><Icon id="plus" /></button>;
  } else if (product.tag === "Vote to Launch") {
    action = <button className="vote-btn" onClick={vote} disabled={voted}>{voted ? "Voted ✓" : "Vote"}</button>;
  } else {
    action = (
      <button className="add-btn" aria-label="Add to Cart" onClick={() => (days ? toast("Added to cart") : openPicker())}>
        <Icon id="plus" />
      </button>
    );
  }

  return (
    <article className={`card${product.out_of_stock ? " card--oos" : ""}`}>
      <div className="card__media">
        {product.tag && <span className={`badge badge--${tagKey}`}>{product.tag}</span>}
        <svg aria-hidden="true"><use href={`#i-${ICONS[product.icon] ?? "console"}`} /></svg>
        {product.out_of_stock && <span className="oos">Out of Stock</span>}
      </div>
      <h3 title={product.name}>{product.name}</h3>
      <div className="card__foot">
        <div><Price product={product} days={product.rental_days ?? 0} /></div>
        {action}
      </div>
    </article>
  );
}
