'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

//Component Imports
import { ImageFile, maxSize, minSize } from '@/lib/definitions';
import { addBlog, editBlog } from '@/app/actions/blog-actions';
import Input from '../ui/input';

//Library Imports
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useEdgeStore } from '@/lib/edgestore';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'motion/react';
import Markdown from 'react-markdown';

//Icon Imports
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
import { HiMiniXCircle } from 'react-icons/hi2';
import { Blog } from '@/lib/models/blogs';
import Button from '../ui/button';

const BlogForm = ({
  defaultImage,
  edit,
  id,
}: {
  defaultImage: ImageFile | null;
  edit?: boolean;
  id?: string;
}) => {
  //Set Default values for Image and RHFData

  //Define custom data and state
  //Declare useForm for RHF Form Control
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, submitCount },
  } = useFormContext<Blog>();
  const [image, setImage] = useState<ImageFile | null>(defaultImage); // state to save blog image file
  const content = watch('content');
  const { edgestore } = useEdgeStore(); // hook for image upload to edge store
  const [uploadProgress, setUploadProgress] = useState(edit ? 100 : 0); //to show image upload progress
  const [showPreview, setShowPreview] = useState(false);
  const categories = [
    { name: 'Tech', icon: TechIcon },
    { name: 'Lifestyle', icon: LifestyleIcon },
    { name: 'Finance', icon: FinanceIcon },
    { name: 'Entertainment', icon: EntertainmentIcon },
    { name: 'Culinary', icon: CulinaryIcon },
    { name: 'Others', icon: OthersIcon },
    //Add more categories
  ]; //different categories for a blog post

  const router = useRouter(); //router to redirect to blogs table after edit

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
    setImage(defaultImage);
    setUploadProgress(edit ? 100 : 0);
  };

  //Remove Selected Image
  const removeImage = async () => {
    const url = image?.url;
    setUploadProgress(0);
    setImage(null);

    if (defaultImage) {
      if (url && url !== defaultImage.url) {
        await edgestore.blogPostImages.delete({
          url,
        });
      }
    } else {
      if (url) {
        await edgestore.blogPostImages.delete({
          url,
        });
      }
    }
  };

  //onSubmit function to create post
  const onSubmit: SubmitHandler<Blog> = async (data) => {
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
      let responseData;

      if (edit && id) {
        responseData = await editBlog(data, id);
      } else {
        responseData = await addBlog(data);
      }

      if (responseData?.success) {
        if (edit) {
          router.push('/blogs');
        } else {
          resetForm();
        }

        toast.success(responseData?.msg);
      } else {
        toast.error(responseData?.msg);
        console.log(`The data sent was: ${JSON.stringify(responseData)}`);
      }
    } catch (error) {
      toast.error('Error - Request Failed');
      console.log(error);
    }
  };

  //revoke image urls after component unmount to prevent data leak
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  return (
    <section className='px-5 pb-10 ~pt-5/8'>
      <div className='mx-auto max-w-6xl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-[85%] max-w-md space-y-8'>
            <div>
              <h3 className='form-label'>{edit ? 'Edit' : 'Upload'} Image</h3>
              <div
                {...getRootProps({
                  className: cn(
                    !image?.image && 'border cursor-pointer',
                    '~px-4/8 block border-dashed rounded-3xl flex flex-col items-center ~gap-3/4 ~h-48/60 justify-center relative',
                    isDragActive ? 'border-[#000]' : 'border-[#aaa]',
                  ),
                  tabIndex: 0,
                })}
              >
                <ImageCircleIcon className='~size-[1.8rem]/[2.5rem]' />
                <p className='h- h- text-center ~text-[0.8rem]/base'>
                  {isDragActive
                    ? 'Drop the image here...'
                    : 'Drag & drop image here, or click to select image'}
                </p>

                <small className='text-center tracking-wide text-gray-500 ~text-xs/[0.8rem]'>
                  Image size (50KB &le; size &le; 2MB)
                </small>

                {/* Show Image Upload Progress */}
                {uploadProgress > 0 && (
                  <div className='flex w-full items-center gap-2 text-sm'>
                    Uploading:
                    <span className='relative flex w-3/4 items-center justify-center overflow-hidden rounded-full border border-[#7777] text-xs'>
                      {Math.round(uploadProgress)}%
                      <span
                        className='absolute left-0 top-0 z-[-1] inline-block h-full bg-[#ccc] transition-all duration-300'
                        style={{ width: `${uploadProgress}%` }}
                      ></span>
                    </span>
                  </div>
                )}

                {submitCount > 0 && !image && (
                  <p className='error'>An image is required to proceed</p>
                )}
                <input {...getInputProps()} />

                {/* Image Preview */}
                <AnimatePresence>
                  {image?.preview && uploadProgress === 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className='absolute -inset-[1px] rounded-3xl border bg-white'
                    >
                      {/* Remove Image */}
                      <motion.button
                        whileHover={{ scale: 1.075 }}
                        whileTap={{ scale: 0.95 }}
                        type='button'
                        onClick={async () => await removeImage()}
                        className='absolute -right-2 -top-2 rounded-full text-red-600'
                      >
                        <HiMiniXCircle className='rounded-full bg-white ~size-6/7' />
                      </motion.button>

                      {/* Change Image */}
                      <motion.button
                        initial={{ x: -100, y: '-50%', opacity: 0 }}
                        animate={{ x: 0, y: '-50%', opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        type='button'
                        onClick={() => {
                          open();
                        }}
                        className='absolute -right-10 top-1/2 size-7 rounded-full bg-[#f5f5f5] p-[0.15rem]'
                      >
                        <ImageToggleIcon svgClassName='size-full' />
                      </motion.button>
                      <Image
                        src={image.preview}
                        className='size-full rounded-3xl object-cover object-center'
                        width={1280}
                        height={720}
                        alt={image.image?.name || ''}
                        onLoad={() => URL.revokeObjectURL(image.preview)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Input
              label='Title'
              name='title'
              errorMsg='Enter a title'
              placeholder='Enter your captivating title here...'
            />

            <div className='grid'>
              <label className='form-label' htmlFor='categories'>
                Category
              </label>

              <div className='flex flex-wrap rounded-3xl border px-2 py-6 ~gap-x-1/2 ~gap-y-2/4'>
                {categories.map((category, index) => (
                  <label
                    className='mx-auto flex cursor-pointer items-center gap-2 rounded-full border py-2 font-medium transition-all duration-300 ~text-[0.8rem]/[0.9rem] ~px-2.5/4 has-[:checked]:bg-stone-800 has-[:checked]:text-white hover:scale-105'
                    key={index}
                  >
                    <input
                      className='peer'
                      hidden
                      type='checkbox'
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
                      className='size-4 peer-checked:fill-white'
                      svgClassName='size-full'
                    />
                    <span> {category.name}</span>
                  </label>
                ))}
              </div>
              {errors?.categories?.message && (
                <p className='error mt-2 ps-1'>{errors.categories.message}</p>
              )}
            </div>

            <div className='grid'>
              <label className='form-label' htmlFor='description'>
                Description
              </label>
              <textarea
                className='input-base rounded-3xl ~text-sm/base scrollbar-thin scrollbar-thumb-[#777]'
                placeholder='Give us a sneak peek...'
                id='description'
                rows={3}
                {...register('description', {
                  required: {
                    value: true,
                    message: 'A short description is required',
                  },
                })}
              />
              {errors?.description?.message && (
                <p className='error mt-2 ps-1'>{errors.description.message}</p>
              )}
            </div>

            <div className='grid'>
              <div className='mb-1 flex w-fit items-center gap-2'>
                <label
                  htmlFor='content'
                  className={`relative cursor-pointer pb-2 text-base transition-all duration-100 ~px-3/6 ${showPreview ? 'font-normal text-gray-400' : 'font-medium'}`}
                  onClick={() => setShowPreview(false)}
                >
                  <span
                    className={`absolute bottom-0 h-1 origin-center rounded-3xl bg-stone-700 transition-all duration-300 ${showPreview ? 'left-1/2 w-0' : 'left-0 w-full'}`}
                  />
                  Content
                </label>
                <button
                  className={`relative pb-2 text-base transition-all duration-100 ~px-3/6 ${showPreview ? 'font-medium' : 'font-normal text-gray-400'}`}
                  type='button'
                  onClick={() => setShowPreview(true)}
                >
                  <span
                    className={`absolute bottom-0 h-1 origin-center rounded-3xl bg-stone-700 transition-all duration-300 ${showPreview ? 'left-0 w-full' : 'left-1/2 w-0'}`}
                  />
                  Preview
                </button>
              </div>

              <div className='relative overflow-hidden'>
                {showPreview && (
                  <div className='input-base prose absolute inset-0 overflow-y-auto rounded-3xl bg-white scrollbar-thin scrollbar-thumb-[#777]'>
                    <Markdown>{content}</Markdown>
                  </div>
                )}
                <textarea
                  className='input-base rounded-3xl ~text-sm/base scrollbar-thin scrollbar-thumb-[#777]'
                  placeholder='Compose your blog post...'
                  id='content'
                  rows={10}
                  {...register('content', {
                    required: {
                      value: true,
                      message: 'Content cannot be empty',
                    },
                  })}
                />
              </div>

              <p className='mt-2 text-xs'>
                You can format your text using{' '}
                <a
                  href='https://www.markdownguide.org/cheat-sheet/'
                  target='_blank'
                  className='font-medium text-stone-600 underline'
                >
                  Markdown syntax
                </a>
                .
              </p>

              {errors?.content?.message && (
                <p className='error mt-2 ps-1'>{errors.content.message}</p>
              )}
            </div>
          </div>
          <div className='mt-10 flex items-center gap-4'>
            <Button
              disabled={isSubmitting}
              type='submit'
              isSubmitting={isSubmitting}
            >
              {isSubmitting
                ? edit
                  ? 'SAVING...'
                  : 'CREATING...'
                : edit
                  ? 'SAVE'
                  : 'CREATE'}
            </Button>

            <Button
              disabled={isSubmitting}
              onClick={() => resetForm()}
              type='button'
              className='border-red-500 text-red-500'
              overlay='bg-red-500'
            >
              {edit ? 'RESET' : 'CLEAR'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default BlogForm;
