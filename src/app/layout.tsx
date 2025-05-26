import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Query Infinite Scroll Tutorial",
  description:
    "A tutorial on how to implement infinite scroll with React Query by Coding in Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <TanStackQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
