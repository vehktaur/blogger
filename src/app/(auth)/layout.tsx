import { Metadata } from 'next';
import { Barlow } from 'next/font/google';

//Components Import
import { Slide, ToastContainer } from 'react-toastify';

//Styles Import
import '../globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Get Started | Blogger',
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
    <html lang='en'>
      <body className={`flex ${barlow.className}`}>
        <main>{children}</main>

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
    </html>
  );
}
