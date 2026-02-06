"use client"

import { useEffect, useState, useRef } from "react"

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Initialize with current scroll position
    lastScrollY.current = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Check if at top
      setIsAtTop(scrollY < 100)

      // Require at least 5px movement to trigger direction change
      const delta = scrollY - lastScrollY.current

      if (Math.abs(delta) < 5) {
        ticking.current = false
        return
      }

      setScrollDirection(delta > 0 ? "down" : "up")
      lastScrollY.current = scrollY
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        window.requestAnimationFrame(updateScrollDirection)
      }
    }

    // Listen to both scroll and wheel events for better detection
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onScroll, { passive: true })
    window.addEventListener("touchmove", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", onScroll)
      window.removeEventListener("touchmove", onScroll)
    }
  }, [])

  return { scrollDirection, isAtTop }
}
