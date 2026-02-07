"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/all"
import { useRef, useEffect } from "react"
import MagneticButton from "@/components/ui/MagneticButton"
import { ArrowDown, ArrowRightIcon, Contact } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

gsap.registerPlugin(ScrollToPlugin)


export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { theme } = useTheme()

  // Derive video source directly from theme (no state needed)
  const videoSrc = theme === "dark"
    ? "/videos/hero-dark.mp4"
    : "/videos/hero-main.mp4"

  // Handle smooth video transition when theme changes
  useEffect(() => {
    if (videoRef.current) {
      // Smooth transition
      gsap.to(videoRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (videoRef.current) {
            videoRef.current.load()
            gsap.to(videoRef.current, { opacity: 0.8, duration: 0.5 })
          }
        }
      })
    }
  }, [theme])

  useGSAP(() => {
    // Temporarily disable all GSAP animations for debugging
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (title) {
      gsap.set(title, { opacity: 1 })
      gsap.set(title.querySelectorAll("span"), { opacity: 1 })
      gsap.set(title.querySelectorAll("button"), { opacity: 1 })
    }

    if (subtitle) {
      gsap.set(subtitle, { opacity: 1 })
      gsap.set(subtitle.querySelectorAll("span"), { opacity: 1 })
    }

    if (scrollIndicator) {
      gsap.set(scrollIndicator, { opacity: 1 })
    }
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      // Use GSAP for smooth scrolling to work with ScrollSmoother
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: aboutSection, offsetY: 0 },
        ease: "power2.inOut"
      })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: projectsSection, offsetY: 0 },
        ease: "power2.inOut"
      })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: contactSection, offsetY: 0 },
        ease: "power2.inOut"
      })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative mx-auto flex min-h-screen max-w-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24 text-center"
    >
      {/* Background videos with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          key={videoSrc}
          className="hero-video absolute inset-0 h-[120%] w-full object-cover opacity-80 transition-opacity duration-500"
          autoPlay
          loop
          muted
          playsInline
          data-speed="0.5"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-primary/20 via-transparent to-navy-primary/30 dark:from-beige-primary/10 dark:via-transparent dark:to-beige-primary/20" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(26,18,101,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,18,101,0.1)_1px,transparent_1px)] 
          dark:bg-[linear-gradient(rgba(235,235,223,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(235,235,223,0.1)_1px,transparent_1px)]
           bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0 -z-5">
        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-blue-analog/30" />
        <div className="absolute right-[15%] top-[30%] h-1 w-1 rounded-full bg-purple-light/40" />
        <div className="absolute left-[20%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-olive-yellow/35" />
        <div className="absolute right-[25%] bottom-[35%] h-2 w-2 rounded-full bg-blue-analog/25" />
        <div className="absolute left-[70%] top-[15%] h-1 w-1 rounded-full bg-purple-light/30" />
        <div className="absolute right-[80%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-olive-yellow/40" />
      </div>

      {/* Centered content */}
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        {/* Main heading with integrated buttons */}
        <div className="relative text-center">
          <h1
            ref={titleRef}
            className="text-balance text-6xl font-extrabold leading-[0.9] text-beige-primary dark:text-amber-50 md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <span className="block" style={{ opacity: 1, visibility: 'visible' }}>Hello - I&rsquo;m</span>
            <span className="block" style={{ opacity: 1, visibility: 'visible' }}>Tran</span>
            <span className="block" style={{ opacity: 1, visibility: 'visible' }}>Danh Thuc</span>
          </h1>

          {/* Buttons positioned relative to the entire title */}
          <MagneticButton
            className="absolute items-center -right-4 top-1/2 -translate-y-1/2 cursor-hover group rounded-full bg-blue-analog px-6 py-2 text-base font-bold text-white transition-all 
                duration-300 border-2 border-blue-analog shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-110 hover:bg-blue-analog/90 hover:border-white
                md:-right-8 md:px-8 md:py-3 md:text-lg lg:-right-12 lg:px-10 lg:py-4 lg:text-xl backdrop-blur-sm ring-2 ring-blue-analog/30 ring-offset-2 ring-offset-transparent"
            strength={0.3}
            onClick={scrollToProjects}
          >
            <span className="flex items-center gap-2">
              View My Work
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 md:h-5 md:w-5" />
            </span>
          </MagneticButton>

          <MagneticButton
            className="absolute -left-24 -bottom-8 md:-bottom-10 -translate-y-1/2 cursor-hover group rounded-full border-2 border-beige-primary dark:border-navy-primary bg-beige-primary/20 dark:bg-beige-primary/10 px-6 py-2 
                text-base font-bold text-beige-primary dark:text-amber-50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-beige-primary dark:hover:border-navy-primary hover:bg-beige-primary/30 dark:hover:bg-navy-primary/30
                md:-left-28 md:px-8 md:py-4 md:text-lg lg:-left-24 lg:px-10 lg:py-5 lg:text-xl shadow-[0_0_20px_rgba(235,235,223,0.4)] dark:shadow-[0_0_20px_rgba(235,235,223,0.4)] hover:shadow-[0_0_30px_rgba(235,235,223,0.6)] dark:hover:shadow-[0_0_30px_rgba(26,18,101,0.6)] ring-2 ring-beige-primary/30 dark:ring-navy-primary/30 ring-offset-2 ring-offset-transparent"
            strength={0.2}
            onClick={scrollToContact}
          >
            <span className="flex items-center gap-2">
              <Contact
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5" />
              <p> Get In Touch </p>
            </span>
          </MagneticButton>
        </div>

        <p
          ref={subtitleRef}
          className="max-w-3xl mt-6 text-center text-lg leading-relaxed text-beige-primary/90 dark:text-amber-50  md:text-xl lg:text-2xl"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          <span>A</span> <span>passionate</span>{" "}
          <span className="relative inline-block font-black rounded-lg md:rounded-xl sm:text-xl md:text-2xl lg:text-3xl text-beige-dark dark:text-navy-dark bg-linear-to-r from-navy-light to-blue-analog dark:from-beige-light dark:to-blue-analog px-4 py-1 shadow-lg transform hover:scale-105 hover:shadow-xl hover:shadow-blue-analog/20 transition-all duration-300 group cursor-pointer">
            <span className="relative z-10 group-hover:text-beige-light dark:group-hover:text-navy-light transition-colors duration-300">Frontend Developer</span>
          </span>{" "}
          <span>who</span> <span>loves</span> <span>building</span>{" "}
          <span className="font-bold text-olive-yellow bg-navy-primary/10 dark:bg-beige-primary/10 px-2 py-0.5 rounded-md border border-olive-yellow/30 hover:border-olive-yellow/60 hover:bg-olive-yellow/20 hover:scale-105 transition-all duration-300 cursor-pointer">
            beautiful
          </span>{" "}
          <span>and</span>{" "}
          <span className="font-bold text-purple-light bg-navy-primary/10 dark:bg-beige-primary/10 px-2 py-0.5 rounded-md border border-purple-light/30 hover:border-purple-light/60 hover:bg-purple-light/20 hover:scale-105 transition-all duration-300 cursor-pointer">
            responsive
          </span>{" "}
          <span>websites</span> <span>with</span> <span>modern</span>{" "}
          <span className="font-bold text-blue-analog bg-navy-primary/10 dark:bg-beige-primary/10 px-2 py-0.5 rounded-md border border-blue-analog/30 hover:border-blue-analog/60 hover:bg-blue-analog/20 hover:scale-105 transition-all duration-300 cursor-pointer">
            technologies
          </span><span>.</span>
        </p>


      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/4 -translate-x-1/2 z-10 cursor-pointer group"
        onClick={scrollToNext}
      >
        <div className="relative flex h-50 w-50 items-center justify-center rounded-full border border-beige-light/80 dark:border-amber-50/80 transition-all duration-500 ease-out hover:scale-50 group-hover:border-none group-hover:bg-navy-light dark:group-hover:bg-beige-light">
          {/* Down arrow icon */}
          <ArrowDown className="h-10 w-10 text-beige-primary dark:text-amber-50 transition-all duration-300 group-hover:text-beige-light dark:group-hover:text-navy-light group-hover:scale-110 group-hover:animate-bounce" />

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-beige-primary/10 dark:bg-navy-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </section>
  )
}