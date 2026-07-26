import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // ISR 60s

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-off-white text-charcoal pt-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-display mb-4">Insights & News</h1>
          <p className="text-charcoal/60 max-w-xl text-lg font-light">
            Thoughts, stories and ideas from our team about design, technology, and culture.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 border-t border-charcoal/10">
            <p className="text-charcoal/50">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[4/3] bg-charcoal/5 mb-6 overflow-hidden rounded-sm relative">
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                      No Image
                    </div>
                  )}
                </div>
                <div className="text-xs font-semibold tracking-widest uppercase text-deep-amber mb-3">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <h2 className="text-2xl font-display mb-3 group-hover:text-deep-amber transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-charcoal/60 font-light line-clamp-3">
                  {post.content.replace(/[#*`_]/g, '')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
