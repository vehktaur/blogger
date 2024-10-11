import { getBlurData } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

const DynamicImage = async ({
  placeholder,
  blurDataURL,
  ...props
}: ImageProps) => {
  const base64 = await getBlurData(props.src as string);

  return <Image {...props} placeholder='blur' blurDataURL={base64} />;
};
export default DynamicImage;
