"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const timelineData = [
  {
    id: 1,
    type: "experience",
    title: "Senior Frontend Developer",
    company: "Tech Company Inc.",
    period: "2023 - Present",
    description:
      "Leading frontend development team, architecting scalable React applications, and implementing modern design systems with TypeScript and Next.js.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "#4A90E2",
    side: "left",
  },
  {
    id: 2,
    type: "experience",
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    description:
      "Developed responsive web applications, collaborated with designers to create pixel-perfect UIs, and optimized performance for high-traffic websites.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "#6366F1",
    side: "right",
  },
  {
    id: 3,
    type: "experience",
    title: "Junior Web Developer",
    company: "Startup Studio",
    period: "2020 - 2021",
    description:
      "Built modern web interfaces using React and Vue.js, implemented RESTful APIs integration, and learned agile development methodologies.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#A855F7",
    side: "left",
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    period: "2016 - 2020",
    description:
      "Focused on software engineering, data structures, and algorithms. Graduated with honors. Completed thesis on modern web application architecture.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    color: "#DDA0DD",
    side: "right",
  },
  {
    id: 5,
    type: "education",
    title: "Full Stack Development Bootcamp",
    company: "Code Academy",
    period: "2019",
    description:
      "Intensive 6-month program covering modern web technologies including React, Node.js, MongoDB, and cloud deployment strategies.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "#EAB308",
    side: "left",
  },
  {
    id: 6,
    type: "education",
    title: "UI/UX Design Certificate",
    company: "Design Institute",
    period: "2018",
    description:
      "Comprehensive course on user interface design, user experience principles, prototyping tools, and design thinking methodologies.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "#EC4899",
    side: "right",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current) return

      const line = lineRef.current

      // Animate line reveal on scroll
      gsap.fromTo(
        line,
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      )

      // Animate cards on scroll
      const cards = sectionRef.current.querySelectorAll(".timeline-card")
      const nodes = sectionRef.current.querySelectorAll(".timeline-node")

      cards.forEach((card, index) => {
        const node = nodes[index]

        if (card && node) {
          // Card reveal animation
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top center+=150",
                end: "top center",
                scrub: 1,
              },
            }
          )

          // Node glow animation
          gsap.fromTo(
            node,
            {
              scale: 0.8,
              opacity: 0.5,
            },
            {
              scale: 1.2,
              opacity: 1,
              duration: 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top center+=100",
                end: "center center",
                scrub: 1,
              },
            }
          )
        }
      })
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-divider relative min-h-screen px-6 py-24"
    >
      {/* Header */}
      <motion.div
        className="mb-20 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-analog">
          My Journey
        </p>
        <h2 className="mb-6 text-5xl font-bold text-navy-primary md:text-6xl lg:text-7xl">
          Experience & Education
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-dark/70">
          A timeline of my professional growth and learning path
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative mx-auto max-w-6xl">
        {/* Gradient Timeline Line - Using DIV instead of SVG */}
        <div
          ref={lineRef}
          className="timeline-line pointer-events-none absolute left-6 top-0 h-full w-1 md:left-1/2 md:-translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, #4A90E2, #6366F1, #A855F7, #DDA0DD)",
            zIndex: 0,
          }}
        />

        {/* Timeline Items */}
        <div className="relative space-y-24 md:space-y-32">
          {timelineData.map((item) => (
            <div
              key={item.id}
              className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
            >
              {/* Left Side Content */}
              <div
                className={`timeline-card ${item.side === "left" ? "md:order-1" : "md:order-2"
                  }`}
              >
                {item.side === "left" ? (
                  <motion.article
                    className="group relative ml-12 overflow-hidden rounded-3xl border border-navy-primary/10 bg-beige-light p-8 shadow-xl transition-all duration-500 hover:scale-105 hover:border-navy-primary/30 hover:shadow-2xl md:ml-0"
                    whileHover={{ y: -5 }}
                  >
                    {/* Gradient Background */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.color}20, transparent 70%)`,
                      }}
                    />

                    <div className="relative">
                      {/* Type Badge */}
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                          }}
                        >
                          {item.type}
                        </span>
                        <span className="text-sm font-semibold text-gray-dark/60">
                          {item.period}
                        </span>
                      </div>

                      {/* Icon */}
                      <motion.div
                        className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                        style={{
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                        }}
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-2 text-2xl font-bold text-navy-primary md:text-3xl">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <p className="mb-4 text-base font-semibold text-navy-light md:text-lg">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-dark/75 md:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.article>
                ) : null}
              </div>

              {/* Center Node */}
              <div className="absolute left-6 top-8 z-10 md:left-1/2 md:-translate-x-1/2">
                <div
                  className="timeline-node flex h-6 w-6 items-center justify-center rounded-full border-4 border-beige-primary transition-all duration-300"
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  {/* Pulse Ring */}
                  <div
                    className="absolute h-12 w-12 animate-ping rounded-full opacity-20"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>

              {/* Right Side Content */}
              <div
                className={`timeline-card ${item.side === "right" ? "md:order-2" : "md:order-1"
                  }`}
              >
                {item.side === "right" ? (
                  <motion.article
                    className="group relative ml-12 overflow-hidden rounded-3xl border border-navy-primary/10 bg-beige-light p-8 shadow-xl transition-all duration-500 hover:scale-105 hover:border-navy-primary/30 hover:shadow-2xl md:ml-0"
                    whileHover={{ y: -5 }}
                  >
                    {/* Gradient Background */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at top left, ${item.color}20, transparent 70%)`,
                      }}
                    />

                    <div className="relative">
                      {/* Type Badge */}
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                          }}
                        >
                          {item.type}
                        </span>
                        <span className="text-sm font-semibold text-gray-dark/60">
                          {item.period}
                        </span>
                      </div>

                      {/* Icon */}
                      <motion.div
                        className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                        style={{
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                        }}
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-2 text-2xl font-bold text-navy-primary md:text-3xl">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <p className="mb-4 text-base font-semibold text-navy-light md:text-lg">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-dark/75 md:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.article>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <motion.div
        className="mx-auto mt-32 grid max-w-5xl gap-6 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="group rounded-2xl border border-navy-primary/10 bg-beige-light p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-analog/30 hover:shadow-xl">
          <div className="mb-2 bg-linear-to-br from-blue-analog to-navy-primary bg-clip-text text-5xl font-bold text-transparent">
            4+
          </div>
          <div className="text-sm font-semibold uppercase tracking-wider text-gray-dark/70">
            Years Experience
          </div>
        </div>
        <div className="group rounded-2xl border border-navy-primary/10 bg-beige-light p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-light/30 hover:shadow-xl">
          <div className="mb-2 bg-linear-to-br from-purple-light to-navy-primary bg-clip-text text-5xl font-bold text-transparent">
            15+
          </div>
          <div className="text-sm font-semibold uppercase tracking-wider text-gray-dark/70">
            Projects Completed
          </div>
        </div>
        <div className="group rounded-2xl border border-navy-primary/10 bg-beige-light p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-olive-yellow/30 hover:shadow-xl">
          <div className="mb-2 bg-linear-to-br from-olive-yellow to-navy-primary bg-clip-text text-5xl font-bold text-transparent">
            8+
          </div>
          <div className="text-sm font-semibold uppercase tracking-wider text-gray-dark/70">
            Technologies
          </div>
        </div>
      </motion.div>
    </section>
  )
}
