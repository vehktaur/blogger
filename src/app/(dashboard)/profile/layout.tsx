import NavLink from '@/components/ui/nav-link';
import ProfileImg from '@/components/profile/profile-img';
import UseFormContextProvider from '@/context/UseFormContextProvider';
import { PiUser } from 'react-icons/pi';
import { GoShieldLock } from "react-icons/go";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  //NavLinks for different profile sections
  const navLinks = [
    {
      name: 'Personal Info',
      icon: <PiUser className='mt-[0.1rem] w-[1.1rem]' />,
      path: '/profile',
    },
    {
      name: 'Security',
      icon: <GoShieldLock className='w-4' />,
      path: '/profile/password',
    },
  ];

  return (
    <div className='px-5 pb-10 ~pt-5/8'>
      <div className='mx-auto max-w-6xl'>
        {/* Profile picture section */}
        <UseFormContextProvider>
          <ProfileImg />
        </UseFormContextProvider>

        {/* Link and header for different profile sections */}
        <h1 className='mb-10 flex w-full max-w-xl border-b-2 pb-1 ~text-base/lg ~gap-4/12'>
          {navLinks.map(({ name, icon, path }) => (
            <NavLink
              key={path}
              activeClassName='!text-black !border-black !border-b-[3px]'
              className='flex items-center gap-1.5 border-gray-500 pe-2.5 font-semibold text-stone-400 transition duration-100 ~pb-1/2 hover:border-b-2 hover:text-black'
              href={path}
              exact
            >
              {icon}
              {name}
            </NavLink>
          ))}
        </h1>

        {/* Different profile sections */}
        <section className='max-w-xl w-4/5'> {children}</section>
      </div>
    </div>
  );
};
export default ProfileLayout;
