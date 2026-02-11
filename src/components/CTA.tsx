'use client';

import { useEffect, useRef } from 'react';

export default function CTA() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      const size = `${1 + Math.random() * 2}px`;
      s.style.width = size;
      s.style.height = size;
      s.style.animationDuration = `${1.5 + Math.random() * 3}s`;
      s.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(s);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <section className="cta-section">
      <div className="stars" ref={starsRef} />
      <div className="crescent" />

      <div className="cta-content reveal">
        <h2>
          Ready to create a space your family will <em>cherish</em>?
        </h2>
        <p>
          Whether you have a clear vision or just a spark of an idea — we&apos;d love to bring it to
          life. Every journey begins with a single step.
        </p>
        <div className="cta-buttons">
          <a
            href="https://wa.me/6588151459"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            WhatsApp Us ↗
          </a>
          <a href="https://camelcaravan.co/contact-us/" className="btn-outline-light">
            Contact Form
          </a>
        </div>
      </div>
    </section>
  );
}
