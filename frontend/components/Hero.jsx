export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__art hero__art--left" aria-hidden="true"><svg><use href="#i-console" /></svg></div>
      <div className="hero__text">
        <h1>Gaming Consoles</h1>
        <p>
          Play the newest consoles and VR at home with <b className="hero__brand">YourBrand</b>. PS5, Xbox, Meta Quest
          and racing rigs, delivered to your door.
        </p>
        <div className="hero__brands">
          <span>XBOX</span><i /><span>PS5</span><i /><span>Meta</span>
        </div>
      </div>
      <div className="hero__art hero__art--right" aria-hidden="true"><svg><use href="#i-vr" /></svg></div>
    </section>
  );
}

