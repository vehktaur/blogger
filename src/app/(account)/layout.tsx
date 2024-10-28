import { Metadata } from 'next';
import { Barlow } from 'next/font/google';

//Components Import
import Sidebar from '@/components/layout/sidebar';
import { Slide, ToastContainer } from 'react-toastify';
import { EdgeStoreProvider } from '@/lib/edgestore';

//Styles Import
import '../globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Blogger - Admin',
  description: 'Blog Admin Page',
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
        {/* Admin Sidebar */}
        <Sidebar />

        {/* Actual Admin Section */}
        <div className='min-full-screen grid flex-1 content-start'>
          <nav className='sticky top-0 z-10 h-[3.75rem] w-full border-b border-black bg-stone-50 px-5'>
            <div className='mx-auto flex h-full max-w-6xl items-center justify-between'>
              <h3 className='font-medium ~text-base/lg'>Admin Panel</h3>
            </div>
          </nav>
          <main className='overflow-x-auto'>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </main>
        </div>

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
