import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // ISR cache for 60 seconds

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.portfolioItem.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-off-white text-charcoal pt-24 pb-24">
      <article className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Back Button */}
        <div className="mb-12">
          <Link 
            href="/#portfolio" 
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-semibold text-charcoal/60 hover:text-deep-amber transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Works
          </Link>
        </div>

        {/* Hero Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-charcoal/10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Category</p>
              <p className="font-medium">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Year</p>
              <p className="font-medium">{project.year}</p>
            </div>
            {project.client && (
              <div className="col-span-2 md:col-span-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full aspect-video bg-charcoal/5 relative mb-16 rounded-xl overflow-hidden shadow-sm">
          <Image 
            src={project.coverImage} 
            alt={project.title} 
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Project Content (Rich Text) */}
        {project.content && (
          <div className="max-w-4xl mx-auto mb-24 prose prose-lg prose-charcoal prose-headings:font-light prose-a:text-deep-amber hover:prose-a:text-charcoal prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        )}

        {/* Fallback to old description if no rich text content */}
        {!project.content && project.description && (
          <div className="max-w-4xl mx-auto mb-24 text-lg text-charcoal/80 leading-relaxed font-light">
            <p>{project.description}</p>
          </div>
        )}

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-light mb-12 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {project.gallery.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className={`w-full relative bg-charcoal/5 rounded-xl overflow-hidden ${
                    idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'
                  }`}
                >
                  <Image 
                    src={imgUrl} 
                    alt={`${project.title} gallery image ${idx + 1}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
      </article>
    </main>
  );
}
