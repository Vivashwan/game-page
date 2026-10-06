"use client";

import { Icon } from "./Icons";
import { shortDate, useApp } from "./AppProvider";

export default function Header() {
  const { range, openPicker } = useApp();
  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <a href="#" className="logo" aria-label="Home">
            <span className="logo__a">Your</span>
            <span className="logo__b">Brand</span>
          </a>

          <button className="date-pill" onClick={openPicker}>
            <span className="date-pill__seg date-pill__city">
              <Icon id="pin" /> Bangalore <Icon id="chev" className="ic ic--sm" />
            </span>
            <span className="date-pill__seg">
              <Icon id="cal" /> {range.start ? shortDate(range.start) : "Delivery Date"}
            </span>
            <span className="date-pill__seg">
              <Icon id="cal" /> {range.end ? shortDate(range.end) : "Pickup Date"}
            </span>
            <span className="date-pill__cta">
              <Icon id="cal" /> Select
            </span>
          </button>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Search"><Icon id="search" /></button>
            <button className="icon-btn" aria-label="Cart"><Icon id="cart" /></button>
            <button className="login">
              <span className="avatar"><Icon id="user" /></span>Hi, Login
            </button>
          </div>
        </div>
      </header>

      <nav className="supercats" aria-label="Categories">
        {["Photography", "Gaming", "Outdoor", "Entertainment"].map((name) => (
          <a key={name} href="#" className={name === "Gaming" ? "active" : undefined}>{name}</a>
        ))}
      </nav>
    </>
  );
}
