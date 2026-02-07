import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NYS Travels | Unforgettable Ghana Adventures",
    template: "%s | NYS Travels",
  },
  description:
    "Discover authentic Ghana experiences with NYS Travels. From Cape Coast history to Mole wildlife safaris, explore Ghana with expert local guidance.",
  keywords: [
    "ghana tours",
    "ghana travel",
    "africa adventure",
    "cape coast",
    "mole national park",
    "kumasi tours",
    "ghana guide",
    "nana yaw suspense",
  ],
  authors: [{ name: "NYS Travels" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NYS Travels",
    title: "NYS Travels | Unforgettable Ghana Adventures",
    description:
      "Discover authentic Ghana experiences. From historic castles to wildlife safaris, explore Ghana with expert local guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYS Travels | Unforgettable Ghana Adventures",
    description:
      "Discover authentic Ghana experiences. From historic castles to wildlife safaris, explore Ghana with expert local guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
