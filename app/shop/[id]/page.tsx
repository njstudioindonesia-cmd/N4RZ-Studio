import prisma from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const assets = await prisma.robloxAsset.findMany({
    select: { id: true }
  });
  
  return assets.map((asset) => ({
    id: asset.id,
  }));
}

export default async function ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const { id } = await params;
  
  const asset = await prisma.robloxAsset.findUnique({
    where: { id }
  });

  if (!asset || !settings) return notFound();

  return (
    <main className="min-h-screen bg-charcoal text-off-white selection:bg-deep-amber selection:text-off-white flex flex-col">
      <Navbar settings={settings} />

      <section className="flex-1 pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <Link href="/shop" className="inline-flex items-center gap-2 text-off-white/60 hover:text-off-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Visual */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-off-white/10 shadow-2xl mb-8">
              <Image 
                src={asset.imageUrl}
                alt={asset.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            
            {asset.gallery && asset.gallery.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-display font-semibold mb-6">Galeri Produk</h3>
                <div className="grid grid-cols-2 gap-4">
                  {asset.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/50 border border-off-white/10">
                      <Image 
                        src={img}
                        alt={`${asset.title} gallery ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-32 bg-off-white/5 border border-off-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="inline-block bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 text-white/80">
                {asset.category || "Uncategorized"}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4 text-off-white">
                {asset.title}
              </h1>
              
              <div className="text-3xl font-bold text-deep-amber mb-8">
                {asset.price}
              </div>

              {asset.downloadLink ? (
                <a 
                  href={asset.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-deep-amber text-white font-bold text-lg hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-deep-amber/20 mb-8"
                >
                  <ShoppingCart className="w-5 h-5" /> Beli Sekarang
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-off-white/10 text-off-white/50 font-bold text-lg cursor-not-allowed mb-8">
                  Tersedia Segera
                </button>
              )}

              <div className="prose prose-invert prose-p:text-off-white/60 prose-headings:text-off-white prose-a:text-deep-amber max-w-none">
                {asset.content ? (
                  <div dangerouslySetInnerHTML={{ __html: asset.content }} />
                ) : (
                  <p>{asset.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer data={settings} />
    </main>
  );
}
