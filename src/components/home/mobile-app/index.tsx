import Image from "next/image";
import Title from "@/components/reuseable/title";
import mobileAppImage from "@/src/assets/mobile-app.svg";
import appStoreBadge from "@/src/assets/app-store.svg";
import googlePlayBadge from "@/src/assets/play-store.svg";
import Link from "next/link";

export default function MobileAppSection() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="custom-container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                <div className="flex-1 w-full flex justify-center lg:justify-start relative">
                    <div className="relative w-full max-w-md lg:max-w-xl">
                        <Image
                            src={mobileAppImage}
                            alt="Velocity Mobile App Mockup"
                            width={700}
                            height={700}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col items-start">
                    <Title
                        tag="MOBILE APP"
                        tagClass="text-[#ff1770] text-sm font-semibold tracking-widest uppercase mb-4"
                        title={"Take Velocity\nEverywhere"}
                        highlight="Everywhere"
                        titleClass="title font-bold text-white mb-6 leading-tight whitespace-pre-line text-left"
                        highlightClass="text-gradient"
                        className="text-left"
                    />

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                        Download the app and enjoy your automotive companion wherever you drive.
                        Real-time tracking, live community, and instant event access in your pocket.
                    </p>

                    {/* Download Badges */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="#">
                            <button
                                className="bg-[#121212] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 px-5 py-3 rounded-xl flex items-center gap-3.5 shadow-lg group cursor-pointer"
                            >
                                <Image
                                    src={appStoreBadge}
                                    alt="App Store"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-gray-400 font-medium leading-tight">
                                        Download on the
                                    </span>
                                    <span className="text-sm text-white font-semibold leading-tight group-hover:text-[#ff1770] transition-colors">
                                        App Store
                                    </span>
                                </div>
                            </button>
                        </Link>

                        <Link href="#">
                            <button
                                className="bg-[#121212] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 px-5 py-3 rounded-xl flex items-center gap-3.5 shadow-lg group cursor-pointer"
                            >
                                <Image
                                    src={googlePlayBadge}
                                    alt="Google Play"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-gray-400 font-medium leading-tight">
                                        Get it on
                                    </span>
                                    <span className="text-sm text-white font-semibold leading-tight group-hover:text-[#ff1770] transition-colors">
                                        Google Play
                                    </span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}