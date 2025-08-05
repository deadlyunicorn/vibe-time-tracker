import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AlertListener } from "@/components/AlertListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Time Tracker",
  description: "A Time Tracker that vibes with you",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vibe Time Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/icons/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AlertListener>{children}</AlertListener>
      </body>
    </html>
  );
}
