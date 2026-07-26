import prisma from "@/lib/prisma";
import Hero from "@/components/public/Hero";
import Services from "@/components/public/Services";
import Gallery from "@/components/public/Gallery";
import Portfolio from "@/components/public/Portfolio";
import FAQ from "@/components/public/FAQ";
import Footer from "@/components/public/Footer";
import Preloader from "@/components/public/Preloader";
import Navbar from "@/components/public/Navbar";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";
import ClientLogos from "@/components/public/ClientLogos";
import MegaCTA from "@/components/public/MegaCTA";

import MobileMenu from "@/components/public/MobileMenu";

// Use Incremental Static Regeneration for blazing fast loads (cache invalidates every 60s)
export const revalidate = 60;

async function getSiteData() {
  // Ensure default global settings exist
  let settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        id: "global",
        studioName: "NJ Studio",
        accentColor: "#D97725",
      },
    });
  }

  // Ensure default hero exists
  let hero = await prisma.hero.findUnique({ where: { id: "global" } });
  if (!hero) {
    hero = await prisma.hero.create({
      data: {
        id: "global",
        headline: "We design the future.",
        subHeadline: "Crafting premium digital experiences through thoughtful design and engineering.",
      },
    });
  }

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const gallery = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  const portfolio = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });

  // Add some dummy data if empty for preview purposes
  if (services.length === 0) {
    await prisma.service.createMany({
      data: [
        { title: "Brand Identity", description: "Crafting unique visual identities that resonate with your target audience and stand the test of time.", order: 1 },
        { title: "UI/UX Design", description: "Designing intuitive and aesthetically pleasing digital interfaces for web and mobile platforms.", order: 2 },
        { title: "Motion & Interaction", description: "Bringing static designs to life with fluid animations and engaging micro-interactions.", order: 3 },
      ]
    });
  }

  if (portfolio.length === 0) {
    await prisma.portfolioItem.createMany({
      data: [
        { title: "Lumina Fintech", slug: "lumina-fintech", category: "UI/UX Design", year: "2024", coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000", description: "A complete overhaul of a modern banking application focusing on accessibility and seamless transactions.", order: 1 },
        { title: "Aether Lifestyle", slug: "aether-lifestyle", category: "Brand Identity", year: "2023", coverImage: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&q=80&w=2000", description: "Creating a holistic brand system for a premium lifestyle and wellness company.", order: 2 }
      ]
    });
  }
  
  if (gallery.length === 0) {
    await prisma.galleryItem.createMany({
      data: [
        { imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop", category: "Abstract", order: 1 },
        { imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", category: "Motion", order: 2 },
        { imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop", category: "Editorial", order: 3 },
      ]
    });
  }

  return {
    settings,
    hero,
    services: await prisma.service.findMany({ orderBy: { order: "asc" } }),
    gallery: await prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
    portfolio: await prisma.portfolioItem.findMany({ orderBy: { order: "asc" }, take: 3 }),
    testimonials: await prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    clientLogos: await prisma.clientLogo.findMany({ orderBy: { order: "asc" } }),
  };
}

export default async function Home() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-off-white text-charcoal selection:bg-deep-amber selection:text-off-white">
      <Preloader />
      
      <Navbar settings={data.settings} />

      <Hero data={data.hero} />
      <ClientLogos logos={data.clientLogos} theme="light" />
      <Services data={data.services} />
      <Gallery data={data.gallery} />
      <Portfolio data={data.portfolio} />
      {data.testimonials.length > 0 && <TestimonialCarousel data={data.testimonials} />}
      <MegaCTA phone={data.settings?.phone} />
      <Footer data={data.settings} />
    </main>
  );
}
