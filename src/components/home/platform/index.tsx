import { Car, Activity, Users, Calendar } from "lucide-react";
import Title from "@/components/reuseable/title";

export default function PlatformSection() {
  const cards = [
    {
      title: "Smart Garage",
      description: "Manage unlimited vehicles, maintenance history, modifications, galleries, and AI-powered insights.",
      icon: <Car size={20} className="text-white" strokeWidth={2.5} />,
    },
    {
      title: "Drive Experience",
      description: "Track every drive, record GPS routes, discover scenic roads, and plan convoys with friends.",
      icon: <Activity size={20} className="text-white" strokeWidth={2.5} />,
    },
    {
      title: "Community",
      description: "Join automotive groups, share builds, connect with enthusiasts, and participate in automotive events.",
      icon: <Users size={20} className="text-white" strokeWidth={2.5} />,
    },
    {
      title: "Event Management",
      description: "Verified organizers can create events, manage participants, monitor registrations, and track revenue.",
      icon: <Calendar size={20} className="text-white" strokeWidth={2.5} />,
    },
  ];

  const stats = [
    { value: "100K+", label: "Drivers" },
    { value: "15K+", label: "Vehicles" },
    { value: "5K+", label: "Communities" },
    { value: "2K+", label: "Events" },
    { value: "95%", label: "User Satisfaction" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-24">
      <div className="custom-container mx-auto px-4 lg:px-10">
        <Title
          tag="PLATFORM"
          tagClass="text-[#ff1770] text-sm font-semibold tracking-widest uppercase mb-4"
          title={"Drive Further\nEverything You Need to"}
          highlight="Drive Further"
          titleClass="title font-bold text-white mb-2 leading-tight whitespace-pre-line"
          highlightClass="text-gradient"
          className="text-center mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#121212] border border-white/5 p-8 rounded-2xl transition-all duration-300 hover:border-white/10 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl gradient flex items-center justify-center mb-6 shadow-md shadow-[#FF2E86]/20">
                {card.icon}
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative py-12">
        {/* Top Fading Border Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff1770]/30 to-transparent"></div>

        <div className="custom-container mx-auto px-4 lg:px-10">
          <div className="bg-[#121212] border border-[#ff1770]/20 rounded-2xl py-10 px-6 sm:px-10 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 items-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-center flex flex-col items-center justify-center">
                  <h4 className="text-4xl md:text-[46px] font-extrabold text-gradient leading-tight mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff1770]/30 to-transparent"></div>
      </div>
    </section>
  );
}