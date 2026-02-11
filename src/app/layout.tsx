import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Camel Caravan — Through the Desert, to Your Home',
  description:
    'Traditional craftsmanship meets purposeful design — handcrafted furnishings that nurture togetherness, hospitality, and the spirit of home.',
  openGraph: {
    title: 'Camel Caravan — Through the Desert, to Your Home',
    description:
      'Handcrafted Islamic-inspired home furnishings from Singapore. Majlis sofas, Mashrabiya panels, Mihrab prayer corners & more.',
    url: 'https://camelcaravan.co',
    siteName: 'Camel Caravan Co.',
    locale: 'en_SG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
