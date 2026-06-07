import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Declan Li",
  description:
    "Research Intern at Caltech. Passionate about biophysics, sustainable agriculture, and building technology that matters.",
  keywords: [
    "Declan Li",
    "Caltech",
    "biophysics",
    "research",
    "biofertilizer",
    "sustainable agriculture",
  ],
  openGraph: {
    title: "Declan Li",
    description: "Research @ Caltech. Biophysics. Sustainable Agriculture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
