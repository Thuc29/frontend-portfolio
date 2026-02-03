"use client"

import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"

const sections = [
  { id: "hero", label: "01", name: "Home" },
  { id: "about", label: "02", name: "About" },
  { id: "skills", label: "03", name: "Skills" },
  { id: "projects", label: "04", name: "Projects" },
  { id: "experience", label: "05", name: "Experience" },
  { id: "contact", label: "06", name: "Contact" },
]

export default function SideTimeline() {
  const [activeSection, setActiveSection] = useState("hero")
  const [sectionProgress, setSectionProgress] = useState(0)
  const isScrollingRef = useRef(false)

  useGSAP(() => {
    const handleScroll = () => {
      // Skip if programmatically scrolling
      if (isScrollingRef.current) return

      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const centerPoint = scrollY + viewportHeight * 0.5

      // Find the section that's most visible in viewport
      let bestSection = sections[0]
      let bestScore = -1

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementTop = scrollY + rect.top
        const elementBottom = elementTop + rect.height
        const elementCenter = elementTop + rect.height / 2

        // Calculate how much of the section is visible
        const visibleTop = Math.max(elementTop, scrollY)
        const visibleBottom = Math.min(elementBottom, scrollY + viewportHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visibilityRatio = visibleHeight / rect.height

        // Bonus for being near center of viewport
        const distanceFromCenter = Math.abs(elementCenter - centerPoint)
        const centerBonus = Math.max(0, 1 - distanceFromCenter / viewportHeight)

        const score = visibilityRatio * 0.7 + centerBonus * 0.3

        if (score > bestScore) {
          bestScore = score
          bestSection = section
        }
      })

      // Only update if section actually changed (avoid flickering)
      if (bestSection.id !== activeSection) {
        setActiveSection(bestSection.id)
      }

      // Calculate progress within the active section
      const activeElement = document.getElementById(bestSection.id)
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect()
        const elementTop = scrollY + rect.top
        const elementHeight = rect.height

        // Progress based on how far we've scrolled through this section
        const relativeScroll = Math.max(0, centerPoint - elementTop)
        const progress = Math.min(100, Math.max(0, (relativeScroll / elementHeight) * 100))

        setSectionProgress(progress)
      }
    }

    // Use passive scroll listener with optimized throttling
    let rafId: number | null = null
    const optimizedScroll = () => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        handleScroll()
        rafId = null
      })
    }

    window.addEventListener("scroll", optimizedScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", optimizedScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [activeSection]) // Add activeSection as dependency

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    // Immediately update UI for responsive feel
    setActiveSection(id)
    setSectionProgress(0) // Start from beginning of section

    // Prevent scroll handler interference
    isScrollingRef.current = true

    // Smooth scroll with better positioning
    const elementRect = element.getBoundingClientRect()
    const absoluteElementTop = elementRect.top + window.scrollY
    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2)

    window.scrollTo({
      top: Math.max(0, middle),
      behavior: "smooth"
    })

    // Gradually re-enable scroll detection
    const resetScrolling = () => {
      setTimeout(() => {
        isScrollingRef.current = false
      }, 800)
    }

    resetScrolling()
  }

  const activeIndex = sections.findIndex((s) => s.id === activeSection)

  return (
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 xl:block">
      <div className="relative flex flex-col gap-3">
        {/* Background track */}
        <div className="absolute left-1/2 top-1 h-[calc(100%-8px)] w-px -translate-x-1/2 bg-linear-to-b from-navy-primary/5 via-navy-primary/10 to-navy-primary/5" />

        {/* Animated progress line - shows progress to current section */}
        <div
          className="absolute left-1/2 top-1 w-px -translate-x-1/2 bg-linear-to-b from-blue-analog to-purple-light transition-all duration-300 ease-out"
          style={{
            height: `${((activeIndex + sectionProgress / 100) / sections.length) * 100}%`,
          }}
        />

        {sections.map((section, index) => {
          const isActive = activeSection === section.id
          const isPast = activeIndex > index || (activeIndex === index && sectionProgress > 50)

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {/* Tooltip on hover */}
              <div
                className={`absolute right-full mr-3 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium transition-all duration-300 ${isActive
                  ? "translate-x-0 bg-navy-primary text-beige-light opacity-100"
                  : "translate-x-2 bg-beige-light text-navy-primary opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
              >
                {section.name}
                {/* Arrow */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-[3px] border-transparent ${isActive ? "border-l-navy-primary" : "border-l-beige-light"
                    }`}
                />
              </div>

              {/* Number indicator */}
              <div
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold tracking-wider transition-all duration-300 ${isActive
                  ? "bg-navy-primary text-beige-light shadow-lg shadow-navy-primary/30 scale-110"
                  : isPast
                    ? "bg-navy-primary/20 text-navy-primary"
                    : "bg-beige-light text-navy-light group-hover:bg-navy-primary/10 group-hover:text-navy-primary"
                  }`}
              >
                {section.label}

                {/* Active ring animation */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border-2 border-navy-primary/40 animate-pulse" />
                )}

                {/* Progress ring for active section */}
                {isActive && (
                  <svg className="absolute -inset-1 h-9 w-9 -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - sectionProgress / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                )}
              </div>
            </button>
          )
        })}

        {/* Section progress indicator */}
        <div className="mt-2 flex flex-col items-center gap-1">
          <div className="h-8 w-px overflow-hidden rounded-full bg-navy-primary/10">
            <div
              className="w-full bg-linear-to-b from-blue-analog to-purple-light transition-all duration-300"
              style={{ height: `${sectionProgress}%` }}
            />
          </div>
          <span className="text-[8px] font-medium text-navy-light">
            {Math.round(sectionProgress)}%
          </span>
        </div>
      </div>
    </nav>
  )
}
