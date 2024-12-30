'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { FiArrowRight, FiLogIn } from 'react-icons/fi';
import { HiPlus, HiListBullet } from 'react-icons/hi2';
import { PiUser } from 'react-icons/pi';
import { LuLogOut } from 'react-icons/lu';
import { signOut } from 'next-auth/react';
import { assets } from '@/assets/assets';
import { User } from '@/lib/models/users';
import { cn } from '@/lib/utils';
import Logo from '../ui/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user?: User | null;
}) => {
  // Navbar reference to change background color on scroll
  const navbar = useRef(null);

  // Links for profile dropdown menu
  const dropdownLinks = [
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
    },
  ];

  // GSAP animation to change navbar background color on scroll
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
    <nav ref={navbar} className='padding-inline fixed left-0 top-0 z-10 w-full'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 pb-3 pt-4'>
        {/* Site logo */}
        <Logo />

        {/* Profile | Login Links */}
        <div className='mb-2 flex items-center ~text-sm/base ~gap-4/6'>
          {isLoggedIn ? (
            <>
              <Link
                href='/create-post'
                className='group hidden items-center gap-2 rounded-full border border-black font-medium shadow-md transition-colors duration-300 ~px-3/5 ~py-1.5/2.5 hover:bg-gray-200 sm:flex'
              >
                <HiPlus className='transition-transform duration-300 ~size-4/5 group-hover:rotate-90 group-hover:scale-105' />
                Create Post
              </Link>

              {/* Profile dropdown menu */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className='block overflow-hidden rounded-full border ~size-10/12'>
                  <Image
                    className='size-full object-cover'
                    src={user?.image || assets.profile_img}
                    width={1280}
                    height={720}
                    alt={user?.name || 'user profile image'}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='rounded-lg bg-white px-4 pb-4 pt-3 shadow-md ~w-52/64'>
                  <p className='truncate'>
                    <strong>{user?.name}</strong>
                  </p>
                  <p className='leading-none text-gray-700'>
                    <small>{user?.email}</small>
                  </p>

                  <ul className='mt-4 space-y-2 px-1 text-sm font-medium'>
                    {dropdownLinks.map(({ name, icon, path }) => (
                      <li key={name}>
                        <DropdownMenuItem
                          asChild={name !== 'Logout'}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md border px-3 transition-colors duration-150 ~py-2/3 hover:bg-gray-200',
                            { 'text-red-600': name === 'Logout' },
                          )}
                          onClick={() => {
                            if (name === 'Logout') {
                              signOut();
                            }
                          }}
                        >
                          {name === 'Logout' ? (
                            <>
                              {icon} {name}
                            </>
                          ) : (
                            <Link href={path ?? '/'}>
                              {icon} {name}
                            </Link>
                          )}
                        </DropdownMenuItem>
                      </li>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Get Started / Login Links (Shown when user not logged in) */}
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
      </div>
    </nav>
  );
};
export default Navbar;
