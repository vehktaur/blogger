'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiLogIn } from 'react-icons/fi';
import { HiPlus, HiListBullet } from 'react-icons/hi2';
import { PiUser } from 'react-icons/pi';
import { LuLogOut } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import { assets } from '@/assets/assets';
import { User } from '@/lib/models/users';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user?: User | null;
}) => {
  const navbar = useRef(null);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [dropdown, toggleDropdown] = useState(false);

  const Links = [
    {
      name: 'My Profile',
      icon: <PiUser className='size-4' />,
      path: `/${user?.username}`,
    },
    {
      name: 'Create Post',
      icon: <HiPlus className='size-4' />,
      path: '/create-post',
    },
    {
      name: 'Blogs List',
      icon: <HiListBullet className='size-4' />,
      path: '/blogs',
    },
    {
      name: 'Logout',
      icon: <LuLogOut className='size-4' />,
      path: '/',
    },
  ];

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
                <HiPlus className='transition-transform duration-300 ~size-4/5 group-hover:rotate-90 group-hover:scale-105' />
                Create Post
              </Link>
              <div className='relative'>
                <button
                  onClick={() => toggleDropdown((prev) => !prev)}
                  className='block overflow-hidden rounded-full border ~size-10/12'
                >
                  <Image
                    className='size-full object-cover'
                    src={user?.image || assets.profile_img}
                    width={1280}
                    height={720}
                    alt={user?.name || 'user profile image'}
                  />
                </button>
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
                      <p className='truncate'>
                        <strong>{user?.name}</strong>
                      </p>
                      <p className='leading-none text-gray-700'>
                        <small>{user?.email}</small>
                      </p>

                      <ul className='mt-4 space-y-2 px-1 text-sm font-medium'>
                        {Links.map(({ name, icon, path }) => (
                          <li key={path}>
                            <MenuItem
                              name={name}
                              icon={icon}
                              path={path}
                              className='flex w-full items-center gap-2 rounded-md border px-3 transition-colors duration-150 ~py-2/3 hover:bg-gray-200'
                              onClick={() => toggleDropdown((prev) => !prev)}
                            />
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
                href='/auth/login'
                className='flex items-center gap-2 border border-black font-medium shadow-offset transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200'
              >
                Login
                <FiLogIn className='mt-1 hidden w-4 sm:block' />
              </Link>
              <Link
                href='/auth/sign-up'
                className='flex items-center gap-2 border border-black font-medium shadow-offset transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200'
              >
                Get Started
                <FiArrowRight className='mt-1 hidden w-4 animate-bounce sm:block' />
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;

const MenuItem = ({
  name,
  icon,
  path,
  className,
  onClick,
}: {
  name: string;
  icon: JSX.Element;
  path: string;
  className: string;
  onClick: () => void;
}) => {
  return name === 'Logout' ? (
    <button
      onClick={() => {
        signOut();
        onClick();
      }}
      className={clsx(className, 'text-red-600')}
      type='button'
    >
      {icon} {name}
    </button>
  ) : (
    <Link onClick={() => onClick()} className={clsx(className)} href={path}>
      {icon} {name}
    </Link>
  );
};
