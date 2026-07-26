import prisma from "@/lib/prisma";
import LandingPageEditor from "@/components/admin/LandingPageEditor";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Landing Page | NJ HQ",
};

export default async function EditLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = await prisma.serviceLanding.findUnique({
    where: { slug }
  });

  if (!pageData) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/nj-hq/landing-pages" className="p-2 hover:bg-black/5 rounded-md transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Halaman Layanan</h1>
          <p className="text-muted-foreground mt-1">
            Mengedit halaman: <span className="font-semibold text-deep-amber">/{pageData.slug}</span>
          </p>
        </div>
      </div>

      <LandingPageEditor initialData={pageData} />
    </div>
  );
}
