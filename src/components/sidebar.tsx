import { assets } from '@/assets/assets';
import {
  PlusCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import NavLink from './nav-link';

const Sidebar = () => {
  const navLinks = [
    {
      name: 'Add Blog',
      icon: <PlusCircleIcon className='size-7' />,
      path: '/add-blog',
    },
    {
      name: 'Blogs List',
      icon: <ListBulletIcon className='size-7' />,
      path: '/blogs',
    },
  ];
  return (
    <aside className='full-screen sticky left-0 top-0 w-16 border-r border-black bg-stone-50 sm:~w-40/80'>
      <div className='flex h-full flex-col'>
        <div className='h-[3.75rem] border-b border-black sm:py-3'>
          <div className='h-full w-full content-center sm:px-8 md:px-12'>
            <NavLink className='mx-auto block w-full sm:w-auto' href='/'>
              <Image
                src='/icons/logo.png'
                width={180}
                height={100}
                alt='app logo'
                className='hidden h-auto w-full ~xxs/lg:~max-w-[7.25rem]/[9rem] sm:block'
              />
              <div className='mx-auto size-10 rounded-lg bg-stone-200 px-1 sm:hidden'>
                <Image
                  src='/icons/blogger_logo.png'
                  width={180}
                  height={100}
                  alt='app logo'
                  className='size-full object-contain sm:hidden'
                />
              </div>
            </NavLink>
          </div>
        </div>

        <div className='space-y-3 ~py-5/8'>
          {navLinks.map(({ name, icon, path }) => (
            <NavLink
              activeClassName='bg-stone-200'
              className='block px-1 py-1.5 transition-all duration-500 hover:bg-stone-200 sm:px-8 md:px-12'
              key={name}
              href={path}
            >
              <div className='flex items-center justify-center gap-2 py-2 font-medium sm:justify-start'>
                {icon}
                <span className='hidden ~text-sm/base sm:block'>{name}</span>
              </div>
            </NavLink>
          ))}
        </div>

        <div className='mt-auto px-1'>
          <hr className='mx-auto block border max-w-[90%] border-stone-900 sm:border-[1.5px] rounded-full' />
          <div className='flex items-center px-1 py-3 ~gap-1/4 sm:~px-2/5'>
            <div className='mx-auto flex-shrink-0 overflow-hidden rounded-full ~w-10/12 sm:mx-0'>
              <Image
                className='object-cover'
                src={assets.profile_img}
                alt='Profile Image'
              />
            </div>
            <div className='hidden sm:grid'>
              <span className='font-medium ~text-sm/base'>Kurapika</span>
              <span className='text-[#666] ~text-xs/sm'>
                victorakhihiero@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
