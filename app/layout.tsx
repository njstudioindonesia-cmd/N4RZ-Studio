import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import prisma from "@/lib/prisma";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./Providers";
import CustomCursor from "@/components/public/CustomCursor";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  
  if (!settings) {
    return {
      title: "NJ Studio | Premium Design & Creative Agency",
      description: "A premium design studio specializing in crafting unique digital experiences, branding, and motion design.",
    };
  }

  return {
    title: settings.metaTitle,
    description: settings.metaDesc,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDesc,
      type: "website",
      siteName: settings.studioName,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.metaTitle,
      description: settings.metaDesc,
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings?.studioName || "NJ Studio",
    "url": "https://nj-studio.vercel.app",
    "logo": "https://nj-studio.vercel.app/favicon.ico",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.phone || "",
      "contactType": "customer service",
      "email": settings?.email || "",
      "areaServed": "ID",
      "availableLanguage": "id"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": settings?.studioName || "NJ Studio",
    "image": "https://nj-studio.vercel.app/favicon.ico",
    "url": "https://nj-studio.vercel.app",
    "telephone": settings?.phone || "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "Jakarta",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.261493,
      "longitude": 106.810600
    },
    "priceRange": "$$"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased cursor-default`}>
        <CustomCursor />
        <Providers>{children}</Providers>
        <FloatingWhatsApp phone={settings?.phone} />
        <Analytics />
      </body>
    </html>
  );
}
