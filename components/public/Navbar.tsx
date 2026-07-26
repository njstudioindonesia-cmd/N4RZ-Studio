import MobileMenu from "./MobileMenu";
import { SiteSettings } from "@prisma/client";

export default function Navbar({ settings }: { settings: SiteSettings }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-6 bg-off-white/80 backdrop-blur-md text-charcoal border-b border-charcoal/10 transition-all">
      <a href="/" className="flex items-center gap-3 text-xl font-display font-semibold tracking-wide relative z-[60] hover:opacity-80 transition-opacity">
        <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain rounded-md brightness-0" />
        {settings.studioName}
      </a>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
        <a href="/about" className="hover-underline">About Us</a>
        <a href="/#services" className="hover-underline">Capabilities</a>
        <a href="/#portfolio" className="hover-underline">Works</a>
        <a href="/jasa-website" className="hover-underline">Jasa Web</a>
        <a href="/jasa-roblox-development" className="hover-underline">Jasa Roblox</a>
        <a href="/shop" className="hover-underline">Shop</a>
        <a href="/blog" className="hover-underline">Insights</a>
      </nav>

      {/* Mobile Nav Menu */}
      <MobileMenu studioName={settings.studioName} />
    </header>
  );
}
