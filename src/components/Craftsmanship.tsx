import TextRotator from './TextRotator';

export default function Craftsmanship() {
  return (
    <section className="craftsmanship">
      <div className="craft-visual">
        <svg
          className="islamic-star"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="180" stroke="#C6993E" strokeWidth="0.5" opacity="0.2" />
          <circle cx="200" cy="200" r="140" stroke="#C6993E" strokeWidth="0.5" opacity="0.3" />
          <circle cx="200" cy="200" r="100" stroke="#C6993E" strokeWidth="0.5" opacity="0.4" />
          <circle cx="200" cy="200" r="60" stroke="#C6993E" strokeWidth="0.5" opacity="0.5" />
          <polygon points="200,30 220,170 200,150 180,170" fill="none" stroke="#C6993E" strokeWidth="1" opacity="0.6" />
          <polygon points="370,200 230,220 250,200 230,180" fill="none" stroke="#C6993E" strokeWidth="1" opacity="0.6" />
          <polygon points="200,370 180,230 200,250 220,230" fill="none" stroke="#C6993E" strokeWidth="1" opacity="0.6" />
          <polygon points="30,200 170,180 150,200 170,220" fill="none" stroke="#C6993E" strokeWidth="1" opacity="0.6" />
          <polygon points="320,80 240,190 230,170 250,170" fill="none" stroke="#C6993E" strokeWidth="0.8" opacity="0.4" />
          <polygon points="320,320 240,210 250,230 230,230" fill="none" stroke="#C6993E" strokeWidth="0.8" opacity="0.4" />
          <polygon points="80,320 160,210 170,230 150,230" fill="none" stroke="#C6993E" strokeWidth="0.8" opacity="0.4" />
          <polygon points="80,80 160,190 150,170 170,170" fill="none" stroke="#C6993E" strokeWidth="0.8" opacity="0.4" />
          <polygon points="200,160 215,190 245,190 222,210 230,240 200,222 170,240 178,210 155,190 185,190" fill="none" stroke="#C6993E" strokeWidth="1.2" opacity="0.8" />
          <circle cx="200" cy="200" r="8" fill="#C6993E" opacity="0.6" />
          <line x1="200" y1="30" x2="200" y2="370" stroke="#C6993E" strokeWidth="0.3" opacity="0.15" />
          <line x1="30" y1="200" x2="370" y2="200" stroke="#C6993E" strokeWidth="0.3" opacity="0.15" />
          <line x1="80" y1="80" x2="320" y2="320" stroke="#C6993E" strokeWidth="0.3" opacity="0.15" />
          <line x1="320" y1="80" x2="80" y2="320" stroke="#C6993E" strokeWidth="0.3" opacity="0.15" />
        </svg>
      </div>

      <div className="craft-text">
        <span className="section-label reveal">How We Work</span>
        <h2 className="reveal">
          From your <TextRotator words={['vision', 'dream', 'idea']} color="var(--desert-gold)" /> to a finished piece — crafted by hand, guided by heart
        </h2>

        <div className="craft-process">
          {[
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
          ].map((step, i) => (
            <div key={step.num} className={`process-step reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}>
              <span className="step-num">{step.num}</span>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
