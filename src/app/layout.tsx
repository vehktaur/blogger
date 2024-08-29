import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';

import Footer from '@/app/components/Footer';
import Navbar from './components/Navbar';

const barlow = Barlow({
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
      <body className={`min-h-screen grid ${barlow.className}`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
