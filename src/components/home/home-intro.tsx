'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';

const HomeIntro = () => {
  const slidesContent = [
    {
      title: 'Welcome to Logs',
      content:
        "At Logs, we make it easy to share your stories, ideas, and insights. This simple blog app lets you create, style, and manage posts effortlessly. Whether you're new to blogging or an experienced writer, Logs gives you the tools to focus on what matters most — your content.",
    },
    {
      title: 'Create and Style with Ease',
      content:
        'Logs features a powerful markdown editor, allowing you to create and style posts with ease. Share your unique voice and make your content stand out, all while enjoying a seamless and intuitive experience.',
    },
    {
      title: 'Manage and Share Your Posts',
      content:
        'With Logs, you can update, edit, or delete your posts anytime. Plus, share your creations across social media platforms effortlessly to connect with a wider audience and grow your reach.',
    },
    {
      title: 'Latest Logs',
      content:
        'Discover fresh content from our vibrant community of bloggers. From trending tech insights to lifestyle tips and personal growth stories, the latest logs section has something to inspire everyone.',
    },
  ];

  return (
    <section className='sm:padding-inline mx-auto max-w-7xl text-center ~pt-4/6'>
      <Swiper
        className='max-h-[15rem]'
        direction={'vertical'}
        speed={777}
        spaceBetween={30}
        autoHeight={true}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
          stopOnLastSlide: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Keyboard, Pagination]}
      >
        {slidesContent.map(({ title, content }, index) => (
          <SwiperSlide className='content-center px-5' key={index}>
            <h1 className='font-semibold ~text-2xl/3xl ~mb-4/8 sm:text-5xl'>
              {title}
            </h1>
            <p className='mx-auto max-w-4xl'>{content}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default HomeIntro;
