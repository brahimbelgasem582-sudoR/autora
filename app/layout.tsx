import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Autora",
    default: "Autora — Comparez et réservez votre voiture au Maroc",
  },
  description:
    "Autora vous permet de comparer les offres de location de voitures des meilleures agences au Maroc et de réserver en quelques clics.",
  keywords: ["location voiture maroc", "louer voiture casablanca", "car rental morocco"],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Autora",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
