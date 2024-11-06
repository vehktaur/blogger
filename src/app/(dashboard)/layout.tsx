import { Metadata } from 'next';
//Components Import
import Sidebar from '@/components/layout/sidebar';
import { EdgeStoreProvider } from '@/lib/edgestore';

export const metadata: Metadata = {
  title: 'Blogger - Admin',
  description: 'Blog Admin Page',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <Sidebar />

      {/* Actual Admin Section */}
      <div className='grid h-full flex-1 content-start'>
        <nav className='sticky top-0 z-10 h-[3.75rem] w-full border-b border-black bg-stone-50 px-5'>
          <div className='mx-auto flex h-full max-w-6xl items-center justify-between'>
            <h3 className='font-medium ~text-base/lg'>Admin Panel</h3>
          </div>
        </nav>
        <main className='overflow-x-auto'>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
      </div>
    </div>
  );
}
