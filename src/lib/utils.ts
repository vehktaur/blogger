import { getPlaiceholder } from 'plaiceholder';

export const getBlurData = async (url: string) => {
  try {
    const image = await fetch(url);
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return { base64 };
  } catch (error) {
    console.log(error);
    return { base64: '' };
  }
};
