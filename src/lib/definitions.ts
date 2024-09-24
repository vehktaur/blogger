import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { StaticImageData } from 'next/image';

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData | StaticImport;
  date: number;
  categories: string[];
  author: string;
  author_img: string | StaticImageData | StaticImport;
}

export interface Category {
  category: string;
  active: boolean;
}

export interface EmailInput {
  email: string;
}
export const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface ImageFile {
  image?: File;
  preview: string;
}

export interface BlogFormData {
  image: string;
  title: string;
  categories: string[];
  content: string;
  description: string;
}
