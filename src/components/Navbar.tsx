'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link href="https://camelcaravan.co/" className="nav-logo">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#C6993E" strokeWidth="1.5" fill="none" />
          <path
            d="M10 28 Q14 16 18 18 Q20 19 20 22 L20 28 M20 22 Q20 19 22 18 Q26 16 30 28"
            stroke="#5C3D2E"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="20" cy="10" r="2" fill="#C6993E" />
        </svg>
        <span>Camel Caravan</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="https://camelcaravan.co/shop/">Shop</Link>
        </li>
        <li>
          <Link href="https://camelcaravan.co/about-us/">Our Story</Link>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1B_nU-ehyrK26i3ApYfodDAIXoZ_c_JXc/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            Catalog
          </a>
        </li>
        <li>
          <Link href="https://camelcaravan.co/contact-us/" className="nav-cta">
            Get in Touch
          </Link>
        </li>
      </ul>

      <button className="mobile-menu-btn" aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
