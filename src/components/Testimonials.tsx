const testimonials = [
  {
    quote:
      "The majlis transformed our living room into the heart of our home. Our kids now sit with us every evening — it's become our favorite space.",
    import TextRotator from './TextRotator';

    const reviews = [
      {
        text: "The majlis seating completely transformed our living room. It’s not just furniture; it’s a gathering place for our soul.",
        author: "Zarah M.",
      },
      {
        text: "I was looking for something that honored my heritage but felt modern. Camel Caravan nailed it beautifully.",
        author: "Tariq A.",
      },
      {
        text: "The craftsmanship is undeniable. You can feel the hands that made this. Worth every dinar.",
        author: "Layla S.",
      },
      {
        text: "A perfect blend of comfort and tradition. Our guests always ask where we got our furnishings.",
        author: "Omar K.",
      },
      {
        text: "From the initial design to the final installation, the team was professional and passionate. A dream come true.",
        author: "Fatima R.",
      },
      {
        text: "The golden details and fabric quality are unmatched. It feels like a piece of art in our home.",
        author: "Hassan B.",
      },
    ];

    // Duplicate reviews to ensure seamless scrolling
    const allReviews = [...reviews, ...reviews, ...reviews];

    export default function Testimonials() {
    return(
    <section className = "testimonials" id = "testimonials" >
      <div className="testimonials-header reveal">
        <h2>
          Words from our <TextRotator words={['family', 'community', 'clients']} color="var(--desert-gold)" />
        </h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {allReviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-quote">"{review.text}"</p>
              <span className="review-author">— {review.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}
```
