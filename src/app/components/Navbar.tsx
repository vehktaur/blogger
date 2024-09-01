'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

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
        scrub: 2
      },
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div ref={navbar} className="fixed top-0 left-0 w-full z-10">
      <nav className="flex gap-4 justify-between items-center px-5 sm:px-10 pt-4 pb-3 max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/icons/logo.png"
            width={180}
            height={100}
            alt="app logo"
            className="~xxs/lg:~w-[7.25rem]/[8.125rem] h-auto sm:w-auto"
          />
        </Link>
        <button className="flex items-center gap-2 ~px-2/6 ~py-1.5/3 font-medium border border-black shadow-offset hover:bg-gray-200 transition-colors duration-300 mb-2">
          Get Started
          <Image
            className="animate-bounce mt-1"
            src="/icons/arrow.png"
            width={16}
            height={14}
            alt="arrow image"
          />
        </button>
      </nav>
    </div>
  );
};
export default Navbar;
