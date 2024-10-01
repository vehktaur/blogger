'use client';

import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { RefObject, useEffect, useRef, useState } from 'react';

const Dropdown = () => {
  //Define state variables
  const [isOpen, setIsOpen] = useState(false);
  const [spaceDown, setSpaceDown] = useState(true);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  //Handle Toggle Effects

  const handleClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  //Check for vertical space

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current;
      const dropdownRect = dropdown.getBoundingClientRect();

      const menuHeight = dropdown.scrollHeight;
      const spaceAbove = dropdownRect.top;
      const spaceBelow = window.innerHeight - dropdownRect.bottom;

      if (menuHeight > spaceBelow && spaceAbove > menuHeight) {
        setSpaceDown(false);
      } else {
        setSpaceDown(true);
      }
    }
  }, [isOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Attach event listener when dropdown is open
    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    // Clean up event listener when dropdown is closed
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleClick} className="grid place-items-center">
        <EllipsisHorizontalIcon className="w-5 text-stone-950" />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute right-0 z-[2] grid w-[7.5rem] justify-items-start divide-y rounded-lg border border-gray-200 bg-white px-3 py-1',
            spaceDown ? 'top-full mt-2' : 'bottom-full mb-2',
          )}
        >
          <button className="flex w-full items-center gap-1.5 py-2 text-left text-sm transition-transform duration-500 will-change-transform hover:scale-[103%] hover:font-medium">
            <PencilSquareIcon className="w-4" /> Edit blog
          </button>
          <button className="flex w-full items-center gap-1.5 py-2 text-left text-sm text-red-600 transition-transform duration-500 will-change-transform hover:scale-[103%] hover:font-medium">
            {' '}
            <TrashIcon className="w-4" /> Delete blog
          </button>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
