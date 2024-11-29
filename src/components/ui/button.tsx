import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { MouseEventHandler } from 'react';

const Button = ({
  disabled,
  onClick,
  type,
  className,
  overlay,
  isSubmitting,
  children,
}: {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button';
  className?: ClassValue;
  overlay?: ClassValue;
  isSubmitting?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn(
        'group relative z-[1] block overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-300 ~text-sm/base hover:text-white',
        { 'text-white': isSubmitting },
        className,
      )}
    >
      <span
        className={cn(
          'absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-black transition-all duration-300 group-hover:w-[calc(100%+2px)]',
          {
            'w-[calc(100%+2px)]': isSubmitting,
            'group-hover:w-[calc(100%+2px)]': !isSubmitting,
          },
          overlay,
        )}
      />
      {children}
    </button>
  );
};
export default Button;
