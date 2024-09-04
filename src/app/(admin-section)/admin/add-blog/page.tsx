"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { BlogFormData, ImageFile } from "@/lib/definitions";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";
import { title } from "process";

const AddBlog = () => {
  const [image, setImage] = useState<ImageFile | null>(null);

  const { register, handleSubmit, reset } = useForm<BlogFormData>();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      const file = acceptedFiles[0];
      const errors = rejectedFiles[0]?.errors;
      if (file) {
        setImage({
          image: file,
          preview: URL.createObjectURL(file),
        });
      } else if (errors) {
        errors.map((error) => {
          toast.error(
            error.message.replace("2097152 bytes", "2MB").replace("/*", ""),
          );
        });
      }
    },
    accept: {
      "image/*": [],
    },
    noClick: image ? true : false,
    maxSize: 1024 * 1024 * 2,
    noKeyboard: true,
    noDragEventsBubbling: true,
  });

  const onSubmit = (data: BlogFormData) => {
    console.log(data);
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, []);
  return (
    <section className="px-5 pb-8 pt-12">
      <div className="mx-auto max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="form-label">Upload Image</h3>
            <div
              {...getRootProps({
                className: clsx(
                  !image?.image && "border cursor-pointer",
                  "py-8 ~px-4/8 block max-w-[80%] sm:max-w-sm border-dashed rounded-xl flex flex-col items-center gap-2 h-48 justify-center relative",
                  isDragActive ? "border-[#000]" : "border-[#aaa]",
                ),
              })}
            >
              <Image
                src="/icons/image-circle-plus.svg"
                alt="add image"
                width={35}
                height={35}
              />
              <p className="h- text-center ~text-sm/base">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag & drop image here, or click to select image"}
              </p>

              <small className="tracking-wide text-gray-500">
                (Image file &le; 2MB)
              </small>

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
                      onClick={() => setImage(null)}
                      className="absolute -right-2 -top-2 rounded-full text-red-600"
                    >
                      <XCircleIcon className="rounded-full bg-white ~size-6/7" />
                    </motion.button>

                    {/* Change Image */}
                    <motion.button
                      initial={{ x: -100, y: "-50%", opacity: 0 }}
                      animate={{ x: 0, y: "-50%", opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => {
                        open();
                        console.log("clicked");
                      }}
                      className="absolute -right-10 top-1/2 size-7 rounded-full bg-[#f5f5f5] p-[0.15rem]"
                    >
                      <svg
                        className="size-full"
                        fill="none"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8536 2.14645C14.6583 1.95118 14.3417 1.95118 14.1464 2.14645C13.9512 2.34171 13.9512 2.65829 14.1464 2.85355L15.2929 4H4C2.89543 4 2 4.89543 2 6V12.5C2 12.7761 2.22386 13 2.5 13C2.77614 13 3 12.7761 3 12.5V6C3 5.44772 3.44772 5 4 5H15.2929L14.1464 6.14645C13.9512 6.34171 13.9512 6.65829 14.1464 6.85355C14.3417 7.04882 14.6583 7.04882 14.8536 6.85355L16.8536 4.85355C17.0488 4.65829 17.0488 4.34171 16.8536 4.14645L14.8536 2.14645ZM16 15C16.5523 15 17 14.5523 17 14V7.5C17 7.22386 17.2239 7 17.5 7C17.7761 7 18 7.22386 18 7.5V14C18 15.1046 17.1046 16 16 16H4.70711L5.85355 17.1464C6.04882 17.3417 6.04882 17.6583 5.85355 17.8536C5.65829 18.0488 5.34171 18.0488 5.14645 17.8536L3.14645 15.8536C2.95118 15.6583 2.95118 15.3417 3.14645 15.1464L5.14645 13.1464C5.34171 12.9512 5.65829 12.9512 5.85355 13.1464C6.04882 13.3417 6.04882 13.6583 5.85355 13.8536L4.70711 15H16ZM13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10ZM12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10Z"
                          fill="#212121"
                        />
                      </svg>
                    </motion.button>
                    <Image
                      src={image.preview}
                      className="size-full rounded-xl object-cover object-center"
                      width={100}
                      height={100}
                      alt="Blog post image"
                      onLoad={() => URL.revokeObjectURL(image.preview)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 grid">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="input-base text-sm/base w-[80%] max-w-sm rounded-md border-black capitalize"
              placeholder="Enter your captivating title here..."
              id="title"
              type="text"
              {...register("title")}
            />
          </div>

          <div className="mt-8 grid">
            <label className="form-label" htmlFor="title">
              Content
            </label>
            <textarea
              className="input-base text-sm/base w-[80%] max-w-sm rounded-md border-black"
              placeholder="Compose your blog post..."
              id="title"
              rows={8}
              {...register("content")}
            />
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="submit"
              className="group relative z-[1] inline-block overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-500 ~text-sm/base hover:text-white"
            >
              <span className="absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-black transition-all duration-500 group-hover:w-[calc(100%+2px)]" />
              CREATE
            </button>

            <button
              onClick={() => {
                reset();
                setImage(null);
              }}
              type="reset"
              className="group relative z-[1] inline-block overflow-hidden rounded-3xl border border-black px-6 py-2 font-medium transition-all duration-500 ~text-sm/base hover:text-white"
            >
              <span className="absolute -left-[1px] -top-[1px] z-[-1] block h-[calc(100%+2px)] w-0 rounded-3xl bg-black transition-all duration-500 group-hover:w-[calc(100%+2px)]" />
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddBlog;
