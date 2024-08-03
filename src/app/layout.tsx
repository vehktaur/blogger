import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import Footer from '@/app/components/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`min-h-screen grid ${outfit.className}`}>
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
