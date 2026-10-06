import { Icon } from "./Icons";

export function PartnerPromo() {
  return (
    <div className="promo promo--partner">
      <div>
        <h3>Become an <em>Asset Partner.</em> Earn Monthly.</h3>
        <div className="benefits">
          <div className="benefit-group">
            <p>EARNING BENEFITS</p>
            <div className="benefit-row">
              <div className="benefit"><Icon id="cal" /><b>Monthly Earnings</b>From rental assets</div>
              <div className="benefit"><Icon id="gift" />Upto<b>₹10,000</b>Instant wallet credits</div>
            </div>
          </div>
          <div className="benefit-group">
            <p>RENTAL BENEFITS</p>
            <div className="benefit-row">
              <div className="benefit"><Icon id="tag" /><b>10% Off</b>Exclusive discount when you rent</div>
              <div className="benefit"><Icon id="refresh" /><b>Get 10% Cashback</b>On every order</div>
            </div>
          </div>
        </div>
      </div>
      <div className="promo__side">
        <svg className="promo__art" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-console" /></svg>
        <a href="#" className="cta">Know More <Icon id="arrow" /></a>
      </div>
    </div>
  );
}

export function LendPromo() {
  return (
    <div className="promo promo--lend">
      <p>Got gear you don&apos;t use anymore?</p>
      <h3>Rent Out Your Gear on YourBrand</h3>
      <a href="#" className="cta">Earn With Us <Icon id="arrow" /></a>
    </div>
  );
}
