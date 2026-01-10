"use client"

import { useState, useMemo, useEffect, Suspense, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Music,
  Ticket,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Gift,
  Users,
  Timer,
  Share2,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { ReservationSection } from "@/components/reservation-section"

const allEvents = [
  {
    id: 1,
    title: "TECHNO NIGHT",
    date: "2026-01-10",
    time: "22:00",
    dj: "DJ Matrix",
    genre: "Techno",
    description:
      "Zanurz się w hipnotycznych bitach i pulsującej energii! DJ Matrix zabierze Cię w podróż przez najlepsze techno brzmienia prosto z Berlina. Spodziewaj się ciężkich basów, laserów i niezapomnianej atmosfery.",
    promo: "Wejście do 23:00 tylko 20 PLN! Drink powitalny gratis dla pierwszych 50 osób.",
    image: "/techno-dj-performing-dark-club.jpg",
    price: "30 PLN",
    featured: true,
  },
  {
    id: 2,
    title: "HOUSE VIBES",
    date: "2026-01-17",
    time: "22:00",
    dj: "Anna K",
    genre: "House",
    description:
      "Głęboki house i progresywne brzmienia w wykonaniu najlepszej DJ-ki w regionie. Anna K tworzy niepowtarzalne sety, które rozgrzeją każdy parkiet. Klimat Ibizy w sercu Śląska!",
    promo: "2 drinki w cenie 1 do północy. Rezerwacja stolika = butelka prosecco gratis!",
    image: "/house-music-party-dancing-crowd.jpg",
    price: "25 PLN",
    featured: false,
  },
  {
    id: 3,
    title: "HIP-HOP EDITION",
    date: "2026-01-24",
    time: "21:00",
    dj: "MC Flow & DJ Beats",
    genre: "Hip-Hop",
    description:
      "Najgorętsze bity i rap na żywo! MC Flow wystąpi z ekskluzywnym showcase'em, a DJ Beats zaserwuje klasyki i najnowsze hity. Od Kendricka po polską scenę - będzie się działo!",
    promo: "VIP pakiet: stolik + 2 butelki + wejście dla 6 osób = 800 PLN. Early bird bilet: 25 PLN do 20 stycznia!",
    image: "/hip-hop-party-dj-booth.jpg",
    price: "35 PLN",
    featured: true,
  },
  {
    id: 4,
    title: "RETRO PARTY",
    date: "2026-01-31",
    time: "21:00",
    dj: "DJ Classic",
    genre: "Retro/Disco",
    description:
      "Powrót do złotej ery muzyki! Disco polo, Eurodance, hity lat 80. i 90. - wszystko czego potrzebujesz na szaloną sobotę. Dress code: im bardziej retro, tym lepiej!",
    promo: "Najlepszy retro outfit wygrywa VIP stolik na następną imprezę! Wejście w przebraniu: -10 PLN.",
    image: "/retro-disco-party-colorful-lights.jpg",
    price: "20 PLN",
    featured: false,
  },
  {
    id: 5,
    title: "DRUM & BASS MADNESS",
    date: "2026-02-07",
    time: "22:00",
    dj: "BassHunter",
    genre: "Drum & Bass",
    description:
      "170+ BPM, ciężkie basy i energia, która wyrwie Cię z butów! BassHunter wraca do L4 z nowym materiałem. System nagłośnienia na full - przygotuj się na trzęsienie ziemi.",
    promo:
      "Przedsprzedaż online: 25 PLN (ilość ograniczona). Meet & greet z DJ-em dla pierwszych 20 osób z biletem VIP!",
    image: "/drum-and-bass-party-dark-club.jpg",
    price: "30 PLN",
    featured: true,
  },
  {
    id: 6,
    title: "LATINO FEVER",
    date: "2026-02-14",
    time: "21:00",
    dj: "DJ Fuego",
    genre: "Latino",
    description:
      "Walentynkowa noc w gorących rytmach reggaeton, salsy i bachaty! Przyjdź z drugą połówką lub znajdź ją na parkiecie. DJ Fuego prosto z Barcelony rozgrzeje atmosferę do czerwoności!",
    promo: "Pary: 2 bilety + butelka wina = 70 PLN. Darmowa lekcja salsy o 20:00 dla wszystkich z biletem!",
    image: "/latino-party-dancing-couple.jpg",
    price: "25 PLN",
    featured: false,
  },
  {
    id: 7,
    title: "ELECTRONIC DREAMS",
    date: "2026-02-21",
    time: "22:00",
    dj: "Synthwave",
    genre: "Electronic",
    description:
      "Podróż przez elektroniczne brzmienia - od synthwave przez trance po melodic techno. Specjalne efekty wizualne, mapping 3D i atmosfera rodem z Blade Runnera.",
    promo: "Bilet + oficjalna koszulka eventu = 50 PLN. Tylko 100 sztuk dostępnych!",
    image: "/electronic-music-synth-party.jpg",
    price: "30 PLN",
    featured: false,
  },
  {
    id: 8,
    title: "ROCK THE CLUB",
    date: "2026-02-28",
    time: "21:00",
    dj: "Live Band: The Voltage",
    genre: "Rock",
    description:
      "Wyjątkowa noc z muzyką rockową NA ŻYWO! The Voltage zagrają covery legend rocka + własny materiał. Od AC/DC przez Guns N' Roses po Foo Fighters - będzie głośno!",
    promo: "Pakiet rockowy: bilet + shot + pizza = 55 PLN. Backstage pass dla 10 szczęściarzy - losowanie na miejscu!",
    image: "/rock-concert-live-band-dark-venue.jpg",
    price: "40 PLN",
    featured: true,
  },
]

// Helper functions
const getMonthName = (month: number): string => {
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ]
  return months[month]
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number): number => {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

const isToday = (year: number, month: number, day: number): boolean => {
  const today = new Date()
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
}

function CountdownTimer({ targetDate, eventTitle }: { targetDate: string; eventTitle: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const target = new Date(targetDate + "T22:00:00")
      const difference = target.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">Najbliższe wydarzenie:</span>
        <span className="text-sm font-bold text-foreground">{eventTitle}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {[
          { value: timeLeft.days, label: "dni" },
          { value: timeLeft.hours, label: "godz" },
          { value: timeLeft.minutes, label: "min" },
          { value: timeLeft.seconds, label: "sek" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="bg-card border border-border rounded-lg p-2 sm:p-3">
              <span className="text-xl sm:text-3xl font-black text-foreground tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1 block">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EventsContent() {
  const searchParams = useSearchParams()
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<(typeof allEvents)[0] | null>(null)
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const eventCardRef = useRef<HTMLDivElement>(null)

  const nextEvent = useMemo(() => {
    const now = new Date()
    const upcomingEvents = allEvents
      .filter((event) => new Date(event.date + "T22:00:00") > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return upcomingEvents[0] || null
  }, [])

  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return allEvents
      .filter((event) => new Date(event.date + "T23:59:59") >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4)
  }, [])

  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof allEvents> = {}
    allEvents.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = []
      }
      map[event.date].push(event)
    })
    return map
  }, [])

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      return event.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`)
    })
  }, [currentYear, currentMonth])

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const weekdays = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"]

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDayClick = (dateKey: string) => {
    const events = eventsByDate[dateKey]
    if (events && events.length > 0) {
      setIsCardVisible(false)
      setTimeout(() => {
        setSelectedEvent(events[0])
        setIsCardVisible(true)
        setTimeout(() => {
          if (eventCardRef.current) {
            const elementPosition = eventCardRef.current.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: elementPosition - 80,
              behavior: "smooth",
            })
          }
        }, 100)
      }, 50)
    }
  }

  const handleShare = async (event: (typeof allEvents)[0]) => {
    const url = `${window.location.origin}/wydarzenia?event=${event.id}`
    const shareData = {
      title: `${event.title} - L4 Club`,
      text: `${event.title} | ${event.dj} | ${new Date(event.date).toLocaleDateString("pl-PL", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })} o ${event.time}`,
      url: url,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-background pointer-events-none" />

      <main className="min-h-screen bg-background relative">
        <section className="pt-20 pb-6 md:pt-24 md:pb-8 relative overflow-hidden">
          <div className="absolute inset-0 top-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/2 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Powrót do strony głównej
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-primary/80 border border-primary/20 rounded-full bg-primary/5">
                  Kalendarz imprez
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
                  Wydarzenia
                </h1>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Kliknij w dzień z imprezą, aby zobaczyć szczegóły i kupić bilet.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>L4 Club, Żory</span>
              </div>
            </div>

            {nextEvent && (
              <div className="mt-8">
                <CountdownTimer targetDate={nextEvent.date} eventTitle={nextEvent.title} />
              </div>
            )}
          </div>
        </section>

        <section className="pt-4 pb-8 md:pt-6 md:pb-12">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6 h-fit">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={goToPrevMonth}
                    className="p-2 rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold text-foreground">
                    {getMonthName(currentMonth)} {currentYear}
                  </h2>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekdays.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateKey = formatDateKey(currentYear, currentMonth, day)
                    const hasEvents = eventsByDate[dateKey]?.length > 0
                    const event = eventsByDate[dateKey]?.[0]
                    const isSelected = selectedEvent?.date === dateKey
                    const isTodayDate = isToday(currentYear, currentMonth, day)

                    return (
                      <button
                        key={day}
                        onClick={() => hasEvents && handleDayClick(dateKey)}
                        className={cn(
                          "aspect-square rounded-lg relative overflow-hidden transition-all",
                          hasEvents ? "cursor-pointer hover:scale-105" : "cursor-default",
                          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                          isTodayDate && !isSelected && "ring-2 ring-accent ring-offset-1 ring-offset-background",
                        )}
                      >
                        {hasEvents && event ? (
                          <>
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                              {day}
                            </span>
                            {eventsByDate[dateKey].length > 1 && (
                              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                                {eventsByDate[dateKey].length}
                              </span>
                            )}
                            {isTodayDate && (
                              <span className="absolute top-1 left-1 px-1 py-0.5 bg-accent text-accent-foreground text-[8px] font-bold rounded">
                                Dziś
                              </span>
                            )}
                          </>
                        ) : (
                          <div
                            className={cn(
                              "w-full h-full flex items-center justify-center text-sm bg-muted/30",
                              isTodayDate ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground/60",
                            )}
                          >
                            {day}
                            {isTodayDate && <span className="absolute bottom-1 text-[8px] text-accent">Dziś</span>}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Dni z grafiką = impreza. Kliknij aby zobaczyć szczegóły.
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                {selectedEvent && (
                  <div
                    className={cn(
                      "w-full max-w-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300",
                      isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    )}
                    ref={eventCardRef}
                  >
                    <div className="relative h-48 sm:h-64">
                      <Image
                        src={selectedEvent.image || "/placeholder.svg"}
                        alt={selectedEvent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleShare(selectedEvent)}
                          className="p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                          title="Udostępnij wydarzenie"
                        >
                          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => {
                            setIsCardVisible(false)
                            setTimeout(() => setSelectedEvent(null), 200)
                          }}
                          className="p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {selectedEvent.featured && (
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Gorący event</Badge>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          <Music className="w-3 h-3 mr-1" />
                          {selectedEvent.genre}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Start: {selectedEvent.time}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(selectedEvent.date).toLocaleDateString("pl-PL", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2">{selectedEvent.title}</h2>
                      <p className="text-primary font-medium mb-4 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {selectedEvent.dj}
                      </p>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        {selectedEvent.description}
                      </p>

                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1">
                              Promocja
                            </h4>
                            <p className="text-[13px] sm:text-sm text-muted-foreground">{selectedEvent.promo}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Cena biletu</p>
                          <p className="text-2xl sm:text-3xl font-bold text-accent">{selectedEvent.price}</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                          <Button
                            size="lg"
                            variant="ghost"
                            className="flex-1 sm:flex-initial border border-border hover:bg-primary hover:text-primary-foreground"
                            style={{ backgroundColor: "#1b1f27" }}
                            asChild
                          >
                            <Link href="/#reservation">Rezerwuj stolik</Link>
                          </Button>
                          <Button
                            size="lg"
                            className="flex-1 sm:flex-initial bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Ticket className="w-4 h-4 mr-2" />
                            Kup bilet
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={cn("flex flex-col", selectedEvent ? "mt-6" : "h-full")}>
                  <h2 className={cn("font-bold text-foreground mb-4", selectedEvent ? "text-base" : "text-xl mb-6")}>
                    {selectedEvent ? "Więcej wydarzeń" : "Najbliższe wydarzenia"}
                  </h2>

                  {(selectedEvent ? filteredEvents : upcomingEvents).length === 0 ? (
                    <div className="flex-1 flex items-center justify-center bg-card border border-border rounded-xl py-16">
                      <div className="text-center">
                        <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Brak wydarzeń</h3>
                        <p className="text-muted-foreground text-sm">Nie ma zaplanowanych imprez.</p>
                      </div>
                    </div>
                  ) : (
                    <div className={cn("space-y-3", selectedEvent && "space-y-2")}>
                      {(selectedEvent ? filteredEvents : upcomingEvents)
                        .filter((event) => !selectedEvent || event.id !== selectedEvent.id)
                        .map((event) => {
                          const eventDate = new Date(event.date)
                          return (
                            <button
                              key={event.id}
                              onClick={() => {
                                setIsCardVisible(false)
                                setTimeout(() => {
                                  setSelectedEvent(event)
                                  setIsCardVisible(true)
                                  // Scroll do góry karty z offsetem na navbar
                                  setTimeout(() => {
                                    if (eventCardRef.current) {
                                      const elementPosition =
                                        eventCardRef.current.getBoundingClientRect().top + window.scrollY
                                      window.scrollTo({
                                        top: elementPosition - 80,
                                        behavior: "smooth",
                                      })
                                    }
                                  }, 100)
                                }, 50)
                              }}
                              className={cn(
                                "w-full group flex items-center gap-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-left",
                                selectedEvent ? "p-3 gap-3" : "p-4",
                              )}
                            >
                              <div
                                className={cn(
                                  "relative rounded-lg overflow-hidden flex-shrink-0",
                                  selectedEvent ? "w-12 h-12" : "w-16 h-16",
                                )}
                              >
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={cn("font-bold text-primary", selectedEvent ? "text-xl" : "text-2xl")}
                                  >
                                    {eventDate.getDate()}
                                    {selectedEvent && (
                                      <> {eventDate.toLocaleDateString("pl-PL", { month: "short" }).replace(".", "")}</>
                                    )}
                                  </span>
                                  <span className="text-xs text-muted-foreground uppercase">
                                    {eventDate.toLocaleDateString("pl-PL", { weekday: "short" })}
                                  </span>
                                  {event.featured && (
                                    <Badge className="bg-accent/10 text-accent text-[10px] border-0">Hot</Badge>
                                  )}
                                </div>
                                <h3
                                  className={cn(
                                    "font-bold text-foreground group-hover:text-primary transition-colors truncate",
                                    selectedEvent ? "text-xs" : "text-sm",
                                  )}
                                >
                                  {event.title}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">{event.dj}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className={cn("font-bold text-accent", selectedEvent ? "text-base" : "text-lg")}>
                                  {event.price}
                                </p>
                                <p className="text-[10px] text-muted-foreground">{event.time}</p>
                              </div>
                            </button>
                          )
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReservationSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

export default function WydarzeniaPage() {
  return (
    <div className="relative">
      {/* Usunięto Navigation - jest już w layout.tsx */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Ładowanie...</div>
          </div>
        }
      >
        <EventsContent />
      </Suspense>
    </div>
  )
}
