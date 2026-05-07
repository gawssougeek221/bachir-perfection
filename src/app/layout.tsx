import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PERFECTION BY BACHIR | Luxury Car Renovation Dakar",
  description:
    "Rénovation automobile haut de gamme à Dakar, Sénégal. Carrosserie, peinture, polish, restauration complète.",
  keywords: [
    "rénovation automobile",
    "carrosserie Dakar",
    "peinture voiture Sénégal",
    "polish auto",
    "restauration voiture",
    "Perfection Bachir",
  ],
  openGraph: {
    title: "PERFECTION BY BACHIR | Luxury Car Renovation",
    description: "Rénovation automobile haut de gamme à Dakar, Sénégal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F8F8F6] text-[#111]`}
      >
        {children}
      </body>
    </html>
  );
}
