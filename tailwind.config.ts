import type { Config } from 'tailwindcss';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

const config: Config = {
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      boxShadow: {
        offset: '-7px 7px 0 #000000'
      },
      screens: {
        xxs: '20rem',
        xs: '30rem'
      }
    }
  },
  plugins: [fluid]
};
export default config;
