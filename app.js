// ---------- data ----------
const SUBCATS = [
  { name: "All", icon: "i-smile" },
  { name: "GTA VI", icon: "i-pad" },
  { name: "PS5 Console", icon: "i-console" },
  { name: "Xbox Console", icon: "i-pad" },
  { name: "VR", icon: "i-vr" },
  { name: "Racing Wheel", icon: "i-wheel" },
  { name: "Big Screen Gaming", icon: "i-screen" },
];

// The live listing shows these first, in this order; everything else follows in products.js order.
const FEATURED_ORDER = [
  "PS5 + Games (100+) + 1 Controller",
  "PS5 All in one Combo + 2 Controllers",
  "Oculus Quest 3S",
  "PS5 + Games (100+) + 2 Controllers",
  "Oculus Quest 2",
  "FC25 + 2 Controllers Combo",
  "PS5 + 1 Controller (Disc or Digital) (No Games Included)",
  "PS5 + GTA 6 with 1 Controller",
  "Xbox Series S (400+ Games) w/1 Controller-Model May Vary",
  "Xbox Series S (200+ Games) w/2 Controllers-Model May Vary",
  "PS5 + EA Play + 2 Controllers",
  "Sony PlayStation PS VR2",
];
const rank = (p) => { const i = FEATURED_ORDER.indexOf(p.name); return i === -1 ? FEATURED_ORDER.length : i; };
const ORDERED = PRODUCTS.map((p, i) => ({ ...p, _i: i })).sort((a, b) => rank(a) - rank(b) || a._i - b._i);

const FAQS = [
  ["How can I rent from you?", "Pick your delivery and pickup dates, add products to your cart, complete a quick one-time verification and check out. We deliver to your door and collect it when your rental ends."],
  ["If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?", "Partial extensions are possible. You can extend any single item from your order page as long as it is available for the extra days."],
  ["When does the rental start?", "Your rental period starts on the delivery date you choose. The delivery and pickup days are not charged."],
  ["What will be the condition of the products at the time of delivery?", "Every item is cleaned, tested and checked for all accessories before it is dispatched."],
  ["Why is verification required?", "Verification lets us offer zero-deposit rentals while keeping the gear safe. It only needs to be done once."],
  ["Do I need to pay a security deposit?", "No. Verified customers rent without any security deposit."],
  ["What if something gets damaged during my rental?", "Minor wear is expected. Accidental damage is handled under the damage policy, which you can read before booking."],
];

// Placeholder reviews: swap in real ones from your own data.
const REVIEWS = [
  { name: "Karan", city: "Bangalore", item: "Gaming Console", stars: 5, text: "Smooth from start to finish. Delivery was on time, the console was spotless and every cable was in the box." },
  { name: "Meera", city: "Pune", item: "Camera", stars: 5, text: "Great way to try gear before buying it. Support answered every question quickly and pickup was on schedule." },
  { name: "Arjun", city: "Delhi", item: "VR Headset", stars: 4, text: "Rented for a birthday party and it was the highlight of the evening. Booking took two minutes." },
  { name: "Neha", city: "Mumbai", item: "Trekking Gear", stars: 5, text: "Everything arrived clean and well packed. Affordable compared to buying, and the return was hassle free." },
  { name: "Rohit", city: "Hyderabad", item: "Racing Wheel", stars: 5, text: "Well maintained equipment and clear pricing with no surprises. Will definitely rent again next month." },
  { name: "Ananya", city: "Chennai", item: "Projector", stars: 4, text: "Movie night sorted. The projector was easy to set up and the team even shared a quick how-to video." },
];

const FOOTER_CATS = [
  ["Action Cameras", ["Action Cameras", "Pocket Cameras", "GoPro Cameras", "DJI Cameras", "DJI Drones", "360 Cameras"]],
  ["Cameras", ["DSLR Cameras", "Cameras", "iPhones", "DSLR Gimbal Combos", "Wildlife Photography", "Tripod and camera accessories"]],
  ["Trekking Gear", ["Trekking Gear", "Trekking Jackets", "Trek/Snow Pants", "Trekking Shoes", "Trek Accessories"]],
  ["Riding Gear", ["Riding Gear", "Riding Luggage", "Riding Jackets", "Riding Essentials", "Riding Boots", "Binoculars"]],
  ["Creator Gear", ["Wireless & Collar Mics", "Professional Cameras", "Mirrorless Cameras", "Vlogging Kits", "Mobile Gimbals", "Vlogging"]],
  ["Gaming Console", ["PS5 Console", "VR", "Racing Wheel", "Big Screen Gaming", "Xbox Console"]],
  ["Winter Wear", ["Snow Boots", "Winter Jackets", "Backpacks"]],
  ["Camping Gear", ["Camping Gear", "Camping Stools & Tables", "Camping Tents", "Sleeping Bags & Mats"]],
  ["Audio Visual Equipment", ["Projectors", "VR", "Mics", "Speakers"]],
];

