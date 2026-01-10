"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/#reservation", label: "Rezerwacje" },
  { href: "/#gallery", label: "Galeria" },
  { href: "/#about", label: "O nas" },
  { href: "/#contact", label: "Kontakt" },
]

function Logo() {
  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-xl font-bold tracking-tight text-logo-light">L4</span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-light ml-1">Club</span>
    </div>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setIsNavigating(false)
      setIsOpen(false)
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.classList.contains("modal-open")) {
        return
      }
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.touchAction = "none"
    } else {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const handleLinkClick = useCallback(
    (href: string) => {
      const isHashOnlyNavigation = href.startsWith("/#") && pathname === "/"

      if (isHashOnlyNavigation) {
        closeMenu()
      } else {
        setIsNavigating(true)
      }
    },
    [closeMenu, pathname],
  )

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/"
  }

  return (
    <>
      <nav
        id="main-nav"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent",
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
            <Link href="/" className="relative z-50" onClick={() => handleLinkClick("/")}>
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "text-xs uppercase tracking-wider transition-colors",
                    isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs" asChild>
                <Link href="/#reservation" onClick={() => handleLinkClick("/#reservation")}>
                  Rezerwuj
                </Link>
              </Button>
            </div>

            <button
              className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-foreground rounded-full transition-all duration-200 ease-out origin-center",
                    isOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-foreground rounded-full transition-all duration-200 ease-out",
                    isOpen && "opacity-0 scale-x-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-foreground rounded-full transition-all duration-200 ease-out origin-center",
                    isOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-opacity",
          isOpen || isNavigating ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          !isOpen && !isNavigating ? "duration-150" : "duration-300",
        )}
      >
        <div className="absolute inset-0 bg-background" onClick={closeMenu} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <nav className="flex flex-col items-center gap-5">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  "text-lg font-medium transition-all duration-200",
                  isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "mt-8 transition-all duration-200",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            style={{ transitionDelay: isOpen ? "240ms" : "0ms" }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
              <Link href="/#reservation" onClick={() => handleLinkClick("/#reservation")}>
                Rezerwuj stolik
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
