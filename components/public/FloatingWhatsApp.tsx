"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp({ phone = "6281234567890" }: { phone?: string }) {
  const waNumber = phone.replace(/\D/g, '');
  return (
    <a
      href={`https://wa.me/${waNumber}?text=Halo%20NJ%20Studio,%20saya%20tertarik%20dengan%20layanan%20Anda.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9000] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center group"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-charcoal text-off-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
        Chat via WhatsApp
      </span>
      {/* Ping animation behind */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20 -z-10"></span>
    </a>
  );
}
