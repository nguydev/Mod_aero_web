"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Title from "@/components/reuseable/title";
import { faqData } from "./data";

export default function FAQSection() {
    const [openId, setOpenId] = useState<string | null>("1");

    const toggleFAQ = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="py-24">
            <div className="custom-container mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                    <Title
                        tag="FAQ"
                        tagClass="text-primary text-sm font-semibold tracking-widest uppercase mb-4"
                        title={"Common\nQuestions"}
                        highlight="Questions"
                        titleClass="title font-bold text-white mb-6 leading-tight whitespace-pre-line text-left"
                        highlightClass="text-gradient"
                        description="Everything you need to know about Velocity. Can't find your answer? Reach out to our support team anytime."
                        descriptionClass="text-white/60 text-base md:text-lg leading-relaxed max-w-md"
                        className="text-left"
                    />
                </div>

                <div className="space-y-4 w-full">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`bg-[#121212] rounded-xl transition-all duration-300 overflow-hidden border ${isOpen
                                    ? "border-primary/40 shadow-lg shadow-primary/5"
                                    : "border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(item.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer gap-4"
                                >
                                    <span className="text-white font-semibold text-base md:text-lg">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-primary transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6 pt-1 text-white/60 text-sm md:text-base leading-relaxed border-t border-white/5">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}