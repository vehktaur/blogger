import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=''>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
