import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-transparent '>
      <nav className="flex gap-4 justify-between items-center px-5 sm:px-10 py-5 max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/logo.png"
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
            src="/arrow.png"
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
