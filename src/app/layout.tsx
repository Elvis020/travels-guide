import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
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
    default: "NYC Travels | Unforgettable Ghana Adventures",
    template: "%s | NYC Travels",
  },
  description:
    "Discover authentic Ghana experiences with NYC Travels. From Cape Coast history to Mole wildlife safaris, explore Ghana with expert local guidance.",
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
  authors: [{ name: "NYC Travels" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NYC Travels",
    title: "NYC Travels | Unforgettable Ghana Adventures",
    description:
      "Discover authentic Ghana experiences. From historic castles to wildlife safaris, explore Ghana with expert local guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC Travels | Unforgettable Ghana Adventures",
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
        {children}
      </body>
    </html>
  );
}
