'use client';

import { changeProfilePic, deleteProfilePic } from '@/app/actions/user-actions';
import { ImageFile } from '@/lib/definitions';
import { useEdgeStore } from '@/lib/edgestore';
import { User } from '@/lib/models/users';
import clsx from 'clsx';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../ui/modal';
import Button from '../ui/button';

const ProfileImg = ({ user }: { user: User | null }) => {
  const { edgestore } = useEdgeStore();
  const [image, setImage] = useState<Partial<ImageFile>>({
    name: user?.username,
    preview: user?.image as string | undefined,
  });
  const [progress, setProgress] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) {
      console.log('No image');
      return;
    }

    // Check if the file is an image using a regular expression
    if (!image.type.match(/^image\//)) {
      console.log('Invalid file type. Please upload an image.');
      toast.error('Image files only');
      return;
    }

    const preview = URL.createObjectURL(image);

    const uploadedImg = await edgestore.userImages.upload({
      file: image,
      options: {
        temporary: true,
      },
      onProgressChange(progress) {
        setProgress(progress);
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

  const handleDelete = async () => {
    const res = await deleteProfilePic(user?._id!, image.url);

    if (res.success) {
      toast.success(res.msg);
      setImage({});
      window.location.reload();
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <section className='mb-12'>
      {showConfirmation && (
        <Modal>
          <p>
            Are you sure you want to{' '}
            <span className='font-medium text-red-700'>
              delete your profile picture?
            </span>
          </p>

          <div className='mt-6 flex items-center justify-center gap-4'>
            <Button
              onClick={() => handleDelete()}
              className={`border-red-300 !text-sm`}
              overlay={`bg-red-500`}
            >
              Yes
            </Button>
            <Button
              onClick={() => setShowConfirmation(false)}
              className={`border-green-300 !text-sm`}
              overlay={`bg-green-300`}
            >
              No
            </Button>
          </div>
        </Modal>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className='flex items-center ~gap-3/6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative flex-shrink-0 overflow-hidden rounded-full border bg-profile bg-contain bg-center bg-no-repeat ~size-20/24'>
              <input
                hidden
                type='file'
                name='profile-img'
                id='profile-img'
                onChange={handleChange}
                accept='image/*'
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
              disabled={progress !== 100}
              type='submit'
              className='ms-auto block rounded-full border border-black px-2 py-1 text-xs disabled:border-gray-200 disabled:text-gray-500'
            >
              {progress > 0 && progress < 100
                ? `Uploading: ${Math.round(progress)}%`
                : 'Upload New Photo'}
            </button>
          </div>

          <div className='-mt-10 flex flex-col gap-6'>
            <div className='flex flex-wrap items-center justify-center gap-2 text-xs font-medium'>
              <label
                aria-disabled={!image.url}
                className='cursor-pointer rounded-full border border-stone-900 py-1 ~px-2/4'
                htmlFor='profile-img'
              >
                Change
              </label>
              <button
                disabled={!user?.image && !image.url}
                type='button'
                className='rounded-full border border-red-600 py-1 text-red-600 ~px-2/4 disabled:text-red-300 disabled:border-red-200'
                onClick={() => setShowConfirmation(true)}
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
