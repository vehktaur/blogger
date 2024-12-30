'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
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
      className='bg fixed inset-0 z-50 grid place-items-center bg-[#00000046] px-10'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
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
