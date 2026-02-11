'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'nav-open' : ''}`}>
      <Link href="https://camelcaravan.co/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <Image
          src="/images/logo.png"
          alt="Camel Caravan Logo"
          width={40}
          height={40}
          className="nav-logo-img"
        />
        <span>Camel Caravan</span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link href="#philosophy" onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            document.querySelector('.philosophy')?.scrollIntoView({ behavior: 'smooth' });
          }}>Philosophy</Link>
        </li>
        <li>
          <Link href="#craftsmanship" onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            document.querySelector('.craftsmanship')?.scrollIntoView({ behavior: 'smooth' });
          }}>Process</Link>
        </li>
        <li>
          <Link href="#products" onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            document.querySelector('.products')?.scrollIntoView({ behavior: 'smooth' });
          }}>Collection</Link>
        </li>
        <li>
          <Link href="#testimonials" onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            document.querySelector('.testimonials')?.scrollIntoView({ behavior: 'smooth' });
          }}>Reviews</Link>
        </li>
        <li>
          <Link href="#cta" className="nav-cta" onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Get in Touch
          </Link>
        </li>
      </ul>

      <button
        className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
