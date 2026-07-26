import MobileMenu from "./MobileMenu";
import { SiteSettings } from "@prisma/client";

export default function Navbar({ settings }: { settings: SiteSettings }) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="flex items-center justify-between px-6 md:px-8 py-3 bg-white/70 backdrop-blur-xl text-charcoal border border-white/40 shadow-xl shadow-charcoal/5 rounded-full pointer-events-auto w-[90%] max-w-7xl transition-all">
        <a href="/" className="flex items-center gap-3 text-lg font-display font-bold tracking-wide hover:opacity-80 transition-opacity">
          <img src="/icon.png" alt="Logo" className="w-7 h-7 object-contain rounded-md brightness-0" />
          {settings.studioName}
        </a>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs font-semibold tracking-widest uppercase mr-2 opacity-60">Menu</span>
          <MobileMenu studioName={settings.studioName} />
        </div>
      </div>
    </header>
  );
}
