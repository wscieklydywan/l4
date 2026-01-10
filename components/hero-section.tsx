"use client"

import { useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Armchair, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  const handleLogoClick = useCallback(() => {
    if (!logoRef.current) return

    const rect = logoRef.current.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
      startVelocity: 25,
      gravity: 0.8,
      scalar: 0.8,
      ticks: 100,
    })
  }, [])

  useEffect(() => {
    let ticking = false
    let lastScrollY = 0

    const handleScroll = () => {
      const scrollY = window.scrollY
      if (Math.abs(scrollY - lastScrollY) < 1) return
      lastScrollY = scrollY

      if (!ticking) {
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const maxScroll = window.innerHeight
            const clampedScroll = Math.min(scrollY, maxScroll)
            parallaxRef.current.style.transform = `translate3d(0, ${clampedScroll * 0.3}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-start justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-24"
      style={{ contain: "paint" }}
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Image
          src="/dark-nightclub-interior-moody-lighting-crowd-danci.jpg"
          alt="L4 Club atmosphere"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-neon" />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] animate-pulse-neon"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 lg:gap-6 text-center">
          <div
            ref={logoRef}
            onClick={handleLogoClick}
            className="animate-float w-full flex justify-center cursor-pointer"
          >
            <Image
              src="/l4-club-logo.png"
              alt="L4 Club Logo"
              width={220}
              height={270}
              className="w-48 h-auto sm:w-44 lg:w-56"
              priority
            />
          </div>

          <div className="w-full max-w-2xl">
            <div className="flex justify-center">
              <span className="inline-block px-3 py-1.5 mb-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full bg-card/50 backdrop-blur-sm">
                Żory
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-foreground text-left sm:text-center pl-2 sm:pl-0">
              <span className="inline-flex items-baseline gap-2">
                <span>Nie musisz</span>
                <span className="inline-block h-[1.15em] md:w-[7em] md:text-left overflow-hidden leading-none">
                  <span className="sliding-words text-foreground">
                    <span className="block py-[0.1em] md:py-[0.2em]">chorować</span>
                    <span className="block py-[0.1em] md:py-[0.2em]">symulować</span>
                    <span className="block py-[0.1em] md:py-[0.2em]">kombinować</span>
                    <span className="block py-[0.1em] md:py-[0.2em]">chorować</span>
                  </span>
                </span>
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-light">
                żeby być na L4
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4">
              <div className="flex sm:hidden items-center gap-8">
                <Link href="#reservation" className="group flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl border-2 border-primary bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 overflow-hidden">
                    <Armchair className="h-7 w-7 z-10" />
                    <span className="absolute bottom-1 right-1 text-[8px] font-medium italic text-primary/80 tracking-wide rotate-[-12deg] group-hover:text-primary-foreground/60">
                      loże
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-medium">Zarezerwuj</span>
                </Link>
                <Link href="/wydarzenia" className="group flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl border-2 border-foreground/50 bg-foreground/15 text-foreground transition-all duration-300 group-hover:border-foreground/80 group-hover:bg-foreground/25 overflow-hidden">
                    <PartyPopper className="h-7 w-7 z-10" />
                    <span className="absolute bottom-1 right-1 text-[7px] font-medium italic text-foreground/60 tracking-wide rotate-[-12deg] group-hover:text-foreground/80">
                      imprezy
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-medium">Wydarzenia</span>
                </Link>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="#reservation"
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Armchair className="h-4 w-4" />
                  Zarezerwuj stolik
                </Link>
                <Link
                  href="/wydarzenia"
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/30 text-foreground font-medium text-sm transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5 backdrop-blur-sm"
                >
                  <PartyPopper className="h-4 w-4" />
                  Wydarzenia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex">
        <Link
          href="#events"
          className="flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </Link>
      </div>
    </section>
  )
}
