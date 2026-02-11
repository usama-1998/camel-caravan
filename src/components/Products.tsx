'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextRotator from './TextRotator';
import ConsultationModal from './ConsultationModal';

const products = [
  {
    title: 'Majlis',
    desc: 'Floor seating',
    href: 'https://camelcaravan.co/majlis/',
    image: '/images/products/majlis.png',
  },
  {
    title: 'Mashrabiya',
    desc: 'Geometric screens',
    href: 'https://camelcaravan.co/mashrabiya/',
    image: '/images/products/mashrabiya.png',
  },
  {
    title: 'Mihrab',
    desc: 'Prayer sanctuary',
    href: 'https://camelcaravan.co/mihrab/',
    image: '/images/products/mihrab.png',
  },
  {
    title: 'Manziliya',
    desc: 'Homeware collection',
    href: 'https://camelcaravan.co/manziliya/',
    image: '/images/products/manziliya.png',
  },
  {
    title: 'Mazidah',
    desc: 'Curtains & blinds',
    href: 'https://camelcaravan.co/mazidah/',
    image: '/images/products/mazidah.png',
  },
];

export default function Products() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="products">
      <div className="products-header">
        <span className="section-label">Our Collections</span>
        <h2>
          Furnishings made with <TextRotator words={['purpose', 'heritage', 'soul', 'meaning']} color="var(--caravan-brown)" />
        </h2>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.title}
            href={product.href}
            className="product-card"
          >
            <div className="product-image">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-subtitle">{product.desc}</p>
            </div>
          </Link>
        ))}

        {/* Static CTA Cell */}
        <div className="product-card product-cta-cell">
          <p className="product-cta-text">
            Discover our full range of bespoke Islamic furnishings and home accessories.
          </p>
          <Link href="/products" className="product-cta-btn">
            All Products <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="section-cta-wrap reveal">
        <button className="btn-section-cta" onClick={() => setModalOpen(true)}>
          ✦ Get a Custom Quote
        </button>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
