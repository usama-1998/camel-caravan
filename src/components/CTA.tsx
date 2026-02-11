'use client';

import { useRef, useState } from 'react';
import { useCanvasAnimation } from './useCanvasAnimation';
import ConsultationModal from './ConsultationModal';

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useCanvasAnimation(canvasRef, {
    particleCount: 120,
    baseAlpha: 0.1,
    glowAlpha: 0.5,
    glowRadius: 180,
    starColor: '198,153,62',
    enablePatterns: false,
    enableInteraction: false,
    spawnDirection: 'both'
  });

  return (
    <section className="cta-section">
      <canvas ref={canvasRef} className="cta-canvas" />
      <div className="crescent" />

      <div className="cta-content reveal">
        <h2>
          Ready to create a space your family will cherish?
        </h2>
        <p>
          Whether you have a clear vision or just a spark of an idea — we&apos;d love to bring it to
          life. Every journey begins with a single step.
        </p>
        <div className="cta-buttons">
          <button className="btn-gold" onClick={() => setModalOpen(true)}>
            Start Your Journey ✦
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
