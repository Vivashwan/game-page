import { Icon } from "./Icons";

function ReviewCard({ review }) {
  return (
    <div className="review">
      <div className="review__top">
        <Icon id="google" />
        <span className="stars" aria-label={`${review.stars} out of 5 stars`}>{"★".repeat(review.stars)}</span>
      </div>
      <p className="review__text">“ {review.body}</p>
      <div className="review__who">
        <span className="init">{review.name.slice(0, 2).toUpperCase()}</span>
        <span>{review.name}<small>{review.city} • {review.item}</small></span>
      </div>
    </div>
  );
}

export default function Reviews({ reviews }) {
  // The list is rendered twice so the CSS marquee can loop without a visible jump.
  const loop = [...reviews, ...reviews];
  return (
    <section className="proof">
      <h2>Served more than <em>1 Lakh Orders</em></h2>
      <div className="carousel">
        <div className="carousel__track" style={{ "--marquee-duration": `${reviews.length * 8}s` }}>
          {loop.map((r, i) => (
            <div key={`${r.id}-${i}`} aria-hidden={i >= reviews.length || undefined}>
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>
      <div className="stats">
        <div><strong>250Cr<span>+</span></strong><p>Saved Together</p></div>
        <div><strong>4.5M <span>Kg</span></strong><p>CO₂e Emissions Saved</p></div>
        <div><strong>100K<span>+</span></strong><p>Products In Circulation</p></div>
      </div>
    </section>
  );
}
