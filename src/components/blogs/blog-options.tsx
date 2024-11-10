'use client';

import { deleteBlog } from '@/app/actions/blog';

import { RiDeleteBin2Line } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import { PiEyesFill } from 'react-icons/pi';
import { MdOutlineEditNote } from 'react-icons/md';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefObject, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { findAncestor } from '@/lib/utils';

const BlogOptions = ({
  id,
  url,
  title,
}: {
  id: string;
  url: string;
  title: string;
}) => {
  //Define state variables
  const [isOpen, setIsOpen] = useState(false);
  const [spaceDown, setSpaceDown] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  //Handle Toggle Effects
  const handleClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      setIsDisabled(true);
      const response = await deleteBlog(id, url);

      if (response.success) {
        console.log('Blog deleted successfully');
        toast.success('Blog Deleted');
      } else {
        console.log('Failed to delete blog:', response.msg);
        toast.error('Could not delete');
      }
    } catch (error) {
      console.error('Error deleting the blog:', error);
    } finally {
      setIsDisabled(false);
      setShowConfirmation(false);
    }
  };

  //Check for vertical space
  useEffect(() => {
    const dropdown = dropdownRef.current;

    if (isOpen && dropdown) {
      const blogTable = findAncestor(dropdown, 5);
      const dropdownRect = dropdown.getBoundingClientRect();
      const blogTableRect = blogTable?.getBoundingClientRect();

      const menuHeight = dropdown.scrollHeight;
      const spaceAbove = dropdownRect.top;
      const spaceBelow =
        (blogTableRect?.bottom || window.innerHeight) - dropdownRect.bottom;

      const threshold = 10; // Small margin to avoid tight fits

      if (
        menuHeight > spaceBelow - threshold &&
        spaceAbove > menuHeight + threshold
      ) {
        setSpaceDown(false); // Drop up
      } else {
        setSpaceDown(true); // Drop down
      }
    } else {
      setSpaceDown(true);
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
    } else {
    }

    // Clean up event listener when dropdown is closed
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={dropdownRef}>
      {showConfirmation && (
        <div
          title=''
          className='bg fixed inset-0 z-50 grid place-items-center bg-[#00000046]'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className='max-w-[20rem] rounded-3xl bg-white px-6 py-8 text-center text-sm shadow-md ring-1 ring-stone-100'
          >
            <p>
              Are you sure you want to{' '}
              <span className='font-medium text-red-700'>delete</span> this
              blog?
            </p>
            <p className='mt-2'>
              <strong className='font-medium'>
                This action cannot be undone
              </strong>
            </p>

            <div className='mt-4 flex items-center justify-center gap-4'>
              <button
                disabled={isDisabled}
                onClick={() => handleDelete(id, url)}
                className='group relative z-[1] overflow-hidden rounded-3xl border border-red-300 px-4 py-2 font-medium hover:text-white'
              >
                <span className='absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-red-500 transition-all duration-300 group-hover:w-[calc(100%+2px)]' />
                Yes
              </button>
              <button
                disabled={isDisabled}
                onClick={() => setShowConfirmation(false)}
                className='group relative z-[1] overflow-hidden rounded-3xl border border-green-300 px-4 py-2 font-medium hover:text-white'
              >
                <span className='absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-green-500 transition-all duration-300 group-hover:w-[calc(100%+2px)]' />
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <button
        title='options'
        onClick={handleClick}
        className='grid place-items-center'
      >
        <SlOptions className='w-5 text-stone-950' />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute right-0 z-[2] grid w-[7.5rem] justify-items-start divide-y rounded-lg border border-gray-200 bg-white px-3 py-1',
            {
              'top-full mt-2': spaceDown,
              'bottom-full mb-2': !spaceDown,
            },
          )}
        >
          <Link
            href={`blog/${encodeURIComponent(`${title}__${id}`)}`}
            className='flex w-full items-center gap-1.5 py-2 text-left text-sm transition-transform duration-500 will-change-transform hover:scale-[103%] hover:font-medium'
          >
            <PiEyesFill className='size-4' /> View post
          </Link>
          <Link
            href={`/edit-blog/${id}`}
            className='flex w-full items-center gap-1.5 py-2 text-left text-sm transition-transform duration-500 will-change-transform hover:scale-[103%] hover:font-medium'
          >
            <MdOutlineEditNote className='size-4' /> Edit blog
          </Link>
          <button
            onClick={() => {
              setShowConfirmation(true);
              setIsOpen(false);
            }}
            className='flex w-full items-center gap-1.5 py-2 text-left text-sm text-red-600 transition-transform duration-500 will-change-transform hover:scale-[103%] hover:font-medium'
          >
            <RiDeleteBin2Line className='w-4' /> Delete blog
          </button>
        </div>
      )}
    </div>
  );
};
export default BlogOptions;
