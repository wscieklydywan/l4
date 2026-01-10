import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ReservationSection } from "@/components/reservation-section"
import { GallerySection } from "@/components/gallery-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <EventsSection />
      <ReservationSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
