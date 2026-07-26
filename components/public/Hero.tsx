"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Hero as HeroType } from "@prisma/client";
import Magnetic from "./Magnetic";
import AnimatedText from "./AnimatedText";

export default function Hero({ data }: { data: HeroType | null }) {
  if (!data) return null;

  // Because videoUrl was just added to the schema, we safely extract it
  const videoUrl = (data as any).videoUrl;

  const hasMedia = !!(videoUrl || data.imageUrl);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Media */}
      {videoUrl ? (
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>
      ) : data.imageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image 
            src={data.imageUrl} 
            alt="Studio Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
      )}

      {/* Fallback abstract elements if no media is provided */}
      {!hasMedia && (
        <>
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-deep-amber/10 blur-[100px] rounded-full z-0" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-charcoal/5 blur-[100px] rounded-full z-0" />
        </>
      )}

      {/* Text Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center pt-20">
        <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.1] mb-8 font-display ${hasMedia ? 'text-off-white drop-shadow-2xl font-bold' : 'text-charcoal font-bold'}`}>
          <AnimatedText text={data.headline} />
        </h1>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 ${hasMedia ? 'text-off-white drop-shadow-lg font-medium' : 'text-charcoal/80 font-medium'}`}>
          {data.subHeadline}
        </p>
        
        <Magnetic strength={30}>
          <a 
            href={data.ctaLink}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-widest uppercase transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 shadow-xl ${hasMedia ? 'bg-off-white text-charcoal hover:bg-white' : 'bg-charcoal text-off-white hover:bg-black'}`}
          >
            {data.ctaText}
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
