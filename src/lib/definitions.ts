export interface Blog {
  _id?: string | number ;
  title: string;
  description: string;
  image: {
    url: string;
    thumbnailUrl?: string;
    name?: string;
  };
  createdAt?: number | string;
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

export interface PersonalInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Password {
  password: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface Input {
  label: string;
  name: keyof BlogFormData | keyof PersonalInfo | keyof Password;
  type: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  errorMsg?: string;
  placeholder?: string;
}
