import { getBlurData } from '@/lib/utils';
import Image from 'next/image';

const DynamicImage = async ({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) => {
  const { base64 } = await getBlurData(src);

  return (
    <Image
      className={className || ''}
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={base64}
      width={width}
      height={height}
    />
  );
};
export default DynamicImage;
