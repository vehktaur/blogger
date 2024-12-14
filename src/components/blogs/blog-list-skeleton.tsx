import { Skeleton } from '../ui/skeleton';

const LoadingSkeleton = () => {
  const skeletonArray = Array.from({ length: 4 });
  return (
    <section className='padding-inline pt-10 ~pb-12/20'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid items-stretch justify-items-center ~gap-x-5/8 ~gap-y-7/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {skeletonArray.map((_, index) => (
            <div
              key={index}
              className='flex w-full min-w-[18.75rem] max-w-80 flex-col rounded sm:max-w-[18.75rem]'
            >
              <div>
                <Skeleton className='aspect-[16/11] w-full bg-zinc-700 sm:aspect-[3/2]' />
              </div>

              <div className='flex flex-col p-5'>
                <div className='mb-3 flex items-center gap-2'>
                  <Skeleton className='h-4 w-24 rounded-[0.15rem] bg-zinc-700 px-2 py-1' />
                </div>

                <Skeleton className='mb-3 h-5 w-3/4 bg-zinc-700' />

                <Skeleton className='mb-1 h-2 w-full bg-zinc-700' />
                <Skeleton className='mb-1 h-2 w-full bg-zinc-700' />
                <Skeleton className='mb-1 h-2 w-full bg-zinc-700' />
              </div>
              <div className='mb-5 mt-6 px-5'>
                <Skeleton className='bg-zinc-700 w-20 h-3' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LoadingSkeleton;
