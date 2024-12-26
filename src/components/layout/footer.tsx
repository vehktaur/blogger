import { Logo } from '@/assets/svgs';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='mt-auto bg-black px-5 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-around gap-6 ~py-8/12 sm:flex-row'>
        <Logo className='fill-white ~max-w-32/48 dark-hidden' />

        <small className='text-center text-gray-200 sm:text-sm'>
          All rights reserved. Copyright @vehktaur. Inspired by GreatStack
        </small>

        <div className='flex items-center gap-3'>
          <a href='https://x.com/vehktaur' target='_blank'>
            <FaXTwitter className='size-6' />
          </a>
          <a href='https://github.com/vehktaur' target='_blank'>
            <FaGithub className='size-6' />
          </a>
          <a href='https://linkedin.com/in/victor-akhihiero' target='_blank'>
            <FaLinkedin className='size-6' />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
