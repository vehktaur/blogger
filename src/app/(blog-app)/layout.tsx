import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "../globals.css";
import "swiper/css";
import "swiper/css/pagination";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Blogger",
  description: "Blog App from GreatStack",
};

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`grid min-h-screen ${barlow.className}`}>
        <Navbar />

        <main className="overflow-x-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
