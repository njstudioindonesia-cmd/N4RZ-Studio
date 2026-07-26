"use client";

import { useState, useMemo } from "react";
import { RobloxAsset } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function RobloxMarketplace({ 
  assets, 
  limit, 
  showViewAll,
  showFilters 
}: { 
  assets: RobloxAsset[], 
  limit?: number, 
  showViewAll?: boolean,
  showFilters?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  // Extract categories dynamically so whatever the user types in Admin becomes a filter (e.g., Map, Script, System, Robux)
  const categories = useMemo(() => {
    const cats = new Set(assets.map(a => a.category?.trim()).filter(Boolean));
    return ["ALL", ...Array.from(cats)] as string[];
  }, [assets]);

  const displayAssets = useMemo(() => {
    let filtered = assets;
    if (activeFilter !== "ALL") {
      filtered = assets.filter(a => a.category?.trim().toLowerCase() === activeFilter.toLowerCase());
    }
    return limit ? filtered.slice(0, limit) : filtered;
  }, [assets, activeFilter, limit]);

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-off-white relative overflow-hidden min-h-[70vh]">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-deep-amber/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {!showFilters && (
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Marketplace Aset Digital</h2>
            <p className="text-off-white/60 font-light text-lg md:text-xl max-w-2xl mx-auto">
              Tingkatkan kualitas game Roblox Anda dengan aset premium buatan NJ Studio. Mulai dari UI Kit, Script System, hingga 3D Model.
            </p>
          </div>
        )}

        {showFilters && (
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Digital Shop.</h2>
            <p className="text-off-white/60 font-light text-lg md:text-xl max-w-2xl mb-12">
              Jelajahi dan temukan aset digital terbaik untuk game Anda. Mulai dari Map, Script, System, hingga Robux.
            </p>
            
            {categories.length > 1 && (
              <div className="flex gap-6 border-b border-white/10 pb-4 overflow-x-auto">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`text-sm font-semibold tracking-widest uppercase pb-2 border-b-2 transition-colors whitespace-nowrap ${activeFilter === cat ? 'border-deep-amber text-white' : 'border-transparent text-white/40 hover:text-white hover:border-white/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayAssets && displayAssets.length > 0 ? (
              displayAssets.map((asset) => (
                <motion.div 
                  key={asset.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-off-white/5 border border-off-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm flex flex-col"
                >
                  <Link href={`/shop/${asset.id}`} className="relative aspect-video w-full overflow-hidden bg-black/50 block">
                    <Image 
                      src={asset.imageUrl}
                      alt={asset.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-white">
                      {asset.category || "Uncategorized"}
                    </div>
                  </Link>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-xl font-bold font-display">
                        <Link href={`/shop/${asset.id}`} className="hover:text-deep-amber transition-colors">
                          {asset.title}
                        </Link>
                      </h3>
                      <div className="bg-deep-amber/20 text-deep-amber border border-deep-amber/30 px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                        {asset.price}
                      </div>
                    </div>
                    
                    {asset.description && (
                      <p className="text-off-white/50 text-sm mb-8 leading-relaxed font-light flex-1">
                        {asset.description}
                      </p>
                    )}

                    {asset.downloadLink ? (
                      <a 
                        href={asset.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-off-white text-charcoal font-semibold hover:bg-deep-amber hover:text-white transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" /> Beli / Download
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-off-white/10 text-off-white/50 font-semibold cursor-not-allowed">
                        Tersedia Segera
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 text-off-white/50 font-light border border-off-white/10 rounded-2xl bg-off-white/5 backdrop-blur-sm"
              >
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Marketplace belum memiliki aset dalam kategori ini.</p>
                <p className="text-sm mt-2">Tambahkan aset digital melalui Dasbor Admin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showViewAll && limit && assets.length > limit && (
          <div className="mt-16 text-center">
            <a href="/shop" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-semibold text-deep-amber hover:text-white transition-colors group">
              View All Digital Assets
              <svg className="transform group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
