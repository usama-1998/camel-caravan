const testimonials = [
  {
    quote:
      "The majlis transformed our living room into the heart of our home. Our kids now sit with us every evening — it's become our favorite space.",
    name: 'Nurhaida & Family',
    detail: 'Majlis Sofa — Woodlands, SG',
    initial: 'N',
  },
  {
    quote:
      'The mashrabiya panels added such a beautiful touch to our home. Guests always ask about them — true conversation starters that carry meaning.',
    name: 'Ahmad R.',
    detail: 'Mashrabiya Wall Feature — Tampines, SG',
    initial: 'A',
  },
  {
    quote:
      'Having a mihrab corner gave our family a dedicated space for prayer. The craftsmanship is impeccable — you can feel the care in every detail.',
    name: 'Sarah & Imran',
    detail: 'Mihrab — Pasir Ris, SG',
    initial: 'S',
  },
];

import TextRotator from './TextRotator';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-header reveal">
        <h2>
          Words from our <TextRotator words={['family', 'community', 'clients']} color="var(--caravan-brown)" />
        </h2>
      </div>

      <div className="postcard-wall">
        {testimonials.map((t, i) => (
          <div key={t.name} className={`postcard reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}>
            <div className="postcard-stars">★ ★ ★ ★ ★</div>
            <p className="postcard-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="postcard-author">
              <div className="author-avatar">{t.initial}</div>
              <div className="author-info">
                <span>{t.name}</span>
                <small>{t.detail}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
