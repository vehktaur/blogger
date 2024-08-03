import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex gap-4 justify-between items-center px-5 sm:px-10 py-5 max-w-7xl mx-auto">
      <Link href="/">
        <Image
          src="/logo.png"
          width={180}
          height={100}
          alt="app logo"
          className="w-[130px] h-auto sm:w-auto"
        />
      </Link>
      <button className="flex items-center gap-2 ~px-3/6 ~py-1/3 font-medium border border-black shadow-offset hover:bg-gray-200 transition-colors duration-300 group">
        Get Started
        <Image
          className="group-hover:animate-bounce"
          src="/arrow.png"
          width={16}
          height={14}
          alt="arrow image"
        />
      </button>
    </nav>
  );
};
export default Navbar;
