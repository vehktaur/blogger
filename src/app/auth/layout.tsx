import { Metadata } from 'next';

import Illustration from '../../components/layout/illustration';
import Link from 'next/link';
import { Logo } from '@/assets/svgs';

export const metadata: Metadata = {
  title: 'Get Started | Logs',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto grid w-full max-w-[90rem] grid-cols-1 md:grid-cols-2'>
      {/* Main content - Left Column  */}
      <main className='padding-inline pb-28 ~pt-8/14'>
        {/* Site logo */}
        <Link href='/'>
          <Logo className='dark-hidden ~mb-10/12 ~w-32/40' />
        </Link>

        {/* Login / Signup Form */}
        {children}
      </main>

      {/* Side illustration with swiper gallery */}
      <aside className='hidden pb-0 md:grid md:~p-5/6'>
        <Illustration />
      </aside>
    </div>
  );
}
