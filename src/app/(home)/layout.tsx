import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Metadata } from 'next';
import NavbarWrapper from '@/components/wrappers/navbar-wrapper';
import { Suspense } from 'react';
import NavbarSkeleton from '@/components/ui/skeletons/navbar-skeleton';

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack',
};

const AppLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarWrapper />
      </Suspense>

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default AppLayout;
