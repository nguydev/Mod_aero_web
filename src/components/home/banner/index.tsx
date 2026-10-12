import Image from "next/image";
import { Download } from "lucide-react";
import bannerRight from "@/src/assets/banner-right.svg";
import backgroundImage from "@/src/assets/banner.png";

export default function Banner() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Luxury car background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]"></div>
      </div>

      <div className="custom-container mx-auto px-4 xl:px-10 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-16 lg:py-0">

        <div className="max-w-xl xl:max-w-2xl flex-1">
          <div className="inline-flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1770]"></span>
            <span className="text-xs sm:text-sm text-gray-300 font-medium">The Ultimate Automotive Platform</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white mb-6 leading-[1.1]">
            Drive <br />
            <span className="text-gradient">Beyond</span> <br />
            Limits
          </h1>

          <p className="text-gray-400 mb-10 max-w-lg text-base md:text-lg leading-relaxed">
            Manage your garage, track every drive, discover scenic routes,
            organize automotive events, build communities, and unlock
            achievements—all in one intelligent platform.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="gradient text-white px-7 py-3.5 rounded-lg font-semibold flex items-center gap-2.5 transition-transform shadow-[#FF2E86]/20 cursor-pointer">
              <Download size={18} strokeWidth={2.5} />
              Download App
            </button>
            <button className="border border-[#ff1770] text-[#ff1770] px-7 py-3.5 rounded-lg font-semibold transition-colors hover:bg-[#ff1770]/10 cursor-pointer">
              Become Event Creator
            </button>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl mt-12 lg:mt-0">
            <Image
              src={bannerRight}
              alt="Dashboard Preview"
              width={800}
              height={800}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 hidden md:flex">
        <span className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </div>
    </section>
  );
}