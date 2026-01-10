"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Instagram, Camera, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const galleryImages = [
  {
    id: 1,
    src: "/nightclub-crowd-dancing-with-colorful-lights.jpg",
    alt: "Tłum na parkiecie",
    category: "party",
  },
  {
    id: 2,
    src: "/dj-booth-with-neon-lights-in-club.jpg",
    alt: "DJ w akcji",
    category: "dj",
  },
  {
    id: 3,
    src: "/vip-lounge-in-modern-nightclub.jpg",
    alt: "Strefa VIP",
    category: "interior",
  },
  {
    id: 4,
    src: "/bar-counter-with-neon-lighting-in-club.jpg",
    alt: "Bar",
    category: "interior",
  },
  {
    id: 5,
    src: "/people-dancing-party-nightclub-atmosphere.jpg",
    alt: "Impreza",
    category: "party",
  },
  {
    id: 6,
    src: "/laser-show-in-nightclub-dark.jpg",
    alt: "Pokaz laserowy",
    category: "effects",
  },
  {
    id: 7,
    src: "/cocktail-drinks-at-club-bar-neon.jpg",
    alt: "Drinki",
    category: "bar",
  },
  {
    id: 8,
    src: "/nightclub-entrance-exterior-night.jpg",
    alt: "Wejście do klubu",
    category: "exterior",
  },
]

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const scrollPositionRef = useRef(0) // Changed to useRef instead of useState

  const currentImage = selectedIndex !== null ? galleryImages[selectedIndex] : null
  const isOpen = selectedIndex !== null

  const handlePrevious = useCallback(() => {
    if (selectedIndex === null || isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1)
      setIsAnimating(false)
    }, 150)
  }, [selectedIndex, isAnimating])

  const handleNext = useCallback(() => {
    if (selectedIndex === null || isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1)
      setIsAnimating(false)
    }, 150)
  }, [selectedIndex, isAnimating])

  const handleImageClick = useCallback((index: number) => {
    scrollPositionRef.current = window.scrollY // Use ref instead of state
    setSelectedIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
    setDirection(null)
    document.body.classList.remove("modal-open")
  }, [])

  const handleThumbnailClick = (index: number) => {
    if (index === selectedIndex || isAnimating) return
    setDirection(index > (selectedIndex ?? 0) ? "right" : "left")
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedIndex(index)
      setIsAnimating(false)
    }, 150)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, handleClose])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
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

        document.documentElement.style.scrollBehavior = "auto"

        // Usuwamy style blokujące scroll
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.left = ""
        document.body.style.right = ""
        document.body.style.width = ""
        document.documentElement.style.overflow = ""

        // Natychmiast przywracamy pozycję scrolla
        window.scrollTo(0, scrollY)

        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = ""
        })

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.body.classList.remove("modal-open")
          })
        })
      }
    }
  }, [isOpen])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1.5 mb-4 text-xs uppercase tracking-widest text-primary/80 border border-primary/20 rounded-full bg-primary/5">
            <Camera className="w-3.5 h-3.5 inline mr-1.5" />
            Galeria
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
            Zobacz atmosferę
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Poczuj klimat L4 Club. Te zdjęcia to tylko przedsmak.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "relative overflow-hidden rounded-lg cursor-pointer group",
                index === 0 || index === 4 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square",
              )}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent transition-opacity duration-200",
                  hoveredImage === image.id ? "opacity-100" : "opacity-0",
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
                  hoveredImage === image.id ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="bg-background/60 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
              </div>
              <div
                className={cn(
                  "absolute bottom-2 left-2 right-2 transition-all duration-200",
                  hoveredImage === image.id ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <p className="text-xs font-medium text-foreground">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              Śledź nas na Instagramie
            </a>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overscroll-contain"
            style={{ touchAction: "none" }}
            onClick={handleClose}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full"
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
              {(selectedIndex ?? 0) + 1} / {galleryImages.length}
            </div>

            {/* Main image area - with scale animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-4 pb-32 sm:pb-36 overscroll-contain"
              style={{ touchAction: "pan-x" }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Navigation arrows - hidden on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image container with animation */}
              <div
                className={cn(
                  "relative w-full h-full max-w-5xl max-h-[70vh] transition-all duration-150",
                  isAnimating && direction === "left" && "opacity-0 -translate-x-8",
                  isAnimating && direction === "right" && "opacity-0 translate-x-8",
                  !isAnimating && "opacity-100 translate-x-0",
                )}
              >
                {currentImage && (
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15, ease: "easeOut", delay: 0.05 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-x-auto overflow-y-hidden scrollbar-hide overscroll-contain"
                style={{ touchAction: "pan-x" }}
              >
                <div className="flex justify-center items-center gap-3 px-4 py-6 min-w-max">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => handleThumbnailClick(index)}
                      className={cn(
                        "relative flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-lg transition-all duration-200",
                        selectedIndex === index ? "ring-2 ring-primary scale-110" : "opacity-60 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* Swipe hint for mobile */}
              <p className="text-center text-white/40 text-xs pb-4 sm:hidden">Przesuń w lewo lub prawo</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
