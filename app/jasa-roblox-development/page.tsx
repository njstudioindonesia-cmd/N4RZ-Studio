import type { Metadata } from "next";
import FAQ, { FAQItem } from "@/components/public/FAQ";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { IconMap } from "@/components/public/IconMap";
import RobloxMarketplace from "@/components/public/RobloxMarketplace";
import ClientLogos from "@/components/public/ClientLogos";
import MegaCTA from "@/components/public/MegaCTA";
import LandingNavbar from "@/components/public/LandingNavbar";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";

export const metadata: Metadata = {
  title: "NJ STUDIO | Roblox Developer",
  description: "Layanan jasa pembuatan game Roblox profesional, custom scripting Luau, UI/UX game, dan map building oleh developer berpengalaman.",
  openGraph: {
    title: "NJ STUDIO | Roblox Developer",
    description: "Layanan jasa pembuatan game Roblox profesional dan custom scripting Luau.",
  }
};

export default async function JasaRoblox() {
  const landingData = await prisma.serviceLanding.findUnique({
    where: { slug: 'jasa-roblox-development' }
  });
  
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const waNumber = settings?.phone?.replace(/\D/g, '') || "6281234567890";
  
  const assets = await prisma.robloxAsset.findMany({
    orderBy: { order: "asc" }
  });

  const clientLogos = await prisma.clientLogo.findMany({
    where: { OR: [{ service: 'ROBLOX' }, { service: 'ALL' }] },
    orderBy: { order: "asc" }
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" }
  });

  if (!landingData) return <div>Service page not found</div>;

  const features = landingData.features as any[];
  const packages = landingData.packages as any[];
  const faqs = landingData.faqs as FAQItem[];

  return (
    <main className="min-h-screen bg-off-white selection:bg-deep-amber/30">
      <LandingNavbar settings={settings} waNumber={waNumber} />
      
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        {landingData.videoUrl ? (
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src={landingData.videoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
        )}
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-off-white mb-8 font-semibold tracking-wide text-sm shadow-lg">
            <IconMap.Gamepad2 className="w-4 h-4 text-deep-amber" />
            <span>{landingData.serviceName}</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-off-white leading-[1.1] mb-8 drop-shadow-2xl">
            {landingData.headline}
          </h1>
          <p className="text-lg md:text-xl text-off-white font-medium leading-relaxed mb-12 max-w-2xl mx-auto drop-shadow-lg">
            {landingData.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href={`https://wa.me/${waNumber}?text=Halo%20NJ%20Studio`}
              className="group bg-charcoal text-off-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-charcoal/20"
            >
              Mulai Proyek Anda <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ClientLogos logos={clientLogos} theme="dark" />

      {/* Cakupan Layanan - Premium Cards */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-deep-amber/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-display text-center mb-20 text-off-white tracking-tight">Cakupan Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const IconComp = IconMap[feature.icon || "Code"] || IconMap.Code;
              return (
                <div key={i} className="group p-10 rounded-[2rem] bg-off-white/5 border border-off-white/10 hover:bg-off-white/10 hover:border-deep-amber/50 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
                  <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-deep-amber group-hover:text-charcoal transition-all duration-500 text-deep-amber">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-off-white">{feature.title}</h3>
                  <p className="text-off-white/60 leading-relaxed font-light">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roblox Marketplace Gallery */}
      <RobloxMarketplace assets={assets} limit={3} showViewAll={true} />

      {/* Pricing / Packages */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display mb-8 text-charcoal">Investasi Pembuatan Game</h2>
          <p className="text-charcoal/60 font-light text-lg md:text-xl mb-16 leading-relaxed">
            Setiap game Roblox memiliki tingkat kerumitan yang berbeda-beda. Kami menggunakan sistem penawaran (quotation) setelah menganalisa dokumen game Anda.
          </p>
          
          <div className="bg-white border border-charcoal/10 p-10 md:p-14 rounded-[3rem] max-w-3xl mx-auto text-left shadow-2xl shadow-charcoal/5">
            <h3 className="text-2xl font-bold mb-8 text-center text-charcoal">Estimasi Kisaran Harga</h3>
            <ul className="space-y-6 font-light text-charcoal/80">
              {packages.map((pkg, i) => (
                <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-charcoal/10 pb-6 last:border-0 last:pb-0 gap-4">
                  <div>
                    <span className="block text-lg font-medium text-charcoal mb-1">{pkg.title}</span>
                    <span className="text-sm text-charcoal/50">{pkg.desc}</span>
                  </div>
                  <span className="text-xl font-display font-bold text-deep-amber bg-deep-amber/10 px-4 py-2 rounded-full whitespace-nowrap">
                    {pkg.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && <TestimonialCarousel data={testimonials} />}

      {/* FAQ Section */}
      <FAQ faqs={faqs} title="FAQ Roblox Development" />
      
      <MegaCTA phone={settings?.phone} />
    </main>
  );
}
