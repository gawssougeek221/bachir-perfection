import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PERFECTION BY BACHIR | Luxury Car Renovation Dakar",
  description: "Rénovation automobile haut de gamme à Dakar, Sénégal",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-[#F8F8F6] text-[#111]`}>
        {children}
      </body>
    </html>
  );
}
