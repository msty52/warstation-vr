import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warstation VR",
  description: "Арена виртуальной реальности",

  verification: {
    yandex: "e0f4a4eed24358ab",
  },

  alternates: {
    canonical: "https://vr-warstation-rnd.ru",
  },

  icons: {
    icon: "/favicon.ico",
  },
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
        <SpeedInsights />
      </body>
    </html>
  );
}
