"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/all"
import MagneticButton from "./MagneticButton"
import { Contact, DownloadIcon } from "lucide-react"

gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { id: "hero", label: "Home", },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)
  const headerRef = useRef<HTMLElement>(null)

  // Define color schemes for different sections
  const getColorScheme = (section: string) => {
    switch (section) {
      case "hero":
        return {
          navText: "text-beige-light",
          navTextActive: "text-beige-light font-bold",
          navTextHover: "hover:text-beige-light",
          navTextInactive: "text-beige-primary",
          downloadBtn: "border-beige-light/40 bg-beige-light/10 text-beige-light hover:border-beige-light/60 hover:bg-beige-light/20",
          contactBtn: "bg-blue-analog text-beige-light hover:bg-blue-analog/80",
          menuIcon: "bg-beige-light",
          mobileMenuBg: "bg-navy-dark/90 border-beige-light/20",
          mobileMenuText: "text-beige-primary hover:text-beige-light",
          mobileMenuTextActive: "bg-beige-light/15 text-beige-light font-bold",
          mobileMenuHover: "hover:bg-beige-light/10"
        }
      default: // for about, skills, projects, experience, contact sections with light backgrounds
        return {
          navText: "text-navy-dark",
          navTextActive: "text-navy-dark font-bold",
          navTextHover: "hover:text-navy-dark",
          navTextInactive: "text-navy-primary",
          downloadBtn: "border-navy-dark/40 bg-navy-dark/10 text-navy-dark hover:border-navy-dark/60 hover:bg-navy-dark/20",
          contactBtn: "bg-navy-dark text-beige-light hover:bg-navy-primary",
          menuIcon: "bg-navy-dark",
          mobileMenuBg: "bg-beige-primary/95 border-navy-primary/20",
          mobileMenuText: "text-navy-primary hover:text-navy-dark",
          mobileMenuTextActive: "bg-navy-dark/15 text-navy-dark font-bold",
          mobileMenuHover: "hover:bg-navy-dark/10"
        }
    }
  }

  const colorScheme = getColorScheme(activeSection)

  useGSAP(() => {
    lastYRef.current = window.scrollY

    // Header entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    )

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastYRef.current

        // Always show at the very top
        if (y < 50) {
          setHidden(false)
        } else if (delta > 5) {
          // Scrolling down - hide header
          setHidden(true)
        } else if (delta < -5) {
          // Scrolling up - show header
          setHidden(false)
        }

        // Update active section
        const sections = document.querySelectorAll("section[id]")
        const scrollPos = y + window.innerHeight / 2

        sections.forEach((section) => {
          const element = section as HTMLElement
          const top = element.offsetTop
          const bottom = top + element.offsetHeight

          if (scrollPos >= top && scrollPos <= bottom) {
            setActiveSection(element.id)
          }
        })

        lastYRef.current = y
        tickingRef.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Use GSAP scrollTo for smooth scrolling with ScrollSmoother
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power2.inOut"
      })
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)

    // Handle animation for the dropdown menu
    const menuElement = document.querySelector('.menu-dropdown')
    if (menuElement) {
      if (!isMenuOpen) {
        gsap.fromTo(
          menuElement,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        )
      } else {
        gsap.to(menuElement, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="ml-auto max-w-7xl w-fit px-6 py-4">
        <div className="flex items-center justify-end rounded-4xl bg-transparent px-6 py-3 backdrop-blur-md">
          {/* Desktop Navigation - Only visible when menu is open */}
          {isMenuOpen && (
            <nav className="hidden items-center gap-1 md:flex mr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${colorScheme.navTextHover} ${activeSection === item.id
                    ? colorScheme.navTextActive
                    : `${colorScheme.navTextInactive} ${colorScheme.navTextHover}`
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-analog" />
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right side container - CTA buttons and menu icon */}
          <div className="flex items-center gap-3">
            <MagneticButton
              className={`cursor-hover items-center flex rounded-full ${colorScheme.downloadBtn} px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 shadow-sm backdrop-blur-sm`}
              strength={0.2}
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/files/TranDanhThuc_dev.pdf"
                link.download = "TranDanhThuc_dev.pdf"
                link.click()
              }}
            >
              <DownloadIcon
                className="mr-2 h-4 w-4"
              />
              Download CV
            </MagneticButton>
            <MagneticButton
              className={`cursor-hover flex rounded-full ${colorScheme.contactBtn} px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md`}
              strength={0.2}
              onClick={() => scrollToSection("contact")}
            >
              <Contact
                className="mr-2 h-4 w-4"
              />
              Contact
            </MagneticButton>

            {/* Menu Icon - Desktop */}
            <button
              className="cursor-pointer hidden md:flex h-8 w-8 flex-col items-center justify-center gap-1"
              onClick={toggleMenu}
            >
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
              />
            </button>

            {/* Menu Icon - Mobile */}
            <button
              className="cursor-pointer flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
              onClick={toggleMenu}
            >
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 ${colorScheme.menuIcon} transition-all duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`menu-dropdown mt-2 rounded-2xl ${colorScheme.mobileMenuBg} p-4 backdrop-blur-md md:hidden`}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${colorScheme.mobileMenuHover} ${activeSection === item.id
                    ? colorScheme.mobileMenuTextActive
                    : colorScheme.mobileMenuText
                    }`}
                >
                  {item.label}
                </button>
              ))}

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

