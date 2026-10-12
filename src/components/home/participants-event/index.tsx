import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2 } from "lucide-react";
import participantsImage from "@/src/assets/participants-event.svg";
import { FaCheck } from "react-icons/fa6";

export default function ParticipantsEvents() {
    const features = [
        "Verified Organizer Profile",
        "Professional Dashboard",
        "Event Management Tools",
        "Community Management",
        "Wallet & Revenue Tracking",
        "Advanced Analytics",
    ];

    return (
        <section className="py-20">
            <div className="custom-container mx-auto px-4 lg:px-12">
                <div className="bg-[#121212] border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
                    <div className="relative min-h-[380px] lg:min-h-[480px] w-full">
                        <Image
                            src={participantsImage}
                            alt="Porsche Track Day 2024"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121212]/90 hidden lg:block"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent lg:hidden"></div>


                        <div className="absolute bottom-6 left-6 bg-black/25 backdrop-blur border border-primary/20 p-4 rounded-xl max-w-xs ">
                            <p className="text-xs text-white/65 font-medium">Porsche Track Day 2024</p>
                            <h4 className="text-sm font-bold text-white my-0.5">247 Participants Registered</h4>
                            <p className="text-xs text-primary font-medium flex items-center gap-1">
                                <span>★</span> Verified Event
                            </p>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12 xl:p-14 flex flex-col justify-center items-start">

                        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 rounded-full px-3.5 py-1.5 mb-6">
                            <Calendar size={14} className="text-primary" />
                            <span className="text-xs tracking-wider text-primary font-semibold uppercase">
                                Event Creator Program
                            </span>
                        </div>


                        <h2 className="title font-bold text-white mb-4 leading-tight">
                            Become a Verified <br />
                            <span className="text-gradient">Event Creator</span>
                        </h2>

                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                            Create and manage automotive events, organize car meets and track days,
                            build communities, manage participants, and grow your automotive brand.
                        </p>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
                            {features.map((item, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <div className="gradient w-5 h-5 rounded-full flex items-center justify-center p-1">
                                        <FaCheck className="shrink-0 text-white/60" />
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="#">
                                <button className="gradient text-white px-6 py-3 rounded-lg font-semibold text-sm transition-transform shadow-lg shadow-[#FF2E86]/20 cursor-pointer">
                                    Apply as Event Creator
                                </button>
                            </Link>
                            <span className="text-xs sm:text-sm text-gray-400">
                                Already approved?{" "}
                                <Link href="#" className="text-primary font-semibold hover:underline cursor-pointer">
                                    Sign In
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}