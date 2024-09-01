import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="px-5 bg-black text-white self-end">
      <div className="max-w-7xl mx-auto ~py-8/12 flex flex-col sm:flex-row justify-around items-center gap-6">
        <Image
          src="/icons/logo_light.png"
          width={120}
          height={100}
          alt="app logo"
          className="h-auto"
        />

        <small className="sm:text-sm text-gray-200 text-center">
          All rights reserved. Copyright @vehktaur / GreatStack
        </small>

        <div className="flex items-center gap-1">
          <a href="https://x.com/vehktaur" target="_blank">
            <Image
              src="/icons/x_icon.png"
              width={40}
              height={40}
              alt="X Profile"
            />
          </a>
          <a href="https://github.com/vehktaur" target="_blank">
            <Image
              src="/icons/facebook_icon.png"
              width={40}
              height={40}
              alt="Github Profile"
            />
          </a>
          <a href="https://linkedin.com/in/victor-akhihiero" target="_blank">
            <Image
              src="/icons/googleplus_icon.png"
              width={40}
              height={40}
              alt="LinkedIn Profile"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
