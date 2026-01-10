import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MouBCN - Metro de Barcelona",
    template: "%s | MouBCN",
  },
  description: "Consulta les línies i estacions del metro de Barcelona. Informació actualitzada de la xarxa de metro de TMB.",
  keywords: ["metro", "Barcelona", "TMB", "transports", "línies", "estacions", "metro Barcelona"],
  authors: [{ name: "MouBCN" }],
  creator: "MouBCN",
  publisher: "MouBCN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "ca": "/",
      "es": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: "/",
    title: "MouBCN - Metro de Barcelona",
    description: "Consulta les línies i estacions del metro de Barcelona",
    siteName: "MouBCN",
    images: [
      {
        url: "/metro-logo.png",
        width: 1200,
        height: 630,
        alt: "MouBCN - Metro de Barcelona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MouBCN - Metro de Barcelona",
    description: "Consulta les línies i estacions del metro de Barcelona",
    images: ["/metro-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
