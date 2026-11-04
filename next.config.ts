import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Обязательно для статического экспорта, так как серверная оптимизация картинок не работает
  },
};

export default nextConfig;
