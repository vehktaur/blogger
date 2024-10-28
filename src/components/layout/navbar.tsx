'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbar = useRef(null);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [dropdown, toggleDropdown] = useState(false);

  const Links = [
    {
      name: 'My Profile',
      icon: <UserIcon className='size-4' />,
      path: '/profile',
    },
    {
      name: 'Create Post',
      icon: <PlusIcon className='size-4' />,
      path: '/create-post',
    },
    {
      name: 'Blogs List',
      icon: <ListBulletIcon className='size-4' />,
      path: '/blogs',
    },
    {
      name: 'Logout',
      icon: <ArrowRightStartOnRectangleIcon className='size-4' />,
      path: '/',
    },
  ];

  const isLoggedIn = true;

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdown]);

  return (
    <div ref={navbar} className='padding-inline fixed left-0 top-0 z-10 w-full'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4 pb-3 pt-4'>
        <Link className='block' href='/'>
          <Image
            src='/icons/logo.png'
            width={180}
            height={100}
            alt='app logo'
            className='h-auto ~xxs/lg:~w-[7.25rem]/[8.625rem] sm:w-[11.625rem]'
          />
        </Link>

        {/* Profile | Login Links */}
        <div className='mb-2 flex items-center ~gap-4/6'>
          {isLoggedIn ? (
            <>
              <Link
                href='/create-post'
                className='group hidden items-center gap-2 rounded-full border border-black font-medium shadow-md transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200 sm:flex'
              >
                <PlusIcon className='transition-transform duration-300 ~w-4/5 group-hover:rotate-90 group-hover:scale-105' />
                Create Post
              </Link>
              <div className='relative'>
                <button
                  onClick={() => toggleDropdown((prev) => !prev)}
                  className='block rounded-full border bg-slate-500 ~size-10/12'
                ></button>
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='absolute right-0 top-[calc(100%+0.7rem)] rounded-lg bg-white px-4 pb-4 pt-3 shadow-md ~w-52/64'
                    >
                      <p>
                        <strong>Victor Akhihiero</strong>
                      </p>
                      <p className='leading-none text-gray-700'>
                        <small>victorakhihiero@gmail.com</small>
                      </p>

                      <ul className='mt-4 space-y-2 px-1 text-sm font-medium'>
                        {Links.map(({ name, icon, path }) => (
                          <li key={path}>
                            <Link
                              onClick={() => toggleDropdown((prev) => !prev)}
                              className='flex w-full items-center gap-2 rounded-md border px-3 transition-colors duration-150 ~py-2/3 hover:bg-gray-200'
                              href={path}
                            >
                              {icon} {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                href='/'
                className='flex items-center gap-2 border border-black font-medium shadow-offset transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200'
              >
                Sign In
              </Link>
              <Link
                href='/create-post'
                className='flex items-center gap-2 border border-black font-medium shadow-offset transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200'
              >
                Get Started
                <ArrowRightIcon className='mt-1 hidden w-4 animate-bounce sm:block' />
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
