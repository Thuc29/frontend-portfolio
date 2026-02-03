"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: "Frontend",
    icon: "⚛",
    color: "from-blue-analog/20 to-purple-light/10",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Styling",
    icon: "🎨",
    color: "from-purple-light/20 to-blue-analog/10",
    skills: ["Tailwind CSS", "SCSS/Sass", "Styled Components", "CSS Modules"],
  },
  {
    title: "Animation",
    icon: "✨",
    color: "from-olive-yellow/20 to-purple-light/10",
    skills: ["GSAP", "Framer Motion", "CSS Animations", "Lottie"],
  },
  {
    title: "Tools & Others",
    icon: "🛠",
    color: "from-navy-primary/10 to-blue-analog/10",
    skills: ["Git", "Figma", "REST APIs", "Webpack", "Vite", "npm/yarn"],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Clip-path reveal - từ dưới lên trên
    gsap.fromTo(
      revealRef.current,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    )

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
        0.4
      )
    }

    if (headerTitle) {
      headerTl.fromTo(
        headerTitle,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        0.5
      )
    }

    if (headerDesc) {
      headerTl.fromTo(
        headerDesc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.6
      )
    }

    // Cards with clip-path reveal từng card
    const cards = cardsRef.current?.children
    if (cards) {
      Array.from(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            delay: i * 0.1,
          }
        )

        // Animate skill tags inside each card
        const tags = card.querySelectorAll(".skill-tag")
        gsap.fromTo(
          tags,
          { opacity: 0, scale: 0.8, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
            delay: i * 0.1 + 0.4,
          }
        )
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-divider relative mx-auto max-w-6xl px-6 py-24"
    >
      <div ref={revealRef}>
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog">
            Tech Stack
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-navy-primary md:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-dark/80">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`group relative overflow-hidden rounded-2xl border border-navy-primary/10 bg-gradient-to-br ${category.color} p-6 transition-all duration-500 hover:-translate-y-2 hover:border-navy-primary/20 hover:shadow-[0_25px_50px_rgba(26,18,101,0.1)]`}
            >
              {/* Icon */}
              <span className="mb-3 block text-2xl transition-transform duration-300 group-hover:scale-125">
                {category.icon}
              </span>

              <h3 className="mb-4 text-lg font-semibold text-navy-primary">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag rounded-full border border-navy-primary/15 bg-beige-primary/80 px-3 py-1.5 text-xs font-medium text-navy-light transition-all duration-300 hover:border-navy-primary/30 hover:bg-navy-primary hover:text-beige-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover glow effect */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-analog/0 via-purple-light/0 to-blue-analog/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
