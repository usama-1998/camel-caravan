import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-name">Camel Caravan Co.</div>
          <p>
            Through the desert, to your home. Creating lifestyle solutions that enhance family
            togetherness through thoughtfully designed home furnishings and décor.
          </p>
        </div>

        <div className="footer-col">
          <h4>Collections</h4>
          <Link href="https://camelcaravan.co/majlis/">Majlis Sofa</Link>
          <Link href="https://camelcaravan.co/mashrabiya/">Mashrabiya</Link>
          <Link href="https://camelcaravan.co/mihrab/">Mihrab</Link>
          <Link href="https://camelcaravan.co/manziliya/">Manziliya</Link>
          <Link href="https://camelcaravan.co/mazidah/">Mazidah</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="https://camelcaravan.co/about-us/">Our Story</Link>
          <Link href="https://camelcaravan.co/contact-us/">Contact</Link>
          <a
            href="https://drive.google.com/file/d/1B_nU-ehyrK26i3ApYfodDAIXoZ_c_JXc/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            Catalog
          </a>
        </div>

        <div className="footer-col">
          <h4>Visit Us</h4>
          <a href="#">
            Gordon Industrial Building
            <br />
            Eunos Ave 3 #07-06
            <br />
            Singapore 409838
          </a>
          <a href="tel:+6588151459" style={{ marginTop: '0.5rem' }}>
            +65 8815 1459
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Camel Caravan Co. — All Rights Reserved</p>
        <div className="footer-social">
          <a href="https://instagram.com/camelcaravanco" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
          <a href="https://www.facebook.com/camelcaravanco" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
          <a href="https://tiktok.com/@camelcaravanco" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TK</a>
          <a href="https://wa.me/6588151459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
        </div>
      </div>
    </footer>
  );
}