// ---------- helpers ----------
const $ = (s) => document.querySelector(s);
const svg = (id) => `<svg><use href="#${id}"/></svg>`;
const icon = (id) => `<svg class="ic"><use href="#${id}"/></svg>`;
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2200);
}

// ---------- sidebar ----------
let activeCat = "All";
function renderSidebar() {
  $("#subcats").innerHTML = SUBCATS.map(
    (c) => `<li><button class="${c.name === activeCat ? "active" : ""}" data-cat="${c.name}"><span class="thumb">${svg(c.icon)}</span><span class="lbl">${c.name}</span></button></li>`
  ).join("");
}
$("#subcats").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-cat]");
  if (!b) return;
  activeCat = b.dataset.cat;
  visible = PAGE_SIZE;
  renderSidebar();
  renderGrid();
});

// ---------- promo banners ----------
const PARTNER_PROMO = `
  <div class="promo promo--partner">
    <div>
      <h3>Become an <em>Asset Partner.</em> Earn Monthly.</h3>
      <div class="benefits">
        <div class="benefit-group"><p>EARNING BENEFITS</p>
          <div class="benefit-row">
            <div class="benefit">${icon("i-cal")}<b>Monthly Earnings</b>From rental assets</div>
            <div class="benefit">${icon("i-gift")}Upto<b>₹10,000</b>Instant wallet credits</div>
          </div>
        </div>
        <div class="benefit-group"><p>RENTAL BENEFITS</p>
          <div class="benefit-row">
            <div class="benefit">${icon("i-tag")}<b>10% Off</b>Exclusive discount when you rent</div>
            <div class="benefit">${icon("i-refresh")}<b>Get 10% Cashback</b>On every order</div>
          </div>
        </div>
      </div>
    </div>
    <div class="promo__side">
      <svg class="promo__art" viewBox="0 0 64 64"><use href="#i-console"/></svg>
      <a href="#" class="cta">Know More ${icon("i-arrow")}</a>
    </div>
  </div>`;
const LEND_PROMO = `
  <div class="promo promo--lend">
    <p>Got gear you don't use anymore?</p>
    <h3>Rent Out Your Gear on YourBrand</h3>
    <a href="#" class="cta">Earn With Us ${icon("i-arrow")}</a>
  </div>`;

// ---------- product grid ----------
const PAGE_SIZE = 12;
let visible = PAGE_SIZE;
let rentalDays = 0; // set once the user picks dates
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function priceHTML(p) {
  if (!rentalDays) return `<small>Select Dates to view price</small><div class="price">₹<span class="blur">N/A</span></div>`;
  if (p.rent == null) return `<small>Price on request</small><div class="price">₹ N/A</div>`;
  return `<small>${inr(p.rent)}/day × ${rentalDays}d</small><div class="price">${inr(p.rent * rentalDays)}</div>`;
}

function cardHTML(p) {
  const tagKey = p.tag.toLowerCase().replace(/\s+/g, "-");
  const badge = p.tag ? `<span class="badge badge--${tagKey}">${p.tag}</span>` : "";
  const action = p.outOfStock
    ? `<button class="add-btn" disabled aria-label="Out of stock">${icon("i-plus")}</button>`
    : p.tag === "Vote to Launch"
      ? `<button class="vote-btn" data-vote>Vote</button>`
      : `<button class="add-btn" aria-label="Add to Cart" data-add>${icon("i-plus")}</button>`;
  return `
    <article class="card${p.outOfStock ? " card--oos" : ""}">
      <div class="card__media">${badge}${svg(p.icon)}${p.outOfStock ? `<span class="oos">Out of Stock</span>` : ""}</div>
      <h3 title="${p.name}">${p.name}</h3>
      <div class="card__foot">
        <div>${priceHTML(p)}</div>
        ${action}
      </div>
    </article>`;
}

function renderGrid() {
  const all = ORDERED.filter((p) => activeCat === "All" || p.cat === activeCat);
  const list = all.slice(0, visible);
  const parts = [];
  list.forEach((p, i) => {
    parts.push(cardHTML(p));
    if (activeCat === "All" && i === 3) parts.push(PARTNER_PROMO);
    if (activeCat === "All" && i === 7) parts.push(LEND_PROMO);
  });
  $("#grid").innerHTML = parts.join("") || `<p class="muted">No products in this category yet.</p>`;
  $("#shown").textContent = list.length;
  document.querySelectorAll("[data-total]").forEach((el) => (el.textContent = all.length));
  $("#show-more").hidden = list.length >= all.length;
}
$("#grid").addEventListener("click", (e) => {
  if (e.target.closest("[data-add]")) {
    if (rentalDays) toast("Added to cart");
    else openModal();
  }
  const v = e.target.closest("[data-vote]");
  if (v) { v.disabled = true; v.textContent = "Voted ✓"; toast("Thanks! We'll notify you when it launches."); }
});
$("#show-more").addEventListener("click", () => { visible += PAGE_SIZE; renderGrid(); });

