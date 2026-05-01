import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#f2f6ef",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Frutas, legumes e verduras da estação`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "alimentos frescos",
    "frutas da estação",
    "legumes e verduras",
    "sazonalidade Brasil",
    "lista de compras saudável",
    "hortifruti",
    "comida saudável",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: `${siteName} — Alimentos frescos e lista de compras`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Alimentos frescos e lista de compras`,
    description: siteDescription,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} ${fraunces.variable} ${nunito.className} antialiased min-h-dvh flex flex-col`}
      >
        <JsonLd data={jsonLd} />
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 pb-28">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
