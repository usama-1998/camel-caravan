'use client';

import { useEffect, useRef } from 'react';

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate counters when in view
    const counters = section.querySelectorAll('.counter-num');
    let animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const suffix = el.getAttribute('data-suffix') || '';
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateCounters();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="philosophy" ref={sectionRef}>
      {/* Decorative arch background */}
      <div className="philosophy-arch">
        <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 700 L100 280 Q100 100 300 100 Q500 100 500 280 L500 700"
            stroke="rgba(198,153,62,0.4)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M130 700 L130 300 Q130 130 300 130 Q470 130 470 300 L470 700"
            stroke="rgba(198,153,62,0.25)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M160 700 L160 320 Q160 160 300 160 Q440 160 440 320 L440 700"
            stroke="rgba(198,153,62,0.15)"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Keystone ornament */}
          <circle cx="300" cy="100" r="6" fill="rgba(198,153,62,0.4)" />
          <circle cx="300" cy="100" r="12" stroke="rgba(198,153,62,0.3)" strokeWidth="0.5" fill="none" />
          {/* Side ornaments */}
          <circle cx="100" cy="400" r="4" fill="rgba(198,153,62,0.3)" />
          <circle cx="500" cy="400" r="4" fill="rgba(198,153,62,0.3)" />
        </svg>
      </div>

      <div className="philosophy-inner">
        <div className="philosophy-text reveal">
          <span className="section-label">Our Philosophy</span>
          <h2>
            We believe the <em style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--desert-gold)' }}>heart of every home</em> is where family gathers
          </h2>
          <p>
            Every piece we create carries the warmth of tradition and the intention of togetherness.
            From the majlis where conversations deepen, to the mihrab where souls find peace — we
            design for the moments that matter.
          </p>
          <p>
            Our journey began with a simple question: how can we bring the beauty of Islamic heritage
            into modern family life? The answer became Camel Caravan.
          </p>
        </div>

        {/* Counters row */}
        <div className="philosophy-counters reveal">
          <div className="counter-item">
            <span className="counter-num" data-target="500" data-suffix="+">0</span>
            <span className="counter-label">Families Served</span>
          </div>
          <div className="counter-divider" />
          <div className="counter-item">
            <span className="counter-num" data-target="8" data-suffix=" Years">0</span>
            <span className="counter-label">Of Craftsmanship</span>
          </div>
          <div className="counter-divider" />
          <div className="counter-item">
            <span className="counter-num" data-target="100" data-suffix="%">0</span>
            <span className="counter-label">Handcrafted</span>
          </div>
        </div>

        {/* Value badges */}
        <div className="philosophy-values reveal">
          {['Heritage', 'Family', 'Craftsmanship', 'Intention'].map((val) => (
            <div key={val} className="value-badge">
              <span className="value-icon">✦</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
