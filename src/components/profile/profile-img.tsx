import { auth } from '@/auth';
import BlurImage from '../ui/blur-image';
import { assets } from '@/assets/assets';

const ProfileImg = async () => {
  const session = await auth();

  return (
    <section className='mb-12'>
      <form noValidate>
        <div className='flex items-center ~gap-3/6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative flex-shrink-0 rounded-full border overflow-hidden ~size-20/24'>
              <input hidden type='file' name='profile-img' id='profile-img' />       
                  <BlurImage
                    className='size-full object-cover'
                    src={assets.profile_img || session?.user.image}
                    width={1280}
                    height={720}
                    alt={session?.user.username || 'user profile image'}
                  />
            </div>
            <button
              disabled
              className='ms-auto block rounded-full border border-black px-2 py-1 text-xs disabled:border-gray-200 disabled:text-gray-500'
            >
              Upload New Photo
            </button>
          </div>

          <div className='-mt-10 flex flex-col gap-6'>
            <div className='flex flex-wrap items-center justify-center gap-2 text-xs font-medium'>
              <label
                className='cursor-pointer rounded-full border border-stone-900 py-1 ~px-2/4'
                htmlFor='profile-img'
              >
                Change
              </label>
              <button
                type='button'
                className='rounded-full border border-red-600 py-1 text-red-600 ~px-2/4'
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default ProfileImg;
