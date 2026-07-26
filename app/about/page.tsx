import prisma from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  let about = await prisma.aboutUs.findUnique({ where: { id: "global" } });

  if (!settings) return null;
  if (!about) {
    about = await prisma.aboutUs.create({ data: { id: "global" } });
  }

  return (
    <main className="min-h-screen bg-off-white text-charcoal selection:bg-deep-amber selection:text-off-white">
      <Navbar settings={settings} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
          {about.title}
        </h1>
        <p className="text-xl md:text-3xl text-gray-500 font-light max-w-4xl leading-relaxed">
          {about.subtitle}
        </p>
      </section>

      {/* Gallery Section */}
      {about.imageUrls && about.imageUrls.length > 0 && (
        <section className="py-20 overflow-hidden">
          <div className="flex gap-4 px-6 md:px-12 lg:px-24 w-max animate-carousel-slide">
            {about.imageUrls.map((url, i) => (
              <div key={i} className="w-[80vw] md:w-[600px] aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src={url} alt={`Culture ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-charcoal text-off-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl md:text-4xl leading-relaxed font-display font-medium whitespace-pre-wrap">
            {about.content}
          </div>
        </div>
      </section>

      <Footer data={settings} />
    </main>
  );
}
