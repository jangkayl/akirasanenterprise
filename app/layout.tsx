import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AkiraSan Enterprise",
  description: "Digital Marketing & Community Management Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo.ico" type="image/ico" />
        <link rel="shortcut icon" href="/assets/logo.ico" type="image/ico" />
        <link rel="apple-touch-icon" href="/assets/logo.ico" type="image/ico" />
      </head>
      <body className={`${inter.className} min-h-screen bg-black`}>{children}</body>
    </html>
  );
}
