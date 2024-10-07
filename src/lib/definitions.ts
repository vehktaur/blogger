import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { StaticImageData } from 'next/image';

export interface Blog {
  _id: number;
  title: string;
  description: string;
  image: {
    url: string;
    thumbnailUrl: string;
    name: string;
  };
  createdAt: number | string;
  updatedAt?: number | string;
  categories: string[];
  author: { name: string; img: string };
}

export interface Category {
  category: string;
  active: boolean;
}

export interface Query {
  query: string;
}
export const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface ImageFile {
  image?: File;
  preview: string;
  url: string;
  thumbnailUrl?: string;
  name?: string;
}

export const minSize = 1024 * 1024 * 0.05; // 50KB
export const maxSize = 1024 * 1024 * 2; // 2MB

export interface BlogFormData {
  image: {
    url: string;
    thumbnailUrl?: string;
    name?: string;
  };
  title: string;
  categories: string[];
  content: string;
  description: string;
  _id?: string;
}
