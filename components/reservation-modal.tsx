"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Phone,
  User,
  Clock,
  Wine,
  Timer,
  Gift,
  MessageSquare,
  Check,
  Users,
  X,
  ArrowLeft,
  CalendarDays,
  MapPin,
  Music,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
} from "lucide-react"
import { events, getEventByDate } from "@/lib/events-data"
import { cn } from "@/lib/utils"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns"
import { pl } from "date-fns/locale"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  tableType: "small" | "medium" | "large" | null
  eventDate?: string
  eventTitle?: string
}

const tableLabels = {
  small: { name: "Stolik / Loża", capacity: "2–4 osoby", icon: Users },
  medium: { name: "Loża", capacity: "4–8 osób", icon: Sparkles },
  large: { name: "Loża dla grupy", capacity: "8+ osób", icon: Crown },
}

const eventDates = events.map((e) => new Date(e.date))

function MobileCalendar({
  selected,
  onSelect,
  eventDates,
}: {
  selected: Date | undefined
  onSelect: (date: Date) => void
  eventDates: Date[]
}) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())

  const dayNames = ["P", "W", "Ś", "C", "P", "S", "N"]

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc)
  // We need to adjust for Monday start
  const startDayOfWeek = monthStart.getDay()
  const paddingDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const hasEvent = (date: Date) => eventDates.some((d) => isSameDay(d, date))
  const isPast = (date: Date) => isBefore(startOfDay(date), startOfDay(new Date()))

  return (
    <div className="w-full">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{format(currentMonth, "LLLL yyyy", { locale: pl })}</span>
        <button type="button" onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day, i) => (
          <div key={i} className="text-center text-xs text-muted-foreground font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Padding for days before month start */}
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const isSelected = selected && isSameDay(day, selected)
          const isTodayDate = isToday(day)
          const hasEventOnDay = hasEvent(day)
          const isPastDay = isPast(day)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPastDay}
              onClick={() => onSelect(day)}
              className={cn(
                "aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative transition-colors",
                isPastDay && "text-muted-foreground/40 cursor-not-allowed",
                !isPastDay && "hover:bg-muted",
                isTodayDate && !isSelected && "bg-accent/20",
                isSelected && "bg-primary text-primary-foreground",
              )}
            >
              <span>{day.getDate()}</span>
              {hasEventOnDay && (
                <span
                  className={cn(
                    "absolute bottom-1 w-1 h-1 rounded-full",
                    isSelected ? "bg-primary-foreground" : "bg-accent",
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ReservationModal({ isOpen, onClose, tableType, eventDate, eventTitle }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: eventDate || "",
    notes: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(eventDate ? new Date(eventDate) : undefined)
  const [dateDialogOpen, setDateDialogOpen] = useState(false)

  const [preferences, setPreferences] = useState({
    quickService: false,
    alcohol: false,
    early: false,
    occasion: false,
    contactNeeded: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  const scrollPositionRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY

      document.body.classList.add("modal-open")

      // Block scroll using position fixed technique (works on iOS Safari)
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
      document.documentElement.style.overflow = "hidden"

      return () => {
        const scrollY = scrollPositionRef.current

        // Remove fixed positioning
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.left = ""
        document.body.style.right = ""
        document.body.style.width = ""
        document.documentElement.style.overflow = ""

        // Restore scroll position instantly
        window.scrollTo({
          top: scrollY,
          left: 0,
          behavior: "instant",
        })

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.body.classList.remove("modal-open")
          })
        })
      }
    }
  }, [isOpen])

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      const dateStr = format(date, "yyyy-MM-dd")
      setFormData((prev) => ({ ...prev, date: dateStr }))
    }
    setDateDialogOpen(false)
  }, [])

  if (!tableType) return null
  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-background overflow-hidden"
          style={{ touchAction: "none" }}
        >
          {/* Modal's own header - with slide-down animation */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.05 }}
            className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
          >
            <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base font-bold text-foreground">Rezerwacja</h1>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </motion.header>

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            className="overflow-y-auto overscroll-contain"
            style={{ height: "calc(100dvh - 57px)", touchAction: "pan-y" }}
          >
            <div className="max-w-2xl mx-auto px-4 py-6 pb-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Rezerwacja wysłana!</h2>
                  <p className="text-muted-foreground mb-2 max-w-sm">Dziękujemy za rezerwację w L4 Club.</p>
                  <p className="text-sm text-muted-foreground mb-8 max-w-sm">
                    Skontaktujemy się z Tobą telefonicznie, aby potwierdzić szczegóły rezerwacji.
                  </p>
                  <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Wróć do strony
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-5 mb-6 overflow-hidden group">
                    {/* Decorative glow elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/10 rounded-full blur-xl" />

                    <div className="relative flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                        {(() => {
                          const IconComponent = tableLabels[tableType].icon
                          return <IconComponent className="w-7 h-7 text-primary" />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-lg font-bold text-foreground">{tableLabels[tableType].name}</h2>
                          {tableType === "medium" && (
                            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/20 text-accent rounded-full">
                              Popularne
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{tableLabels[tableType].capacity}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span>L4 Club, Żory</span>
                          </div>
                          {eventTitle && (
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5 text-primary" />
                              <span>{eventTitle}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-black text-accent">0 zł</p>
                        <p className="text-[10px] text-muted-foreground">bezpłatnie</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <section>
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                          1
                        </div>
                        Dane kontaktowe
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="res-name" className="text-sm text-muted-foreground">
                            Imię i nazwisko
                          </Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="res-name"
                              placeholder="Jan Kowalski"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="pl-11 h-12 bg-card border-border text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="res-phone" className="text-sm text-muted-foreground">
                            Numer telefonu
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="res-phone"
                              type="tel"
                              placeholder="+48 123 456 789"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="pl-11 h-12 bg-card border-border text-base"
                            />
                          </div>
                        </div>

                        {!eventDate && (
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Data rezerwacji</Label>
                            <button
                              type="button"
                              onClick={() => setDateDialogOpen(true)}
                              className={cn(
                                "w-full h-12 px-4 bg-card border border-border rounded-md text-left flex items-center gap-3 hover:border-primary/50 transition-colors",
                                !selectedDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarDays className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="flex-1 text-base">
                                {selectedDate ? (
                                  <span className="flex items-center gap-2 flex-wrap">
                                    {format(selectedDate, "d MMMM yyyy", { locale: pl })}
                                    {getEventByDate(format(selectedDate, "yyyy-MM-dd")) && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                                        <Music className="w-3 h-3" />
                                        {getEventByDate(format(selectedDate, "yyyy-MM-dd"))?.title}
                                      </span>
                                    )}
                                  </span>
                                ) : (
                                  "Wybierz datę"
                                )}
                              </span>
                            </button>

                            <Dialog open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
                              <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm p-0 gap-0 z-[110]">
                                <DialogHeader className="p-4 pb-2 border-b border-border">
                                  <DialogTitle className="text-center">Wybierz datę</DialogTitle>
                                </DialogHeader>
                                <div className="p-4">
                                  <MobileCalendar
                                    selected={selectedDate}
                                    onSelect={handleDateSelect}
                                    eventDates={eventDates}
                                  />
                                </div>
                                <div className="border-t border-border p-4">
                                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    Nadchodzące imprezy
                                  </p>
                                  <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {events.map((event) => (
                                      <button
                                        key={event.id}
                                        type="button"
                                        onClick={() => handleDateSelect(new Date(event.date))}
                                        className={cn(
                                          "w-full text-left p-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5",
                                          selectedDate &&
                                            format(selectedDate, "yyyy-MM-dd") === event.date &&
                                            "bg-primary/10 border border-primary/30",
                                        )}
                                      >
                                        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                          <Music className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className="text-xs font-medium text-foreground block truncate">
                                            {event.title}
                                          </span>
                                          <span className="text-[10px] text-muted-foreground">
                                            {format(new Date(event.date), "EEE, d MMM", { locale: pl })}
                                          </span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                          2
                        </div>
                        Preferencje
                        <span className="text-xs font-normal text-muted-foreground">(opcjonalne)</span>
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                          <Checkbox
                            checked={preferences.quickService}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, quickService: checked as boolean })
                            }
                            className="w-5 h-5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Chcemy być od razu obsłużeni</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Priorytetowa obsługa przy stoliku</p>
                          </div>
                          <Timer className="w-5 h-5 text-primary flex-shrink-0" />
                        </label>

                        <label className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                          <Checkbox
                            checked={preferences.alcohol}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, alcohol: checked as boolean })
                            }
                            className="w-5 h-5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Zamówimy alkohol na stolik</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Obsługa kelnerska przy stoliku</p>
                          </div>
                          <Wine className="w-5 h-5 text-primary flex-shrink-0" />
                        </label>

                        <label className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                          <Checkbox
                            checked={preferences.early}
                            onCheckedChange={(checked) => setPreferences({ ...preferences, early: checked as boolean })}
                            className="w-5 h-5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Przyjdziemy wcześniej</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Przed godziną 23:00</p>
                          </div>
                          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        </label>

                        <label className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                          <Checkbox
                            checked={preferences.occasion}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, occasion: checked as boolean })
                            }
                            className="w-5 h-5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">To specjalna okazja</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Urodziny, wieczór panieński itp.</p>
                          </div>
                          <Gift className="w-5 h-5 text-primary flex-shrink-0" />
                        </label>

                        <label className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer">
                          <Checkbox
                            checked={preferences.contactNeeded}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, contactNeeded: checked as boolean })
                            }
                            className="w-5 h-5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Proszę o kontakt telefoniczny</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Mam dodatkowe pytania</p>
                          </div>
                          <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                        </label>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                          3
                        </div>
                        Dodatkowe informacje
                        <span className="text-xs font-normal text-muted-foreground">(opcjonalne)</span>
                      </h3>
                      <Textarea
                        placeholder="Wpisz dodatkowe uwagi lub prośby..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="min-h-[100px] bg-card border-border resize-none text-base"
                      />
                    </section>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.phone}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Wysyłanie...
                          </span>
                        ) : (
                          "Wyślij rezerwację"
                        )}
                      </Button>
                      <p className="text-center text-[10px] text-muted-foreground mt-3">
                        Klikając przycisk, akceptujesz nasz regulamin i politykę prywatności.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.main>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
