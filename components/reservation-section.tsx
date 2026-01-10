"use client"

import { ReservationTiles } from "@/components/reservation-tiles"

export function ReservationSection() {
  return (
    <section id="reservation" className="py-16 md:py-24 bg-card relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-accent/80 border border-accent/20 rounded-full bg-accent/5">
            Rezerwacje
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-foreground">
            Zarezerwuj stolik
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Wybierz wielkość stolika i wypełnij krótki formularz. Rezerwacja jest bezpłatna.
          </p>
        </div>

        <ReservationTiles variant="compact" />
      </div>
    </section>
  )
}
