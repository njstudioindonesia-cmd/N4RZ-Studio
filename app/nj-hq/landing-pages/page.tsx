import prisma from "@/lib/prisma";
import Link from "next/link";
import { Edit, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Pages | NJ HQ",
};

export default async function LandingPages() {
  const pages = await prisma.serviceLanding.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landing Pages</h1>
          <p className="text-muted-foreground mt-2">
            Kelola teks, harga, dan fitur pada halaman layanan statis Anda.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <div key={page.id} className="p-6 bg-white rounded-xl border border-border/50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-deep-amber/10 flex items-center justify-center text-deep-amber">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{page.serviceName}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
              </div>
              <p className="text-sm text-charcoal/70 line-clamp-2 mb-6">
                {page.headline}
              </p>
            </div>
            
            <Link 
              href={`/nj-hq/landing-pages/${page.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-charcoal text-white py-2 px-4 rounded-md hover:bg-black transition-colors text-sm font-medium"
            >
              <Edit className="w-4 h-4" /> Edit Konten
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
