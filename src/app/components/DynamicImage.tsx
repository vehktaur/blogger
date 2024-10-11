import { getBlurData } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

const DynamicImage = async (props: ImageProps) => {
  const { base64 } = await getBlurData(props.src as string);

  console.log(`blur data = ${base64}`);

  return <Image {...props} />;
};
export default DynamicImage;
