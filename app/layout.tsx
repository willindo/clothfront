// " use client ";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import ClientLayout from "@/components/ClientLayout";
// import Nav from "@/components/Nav";
import Script from "next/script";
// import ProductSearch from "@/components/ProductSearch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " E-Commerce UI  ",
  description: " Single Brand Mens Cloth  ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ClientLayout> */}
        {/* <Nav /> */}
        {/* <ProductSearch /> */}
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        {/* </ClientLayout> */}
      </body>
    </html>
  );
}
