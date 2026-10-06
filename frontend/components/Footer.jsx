"use client";

import { useState } from "react";
import { Icon } from "./Icons";

const CATEGORY_COLUMNS = [
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

const LINK_COLUMNS = [
  ["YourBrand", ["About", "Why YourBrand", "Sitemap", "CarePlan"]],
  ["Become a Pal", ["For Creators", "Careers", "For Brands", ["Asset Funding Program", true], ["Rent Your Gear", true]]],
  ["Information", ["How it works?", "FAQs", "Verification", "Cancellation Policy", "Life at YourBrand"]],
  ["Policies", ["Terms & Condition", "Shipping policy", "Damage Policy", "Terms of Use", "Privacy Policy"]],
];

export default function Footer() {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cats">
          {CATEGORY_COLUMNS.map(([heading, links]) => (
            <div key={heading}>
              <h4>{heading}</h4>
              {links.map((l) => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>

        <div className="footer__seo">
          <h4><a href="#">Renting from YourBrand in Bangalore</a></h4>
          <p>
            Need a console for the weekend, a camera for a shoot or gear for a trek? Rent it in Bangalore with free
            doorstep delivery and pickup, flexible rental periods and no security deposit. Placeholder copy: replace
            with your own description.
          </p>
          <h5>Categories on Rent</h5>
          <h4><a href="#">Action Cameras on Rent</a></h4>
          <p>Short category blurb goes here. Describe the range of products in this category and who it is for.</p>
          {moreOpen && (
            <div className="seo-more">
              <h4><a href="#">Gaming Consoles on Rent</a></h4>
              <p>Another category blurb. Add as many as you need; they stay collapsed behind &quot;Read More&quot;.</p>
            </div>
          )}
          <button className={`read-more${moreOpen ? " open" : ""}`} onClick={() => setMoreOpen((o) => !o)}>
            {moreOpen ? "Read Less" : "Read More"} <Icon id="chev" className="ic ic--sm" />
          </button>
        </div>

        <div className="footer__band">
          <a href="#" className="logo logo--footer"><span className="logo__a">Your</span><span className="logo__b">Brand</span></a>
        </div>

        <div className="footer__links">
          {LINK_COLUMNS.map(([heading, links]) => (
            <div key={heading}>
              <h4>{heading}</h4>
              {links.map((l) => {
                const [label, isNew] = Array.isArray(l) ? l : [l, false];
                return (
                  <a key={label} href="#">
                    {label} {isNew && <span className="new">New</span>}
                  </a>
                );
              })}
            </div>
          ))}
          <div className="help">
            <h4>Need Help</h4>
            <a href="#"><Icon id="headset" /> Contact Support</a>
            <a href="#">Contact Us</a>
            <a href="mailto:care@example.com"><Icon id="mail" /> care@example.com</a>
            <div className="socials">
              <a href="#" aria-label="Facebook"><Icon id="fb" /></a>
              <a href="#" aria-label="Instagram"><Icon id="ig" /></a>
              <a href="#" aria-label="LinkedIn"><Icon id="in" /></a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
            Go up <Icon id="chev-u" className="ic ic--sm" />
          </a>
          <span>© 2026. YourBrand Pvt Ltd</span>
          <span>Made with <b className="heart">♥</b> for India</span>
        </div>
      </div>
    </footer>
  );
}
