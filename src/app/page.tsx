'use client';

import { useScrollReveal } from '@/components/useScrollReveal';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Products from '@/components/Products';
import Craftsmanship from '@/components/Craftsmanship';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Philosophy />
      <Craftsmanship />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
