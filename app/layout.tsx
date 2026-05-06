import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. ДОБАВЬ ЭТУ СТРОКУ:
import { SpeedInsights } from "@vercel/speed-insights/next"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warstation VR",
  description: "Арена виртуальной реальности",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        {/* 2. ДОБАВЬ ЭТУ СТРОКУ ЗДЕСЬ: */}
        <SpeedInsights /> 
      </body>
    </html>
  );
}