import type { Metadata } from "next";
import FAQ, { FAQItem } from "@/components/public/FAQ";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { IconMap } from "@/components/public/IconMap";
import ClientLogos from "@/components/public/ClientLogos";
import MegaCTA from "@/components/public/MegaCTA";
import LandingNavbar from "@/components/public/LandingNavbar";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website Profesional | NJ Studio",
  description: "Layanan jasa pembuatan website premium untuk profil perusahaan, e-commerce, dan aplikasi web khusus dengan desain elegan dan performa tinggi.",
};

export default async function JasaWebsite() {
  const landingData = await prisma.serviceLanding.findUnique({
    where: { slug: 'jasa-website' }
  });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const waNumber = settings?.phone?.replace(/\D/g, '') || "6281234567890";

  const clientLogos = await prisma.clientLogo.findMany({
    where: { OR: [{ service: 'WEB' }, { service: 'ALL' }] },
    orderBy: { order: "asc" }
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { OR: [{ service: 'WEB' }, { service: 'ALL' }] },
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
          <div className="absolute inset-0 bg-charcoal/5 -skew-y-3 origin-top-left z-0" />
        )}
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-off-white mb-8 font-semibold tracking-wide text-sm shadow-lg">
            <IconMap.Globe className="w-4 h-4 text-deep-amber" />
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
              Konsultasi Gratis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ClientLogos logos={clientLogos} theme="light" />

      {/* Keunggulan Layanan - Glassmorphism */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-deep-amber/10 to-transparent blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-center mb-20 text-charcoal tracking-tight">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {features.map((feature, i) => {
              const IconComp = IconMap[feature.icon || "Check"] || IconMap.Check;
              return (
                <div key={i} className="group bg-white/40 backdrop-blur-xl p-10 rounded-[2rem] border border-white/50 hover:border-deep-amber/30 hover:bg-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-charcoal/[0.03]">
                  <div className="bg-charcoal text-off-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-deep-amber group-hover:rotate-6 transition-all duration-500 shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-charcoal">{feature.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed font-light">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-off-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display mb-8">Paket Fleksibel Sesuai Kebutuhan</h2>
            <p className="text-off-white/60 max-w-2xl mx-auto font-light text-lg md:text-xl">Dari profil perusahaan sederhana hingga platform e-commerce yang kompleks, kami memiliki solusi yang tepat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-[2rem] p-10 flex flex-col transition-all duration-500 ${pkg.isPopular ? 'bg-deep-amber text-charcoal shadow-2xl scale-100 md:scale-105' : 'bg-off-white/5 border border-off-white/10 hover:border-off-white/30 hover:bg-off-white/10'}`}>
                {pkg.isPopular && <div className="absolute top-0 right-8 bg-charcoal text-deep-amber text-xs font-bold px-4 py-2 rounded-b-xl uppercase tracking-widest shadow-md">Terpopuler</div>}
                
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className={`${pkg.isPopular ? 'text-charcoal/70' : 'text-off-white/50'} mb-8 font-light h-12`}>{pkg.desc}</p>
                
                <div className="mb-10">
                  <span className="text-4xl font-display tracking-tight">{pkg.price}</span>
                </div>
                
                <ul className="flex-grow flex flex-col gap-5 mb-10">
                  {pkg.items?.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-4">
                      <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${pkg.isPopular ? 'text-charcoal' : 'text-deep-amber'}`} />
                      <span className={`${pkg.isPopular ? 'text-charcoal/90 font-medium' : 'text-off-white/80 font-light'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={pkg.link || "#"} className={`w-full py-4 text-center rounded-full transition-colors font-medium tracking-wide ${pkg.isPopular ? 'bg-charcoal text-off-white hover:bg-black' : 'border border-off-white/20 hover:bg-off-white hover:text-charcoal'}`}>
                  Pilih Paket
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && <TestimonialCarousel data={testimonials} />}

      {/* FAQ Section */}
      <FAQ faqs={faqs} title="Pertanyaan Seputar Website" />

      <MegaCTA phone={settings?.phone} />
    </main>
  );
}
