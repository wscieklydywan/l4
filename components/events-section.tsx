"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Music, Ticket, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { events } from "@/lib/events-data"

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.toLocaleDateString("pl-PL", { month: "short" }).toUpperCase()
  const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" })
  return { day, month, weekday }
}

export function EventsSection() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  return (
    <section id="events" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-primary/80 border border-primary/20 rounded-full bg-primary/5">
            Nadchodzące wydarzenia
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
            Co się dzieje?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Sprawdź nasze nadchodzące imprezy i zarezerwuj swoje miejsce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {events.map((event) => {
            const { day, month, weekday } = formatDate(event.date)
            return (
              <Link
                href={`/wydarzenia?event=${event.id}`}
                key={event.id}
                className={cn(
                  "group relative rounded-lg overflow-hidden bg-card/80 border border-border/60 transition-all duration-300 hover:bg-card block",
                  hoveredEvent === event.id && "border-primary/50",
                )}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Image */}
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-background backdrop-blur-sm rounded-lg p-2.5 text-center min-w-[60px] border border-border/40">
                    <div className="text-xl font-bold text-primary">{day}</div>
                    <div className="text-[10px] uppercase text-foreground/70">{month}</div>
                    <div className="text-[9px] uppercase text-foreground/60">{weekday}</div>
                  </div>

                  {/* Featured badge */}
                  {event.featured && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px]">Hot</Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-border/80 text-foreground/80 text-[10px]">
                      <Music className="w-3 h-3 mr-1" />
                      {event.genre}
                    </Badge>
                    <span className="text-xs text-foreground/70 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-foreground/70 mb-1">{event.dj}</p>
                  <p className="text-xs text-foreground/60 mb-3 line-clamp-2">{event.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{event.price}</span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs pointer-events-none"
                    >
                      <Ticket className="w-3.5 h-3.5 mr-1.5" />
                      Zobacz więcej
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/wydarzenia">
              <Calendar className="mr-2 h-4 w-4" />
              Zobacz pełny kalendarz
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
