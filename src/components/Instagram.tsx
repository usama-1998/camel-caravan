const polaroids = [
  {
    caption: 'family moments ♡',
    svg: (
      <svg viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" fill="#E8D5BF" />
        <rect x="30" y="100" width="140" height="40" rx="10" fill="#C4A882" />
        <rect x="40" y="85" width="40" height="55" rx="6" fill="#B89B6E" />
        <rect x="120" y="85" width="40" height="55" rx="6" fill="#B89B6E" />
        <text x="100" y="170" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6B5D4F">Family Majlis</text>
      </svg>
    ),
  },
  {
    caption: 'geometric beauty',
    svg: (
      <svg viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" fill="#2C3E2D" />
        <circle cx="100" cy="90" r="40" fill="none" stroke="#C6993E" strokeWidth="1" />
        <circle cx="100" cy="90" r="28" fill="none" stroke="#C6993E" strokeWidth="0.5" />
        <rect x="40" y="130" width="120" height="50" fill="none" stroke="#C6993E" strokeWidth="0.8" rx="4" />
        <text x="100" y="175" textAnchor="middle" fontFamily="serif" fontSize="11" fill="rgba(232,213,191,0.5)">Mashrabiya</text>
      </svg>
    ),
  },
  {
    caption: 'sacred spaces',
    svg: (
      <svg viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" fill="#1A1A2E" />
        <path d="M70 180 L70 80 Q70 40 100 40 Q130 40 130 80 L130 180" fill="none" stroke="#C6993E" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="10" fill="none" stroke="#C6993E" strokeWidth="0.8" />
        <circle cx="100" cy="70" r="3" fill="#C6993E" opacity="0.5" />
        <text x="100" y="170" textAnchor="middle" fontFamily="serif" fontSize="11" fill="rgba(198,153,62,0.5)">Mihrab</text>
      </svg>
    ),
  },
  {
    caption: 'daily essentials',
    svg: (
      <svg viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" fill="#F5EDE3" />
        <circle cx="70" cy="100" r="30" fill="none" stroke="#5C3D2E" strokeWidth="1" />
        <rect x="120" y="80" width="50" height="60" rx="4" fill="none" stroke="#C6993E" strokeWidth="1" />
        <path d="M60 130 Q80 160 100 140" fill="none" stroke="#5C3D2E" strokeWidth="0.8" />
        <text x="100" y="175" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6B5D4F">Homeware</text>
      </svg>
    ),
  },
];

export default function Instagram() {
  return (
    <section className="instagram-section">
      <div className="instagram-header reveal">
        <span className="section-label">@camelcaravanco</span>
        <h2>Follow Our Journey</h2>
      </div>

      <div className="polaroid-strip">
        {polaroids.map((p, i) => (
          <a
            key={p.caption}
            href="https://instagram.com/camelcaravanco"
            target="_blank"
            rel="noopener noreferrer"
            className={`polaroid reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}
          >
            <div className="polaroid-img">{p.svg}</div>
            <div className="polaroid-caption">{p.caption}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
