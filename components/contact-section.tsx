"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.668.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    content: "Osiedle Księcia Władysława PU-1",
    subcontent: "44-240 Żory",
    link: "https://www.google.com/maps/place/50.038859,18.682382/@50.038859,18.682382,18z",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+48 533 390 510",
    subcontent: "Rezerwacje i informacje",
    link: "tel:+48533390510",
  },
  {
    icon: Mail,
    title: "Email",
    content: "kontakt@l4club.pl",
    subcontent: "rezerwacje@l4club.pl",
    link: "mailto:kontakt@l4club.pl",
  },
  { icon: Clock, title: "Godziny", content: "Pt-Sob: 22:00 - 5:00", subcontent: "Sprawdź kalendarz eventów" },
]

const faqItems = [
  {
    question: "Czy trzeba rezerwować stolik?",
    answer: "Nie jest wymagane, ale zalecane - rezerwacja gwarantuje miejsce.",
  },
  { question: "Jaki jest dress code?", answer: "Smart casual. Nie wpuszczamy w dresach i sportowym obuwiu." },
  { question: "Od ilu lat można wejść?", answer: "Klub jest dostępny dla osób 18+. Wymagamy dowodu." },
  { question: "Czy jest parking?", answer: "Tak, posiadamy bezpłatny parking strzeżony." },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-primary/80 border border-primary/20 rounded-full bg-primary/5">
            Kontakt
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
            Znajdź nas
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Masz pytania? Skontaktuj się z nami lub odwiedź nas osobiście.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info & Map */}
          <div>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target={item.link?.startsWith("http") ? "_blank" : undefined}
                  rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{item.content}</p>
                      {item.subcontent && (
                        <p className="text-[10px] text-muted-foreground/70 truncate">{item.subcontent}</p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://maps.google.com/maps?ll=50.038859,18.682382&z=17&t=m&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
              />
              <a
                href="https://www.google.com/maps/place/50.038859,18.682382/@50.038859,18.682382,18z"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="relative pointer-events-auto cursor-pointer group">
                  <svg
                    viewBox="0 0 40 50"
                    className="w-8 h-10 md:w-10 md:h-12 drop-shadow-lg transform group-hover:scale-110 transition-transform"
                  >
                    <path
                      d="M20 0C8.954 0 0 8.954 0 20c0 14 20 30 20 30s20-16 20-30C40 8.954 31.046 0 20 0z"
                      fill="#e91e63"
                    />
                    <circle cx="20" cy="18" r="8" fill="white" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] hover:opacity-90 text-white border-0 text-xs"
                asChild
              >
                <a href="https://instagram.com/clubl4" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="mr-1.5 h-3.5 w-3.5" />
                  Instagram
                </a>
              </Button>
              <Button size="sm" className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0 text-xs" asChild>
                <a
                  href="https://www.facebook.com/profile.php?id=100090955423917"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="mr-1.5 h-3.5 w-3.5" />
                  Facebook
                </a>
              </Button>
              <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white border-0 text-xs" asChild>
                <a href="https://wa.me/48533390510" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-1.5 h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">?</span>
              Najczęściej zadawane pytania
            </h3>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.question}</h4>
                  <p className="text-xs text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Quick contact CTA */}
            <div className="mt-6 p-4 bg-card rounded-lg border border-primary/20">
              <h3 className="text-base font-bold text-foreground mb-1">Masz inne pytanie?</h3>
              <p className="text-xs text-muted-foreground mb-3">Napisz do nas, odpowiemy najszybciej jak to możliwe.</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs" asChild>
                <a href="mailto:kontakt@l4club.pl">
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  Napisz do nas
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
