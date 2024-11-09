import { Metadata } from 'next';
import { Barlow } from 'next/font/google';

//Components Import
import { Slide, ToastContainer } from 'react-toastify';

//Styles Import
import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Blogger',
};

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='scroll-smooth' lang='en'>
      <SessionProvider>
        <body
          className={`min-full-screen flex w-full flex-col ${barlow.className}`}
        >
          {children}

          {/* Toast Container */}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme='light'
            transition={Slide}
          />
        </body>
      </SessionProvider>
    </html>
  );
}
