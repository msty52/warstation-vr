import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warstation VR",
  description: "Арена виртуальной реальности",
  alternates: {
    canonical: "https://vr-warstation-rnd.ru",
  },

  verification: {
    yandex: "9c074d6b9dc8ff07",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "name": "Warstation VR",
    "url": "https://vr-warstation-rnd.ru",
    "telephone": "+79286255020",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      }
    ]
  };

  return (
    <html lang="ru">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
        <SpeedInsights /> 
      </body>
    </html>
  );
}
