"use client";

import { SiteSettings } from "@prisma/client";

export default function Footer({ data }: { data: SiteSettings | null }) {
  if (!data) return null;

  return (
    <footer className="bg-charcoal text-off-white pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-24">
          
          {/* Main Footer Headline */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6 md:mb-8 leading-[1.1]">
              Let's craft <br className="hidden md:block"/> something unique.
            </h2>
            <a 
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-3 text-lg md:text-xl border-b border-off-white/30 pb-2 hover:border-off-white hover:text-deep-amber transition-colors duration-300 w-fit"
            >
              Start a project
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Contact & Links */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-10 md:gap-0">
            <div>
              <h4 className="text-off-white/50 text-xs md:text-sm tracking-widest uppercase font-semibold mb-4 md:mb-6">Contact</h4>
              <ul className="space-y-3 md:space-y-4 font-light text-off-white/80 text-sm md:text-base">
                <li>
                  <a href={`mailto:${data.email}`} className="hover:text-deep-amber transition-colors">
                    {data.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${data.phone}`} className="hover:text-deep-amber transition-colors">
                    {data.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:mt-12">
              <h4 className="text-off-white/50 text-xs md:text-sm tracking-widest uppercase font-semibold mb-4 md:mb-6">Links</h4>
              <ul className="space-y-3 md:space-y-4 font-light text-off-white/80 text-sm md:text-base">
                <li>
                  <a href="/blog" className="hover:text-deep-amber transition-colors">
                    Insights & News
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Location & Social */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-10 md:gap-0">
            <div>
              <h4 className="text-off-white/50 text-xs md:text-sm tracking-widest uppercase font-semibold mb-4 md:mb-6">Location</h4>
              <p className="font-light text-off-white/80 text-sm md:text-base max-w-[200px]">
                {data.address}
              </p>
            </div>
            
            <div className="md:mt-12">
              <h4 className="text-off-white/50 text-xs md:text-sm tracking-widest uppercase font-semibold mb-4 md:mb-6">Social</h4>
              <ul className="flex flex-col md:flex-row gap-3 md:gap-6 font-light text-off-white/80 text-sm md:text-base">
                {data.instagram && (
                  <li>
                    <a href={data.instagram} target="_blank" rel="noreferrer" className="hover:text-deep-amber transition-colors">
                      Instagram
                    </a>
                  </li>
                )}
                {data.twitter && (
                  <li>
                    <a href={data.twitter} target="_blank" rel="noreferrer" className="hover:text-deep-amber transition-colors">
                      Twitter
                    </a>
                  </li>
                )}
                {data.linkedin && (
                  <li>
                    <a href={data.linkedin} target="_blank" rel="noreferrer" className="hover:text-deep-amber transition-colors">
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-off-white/10 text-off-white/40 text-xs md:text-sm font-light text-center md:text-left gap-4 md:gap-0">
          <p>&copy; {new Date().getFullYear()} {data.studioName}. All rights reserved.</p>
          <p>Premium Design Agency</p>
        </div>
      </div>
    </footer>
  );
}
