import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3行でニュースをAI要約",
  description: "ネットニュースのURLを入力するだけで、AIが3行で要約します。",
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
        <div className="fixed inset-0 -z-10 h-full w-full">
          <Image
            src="/bg-yokohama.jpg"
            alt="Background"
            fill
            priority // 🌟 ページのメインビジュアルなので、最優先で読み込ませる
            unoptimized
            className="object-cover object-center"
          />
        </div>

        <Header />
        {children}
      </body>
    </html>
  );
}
