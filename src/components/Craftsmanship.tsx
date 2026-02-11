'use client';

import { useState } from 'react';
import ConsultationModal from './ConsultationModal';

export default function Craftsmanship() {
  const [modalOpen, setModalOpen] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Share Your Vision',
      desc: "Tell us your idea — a sketch, a photo, or even just a feeling. We'll guide the rest.",
    },
    {
      num: '02',
      title: 'Measure & Design',
      desc: 'We visit your home, take precise measurements, and co-create a design that fits your space and soul.',
    },
    {
      num: '03',
      title: 'Craft & Install',
      desc: 'Every piece is built with care, delivered to your door, and installed with attention to every last detail.',
    },
  ];

  return (
    <section className="craftsmanship">
      <div className="craft-header">
        <div className="crescent-top-left" />
        <span className="section-label reveal">How We Work</span>
        <h2 className="reveal">
          From your vision to a finished <em>piece</em>
        </h2>
      </div>

      <div className="timeline-container">
        {/* The Golden Path */}
        <div className="timeline-path" />

        <div className="timeline-items">
          {steps.map((step, i) => (
            <div key={step.num} className={`timeline-item reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}>
              {/* The Node */}
              <div className="timeline-node">
                <div className="timeline-node-inner" />
              </div>

              {/* The Content */}
              <div className="timeline-content">
                <span className="timeline-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-cta-wrap reveal">
        <button className="btn-section-cta btn-section-cta--light" onClick={() => setModalOpen(true)}>
          ✦ Start Your Journey
        </button>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
