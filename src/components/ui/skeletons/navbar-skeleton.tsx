import { Skeleton } from '../skeleton';
import Logo from '../logo';

const NavbarSkeleton = () => {
  return (
    <div className='padding-inline bg-white backdrop-blur-sm bg-opacity-55 fixed left-0 top-0 z-10 w-full'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4 pb-3 pt-4'>
        {/* Site logo */}
       <Logo/>

        {/* Profile | Login Links */}
        <div className='mb-2 flex items-center ~gap-4/6'>
          <Skeleton className='hidden h-11 w-36 rounded-full shadow-md sm:block' />
          <Skeleton className='block rounded-full ~size-10/12' />
        </div>
      </nav>
    </div>
  );
};
export default NavbarSkeleton;
