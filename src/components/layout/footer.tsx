import { Logo } from '@/assets/svgs';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='mt-auto bg-black px-5 text-white ~py-8/12'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-around gap-6 sm:flex-row group'>
        <Logo className='dark-hidden fill-white ~max-w-32/48' />

        <small className='text-center text-gray-200 sm:text-sm'>
          All rights reserved. Copyright @vehktaur. Inspired by GreatStack
        </small>

        <div className='flex items-center gap-3 transition-colors group-hover:text-gray-500'>
          <a href='https://x.com/vehktaur' target='_blank'>
            <span className='sr-only'>Twitter social link</span>
            <FaXTwitter className='size-6 transition-colors hover:text-white' />
          </a>
          <a href='https://github.com/vehktaur' target='_blank'>
            <span className='sr-only'>Github social link</span>
            <FaGithub className='size-6 transition-colors hover:text-white' />
          </a>
          <a href='https://linkedin.com/in/victor-akhihiero' target='_blank'>
            <span className='sr-only'>Linkedin social link</span>
            <FaLinkedin className='size-6 transition-colors hover:text-white' />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
