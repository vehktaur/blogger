"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const AddBlog = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  return (
    <section className="px-5 pt-12">
      <div className="mx-auto max-w-6xl">
        <form>
          <div>
            <h3 className="mb-4 font-medium ~text-lg/xl">Upload Image</h3>
            <div
              {...getRootProps({
                className:
                  "py-8 ~px-4/8 block max-w-[80%] sm:max-w-sm border border-dashed rounded-xl border-[#999] flex flex-col items-center gap-2 cursor-pointer h-48 justify-center",
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

              <input {...getInputProps()} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddBlog;
