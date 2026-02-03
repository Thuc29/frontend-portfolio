"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
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

    // Clip-path reveal for entire section - từ trái sang phải
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
      className="section-divider relative mx-auto max-w-6xl px-6 py-24"
    >
      <div
        ref={revealRef}
        className="flex flex-col items-center gap-12 md:flex-row md:gap-16"
      >
        {/* Content */}
        <div className="flex-1">
          <p
            ref={labelRef}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog"
          >
            About Me
          </p>
          <h2
            ref={titleRef}
            className="mb-6 text-3xl font-semibold text-navy-primary md:text-4xl"
          >
            Passionate about crafting digital experiences
          </h2>
          <div
            ref={paragraphsRef}
            className="space-y-4 text-base leading-relaxed text-gray-dark/80"
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

          {/* Quick stats */}
          <div ref={statsRef} className="mt-8 flex flex-wrap gap-8">
            <div className="group cursor-default transition-transform duration-300 hover:scale-110">
              <p className="text-3xl font-semibold text-navy-primary transition-colors group-hover:text-blue-analog">
                2+
              </p>
              <p className="text-sm text-navy-light">Years Experience</p>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:scale-110">
              <p className="text-3xl font-semibold text-navy-primary transition-colors group-hover:text-blue-analog">
                10+
              </p>
              <p className="text-sm text-navy-light">Projects Completed</p>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:scale-110">
              <p className="text-3xl font-semibold text-navy-primary transition-colors group-hover:text-blue-analog">
                5+
              </p>
              <p className="text-sm text-navy-light">Happy Clients</p>
            </div>
          </div>

          {/* Skills preview */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["React", "Next.js", "TypeScript", "GSAP", "Tailwind"].map((skill) => (
              <span
                key={skill}
                className="cursor-hover rounded-full border border-navy-primary/15 bg-beige-light px-4 py-2 text-sm font-medium text-navy-light transition-all duration-300 hover:border-navy-primary/30 hover:bg-navy-primary hover:text-beige-light hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Image/Visual */}
        <div ref={imageRef} className="flex-1">
          <div className="relative">
            {/* Placeholder for profile image */}
            <div className="surface aspect-square overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[0_30px_80px_rgba(26,18,101,0.1)]">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-primary/5 to-blue-analog/10">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-navy-primary/10 transition-transform duration-500 hover:scale-110">
                    <svg
                      className="h-12 w-12 text-navy-light"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-navy-light">Your Photo Here</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              ref={deco1Ref}
              className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border border-purple-light/30 bg-purple-light/10"
            />
            <div
              ref={deco2Ref}
              className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl border border-blue-analog/30 bg-blue-analog/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
