'use client';

import { Input as InputInterface } from '@/lib/definitions';
import { useFormContext } from 'react-hook-form';

const Input = ({
  label,
  name,
  type,
  id,
  disabled,
  required,
  errorMsg,
  placeholder,
}: InputInterface) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid items-start w-full'>
      <label className='form-label' htmlFor={id || name}>
        {label}
      </label>
      <input
        className='input-base rounded-3xl ~text-sm/base'
        placeholder={placeholder}
        id={id || name}
        type={type}
        {...register(name, {
          disabled,
          required: {
            value: required || false,
            message: errorMsg || 'This field is required',
          },
        })}
      />
      {errors?.[name]?.message && (
        <p className='error mt-2 ps-1'>{errors[name].message as string}</p>
      )}
    </div>
  );
};
export default Input;
