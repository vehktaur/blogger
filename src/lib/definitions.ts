import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { StaticImageData } from 'next/image';

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData | StaticImport;
  date: number;
  category: string;
  author: string;
  author_img: string | StaticImageData | StaticImport;
}

export interface Category {
  category: string;
  active: boolean;
}
