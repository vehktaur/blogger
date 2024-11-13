'use client';

import { changeProfilePic } from '@/app/actions/user-actions';
import { ImageFile } from '@/lib/definitions';
import { useEdgeStore } from '@/lib/edgestore';
import { User } from '@/lib/models/users';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const ProfileImg = ({ user }: { user: User | null }) => {
  const { edgestore } = useEdgeStore();
  const [image, setImage] = useState<Partial<ImageFile>>({
    name: user?.username,
    preview: user?.image!,
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) {
      console.log('No image');
      return;
    }

    const preview = URL.createObjectURL(image);

    const uploadedImg = await edgestore.userImages.upload({
      file: image,
      options: {
        temporary: true,
      },
    });

    setImage((prev) => ({
      ...prev,
      name: image.name,
      image,
      url: uploadedImg.url,
      preview,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image.url) return;
    const res = await changeProfilePic(image.url, user?._id);

    if (res.success) {
      toast.success(res.msg);
      window.location.reload();
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <section className='mb-12'>
      <form onSubmit={handleSubmit} noValidate>
        <div className='flex items-center ~gap-3/6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='bg-profile relative flex-shrink-0 overflow-hidden rounded-full border bg-contain bg-center bg-no-repeat ~size-20/24'>
              <input
                hidden
                type='file'
                name='profile-img'
                id='profile-img'
                onChange={handleChange}
              />
              {image?.preview && (
                <Image
                  className='absolute inset-0 block size-full object-cover'
                  src={image?.preview}
                  width={1280}
                  height={720}
                  alt={image?.name || 'user profile image'}
                />
              )}
            </div>
            <button
              disabled={!image.url || image.preview === user?.image}
              type='submit'
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
