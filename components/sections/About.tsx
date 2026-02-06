"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Code2, Palette, Zap, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Happy Clients" },
  { value: "100%", label: "Commitment" },
]

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable and scalable code",
  },
  {
    icon: Palette,
    title: "Design Focus",
    description: "Pixel-perfect implementation",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and efficiency",
  },
  {
    icon: Award,
    title: "Best Practices",
    description: "Following industry standards",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const deco1Ref = useRef<HTMLDivElement>(null)
  const deco2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Floating decorative elements
    gsap.to(deco1Ref.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    })
    gsap.to(deco2Ref.current, {
      rotate: -360,
      duration: 25,
      repeat: -1,
      ease: "none",
    })

    // Clip-path reveal for entire section
    gsap.fromTo(
      revealRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    })

    // Label slide in
    tl.fromTo(
      labelRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
      0.3
    )

    // Title with clip reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.5
    )

    // Paragraphs stagger with blur
    const paragraphs = paragraphsRef.current?.querySelectorAll("p")
    if (paragraphs) {
      tl.fromTo(
        paragraphs,
        { opacity: 0, y: 25, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        0.7
      )
    }

    // Stats counter animation
    const statItems = statsRef.current?.children
    if (statItems) {
      tl.fromTo(
        statItems,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        1
      )
    }

    // Highlights animation
    const highlightItems = highlightsRef.current?.children
    if (highlightItems) {
      gsap.fromTo(
        highlightItems,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 85%",
          },
        }
      )
    }

    // Image with clip-path circle reveal
    gsap.fromTo(
      imageRef.current,
      {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
      },
      {
        clipPath: "circle(100% at 50% 50%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      }
    )

    // Decorative elements pop in
    gsap.fromTo(
      [deco1Ref.current, deco2Ref.current],
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
        },
        delay: 0.5,
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-divider relative mx-auto max-w-7xl px-6 py-24 md:py-32"
    >
      <div ref={revealRef}>
        {/* Main Content - Single Row Layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div>
              <p
                ref={labelRef}
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog"
              >
                About Me
              </p>
              <h2
                ref={titleRef}
                className="mb-6 text-4xl font-bold text-navy-primary md:text-5xl lg:text-6xl"
              >
                Crafting Digital
                <br />
                <span className="bg-gradient-to-r from-blue-analog to-purple-light bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>
            </div>

            {/* Paragraphs */}
            <div
              ref={paragraphsRef}
              className="space-y-4 text-base leading-relaxed text-gray-dark/80 md:text-lg"
            >
              <p>
                I&apos;m a Frontend Developer with a strong focus on building
                performant, accessible, and visually appealing web applications.
                With experience in modern frameworks and a keen eye for design, I
                bridge the gap between design and development.
              </p>
              <p>
                My approach combines clean code architecture with thoughtful UI/UX
                decisions. I believe great products come from attention to detail
                and understanding user needs.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or refining my
                design skills.
              </p>
            </div>


          </div>

          {/* Right Column - Image */}
          <div ref={imageRef} className="relative lg:w-[45%] shrink-0">
            <div className="relative">
              {/* Profile image */}
              <div className="surface group relative aspect-square overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[0_30px_80px_rgba(26,18,101,0.15)]">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/PTT_8264.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>

              {/* Decorative elements */}
              <div
                ref={deco1Ref}
                className="absolute -right-6 -top-6 h-32 w-32 rounded-3xl border-2 border-purple-light/30 bg-gradient-to-br from-purple-light/10 to-blue-analog/10 backdrop-blur-sm"
              />
              <div
                ref={deco2Ref}
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl border-2 border-blue-analog/30 bg-gradient-to-br from-blue-analog/10 to-purple-light/10 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div
          ref={highlightsRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <div
                key={index}
                className="group surface rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-analog/10 to-purple-light/10 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-blue-analog transition-colors group-hover:text-purple-light" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-navy-primary">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-dark/70">
                  {highlight.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
