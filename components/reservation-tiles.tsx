"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, Sparkles, Crown } from "lucide-react"
import { ReservationModal } from "@/components/reservation-modal"

interface ReservationTilesProps {
  variant?: "default" | "compact"
  eventDate?: string
  eventTitle?: string
}

export function ReservationTiles({ variant = "default", eventDate, eventTitle }: ReservationTilesProps) {
  const [selectedTable, setSelectedTable] = useState<"small" | "medium" | "large" | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleReserve = (tableType: "small" | "medium" | "large") => {
    setSelectedTable(tableType)
    setIsModalOpen(true)
  }

  const isCompact = variant === "compact"

  const tables = [
    {
      type: "small" as const,
      title: "Stolik",
      capacity: "2–4",
      icon: Users,
      description: "Idealne dla małej grupy znajomych",
      highlight: false,
    },
    {
      type: "medium" as const,
      title: "Loża",
      capacity: "4–8",
      icon: Sparkles,
      description: "Więcej przestrzeni i komfortu",
      highlight: true,
      badge: "Popularne",
    },
    {
      type: "large" as const,
      title: "Loża VIP",
      capacity: "8+",
      icon: Crown,
      description: "Idealne na większe imprezy",
      highlight: false,
    },
  ]

  return (
    <>
      <div
        className={`grid gap-4 sm:gap-5 ${isCompact ? "grid-cols-1 sm:grid-cols-3" : "md:grid-cols-3 gap-4 sm:gap-6"}`}
      >
        {tables.map((table) => {
          const Icon = table.icon
          return (
            <div
              key={table.type}
              className={`
                group relative overflow-hidden rounded-2xl
                transition-all duration-500 ease-out
                ${
                  table.highlight
                    ? "bg-gradient-to-br from-primary/20 via-card to-accent/10 border-2 border-primary/40 shadow-lg shadow-primary/10"
                    : "bg-card/80 border border-border/60"
                }
                ${isCompact ? "p-4 sm:p-5" : "p-5 sm:p-7"}
              `}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Popular badge */}
              {table.badge && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-b-lg">
                    {table.badge}
                  </div>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon and capacity row */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`
                      rounded-xl flex items-center justify-center
                      transition-all duration-300
                      ${table.highlight ? "bg-primary/20" : "bg-muted/50"}
                      ${isCompact ? "w-10 h-10" : "w-12 h-12 sm:w-14 sm:h-14"}
                    `}
                  >
                    <Icon
                      className={`
                        transition-all duration-300
                        ${table.highlight ? "text-primary" : "text-muted-foreground"}
                        ${isCompact ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"}
                      `}
                    />
                  </div>
                  <div className="text-right">
                    <span className={`block text-muted-foreground ${isCompact ? "text-[10px]" : "text-xs"}`}>
                      Liczba osób
                    </span>
                    <span className={`font-bold text-foreground ${isCompact ? "text-sm" : "text-base sm:text-lg"}`}>
                      {table.capacity}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-black text-foreground mb-1 ${isCompact ? "text-lg" : "text-xl sm:text-2xl"}`}>
                  {table.title}
                </h3>

                {/* Description */}
                <p className={`text-muted-foreground mb-4 ${isCompact ? "text-xs" : "text-sm"}`}>{table.description}</p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-muted-foreground ${isCompact ? "text-[10px]" : "text-xs"}`}>Cena</span>
                    <p className={`font-black text-accent ${isCompact ? "text-base" : "text-lg sm:text-xl"}`}>
                      Bezpłatnie
                    </p>
                  </div>
                  <Button
                    onClick={() => handleReserve(table.type)}
                    className={`
                      transition-all duration-300
                      ${
                        table.highlight
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-muted hover:bg-primary text-foreground hover:text-primary-foreground"
                      }
                      ${isCompact ? "h-9 px-4 text-xs" : "h-10 px-5 text-sm"}
                    `}
                  >
                    Rezerwuj
                  </Button>
                </div>
              </div>

              {/* Corner decorative element */}
              <div
                className={`
                  absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl
                  transition-opacity duration-500
                  ${table.highlight ? "bg-primary/20" : "bg-primary/10"}
                `}
              />
            </div>
          )
        })}
      </div>

      <p
        className={`text-center text-muted-foreground ${isCompact ? "mt-4 text-[10px] sm:text-xs" : "mt-6 sm:mt-8 text-xs sm:text-sm"}`}
      >
        Rezerwacja bezpłatna. Rodzaj i lokalizacja stolika przydzielane są na miejscu w zależności od dostępności.
      </p>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableType={selectedTable}
        eventDate={eventDate}
        eventTitle={eventTitle}
      />
    </>
  )
}
