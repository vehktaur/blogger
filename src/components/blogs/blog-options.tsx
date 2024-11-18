'use client';

import { deleteBlog } from '@/app/actions/blog-actions';

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
import Modal from '../ui/modal';
import Button from '../ui/button';

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
        <Modal>
          <p>
            Are you sure you want to{' '}
            <span className='font-medium text-red-700'>delete this blog?</span>
          </p>
          <p className='mt-2'>
            <strong className='font-medium'>
              This action cannot be undone
            </strong>
          </p>

          <div className='mt-6 flex items-center justify-center gap-4'>
            <Button
              disabled={isDisabled}
              onClick={() => handleDelete(id, url)}
              className={`border-red-300 !text-sm`}
              overlay={`bg-red-500`}
            >
              Yes
            </Button>
            <Button
              disabled={isDisabled}
              onClick={() => setShowConfirmation(false)}
              className={`border-green-300 !text-sm`}
              overlay={`bg-green-300`}
            >
              No
            </Button>
          </div>
        </Modal>
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
