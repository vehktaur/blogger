import { Metadata } from "next";
import { Barlow } from "next/font/google";
import "../globals.css";
import "swiper/css";
import "swiper/css/pagination";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Blogger - Admin",
  description: "Blog Admin Page",
};

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex ${barlow.className}`}>
        <Sidebar />
        <div className="grid min-h-screen w-full content-start">
          <nav className="h-[3.75rem] border-b border-black bg-stone-50 px-5 content-center">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <h3 className="font-medium ~text-base/lg">Admin Panel</h3>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
