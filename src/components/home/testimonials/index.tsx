"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Title from "@/components/reuseable/title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "./data";

export default function Testimonials() {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="py-24 bg-[#0a0a0a]">
            <div className="custom-container mx-auto px-4 lg:px-12">
                <div className="relative mb-14">
                    <Title
                        tag="TESTIMONIALS"
                        tagClass="text-[#ff1770] text-sm font-semibold tracking-widest uppercase mb-4"
                        title={"Drivers Love\nVelocity"}
                        highlight="Drivers Love"
                        titleClass="title font-bold text-white mb-2 leading-tight whitespace-pre-line"
                        highlightClass="text-gradient"
                        className="text-center"
                    />

                    {/* Custom Left / Right Arrow Navigation */}
                    <div className="flex items-center gap-3 absolute right-0 bottom-0 hidden sm:flex">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous Slide"
                            className="w-10 h-10 rounded-full border border-white/10 bg-[#121212] hover:bg-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer group"
                        >
                            <ChevronLeft size={18} className="transition-colors group-hover:text-primary" />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next Slide"
                            className="w-10 h-10 rounded-full border border-white/10 bg-[#121212] hover:bg-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer group"
                        >
                            <ChevronRight size={18} className="transition-colors group-hover:text-primary" />
                        </button>
                    </div>
                </div>

                {/* Testimonials Slider */}
                <div className="-mx-3">
                    <Slider ref={sliderRef} {...settings}>
                        {testimonials.map((item) => (
                            <div key={item.id} className="px-3">
                                <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[260px] h-full shadow-xl transition-all duration-300 hover:border-white/10">
                                    <div>
                                        <div className="flex items-center gap-1 mb-5">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="fill-[#f59e0b] text-[#f59e0b]"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 text-sm italic leading-relaxed mb-6">
                                            {item.quote}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                                        <div className="w-10 h-10 rounded-full gradient flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                                            {item.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-white text-sm font-bold leading-snug">
                                                {item.name}
                                            </h4>
                                            <p className="text-gray-400 text-xs font-medium">
                                                {item.car}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="flex items-center justify-center gap-4 mt-8 sm:hidden">
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        aria-label="Previous Slide"
                        className="w-10 h-10 rounded-full border border-white/10 bg-[#121212] hover:bg-white/10 hover:border-primary/50 text-white flex items-center justify-center cursor-pointer group"
                    >
                        <ChevronLeft size={18} className="transition-colors group-hover:text-primary" />
                    </button>
                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        aria-label="Next Slide"
                        className="w-10 h-10 rounded-full border border-white/10 bg-[#121212] hover:bg-white/10 hover:border-primary/50 text-white flex items-center justify-center cursor-pointer group"
                    >
                        <ChevronRight size={18} className="transition-colors group-hover:text-primary" />
                    </button>
                </div>
            </div>
        </section>
    );
}