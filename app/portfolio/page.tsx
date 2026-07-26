import prisma from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import PortfolioGrid from "./PortfolioGrid";

export default async function PortfolioPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const portfolio = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });

  if (!settings) return null;

  return (
    <main className="min-h-screen bg-off-white text-charcoal selection:bg-deep-amber selection:text-off-white">
      <Navbar settings={settings} />

      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
          All Works.
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed">
          Explore our extensive catalog of projects. From completed masterpieces to exciting works currently in progress.
        </p>
      </section>

      <PortfolioGrid items={portfolio} />

      <Footer data={settings} />
    </main>
  );
}
