'use client';

import { useRef } from 'react';
import { useCanvasAnimation } from './useCanvasAnimation';
import TextRotator from './TextRotator';

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasAnimation(canvasRef, {
    particleCount: 120, // Increased for starry night effect
    baseAlpha: 0.1,
    glowAlpha: 0.5,
    glowRadius: 180,
    starColor: '198,153,62', // Gold
    enablePatterns: false, // Optimization: remove heavy geometric patterns
    enableInteraction: false, // User request: remove mouse interaction
    spawnDirection: 'both' // User request: particles from top and bottom
  });

  return (
    <section className="cta-section">
      <canvas ref={canvasRef} className="cta-canvas" />

      {/* Remove old decorative elements as they are now in canvas or not needed */}
      {/* <div className="stars" ref={starsRef} /> */}
      <div className="crescent" />

      <div className="cta-content reveal">
        <h2>
          Ready to create a space your family will <TextRotator words={['cherish', 'love', 'remember']} color="var(--desert-gold)" />?
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
