import { StaticImageData } from 'next/image';

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  date: number;
  category: string;
  author: string;
  author_img: string | StaticImageData;
}

export interface Category {
  category: string;
  active: boolean;
}
