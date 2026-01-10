"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

const scrollPositions = new Map<string, number>()

let navigationDirection: "forward" | "back" | "pop" = "forward"
let previousPath: string | null = null

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    navigationDirection = "pop"
  })

  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest("a")
    if (link && link.href && !link.target && link.origin === window.location.origin) {
      const currentPath = window.location.pathname
      scrollPositions.set(currentPath, window.scrollY)
      navigationDirection = "forward"
      previousPath = currentPath
    }
  })
}

function useScrollRestoration() {
  const pathname = usePathname()
  const lastPathnameRef = useRef<string | null>(null)
  const hasRestoredRef = useRef(false)

  if (lastPathnameRef.current !== null && lastPathnameRef.current !== pathname) {
    if (typeof window !== "undefined") {
      const html = document.documentElement
      html.style.scrollBehavior = "auto"
      html.classList.remove("scroll-smooth")

      if (navigationDirection === "pop") {
        const savedPosition = scrollPositions.get(pathname)
        if (savedPosition !== undefined) {
          window.scrollTo(0, savedPosition)
        } else {
          window.scrollTo(0, 0)
        }
      } else {
        const hasHash = window.location.hash.length > 0
        if (!hasHash) {
          window.scrollTo(0, 0)
        }
      }

      hasRestoredRef.current = true
    }
  }

  lastPathnameRef.current = pathname

  return pathname
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = useScrollRestoration()

  useEffect(() => {
    const timer = setTimeout(() => {
      const html = document.documentElement
      html.style.scrollBehavior = ""
      html.classList.add("scroll-smooth")
      navigationDirection = "forward"
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    return () => {
      scrollPositions.set(pathname, window.scrollY)
    }
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
