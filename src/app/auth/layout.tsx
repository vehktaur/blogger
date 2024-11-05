import { Metadata } from 'next';

import Illustration from '@/components/layout/illustration';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get Started | Blogger',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='mx-auto grid max-w-[90rem] grid-cols-1 md:grid-cols-2'>
        <main className='padding-inline pb-28 ~pt-8/14'>
          <header className='~mb-10/12'>
            <Link href='/'>
              <Image
                src='/icons/logo.png'
                width={180}
                height={100}
                alt='app logo'
                className='h-auto ~xxs/2xl:~w-[7.625rem]/[8.625rem]'
              />
            </Link>
          </header>
          {children}
        </main>
        <aside className='hidden pb-0 md:grid md:~p-5/6'>
          <Illustration />
        </aside>
      </div>
    </>
  );
}
