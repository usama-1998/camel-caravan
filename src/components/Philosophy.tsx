'use client';

import { useState } from 'react';
import ConsultationModal from './ConsultationModal';

export default function Philosophy() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="philosophy">
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
            We believe the <em style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--desert-gold)' }}>heart of every home</em> is where <em>family</em> gathers
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

        <div className="section-cta-wrap reveal">
          <button className="btn-section-cta" onClick={() => setModalOpen(true)}>
            ✦ Start Your Journey
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
