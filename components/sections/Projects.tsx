"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "Real-time analytics & inventory management",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "Web App",
    year: "2024",
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "#6366F1",
  },
  {
    id: 2,
    title: "Portfolio Landing Page",
    description: "Smooth animations & parallax effects",
    tags: ["React", "GSAP", "Framer Motion"],
    category: "Landing Page",
    year: "2024",
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    color: "#A855F7",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Drag-and-drop with real-time sync",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    category: "Web App",
    year: "2023",
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    color: "#EAB308",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Location-based forecasts & interactive maps",
    tags: ["React", "OpenWeather API", "Mapbox"],
    category: "Case Study",
    year: "2023",
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
    color: "#1A1265",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics & content scheduling platform",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    category: "Web App",
    year: "2023",
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "#EC4899",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const imageFollowerRef = useRef<HTMLDivElement>(null)

  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useGSAP(() => {
    // Header animation
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

    // List items stagger animation
    const items = listRef.current?.querySelectorAll(".project-item")
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // Mouse follower setup (desktop only)
    if (!isMobile && imageFollowerRef.current) {
      const follower = imageFollowerRef.current

      // Use quickTo for high performance
      const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" })
      const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" })

      const handleMouseMove = (e: MouseEvent) => {
        // Position 10px above cursor
        xTo(e.clientX)
        yTo(e.clientY - 10)
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, { scope: sectionRef, dependencies: [isMobile] })

  const handleProjectHover = (projectId: number | null) => {
    if (isMobile) return
    setHoveredProject(projectId)

    const follower = imageFollowerRef.current
    if (!follower) return

    if (projectId !== null) {
      gsap.to(follower, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    } else {
      gsap.to(follower, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }

  const currentProject = projects.find((p) => p.id === hoveredProject)

  // Mobile: Card view
  if (isMobile) {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="section-divider relative px-6 py-24"
      >
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-analog drop-shadow-sm">
            Selected Work
          </p>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-navy-primary dark:text-beige-primary drop-shadow-md">
            Featured Projects
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="block overflow-hidden rounded-2xl border-2 border-navy-primary/20 dark:border-beige-primary/20 bg-beige-light dark:bg-navy-dark shadow-lg transition-transform duration-300 active:scale-95"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-dark/60 dark:text-gray-light/60">{project.year}</span>
                </div>
                <h3 className="mb-2 text-xl font-extrabold tracking-tight text-navy-primary dark:text-beige-primary">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-gray-dark/80 dark:text-gray-light/80">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    )
  }

  // Desktop: List view with cursor follower
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-divider relative min-h-screen px-6 py-24 md:px-12"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-20">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-analog drop-shadow-sm">
          Selected Work
        </p>
        <h2 className="mb-6 text-6xl font-extrabold tracking-tight dark:text-navy-primary text-beige-primary drop-shadow-md md:text-8xl">
          Featured Projects
        </h2>
        <p className="text-lg font-semibold dark:text-gray-dark/70 text-gray-light/70">
          Hover to reveal • Click to explore
        </p>
      </div>

      {/* Project List */}
      <div ref={listRef} className="mx-auto max-w-5xl">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.link}
            className="project-item group relative block border-t border-navy-primary/10 py-8 transition-all duration-500 first:border-t-0"
            onMouseEnter={() => handleProjectHover(project.id)}
            onMouseLeave={() => handleProjectHover(null)}
            style={{
              opacity: hoveredProject === null || hoveredProject === project.id ? 1 : 0.3,
            }}
          >
            <div className="flex items-center justify-between gap-8">
              {/* Left: Number */}
              <span className="text-2xl font-bold text-navy-primary/30 dark:text-beige-primary/30 transition-all duration-500 group-hover:text-navy-primary dark:group-hover:text-beige-primary">
                0{index + 1}
              </span>

              {/* Center: Title */}
              <div className="flex-1">
                <h3
                  className="text-4xl font-extrabold tracking-tight transition-all duration-500 md:text-6xl lg:text-7xl dark:text-navy-primary/50 text-beige-primary"
                  style={{
                    color: hoveredProject === project.id ? project.color : undefined,
                    transform:
                      hoveredProject === project.id ? "translateX(20px)" : "translateX(0)",
                    textShadow: hoveredProject === project.id
                      ? `0 4px 12px ${project.color}40, 0 2px 4px rgba(0,0,0,0.1)`
                      : "0 2px 4px rgba(0,0,0,0.05)",
                    WebkitTextStroke: hoveredProject === project.id ? "0.5px currentColor" : "0px",
                  }}
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-base font-medium text-gray-dark/80 dark:text-gray-light/80 transition-opacity duration-500 group-hover:opacity-100 md:opacity-0">
                  {project.description}
                </p>
              </div>

              {/* Right: Meta */}
              <div className="flex flex-col items-end gap-2 text-right">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                  style={{
                    backgroundColor: `${project.color}20`,
                    color: project.color,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-sm text-gray-dark/60">{project.year}</span>
              </div>
            </div>

            {/* Hover indicator arrow */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:right-[-40px] group-hover:opacity-100"
              style={{ color: project.color }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Image Follower (Desktop only) */}
      <div
        ref={imageFollowerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-[400px] w-[500px] -translate-x-1/2 -translate-y-full overflow-hidden rounded-2xl opacity-0 shadow-2xl"
        style={{
          willChange: "transform, opacity",
        }}
      >
        {currentProject && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${currentProject.image})`,
              }}
            />
            {/* Overlay with project info */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="mb-2 flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm opacity-90">{currentProject.description}</p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
