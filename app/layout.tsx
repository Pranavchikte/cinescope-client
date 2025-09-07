import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Use this import for the App Router
import { Analytics } from "@vercel/analytics/react"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CineScope - Discover Your Next Favorite Movie",
  description: "A sophisticated movie discovery platform",
  // ... your other metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-black text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}