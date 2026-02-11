import Link from 'next/link';
import { MajlisSVG, MashrabiyaSVG, MihrabSVG, ManziliyaSVG, MazidahSVG } from './ProductSVGs';

const products = [
  {
    title: 'Majlis Sofa',
    desc: 'Floor seating that brings the family together — customizable fabric, measurement, and structure.',
    price: 'From SGD 860',
    stamp: 'Hand\nMade',
    href: 'https://camelcaravan.co/majlis/',
    Illustration: MajlisSVG,
  },
  {
    title: 'Mashrabiya Panels',
    desc: 'Islamic-inspired geometric screens — sliding panels, wall features, partitions, and lightboxes.',
    price: 'From SGD 420',
    stamp: 'Custom',
    href: 'https://camelcaravan.co/mashrabiya/',
    Illustration: MashrabiyaSVG,
  },
  {
    title: 'Mihrab',
    desc: 'A prayer sanctuary for your home — spiritual connection, family unity, and emotional grounding.',
    price: 'From SGD 249',
    stamp: '✦',
    href: 'https://camelcaravan.co/mihrab/',
    Illustration: MihrabSVG,
  },
  {
    title: 'Manziliya',
    desc: 'Exquisite homeware collection — from everyday essentials to elegant statement pieces.',
    price: 'From SGD 38',
    stamp: null,
    href: 'https://camelcaravan.co/manziliya/',
    Illustration: ManziliyaSVG,
  },
  {
    title: 'Mazidah',
    desc: 'Window curtains, blinds, and reupholstery — personalized home services for your space.',
    price: 'Custom Quote',
    stamp: null,
    href: 'https://camelcaravan.co/mazidah/',
    Illustration: MazidahSVG,
  },
];

export default function Products() {
  return (
    <section className="products">
      <div className="products-header reveal">
        <span className="section-label">Our Collections</span>
        <h2>
          Furnishings made with <em>purpose</em>
        </h2>
      </div>

      <div className="products-grid">
        {products.map((product, i) => (
          <Link
            key={product.title}
            href={product.href}
            className={`product-card reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="product-image">
              <product.Illustration />
              {product.stamp && (
                <div className="product-stamp" style={{ whiteSpace: 'pre-line' }}>
                  {product.stamp}
                </div>
              )}
              <div className="product-price">{product.price}</div>
              <div className="product-label">
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
