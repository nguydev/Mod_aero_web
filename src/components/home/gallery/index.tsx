import Image from "next/image";
import gallery1 from "@/src/assets/gallery-1.svg";
import gallery2 from "@/src/assets/gallery-2.svg";
import gallery3 from "@/src/assets/gallery-3.svg";
import gallery4 from "@/src/assets/gallery-4.svg";
import gallery5 from "@/src/assets/gallery-5.svg";
import gallery6 from "@/src/assets/gallery-6.svg";
import Title from "@/components/reuseable/title";

export default function GallerySection() {
    const galleryImages = [
        { src: gallery1, alt: "Gallery Image 1" },
        { src: gallery2, alt: "Gallery Image 2" },
        { src: gallery3, alt: "Gallery Image 3" },
        { src: gallery4, alt: "Gallery Image 4" },
        { src: gallery5, alt: "Gallery Image 5" },
        { src: gallery6, alt: "Gallery Image 6" },
    ];

    return (
        <section className="py-24">
            <div className="custom-container mx-auto px-4 lg:px-12">
                <Title
                    tag="COMMUNITY"
                    tagClass="text-primary text-sm font-semibold tracking-widest uppercase mb-4"
                    title={"The Velocity\nGallery"}
                    highlight="Gallery"
                    titleClass="title font-bold text-white mb-12 leading-tight whitespace-pre-line"
                    highlightClass="text-gradient"
                    className="text-center"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative overflow-hidden rounded-2xl border border-white/5 shadow-xl group"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={500}
                                height={320}
                                className="w-full h-[240px] md:h-[260px] object-cover rounded-2xl transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}