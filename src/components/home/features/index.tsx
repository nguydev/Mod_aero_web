import Image from "next/image";
import Title from "@/components/reuseable/title";
import { featuresData } from "./data";

export default function FeaturesSection() {
    return (
        <section className="py-24">
            <div className="custom-container mx-auto px-4 lg:px-12">

                <Title
                    tag="FEATURES"
                    tagClass="text-[#ff1770] text-sm font-semibold tracking-widest uppercase mb-4"
                    title={"Built for the\nPassionate Driver"}
                    highlight="Built for the"
                    titleClass="title font-bold text-white mb-2 leading-tight whitespace-pre-line"
                    highlightClass="text-gradient"
                    className="text-center mb-20"
                />

                <div className="space-y-20 lg:space-y-28">
                    {featuresData.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
                            >
                                <div
                                    className={`w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/5 ${item.imageLeft ? "lg:order-1" : "lg:order-2"
                                        }`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.imageAlt}
                                        width={700}
                                        height={450}
                                        className="w-full h-auto object-cover rounded-2xl transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-[#121212]/10 border border-white/10 backdrop-blur px-3.5 py-1.5 rounded-lg text-sm text-white font-semibold">
                                        {item.overlayLabel}
                                    </div>
                                </div>

                                <div
                                    className={`w-full lg:w-1/2 flex flex-col items-start ${item.imageLeft ? "lg:order-2" : "lg:order-1"
                                        }`}
                                >
                                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-6">
                                        <IconComponent size={14} className="text-[#ff1770]" />
                                        <span className="text-xs tracking-wider text-white/50 font-medium uppercase">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
                                        {item.title}
                                    </h3>

                                    <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}