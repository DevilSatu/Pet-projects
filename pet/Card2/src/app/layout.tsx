import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Developer — Portfolio",
  description: "Digital experiences built with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistSans.variable} antialiased`}>
      <body className="min-h-[100dvh] bg-bg text-foreground">{children}</body>
    </html>
  );
}
