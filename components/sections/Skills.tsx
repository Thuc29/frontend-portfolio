"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Skill data với logo/icon màu
const skillsData = {
  frontend: [
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Next.js", icon: "▲", color: "#000000" },
    { name: "TypeScript", icon: "TS", color: "#3178C6" },
    { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
    { name: "HTML5", icon: "HTML", color: "#E34F26" },
    { name: "CSS3", icon: "CSS", color: "#1572B6" },
  ],
  styling: [
    { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
    { name: "SCSS/Sass", icon: "💅", color: "#CC6699" },
    { name: "Styled Components", icon: "💎", color: "#DB7093" },
    { name: "CSS Modules", icon: "📦", color: "#000000" },
    { name: "Framer Motion", icon: "✨", color: "#0055FF" },
    { name: "GSAP", icon: "🚀", color: "#88CE02" },
  ],
  tools: [
    { name: "Git", icon: "🔧", color: "#F05032" },
    { name: "Figma", icon: "🎯", color: "#F24E1E" },
    { name: "REST APIs", icon: "🌐", color: "#009688" },
    { name: "Webpack", icon: "📦", color: "#8DD6F9" },
    { name: "Vite", icon: "⚡", color: "#646CFF" },
    { name: "npm/yarn", icon: "📦", color: "#CB3837" },
  ],
}

function MarqueeRow({
  skills,
  direction = "left",
  speed = 50,
}: {
  skills: typeof skillsData.frontend
  direction?: "left" | "right"
  speed?: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate skills để tạo hiệu ứng vô tận
  const duplicatedSkills = [...skills, ...skills, ...skills]

  useGSAP(() => {
    if (!rowRef.current) return

    const row = rowRef.current
    const totalWidth = row.scrollWidth / 3 // Chia 3 vì duplicate 3 lần

    const tl = gsap.timeline({
      repeat: -1,
      paused: isPaused,
    })

    if (direction === "left") {
      tl.to(row, {
        x: -totalWidth,
        duration: speed,
        ease: "none",
      })
    } else {
      tl.fromTo(
        row,
        { x: -totalWidth },
        {
          x: 0,
          duration: speed,
          ease: "none",
        }
      )
    }

    return () => {
      tl.kill()
    }
  }, [direction, speed, isPaused])

  return (
    <div className="relative overflow-hidden py-8">
      <div
        ref={rowRef}
        className="flex gap-8 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {duplicatedSkills.map((skill, index) => {
          const isHovered = hoveredSkill === `${skill.name}-${index}`
          const isOtherHovered = hoveredSkill !== null && !isHovered

          return (
            <div
              key={`${skill.name}-${index}`}
              className="group relative inline-flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-navy-primary/30 bg-white/90 dark:bg-navy-dark/90 px-8 py-6 backdrop-blur-md transition-all duration-500 hover:border-navy-primary/50 dark:hover:border-beige-primary/50"
              style={{
                transform: isHovered ? "scale(1.15)" : "scale(1)",
                opacity: isOtherHovered ? 0.3 : 1,
                boxShadow: isHovered
                  ? `0 20px 60px -10px ${skill.color}40, 0 0 0 3px ${skill.color}50`
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
              onMouseEnter={() => {
                setHoveredSkill(`${skill.name}-${index}`)
                setIsPaused(true)
              }}
              onMouseLeave={() => {
                setHoveredSkill(null)
                setIsPaused(false)
              }}
              onTouchStart={() => {
                setHoveredSkill(`${skill.name}-${index}`)
                setIsPaused(true)
              }}
              onTouchEnd={() => {
                setHoveredSkill(null)
                setIsPaused(false)
              }}
            >
              {/* Icon/Logo */}
              <span
                className="text-4xl font-bold transition-all duration-500 text-navy-primary dark:text-beige-primary"
                style={{
                  color: isHovered ? skill.color : undefined,
                  filter: isHovered ? "drop-shadow(0 0 20px currentColor)" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              >
                {skill.icon}
              </span>

              {/* Skill Name */}
              <span
                className="text-2xl font-extrabold tracking-tight transition-all duration-500 md:text-3xl text-navy-primary dark:text-beige-primary"
                style={{
                  color: isHovered ? skill.color : undefined,
                  textShadow: isHovered
                    ? `0 0 30px ${skill.color}60, 0 2px 8px rgba(0,0,0,0.2)`
                    : "0 2px 4px rgba(0,0,0,0.1)",
                  WebkitTextStroke: isHovered ? "0.5px currentColor" : "0px",
                }}
              >
                {skill.name}
              </span>

              {/* Glow Effect */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
      },
    })

    const headerLabel = headerRef.current?.querySelector("p")
    const headerTitle = headerRef.current?.querySelector("h2")
    const headerDesc = headerRef.current?.querySelectorAll("p")[1]

    if (headerLabel) {
      headerTl.fromTo(
        headerLabel,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0
      )
    }

    if (headerTitle) {
      headerTl.fromTo(
        headerTitle,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        0.2
      )
    }

    if (headerDesc) {
      headerTl.fromTo(
        headerDesc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.4
      )
    }

    // Marquee rows fade in
    const rows = marqueeRef.current?.children
    if (rows) {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 80%",
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-divider relative overflow-hidden py-24"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-20 px-6 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-analog drop-shadow-sm">
          Tech Stack
        </p>
        <h2 className="mb-6 text-5xl font-extrabold tracking-tight dark:text-navy-primary text-beige-primary drop-shadow-md md:text-7xl">
          Skills & Technologies
        </h2>
        <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed dark:text-gray-dark/80 text-gray-light/80">
          Hover to reveal • Touch to pause
        </p>
      </div>

      {/* Infinite Marquee Rows */}
      <div ref={marqueeRef} className="space-y-4">
        {/* Row 1: Frontend - Left to Right */}
        <MarqueeRow skills={skillsData.frontend} direction="left" speed={40} />

        {/* Row 2: Styling & Animation - Right to Left */}
        <MarqueeRow skills={skillsData.styling} direction="right" speed={50} />

        {/* Row 3: Tools - Left to Right */}
        <MarqueeRow skills={skillsData.tools} direction="left" speed={45} />
      </div>

      {/* Gradient Overlays for fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-beige-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-beige-primary to-transparent" />
    </section>
  )
}
