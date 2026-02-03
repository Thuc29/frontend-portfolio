"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import MagneticButton from "@/components/ui/MagneticButton"
import { ArrowDown, ArrowRightIcon } from "lucide-react"


export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const particles = particlesRef.current

    if (!hero || !title || !subtitle) return

    // Enhanced entrance animations
    const tl = gsap.timeline()

    // Title với stagger animation cho từng từ
    const words = title.querySelectorAll("span")
    tl.fromTo(
      words,
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }
    )
      .fromTo(
        subtitle,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=0.5"
      )

    // Buttons animation
    const buttons = title.querySelectorAll("button")
    tl.fromTo(
      buttons,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)",
      },
      "-=0.8"
    )

    // Scroll indicator
    if (scrollIndicator) {
      tl.fromTo(
        scrollIndicator,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )

      // Bouncing animation for scroll indicator
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 3,
      })
    }

    // Parallax effect for background video
    gsap.to(".hero-video", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Floating animation for title
    gsap.to(words, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 2,
    })

    // Particles animation
    if (particles) {
      const particleElements = particles.children
      Array.from(particleElements).forEach((particle, i) => {
        gsap.to(particle, {
          y: -20 - Math.random() * 40,
          x: -10 + Math.random() * 20,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        })
      })
    }
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
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
          className="hero-video absolute inset-0 h-[120%] w-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
          data-speed="0.5"
        >
          <source src="/videos/hero-main.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-primary/20 via-transparent to-navy-primary/30" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(26,18,101,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,18,101,0.1)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
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
            className="text-balance text-6xl font-bold leading-[0.9] text-beige-primary md:text-7xl lg:text-8xl xl:text-9xl"
          >
            <span className="block">Hello - I&rsquo;m</span>
            <span className="relative block">
              <span>Tran</span>
              {/* Integrated button - right side */}
              <MagneticButton
                className="absolute items-center -right-4 top-1/2 -translate-y-1/2 cursor-hover group rounded-full bg-blue-analog px-6 py-2 text-base font-medium text-navy-primary transition-all 
                duration-300 border-2 border-navy-dark/30 hover:scale-110 hover:bg-navy-light/50 hover:text-blue-analog hover:border-blue-analog hover:shadow-xl
                 md:-right-8 md:px-8 md:py-3 md:text-lg lg:-right-12 lg:px-10 lg:py-4 lg:text-xl"
                strength={0.3}
                onClick={() => {
                  const projectsSection = document.getElementById("projects")
                  projectsSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
                </span>
              </MagneticButton>
            </span>
            <span className="block">Danh Thuc</span>
            <span className="relative block">

              {/* Integrated button - left side */}
              <MagneticButton
                className="absolute -left-24 -bottom-8 md:-bottom-10  -translate-y-1/2 cursor-hover group rounded-full border-2 border-beige-primary/30 bg-beige-primary/10 px-6 py-2 
                text-base font-medium text-beige-primary md:backdrop-blur-xs transition-all duration-300 hover:scale-110 hover:border-beige-primary/50 hover:bg-transparent
                md:-left-28 md:px-8 md:py-4 md:text-lg lg:-left-24 lg:px-10 lg:py-5 lg:text-xl"
                strength={0.2}
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  contactSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 md:h-5 md:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Get In Touch
                </span>
              </MagneticButton>
            </span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="max-w-2xl mt-2 text-center text-lg leading-relaxed text-beige-primary/90 md:text-xl lg:text-2xl"
        >
          A passionate{" "}
          <span className="font-black rounded-lg md:rounded-xl sm:text-xl md:text-2xl lg:text-3xl text-beige-dark bg-navy-light px-4">Frontend Developer</span>{" "}
          who loves building beautiful and responsive websites.
        </p>


      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/4 -translate-x-1/2 cursor-pointer group"
        onClick={scrollToNext}
      >
        <div className="relative flex h-50 w-50 items-center justify-center rounded-full border border-beige-light/80 transition-all duration-500 ease-out hover:scale-50 group-hover:border-none group-hover:bg-navy-light">
          {/* Down arrow icon */}
          <ArrowDown className="h-10 w-10 text-beige-primary transition-colors duration-300 group-hover:text-beige-dark" />

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-beige-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </section>
  )
}