import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import '../globals.css';
import 'swiper/css';
import 'swiper/css/pagination';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack',
};

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='scroll-smooth' lang='en'>
      <body className={`flex flex-col min-h-screen ${barlow.className}`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
