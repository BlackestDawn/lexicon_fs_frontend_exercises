import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/general/siteHeader";
import SiteFooter from "@/components/general/siteFooter";
import BaseBox from "@/components/general/baseBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Handlers Inc",
  description: "Exercise project for talking to a web API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-zinc-200 dark:bg-zinc-800">
          <BaseBox className="py-3">
            <SiteHeader />
          </BaseBox>
        </header>

        <main className="flex flex-1 flex-col">
          <BaseBox className="flex flex-1 flex-col py-2">{children}</BaseBox>
        </main>

        <footer className="bg-zinc-200 dark:bg-zinc-800">
          <BaseBox className="py-8">
            <SiteFooter />
          </BaseBox>
        </footer>
      </body>
    </html>
  );
}
