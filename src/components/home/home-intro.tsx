'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';

const HomeIntro = () => {
  const slidesContent = [
    {
      title: 'Welcome to Blogger',
      content:
        "At Blogger, we believe in the power of sharing stories, ideas, and knowledge. Our platform is designed to provide a seamless blogging experience, allowing you to focus on creating content that matters. Whether you're a seasoned writer or just starting, Blogger offers all the tools you need to publish and promote your blog.",
    },
    {
      title: 'Join Our Diverse Community',
      content:
        "Blogger is home to a vibrant and diverse community of bloggers from around the world. Here, you can connect with like-minded individuals, share your unique perspective, and gain insights from a variety of topics. From technology and startups to lifestyle and personal growth, there's a place for everyone at Blogger.",
    },
    {
      title: 'Powerful Tools for Every Blogger',
      content:
        'Our platform provides a range of powerful tools to help you create, customize, and manage your blog. With intuitive design options, robust analytics, and seamless social media integration, Blogger makes it easy to grow your audience and reach your blogging goals. Start blogging with confidence today!',
    },
    {
      title: 'Latest Blogs',
      content:
        "Stay updated with the latest blogs from our community. Discover fresh perspectives, insightful articles, and trending topics. Whether you're interested in technology, lifestyle, or personal growth, our latest blogs section has something for everyone.",
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
            <p className='mx-auto max-w-5xl'>{content}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default HomeIntro;
