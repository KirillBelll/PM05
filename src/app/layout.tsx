import type { Metadata } from "next";
import { Spectral, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "КВАРТАЛ — агентство недвижимости",
  description:
    "КВАРТАЛ — агентство недвижимости в Москве и Санкт-Петербурге. Продажа и аренда квартир, домов и коммерческих помещений с точным расчётом, как в чертеже.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${spectral.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">{children}</body>
    </html>
  );
}
