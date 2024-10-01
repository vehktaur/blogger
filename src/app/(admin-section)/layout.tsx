import { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import '../globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Sidebar from '@/app/components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import { EdgeStoreProvider } from '@/lib/edgestore';

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
    <html lang="en">
      <body className={`flex outline outline-black ${barlow.className}`}>
        {/* Admin Sidebar */}
        <Sidebar />

        {/* Actual Admin Section */}
        <div className="min-full-screen w-full">
          <nav className="sticky top-0 z-10 h-[3.75rem] w-full content-center border-b border-black bg-stone-50 px-5">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <h3 className="font-medium ~text-base/lg">Admin Panel</h3>
            </div>
          </nav>
          <main className="min-h-[90%]">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </main>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
      </body>
    </html>
  );
}
