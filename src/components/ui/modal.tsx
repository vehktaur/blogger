'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Modal = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div
      title=''
      className='bg fixed px-10 inset-0 z-50 grid place-items-center bg-[#00000046]'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx(
          'w-fit rounded-3xl bg-white px-6 py-8 text-center text-sm shadow-md ring-1 ring-stone-100',
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
