'use client';

import { Input as InputProps } from '@/lib/definitions';
import { GiEyelashes, GiBleedingEye } from 'react-icons/gi';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Input = ({
  label,
  name,
  type = 'text',
  id,
  disabled,
  required = true,
  errorMsg,
  placeholder,
  pattern,
  minLength,
  value,
  validations,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [inputType, toggleInputType] = useState(type);

  return (
    <div className='grid w-full items-start'>
      <label className='form-label' htmlFor={id || name}>
        {label}{' '}
        {typeof required === 'object' && required.star && (
          <span className='text-red-600'>*</span>
        )}
      </label>
      <div className='relative'>
        <input
          className='input-base rounded-3xl ~text-sm/base'
          placeholder={placeholder}
          id={id || name}
          type={inputType}
          {...register(name, {
            disabled,
            required: {
              value: Boolean(required) || false,
              message: errorMsg || 'This field is required',
            },
            minLength,
            pattern,
            validate: validations,
            value,
          })}
        />

        {/* Button to show or hide password input value */}
        {type === 'password' && (
          <span className='absolute inset-y-0 right-[8%] content-center'>
            <button
              onClick={() =>
                toggleInputType((prev) => {
                  if (prev === 'password') {
                    return 'text';
                  } else if (prev === 'text') {
                    return 'password';
                  } else {
                    return prev;
                  }
                })
              }
              type='button'
            >
              {inputType === 'password' ? (
                <GiEyelashes className='mt-2.5 ~size-5/6' />
              ) : (
                <GiBleedingEye className='mt-3.5 ~size-5/6' />
              )}
            </button>
          </span>
        )}
      </div>

      {errors?.[name]?.message && (
        <p className='error mt-2 ps-1'>{errors[name].message as string}</p>
      )}
    </div>
  );
};
export default Input;
