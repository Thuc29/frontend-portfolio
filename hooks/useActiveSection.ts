"use client"

import { useState, useEffect, RefObject } from "react"

interface UseActiveSectionProps {
  itemRefs: RefObject<(HTMLElement | null)[]>
  threshold?: number
}

export function useActiveSection({ itemRefs, threshold = 0.5 }: UseActiveSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    if (itemRefs.current) {
      itemRefs.current.forEach((item, index) => {
        if (!item) return

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                setActiveIndex(index)
              }
            })
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: "-40% 0px -40% 0px",
          }
        )

        observer.observe(item)
        observers.push(observer)
      })
    }

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [itemRefs, threshold])

  return activeIndex
}
