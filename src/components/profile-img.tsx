const ProfileImg = () => {
  return (
    <section className='mb-12'>
      <form noValidate>
        <div className='flex items-center ~gap-3/6'>
          <div className='flex items-center flex-col gap-4'>
            <div className='flex-shrink-0 rounded-full border bg-user bg-contain bg-center bg-no-repeat ~size-20/24'>
              <input hidden type='file' name='profile-img' id='profile-img' />
            </div>
            <button disabled className='ms-auto block text-xs px-2 py-1 border border-black disabled:border-gray-200 disabled:text-gray-500 rounded-full'>Upload New Photo</button>
          </div>

          <div className='flex flex-col gap-6 -mt-10'>
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
