import InputSkeleton from './input-skeleton';

const PersonalInfoSkeleton = () => {
  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
        <InputSkeleton />
        <InputSkeleton />
      </div>

      <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
        <InputSkeleton />
        <InputSkeleton />
      </div>
    </div>
  );
};
export default PersonalInfoSkeleton;
