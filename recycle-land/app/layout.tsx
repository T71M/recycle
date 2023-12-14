import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecycleMap - береги планету!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
