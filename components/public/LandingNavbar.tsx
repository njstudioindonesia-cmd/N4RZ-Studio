import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteSettings } from "@prisma/client";

export default function LandingNavbar({ settings, waNumber }: { settings: SiteSettings | null, waNumber: string }) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/70 backdrop-blur-xl text-charcoal border border-white/40 shadow-xl shadow-charcoal/5 rounded-full pointer-events-auto w-[95%] max-w-7xl transition-all">
        <a href="/" className="flex items-center gap-3 text-lg font-display font-bold tracking-wide hover:opacity-80 transition-opacity">
          <img src="/icon.png" alt="Logo" className="w-7 h-7 object-contain rounded-md brightness-0" />
          <span className="hidden sm:block">{settings?.studioName || "NJ Studio"}</span>
        </a>
        
        <Link 
          href={`https://wa.me/${waNumber}?text=Halo%20NJ%20Studio,%20saya%20tertarik%20dengan%20layanan%20Anda`}
          className="flex items-center gap-2 bg-charcoal text-off-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black hover:scale-105 transition-all duration-300 shadow-md"
        >
          Konsultasi Gratis <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
