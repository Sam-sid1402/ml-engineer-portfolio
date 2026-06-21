import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import RagChatWidget from "@/components/RagChatWidget";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ML Engineer Portfolio`,
    template: `%s | ${SITE.name}`,
  },
  description:
  "Portfolio of Semyon Sidorov — Machine Learning Engineer focused on practical ML applications, model evaluation, FastAPI inference APIs, and Docker deployment.",  
  keywords: [
    "Machine Learning",
    "ML Engineer",
    "Data Science",
    "FastAPI",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} | ML Engineer Portfolio`,
    description: SITE.title,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <RagChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
