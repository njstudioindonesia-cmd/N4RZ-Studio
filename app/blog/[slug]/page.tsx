import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60; // ISR 60s

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | NJ Studio Blog`,
    description: post.content.substring(0, 160).replace(/[#*`_]/g, ''),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/[#*`_]/g, ''),
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      ...(post.coverImage && { images: [{ url: post.coverImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.substring(0, 160).replace(/[#*`_]/g, ''),
      ...(post.coverImage && { images: [post.coverImage] }),
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-off-white text-charcoal pb-24 selection:bg-deep-amber selection:text-off-white">
      {/* Article Header Image */}
      {post.coverImage && (
        <div className="w-full h-[50vh] md:h-[70vh] relative">
          <Image 
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-off-white via-transparent to-transparent opacity-80" />
        </div>
      )}

      {/* Article Content */}
      <div className={`max-w-3xl mx-auto px-6 md:px-12 ${post.coverImage ? '-mt-32 relative z-10' : 'pt-40'}`}>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-8 hover:text-deep-amber transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-charcoal/10">
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>
        
        <div className="mb-12">
          <div className="text-sm font-semibold tracking-widest uppercase text-deep-amber mb-4">
            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8">
            {post.title}
          </h1>
        </div>

        <article 
          className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-a:text-deep-amber prose-a:no-underline hover:prose-a:underline font-light leading-relaxed text-charcoal/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
