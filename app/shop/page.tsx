import prisma from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import RobloxMarketplace from "@/components/public/RobloxMarketplace";

export default async function ShopPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const assets = await prisma.robloxAsset.findMany({ orderBy: { order: "asc" } });

  if (!settings) return null;

  return (
    <main className="min-h-screen bg-charcoal text-off-white selection:bg-deep-amber selection:text-off-white flex flex-col">
      <Navbar settings={settings} />

      <div className="flex-1 pt-16">
        <RobloxMarketplace assets={assets} showFilters={true} />
      </div>

      <Footer data={settings} />
    </main>
  );
}
