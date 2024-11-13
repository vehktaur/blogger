import 'server-only';

import { getBlurData } from '@/lib/server-utils';
import Image, { type ImageProps } from 'next/image';

const BlurImage = async ({ src, alt, ...rest }: ImageProps) => {
  if (typeof src !== 'string') return <Image src={src} {...rest} alt={alt} placeholder='blur' />;

  const { base64 } = await getBlurData(src);

  return (
    <Image
      src={src}
      {...rest}
      placeholder='blur'
      blurDataURL={base64}
      alt={alt}
    />
  );
};
export default BlurImage;
