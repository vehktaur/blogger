import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link className='block' href='/'>
      <Image
        src='/icons/logo.png'
        width={180}
        height={100}
        alt='app logo'
        className='h-auto ~xxs/lg:~w-[7.25rem]/[8.625rem] sm:w-[11.625rem]'
      />
    </Link>
  );
};
export default Logo;
