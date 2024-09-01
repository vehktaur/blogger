import { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import '../globals.css';
import 'swiper/css';
import 'swiper/css/pagination';

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack'
};

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${barlow.className}`}>{children}</body>
    </html>
  );
}