// ---------- FAQ ----------
let faqCount = 5;
function renderFaq() {
  $("#faq-list").innerHTML = FAQS.slice(0, faqCount)
    .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
    .join("");
  $("#faq-more").hidden = faqCount >= FAQS.length;
}
$("#faq-more").addEventListener("click", () => { faqCount = FAQS.length; renderFaq(); });

// ---------- reviews carousel (track is duplicated so the loop is seamless) ----------
const reviewHTML = (r) => `
  <div class="review">
    <div class="review__top">${icon("i-google")}<span class="stars">${"★".repeat(r.stars)}</span></div>
    <p class="review__text">“ ${r.text}</p>
    <div class="review__who"><span class="init">${r.name.slice(0, 2).toUpperCase()}</span><span>${r.name}<small>${r.city} • ${r.item}</small></span></div>
  </div>`;
const reviewSet = REVIEWS.map(reviewHTML).join("");
$("#reviews").innerHTML = reviewSet + reviewSet;
$("#reviews").style.setProperty("--marquee-duration", REVIEWS.length * 8 + "s");

// ---------- footer ----------
$("#footer-cats").innerHTML = FOOTER_CATS.map(
  ([h, links]) => `<div><h4>${h}</h4>${links.map((l) => `<a href="#">${l}</a>`).join("")}</div>`
).join("");
$("#read-more").addEventListener("click", (e) => {
  const more = $("#seo-more");
  more.hidden = !more.hidden;
  e.currentTarget.classList.toggle("open", !more.hidden);
  e.currentTarget.firstChild.textContent = more.hidden ? "Read More " : "Read Less ";
});
$("#go-up").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0 }); });

// ---------- date modal ----------
const modal = $("#date-modal");
const today = new Date(); today.setHours(0, 0, 0, 0);
let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let start = null, end = null;
const fmt = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const short = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function openModal() { modal.hidden = false; renderCalendar(); }
function closeModal() { modal.hidden = true; }
document.querySelectorAll("[data-open-dates]").forEach((b) => b.addEventListener("click", openModal));
modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function monthHTML(first) {
  const label = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const lead = first.getDay();
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(first.getFullYear(), first.getMonth(), i - lead + 1);
    const outside = d.getMonth() !== first.getMonth();
    const past = d < today;
    const t = d.getTime();
    let cls = "";
    if (start && t === start.getTime()) cls = "start";
    else if (end && t === end.getTime()) cls = "end";
    else if (start && end && t > start && t < end && !outside) cls = "in-range";
    cells.push(`<button data-t="${t}" class="${cls}" ${outside || past ? "disabled" : ""}>${d.getDate()}</button>`);
  }
  return `<div class="month"><h5>${label}</h5>
    <div class="dow">${["Su","Mo","Tu","We","Th","Fr","Sa"].map((x) => `<span>${x}</span>`).join("")}</div>
    <div class="days">${cells.join("")}</div></div>`;
}

function renderCalendar() {
  const next = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
  $("#months").innerHTML = monthHTML(viewMonth) + monthHTML(next);
  $("#prev").disabled = viewMonth <= new Date(today.getFullYear(), today.getMonth(), 1);

  const setField = (el, d, ph) => { el.classList.toggle("filled", !!d); el.querySelector("em").textContent = d ? fmt(d) : ph; };
  setField($("#f-del"), start, "Select delivery date");
  setField($("#f-pick"), end, "Select pickup date");

  const days = start && end ? Math.round((end - start) / 864e5) : 0;
  $("#days").textContent = String(days).padStart(2, "0");
  $("#charge").textContent = days ? `${fmt(new Date(+start + 864e5))} – ${fmt(new Date(+end - 864e5 * (days > 1 ? 1 : 0)))}` : "—";
  $("#continue").disabled = !(start && end);
}

$("#months").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-t]");
  if (!b || b.disabled) return;
  const d = new Date(+b.dataset.t);
  if (!start || end || d <= start) { start = d; end = null; }
  else end = d;
  renderCalendar();
});
$("#prev").addEventListener("click", () => { viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1); renderCalendar(); });
$("#next").addEventListener("click", () => { viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1); renderCalendar(); });
$("#continue").addEventListener("click", () => {
  closeModal();
  rentalDays = Math.round((end - start) / 864e5);
  $("#hdr-del").textContent = short(start);
  $("#hdr-pick").textContent = short(end);
  $("#float-label").textContent = `${short(start)} → ${short(end)} · ${rentalDays} day${rentalDays > 1 ? "s" : ""}`;
  renderGrid();
});

// ---------- boot ----------
renderSidebar();
renderGrid();
renderFaq();
