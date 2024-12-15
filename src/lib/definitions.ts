import { FieldValues, Validate, ValidationRule } from 'react-hook-form';

export interface Query {
  query: string;
}
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ImageFile {
  image?: File;
  preview: string;
  url: string;
  thumbnailUrl?: string | null;
  name?: string | null;
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

export interface SignUpSchema extends PersonalInfo {
  password: string;
  confirmPassword?: string;
}

export interface LoginSchema {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface Input {
  label: string;
  name: keyof BlogFormData | keyof PersonalInfo | keyof Password;
  type?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean | { star: boolean };
  errorMsg?: string;
  placeholder?: string;
  minLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  value?: string;
  validations?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>;
}
