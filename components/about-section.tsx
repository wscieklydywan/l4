import Image from "next/image"
import { Music, Users, Star, Clock } from "lucide-react"

const features = [
  { icon: Music, title: "Muzyka", description: "House, Techno, Hip-Hop, Disco, R&B" },
  { icon: Users, title: "Atmosfera", description: "Fantastyczna publiczność i energia" },
  { icon: Star, title: "DJ-e", description: "Najlepsi DJ-e z regionu i Polski" },
  { icon: Clock, title: "Godziny", description: "Pt-Sob: 22:00 - 5:00" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-card relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/modern-nightclub-interior-dark-ambient.jpg"
                alt="Wnętrze klubu L4"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-background border border-border rounded-lg p-4 sm:p-5 shadow-lg max-w-[160px]">
              <div className="text-3xl font-bold text-primary mb-1">100+</div>
              <p className="text-xs text-muted-foreground">Imprez za nami</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-accent/80 border border-accent/20 rounded-full bg-accent/5">
              O nas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-5 text-foreground">
              Więcej niż klub
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              <strong className="text-foreground">L4 Club</strong> to kultowe miejsce na mapie nocnej rozrywki w Żorach.
              Tworzymy niezapomniane noce pełne energii i dobrej muzyki.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-6">
              Nasz klub to połączenie nowoczesnego designu i najlepszego nagłośnienia w regionie.
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Dress Code & Zasady
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wiek:</span>
                  <span className="text-foreground font-medium">18+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Płatności:</span>
                  <span className="text-foreground font-medium">Gotówka / Karta</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dress code:</span>
                  <span className="text-foreground font-medium">Smart casual</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Selekcja:</span>
                  <span className="text-foreground font-medium">Tak</span>
                </div>
              </div>
              <p className="text-xs text-primary/80 mt-3">Rezerwacja = gwarantowane wejście</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
