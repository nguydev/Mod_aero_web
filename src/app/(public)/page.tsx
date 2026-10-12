import Banner from "@/components/home/banner";
import FAQSection from "@/components/home/faq";
import FeaturesSection from "@/components/home/features";
import GallerySection from "@/components/home/gallery";
import MobileAppSection from "@/components/home/mobile-app";
import ParticipantsEvents from "@/components/home/participants-event";
import PlatformSection from "@/components/home/platform";
import ReadyToExperienceSection from "@/components/home/ready-to-experience";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <Banner />
      <PlatformSection />
      <FeaturesSection />
      <MobileAppSection />
      <ParticipantsEvents />
      <GallerySection />
      <Testimonials />
      <FAQSection />
      <ReadyToExperienceSection />
    </div>
  );
}
