import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astro Oracle · Read My Chart",
  description: "Enter your birth details for an elemental, story-driven chart interpretation crafted on the fly.",
  keywords: ["astrology", "chart reading", "zodiac", "birth chart", "rituals"],
  authors: [{ name: "Astro Oracle" }],
  openGraph: {
    title: "Astro Oracle · Read My Chart",
    description: "Generate a luminous reading across sun, moon, rising, elemental medicine, and house guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
