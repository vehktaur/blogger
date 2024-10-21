'use client';

import { FormProvider, useForm } from 'react-hook-form';

const UseFormContextProvider = ({
  defaultValues,
  children,
}: {
  defaultValues?: any;
  children: React.ReactNode;
}) => {
  const methods = useForm({ defaultValues: defaultValues?.formData });

  return <FormProvider {...methods}> {children}</FormProvider>;
};
export default UseFormContextProvider;