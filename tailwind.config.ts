import type { Config } from 'tailwindcss';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

const config: Config = {
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      backgroundImage: {
        profile: 'url("../assets/images/profile.png")',
      },
      boxShadow: {
        offset: '-7px 7px 0 #000000',
      },
      colors: {
        grey: {
          500: '#E7E7E7',
        },
      },
      screens: {
        xxs: '20rem',
        xs: '30rem',
      },
    },
  },
  plugins: [
    fluid,
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    require('@tailwindcss/typography'),
  ],
};
export default config;
