import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='mt-auto bg-black px-5 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-around gap-6 ~py-8/12 sm:flex-row'>
        <Image
          src='/icons/logo_light.png'
          width={120}
          height={100}
          alt='app logo'
          className='h-auto w-auto'
        />

        <small className='text-center text-gray-200 sm:text-sm'>
          All rights reserved. Copyright @vehktaur. Inspired by GreatStack
        </small>

        <div className='flex items-center gap-1'>
          <a href='https://x.com/vehktaur' target='_blank'>
            <Image
              src='/icons/x_icon.png'
              width={40}
              height={40}
              alt='X Profile'
            />
          </a>
          <a href='https://github.com/vehktaur' target='_blank'>
            <Image
              src='/icons/facebook_icon.png'
              width={40}
              height={40}
              alt='Github Profile'
            />
          </a>
          <a href='https://linkedin.com/in/victor-akhihiero' target='_blank'>
            <Image
              src='/icons/googleplus_icon.png'
              width={40}
              height={40}
              alt='LinkedIn Profile'
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
