import Link from "next/link";
import Title from "@/components/reuseable/title";

export default function ReadyToExperienceSection() {
    return (
        <section className="bg-gradient-to-b from-[#FF2E861F] to-transparent py-20 border-b-2 border-primary/10">
            <div className="relative overflow-hidden py-16">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                <div className="custom-container mx-auto px-4 lg:px-12 relative z-10 flex flex-col items-center text-center">

                    <Title
                        title={"Ready to Experience the\nFuture of Automotive\nCommunities?"}
                        highlight="Future of Automotive"
                        titleClass="title font-bold text-white mb-6 leading-tight whitespace-pre-line text-center max-w-4xl mx-auto"
                        highlightClass="text-gradient"
                        description="Download Velocity today or become a verified Event Creator. Join 100,000+ drivers already living the velocity life."
                        descriptionClass="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
                        className="text-center"
                    />

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="#">
                            <button className="gradient text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-transform shadow-lg shadow-[#FF2E86]/20 cursor-pointer">
                                Download App
                            </button>
                        </Link>
                        <Link href="#">
                            <button className="border border-primary text-primary px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors hover:bg-primary/10 cursor-pointer">
                                Become Event Creator
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}