'use client';

import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='grid min-h-[85vh] w-full place-items-center'>
      <div className='text-center'>
        <h1 className='text-lg font-semibold'>Error</h1>
        <p className='my-10'> {error.message}</p>
        <button
          onClick={() => reset()}
          className='rounded-full border px-4 py-2'
        >
          Please try again
        </button>
      </div>
    </div>
  );
};
export default Error;
