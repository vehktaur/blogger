import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getUser } from '@/lib/server-utils';

export const metadata: Metadata = {
  title: 'Blogger',
  description: 'Blog App from GreatStack',
};

const AppLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const user = await getUser({ id: session?.user?._id });

  return (
    <>
      <Navbar
        isLoggedIn={!!session}
        user={user}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default AppLayout;
