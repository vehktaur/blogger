'use client';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Slot } from '@radix-ui/react-slot';

interface DropdownContextType {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
}

const DropdownContext = createContext<DropdownContextType>({
  dropdownOpen: false,
  setDropdownOpen: () => {},
  modal: true,
});

// Dropdown hook
export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownMenu');
  }
  return context;
};

// Dropdown component
export const DropdownMenu = ({
  className,
  open,
  onOpenChange,
  modal = true,

  ...props
}: {
  className?: ClassValue;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  modal?: boolean;
  children: React.ReactNode;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider
      value={{
        dropdownOpen: open ?? dropdownOpen,
        setDropdownOpen: onOpenChange ?? setDropdownOpen,
        modal,
      }}
    >
      <div className={cn('relative', className)} {...props} />
    </DropdownContext.Provider>
  );
};

// Dropdown trigger
export const DropdownMenuTrigger = ({
  className,
  ...props
}: {
  className?: ClassValue;
  children: React.ReactNode;
}) => {
  const { setDropdownOpen } = useDropdown();
  return (
    <button
      type='button'
      onClick={() => setDropdownOpen((prev) => !prev)}
      className={cn('focus:outline-none', className)}
      {...props}
    />
  );
};

// Dropdown content
export const DropdownMenuContent = ({
  className,
  align = 'end',
  side = 'bottom',
  ...props
}: {
  className?: string | ClassValue;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}) => {
  const { dropdownOpen, setDropdownOpen, modal } = useDropdown();
  const dropdownRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // Handle dropdown menu close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  // Prevent scrolling when dropdown is open
  useEffect(() => {
    if (modal) {
      if (dropdownOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }

    return () => {
      if (modal) document.body.classList.remove('overflow-hidden');
    };
  }, [dropdownOpen]);

  return (
    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={cn(
            'absolute right-0 rounded-lg bg-white px-4 pb-4 pt-3 shadow-md',
            {
              'top-[calc(100%+0.7rem)]': side === 'bottom',
            },
            className,
          )}
          {...props}
        />
      )}
    </AnimatePresence>
  );
};

export const DropdownMenuItem = ({
  className,
  onClick,
  asChild = false,
  keepOpen,
  ...props
}: {
  className?: ClassValue;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  asChild?: boolean;
  keepOpen?: boolean;
  children: React.ReactNode;
}) => {
  const { setDropdownOpen } = useDropdown();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!keepOpen) setDropdownOpen(false);
    onClick?.(event);
  };

  const Comp = asChild ? Slot : 'button';

  return <Comp onClick={handleClick} className={cn(className)} {...props} />;
};
