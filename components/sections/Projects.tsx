"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard with real-time analytics, inventory management, and order tracking.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Chart.js"],
    category: "Web App",
    link: "#",
    github: "#",
    accent: "from-blue-analog/20 to-purple-light/10",
  },
  {
    id: 2,
    title: "Portfolio Landing Page",
    description:
      "Modern landing page with smooth scroll animations, parallax effects, and responsive design.",
    tags: ["React", "GSAP", "Framer Motion", "CSS"],
    category: "Landing Page",
    link: "#",
    github: "#",
    accent: "from-purple-light/20 to-blue-analog/10",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Drag-and-drop task board with real-time sync, team collaboration, and deadline tracking.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "DnD Kit"],
    category: "Web App",
    link: "#",
    github: "#",
    accent: "from-olive-yellow/20 to-purple-light/10",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description:
      "Beautiful weather app with location-based forecasts, interactive maps, and hourly predictions.",
    tags: ["React", "OpenWeather API", "Mapbox", "PWA"],
    category: "Case Study",
    link: "#",
    github: "#",
    accent: "from-navy-primary/10 to-blue-analog/15",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header với clip-path từ giữa mở rộng ra
    gsap.fromTo(
      headerRef.current,
      {
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        opacity: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      }
    )

    // Cards với alternating clip-path directions
    const cards = cardsRef.current?.children
    if (cards) {
      Array.from(cards).forEach((card, i) => {
        const isEven = i % 2 === 0
        const clipFrom = isEven
          ? "polygon(0 0, 0 0, 0 100%, 0 100%)" // từ trái
          : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" // từ phải

        gsap.fromTo(
          card,
          {
            clipPath: clipFrom,
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        )

        // Animate inner elements
        const tags = card.querySelectorAll(".project-tag")
        const links = card.querySelectorAll(".project-link")

        gsap.fromTo(
          tags,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
            delay: 0.5,
          }
        )

        gsap.fromTo(
          links,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
            },
            delay: 0.6,
          }
        )
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-divider relative mx-auto max-w-6xl px-6 py-24"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-16 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog">
          Selected Work
        </p>
        <h2 className="mb-4 text-3xl font-semibold text-navy-primary md:text-4xl">
          Featured Projects
        </h2>
        <p className="text-base leading-relaxed text-gray-dark/80 md:text-lg">
          A collection of projects showcasing my expertise in frontend
          development, from interactive dashboards to polished landing pages.
        </p>
      </div>

      {/* Projects Grid */}
      <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border border-navy-primary/10 bg-gradient-to-br ${project.accent} p-6 transition-all duration-500 hover:-translate-y-2 hover:border-navy-primary/20 hover:shadow-[0_30px_80px_rgba(26,18,101,0.12)]`}
          >
            {/* Category badge */}
            <span className="mb-4 w-fit rounded-full bg-beige-light/80 px-3 py-1 text-xs font-medium text-navy-light backdrop-blur-sm">
              {project.category}
            </span>

            {/* Content */}
            <h3 className="mb-2 text-xl font-semibold text-navy-primary transition-all duration-300 group-hover:text-navy-dark">
              {project.title}
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-dark/75">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="project-tag rounded-full border border-navy-primary/15 bg-beige-light/60 px-2.5 py-1 text-xs text-navy-light backdrop-blur-sm transition-all duration-300 hover:border-navy-primary/30 hover:bg-navy-primary hover:text-beige-light"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 border-t border-navy-primary/10 pt-4">
              <a
                href={project.link}
                className="project-link flex items-center gap-1.5 text-sm font-medium text-navy-primary transition-all duration-300 hover:gap-2.5 hover:text-blue-analog"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
              <a
                href={project.github}
                className="project-link flex items-center gap-1.5 text-sm font-medium text-navy-primary transition-all duration-300 hover:gap-2.5 hover:text-blue-analog"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source
              </a>
            </div>

            {/* Decorative corner */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-navy-primary/5 transition-transform duration-500 group-hover:scale-150" />
          </article>
        ))}
      </div>
    </section>
  )
}
