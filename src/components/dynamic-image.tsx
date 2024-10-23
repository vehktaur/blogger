import 'server-only';

import { getBlurData } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

const DynamicImage = async ({ src, ...rest }: ImageProps) => {
  if (typeof src !== 'string') return <Image src={src} {...rest} />;

  const base64 = await getBlurData(src);

  return <Image src={src} {...rest} placeholder='blur' blurDataURL={base64} />;
};
export default DynamicImage;
