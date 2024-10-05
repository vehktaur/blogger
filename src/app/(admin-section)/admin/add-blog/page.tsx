'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { BlogFormData, ImageFile, maxSize, minSize } from '@/lib/definitions';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CulinaryIcon,
  EntertainmentIcon,
  FinanceIcon,
  ImageCircleIcon,
  ImageToggleIcon,
  LifestyleIcon,
  OthersIcon,
  TechIcon,
} from '@/assets/svgs';
import { useEdgeStore } from '@/lib/edgestore';

const AddBlog = () => {
  //Define data and state
  const [image, setImage] = useState<ImageFile | null>(null); // to save blog image file
  const { edgestore } = useEdgeStore(); // hook for image upload to edge store
  const [uploadProgress, setUploadProgress] = useState(0); //to show image upload progress
  const categories = [
    { name: 'Tech', icon: TechIcon },
    { name: 'Lifestyle', icon: LifestyleIcon },
    { name: 'Finance', icon: FinanceIcon },
    { name: 'Entertainment', icon: EntertainmentIcon },
    { name: 'Culinary', icon: CulinaryIcon },
    { name: 'Others', icon: OthersIcon },
    //Add more categories
  ]; //different categories for a blog post

  //Declare useForm for RHF Form Control
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<BlogFormData>();

  //Define React Drop Zone methods and properties
  const { getRootProps, getInputProps, rootRef, isDragActive, open } =
    useDropzone({
      onDrop: async (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const errors = rejectedFiles[0]?.errors;
        if (file) {
          //upload the image to edgeStore
          const uploadedImg = await edgestore.blogPostImages.upload({
            file,
            onProgressChange: (progress) => {
              setUploadProgress(progress);
            },
            options: {
              temporary: true,
            },
          });
          setImage({
            image: file,
            preview: URL.createObjectURL(file),
            url: uploadedImg.url,
            thumbnailUrl: uploadedImg.thumbnailUrl || uploadedImg.url,
            name: file.name,
          });
        } else if (errors) {
          errors.map((error) => {
            toast.error(
              error.message
                .replace('52428.8 bytes', '50KB')
                .replace('2097152 bytes', '2MB')
                .replace('/*', ''),
            );
          });
        }
      },
      accept: {
        'image/*': [],
      },
      noClick: image ? true : false,
      minSize: minSize,
      maxSize: maxSize,
      noKeyboard: true,
      noDragEventsBubbling: true,
    });

  // Custom function to reset form
  const resetForm = () => {
    reset();
    setImage(null);
    setUploadProgress(0);
  };

  //Remove Selected Image
  const removeImage = async () => {
    const url = image?.url;
    setUploadProgress(0);
    setImage(null);
    if (url)
      await edgestore.blogPostImages.delete({
        url,
      });
  };

  //onSubmit function to create post
  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    //ensure an image was uploaded
    if (!image) {
      rootRef.current?.focus();
      return;
    }

    //add the image to the form data from RHF
    data = {
      ...data,
      image: {
        url: image.url,
        thumbnailUrl: image.thumbnailUrl || image.url,
        name: image.name,
      },
    };
    console.log(data);

    //send the form data to the backend (DB)
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // If the value is an array, append each item in the array
          value.forEach((category: string) => {
            formData.append(`${key}[]`, category);
          });
        } else if (typeof value === 'object' && value !== null) {
          // If the value is an object (but not null), stringify and append
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      formData.append(
        'author',
        JSON.stringify({ name: 'Kurapika', img: "can't see me yet" }),
      );

      let responseData;
      try {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          body: formData,
        });

        // Manually handle HTTP errors
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        responseData = await res.json();
      } catch (error) {
        toast.error('Error - Could not post');
        console.log(error);
      }

      if (responseData?.success) {
        resetForm();
        toast.success(responseData?.msg);
        await edgestore.blogPostImages.confirmUpload({
          url: image.url,
        });
      } else {
        toast.error(responseData?.msg);
        console.log(
          `The data sent was: ${JSON.stringify(responseData?.data?.blogData)}`,
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  };

  //revoke image urls after component unmount to prevent data leak
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, []);

  return (
    <section className="px-5 pb-10 ~pt-5/8">
      <div className="mx-auto max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[85%] max-w-md space-y-8">
            <div>
              <h3 className="form-label">Upload Image</h3>
              <div
                {...getRootProps({
                  className: clsx(
                    !image?.image && 'border cursor-pointer',
                    '~px-4/8 block border-dashed rounded-xl flex flex-col items-center ~gap-3/4 ~h-48/60 justify-center relative',
                    isDragActive ? 'border-[#000]' : 'border-[#aaa]',
                  ),
                  tabIndex: 0,
                })}
              >
                <ImageCircleIcon className="~size-[1.8rem]/[2.5rem]" />
                <p className="h- h- text-center ~text-[0.8rem]/base">
                  {isDragActive
                    ? 'Drop the image here...'
                    : 'Drag & drop image here, or click to select image'}
                </p>

                <small className="text-center tracking-wide text-gray-500 ~text-xs/[0.8rem]">
                  Image size (50KB &le; size &le; 2MB)
                </small>

                {uploadProgress > 0 && (
                  <div className="flex w-full items-center gap-2 text-sm">
                    Uploading:
                    <span className="relative flex w-3/4 items-center justify-center overflow-hidden rounded-full border border-[#7777] text-xs">
                      {Math.round(uploadProgress)}%
                      <span
                        className="absolute left-0 top-0 z-[-1] inline-block h-full bg-[#ccc] transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></span>
                    </span>
                  </div>
                )}

                {submitCount > 0 && !image && (
                  <p className="error">An image is required to proceed</p>
                )}
                <input {...getInputProps()} />

                <AnimatePresence>
                  {image?.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute inset-0 rounded-xl bg-white"
                    >
                      {/* Remove Image */}
                      <motion.button
                        whileHover={{ scale: 1.075 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={async () => await removeImage()}
                        className="absolute -right-2 -top-2 rounded-full text-red-600"
                      >
                        <XCircleIcon className="rounded-full bg-white ~size-6/7" />
                      </motion.button>

                      {/* Change Image */}
                      <motion.button
                        initial={{ x: -100, y: '-50%', opacity: 0 }}
                        animate={{ x: 0, y: '-50%', opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          open();
                        }}
                        className="absolute -right-10 top-1/2 size-7 rounded-full bg-[#f5f5f5] p-[0.15rem]"
                      >
                        <ImageToggleIcon svgClassName="size-full" />
                      </motion.button>
                      <Image
                        src={image.preview}
                        className="size-full rounded-xl object-cover object-center"
                        width={100}
                        height={100}
                        alt={image.image.name}
                        onLoad={() => URL.revokeObjectURL(image.preview)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                className="input-base rounded-sm ~text-sm/base"
                placeholder="Enter your captivating title here..."
                id="title"
                type="text"
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Enter a title',
                  },
                })}
              />
              {errors?.title?.message && (
                <p className="error mt-2 ps-1">{errors.title.message}</p>
              )}
            </div>

            <div className="grid">
              <h3 className="form-label">Category</h3>

              <div className="flex flex-wrap rounded-3xl border px-2 py-6 ~gap-x-1/2 ~gap-y-2/4">
                {categories.map((category, index) => (
                  <label
                    className="mx-auto flex cursor-pointer items-center gap-2 rounded-full border py-2 font-medium transition-all duration-300 ~text-[0.8rem]/[0.9rem] ~px-2.5/4 has-[:checked]:bg-stone-800 has-[:checked]:text-white hover:scale-110"
                    key={index}
                  >
                    <input
                      className="peer"
                      hidden
                      type="checkbox"
                      value={category.name}
                      {...register('categories', {
                        required: {
                          value: true,
                          message: 'Choose a category',
                        },
                        validate: {
                          moreThanThree: (value) => {
                            return (
                              value.length <= 3 ||
                              'Categories should not exceed three'
                            );
                          },
                        },
                      })}
                    />
                    <category.icon
                      className="size-4 peer-checked:fill-white"
                      svgClassName="size-full"
                    />
                    <span> {category.name}</span>
                  </label>
                ))}
              </div>
              {errors?.categories?.message && (
                <p className="error mt-2 ps-1">{errors.categories.message}</p>
              )}
            </div>

            <div className="grid">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="input-base rounded-sm ~text-sm/base scrollbar-thin scrollbar-thumb-[#777]"
                placeholder="Give us a sneak peek..."
                id="description"
                rows={3}
                {...register('description', {
                  required: {
                    value: true,
                    message: 'A short description is required',
                  },
                })}
              />
              {errors?.description?.message && (
                <p className="error mt-2 ps-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid">
              <label className="form-label" htmlFor="content">
                Content
              </label>
              <textarea
                className="input-base rounded-sm ~text-sm/base scrollbar-thin scrollbar-thumb-[#777]"
                placeholder="Compose your blog post..."
                id="content"
                rows={8}
                {...register('content', {
                  required: {
                    value: true,
                    message: 'Content cannot be empty',
                  },
                })}
              />
              {errors?.content?.message && (
                <p className="error mt-2 ps-1">{errors.content.message}</p>
              )}
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className={clsx(
                isSubmitting && 'text-white',
                'group relative z-[1] inline-block overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-300 ~text-sm/base hover:text-white',
              )}
            >
              <span
                className={clsx(
                  isSubmitting
                    ? 'w-[calc(100%+2px)]'
                    : 'group-hover:w-[calc(100%+2px)]',
                  'absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-black transition-all duration-300',
                )}
              />
              {isSubmitting ? 'CREATING...' : 'CREATE'}
            </button>

            <button
              disabled={isSubmitting}
              onClick={() => resetForm()}
              type="button"
              className="group relative z-[1] inline-block overflow-hidden rounded-3xl border border-red-500 px-6 py-2 font-medium text-red-500 transition-all duration-300 ~text-sm/base hover:text-white"
            >
              <span className="absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-red-500 transition-all duration-300 group-hover:w-[calc(100%+2px)]" />
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddBlog;
