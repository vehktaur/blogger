'use client';

import { illustrations } from '@/assets/assets';
import { getRandomImages } from '@/lib/utils';
import Image from 'next/image';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Illustration = () => {
  const randomImages = getRandomImages(illustrations, 10);

  return (
    <div
      id='illustration'
      className='relative h-full max-h-[60rem] overflow-hidden rounded-[3rem] border shadow-lg'
    >
      <div className='absolute inset-0 z-[2] content-end rounded-[3rem] bg-black bg-opacity-20'>
        <div className='mb-20 text-center font-semibold text-white'>
          <h2 className='~text-xl/2xl'>everthine</h2>
          <p>
            Art by{' '}
            <a
              className='text-sm underline underline-offset-2'
              href='https://t.me/everthine_tg'
              target='_blank'
              rel='noopener noreferrer'
            >
              @everthine
            </a>
          </p>
        </div>
      </div>
      <Swiper
        speed={777}
        loop={true}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Parallax]}
        pagination={{ clickable: true }}
        parallax={true}
        autoplay={{ delay: 5000 }}
        className='h-full'
      >
        {randomImages.map((ill, index) => (
          <SwiperSlide key={index}>
            <Image
              className='size-full object-cover object-top'
              src={ill}
              alt={`Illustration ${index}`}
              placeholder='blur'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Illustration;
