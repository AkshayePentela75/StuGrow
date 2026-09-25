import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

/* Typography: swap families here; roles stay the same.
   Display: Archivo (variable width axis: condensed headlines, wide numerals)
   Body:    Figtree (friendly geometric, echoes the logo wordmark) */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display-src",
  display: "swap",
});
const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

const baseUrl = isPlaceholder(site.url) ? "http://localhost:3000" : site.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/stugro-mark.png", apple: "/brand/stugro-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#f2f5f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
