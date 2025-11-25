import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_JP,
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";

const headingFont = Geist({
  variable: "--font-heading-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Noto_Sans_JP({
  variable: "--font-body-noto-sans",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaizen Digilabs",
  description: "Building digital solutions that evolve with purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsTracker />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
