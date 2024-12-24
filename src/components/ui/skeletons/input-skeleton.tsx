import { cn } from '@/lib/utils';
import { Skeleton } from '../skeleton';
import { ClassValue } from 'clsx';

const InputSkeleton = ({ className }: { className?: ClassValue }) => {
  return (
    <div className={cn('grid w-full items-start', className)}>
      <Skeleton className='mb-3 mt-1.5 h-4 max-w-32 rounded-3xl' />
      <Skeleton className='h-10 rounded-3xl' />
    </div>
  );
};
export default InputSkeleton;
