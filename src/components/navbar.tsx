'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbar = useRef(null);

  useGSAP(() => {
    gsap.to(navbar.current, {
      backgroundColor: 'rgb(255 255 255 / 0.45)',
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      backdropFilter: 'blur(5px)',
      scrollTrigger: {
        start: 'top+=70',
        end: '+=0',
        toggleActions: 'play none none reverse',
        scrub: 2,
      },
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div ref={navbar} className='fixed left-0 top-0 z-10 w-full'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pb-3 pt-4 sm:px-10'>
        <Link className='block' href='/'>
          <Image
            src='/icons/logo.png'
            width={180}
            height={100}
            alt='app logo'
            className='h-auto ~xxs/lg:~w-[7.25rem]/[8.625rem] sm:w-[11.625rem]'
          />
        </Link>
        <Link
          href='/add-blog'
          className='mb-2 flex items-center gap-2 border border-black font-medium shadow-offset transition-colors duration-300 ~px-2/6 ~py-1.5/3 hover:bg-gray-200'
        >
          Get Started
          <ArrowRightIcon className='mt-1 w-4 animate-bounce' />
        </Link>
      </nav>
    </div>
  );
};
export default Navbar;
