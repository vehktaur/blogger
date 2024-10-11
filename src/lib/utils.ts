export const getBlurData = async (url: string) => {
  try {
    const image = await fetch(url);
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer).toString('base64');

    return `data:image/png;base64,${buffer}`;
  } catch (error) {
    console.log(error);
  }
};
