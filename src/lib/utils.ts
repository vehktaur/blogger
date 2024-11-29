import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StaticImageData } from 'next/image';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getRandomImages = (
  array: StaticImageData[],
  num: number,
): StaticImageData[] => {
  const selectedImages = new Set<StaticImageData>();

  while (selectedImages.size < num) {
    const randomIndex = Math.floor(Math.random() * array.length);
    selectedImages.add(array[randomIndex]);
  }

  return Array.from(selectedImages);
};

export const findAncestor = (
  element: Element,
  level: number,
): Element | null => {
  let ancestor: Element | null = element;
  for (let i = 0; i < level; i++) {
    if (ancestor) {
      ancestor = ancestor.parentElement;
    } else {
      return null;
    }
  }

  return ancestor;
};

export const getFakeUser = () => {
  let user = {
    firstName: 'Victor',
    lastName: 'Akhihiero',
    name: 'Victor Akhihiero',
    email: 'victorakhihiero@gmail.com',
    username: 'vehktaur',
    _id: '',
    role: 'user',
    password: '$2a$10$IUq8yxxA/NlCeNZs08pSg.khLNob9KLA6eTLM3j.uaqRA5SaKRAgi',
    createdAt: new Date('2024-11-02T10:49:26.345+00:00'),
    updatedAt: new Date('2024-11-02T10:49:26.345+00:00'),
  };

  return user;
};

export const capitalizeString = (str: string) => {
  if (!str || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
