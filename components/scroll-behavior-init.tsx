"use client"

import { useEffect } from "react"

export function ScrollBehaviorInit() {
  useEffect(() => {
    // Włącz smooth scroll dopiero po załadowaniu strony
    // Dzięki temu przeglądarka przywróci pozycję natychmiast po odświeżeniu
    document.documentElement.classList.add("scroll-smooth")
  }, [])

  return null
}
