import Link from "next/link"
import { Instagram, Facebook, Music2, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 md:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <span className="text-3xl font-black tracking-tight text-foreground">L4</span>
              <span className="text-lg font-bold text-muted-foreground ml-1">Club</span>
            </Link>
            <p className="text-xs text-muted-foreground mb-3">Najlepsze noce w Żorach. Od 2023 roku.</p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com/clubl4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100090955423917"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Spotify"
              >
                <Music2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Szybkie linki</h3>
            <ul className="space-y-2">
              {["Wydarzenia", "Rezerwacje", "Galeria", "O nas", "Kontakt"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Music */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Muzyka</h3>
            <ul className="space-y-2">
              {["House", "Techno", "Hip-Hop", "Disco / Retro", "R&B"].map((item) => (
                <li key={item} className="text-xs text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  Osiedle Księcia Władysława PU-1
                  <br />
                  44-240 Żory
                </span>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                <a href="tel:+48533390510" className="hover:text-foreground transition-colors">
                  +48 533 390 510
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                <a href="mailto:kontakt@l4club.pl" className="hover:text-foreground transition-colors">
                  kontakt@l4club.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} L4 Club Żory. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <Link href="/polityka-prywatnosci" className="hover:text-foreground transition-colors">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-foreground transition-colors">
              Regulamin
            </Link>
          </div>
        </div>

        {/* Made with ❤️ by Reklamour */}
        <div className="mt-6 text-center">
          <a
            href="https://reklamour.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors"
          >
            Made with ❤️ by Reklamour
          </a>
        </div>
      </div>
    </footer>
  )
}
