import { BlogFormData, Input as InputInterface } from '@/lib/definitions';
import { useFormContext } from 'react-hook-form';

const Input = ({
  label,
  name,
  type,
  id,
  required,
  errorMsg,
  placeholder,
}: InputInterface) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BlogFormData>();

  return (
    <div className='grid'>
      <label className='form-label' htmlFor={id}>
        {label}
      </label>
      <input
        className='input-base rounded-sm ~text-sm/base'
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, {
          required: {
            value: required || false,
            message: errorMsg || '',
          },
        })}
      />
      {errors[name]?.message && (
        <p className='error mt-2 ps-1'>{errors[name].message}</p>
      )}
    </div>
  );
};
export default Input;
