import { Skeleton } from '../ui/skeleton';

const LoadingSkeleton = () => {
  const skeletonArray = Array.from({ length: 4 });
  return (
    <section className='padding-inline pt-10 ~pb-12/20'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {skeletonArray.map((_, index) => (
            <div
              key={index}
              className='w-full max-w-80 rounded sm:max-w-[18.75rem]'
            >
              {/* Card image Skeleton */}
              <Skeleton className='aspect-[16/11] w-full sm:aspect-[3/2]' />

              <div className='flex flex-col p-5'>
                <div className='mb-3 flex items-center gap-2'>
                  {/* Card category skeleton */}
                  <Skeleton className='h-4 w-24 rounded-[0.15rem] px-2 py-1' />
                </div>

                <Skeleton className='mb-3 h-5 w-3/4' />

                {/* Card content skeleton */}
                <Skeleton className='mb-1 h-2 w-full' />
                <Skeleton className='mb-1 h-2 w-full' />
                <Skeleton className='mb-1 h-2 w-full' />
              </div>
              <div className='mb-5 mt-6 px-5'>
                {/* Read more skeleton */}
                <Skeleton className='h-3 w-20' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LoadingSkeleton;
