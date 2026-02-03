"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    type: "work",
    title: "Frontend Developer",
    company: "Company Name",
    period: "2023 - Present",
    description:
      "Building responsive web applications using React and Next.js. Collaborating with design team to implement pixel-perfect UI components.",
  },
  {
    type: "work",
    title: "Junior Developer",
    company: "Previous Company",
    period: "2022 - 2023",
    description:
      "Developed and maintained client websites. Implemented new features and optimized performance for existing applications.",
  },
]

const education = [
  {
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University Name",
    period: "2018 - 2022",
    description:
      "Focused on software engineering and web development. Graduated with honors.",
  },
  {
    type: "education",
    title: "Frontend Development Certificate",
    company: "Online Platform",
    period: "2021",
    description:
      "Completed comprehensive frontend development course covering React, TypeScript, and modern web technologies.",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const expColumnRef = useRef<HTMLDivElement>(null)
  const eduColumnRef = useRef<HTMLDivElement>(null)
  const expLineRef = useRef<HTMLDivElement>(null)
  const eduLineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header với clip-path từ trên xuống
    gsap.fromTo(
      headerRef.current,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
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

    // Experience column với clip-path từ trái
    gsap.fromTo(
      expColumnRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: expColumnRef.current,
          start: "top 80%",
        },
      }
    )

    // Experience timeline line draw
    gsap.fromTo(
      expLineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: expColumnRef.current,
          start: "top 75%",
        },
        delay: 0.3,
      }
    )

    // Experience items
    const expItems = expColumnRef.current?.querySelectorAll(".timeline-item")
    if (expItems) {
      expItems.forEach((item, i) => {
        const dot = item.querySelector(".timeline-dot")
        const content = item.querySelector(".timeline-content")

        gsap.fromTo(
          dot,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            delay: i * 0.2 + 0.5,
          }
        )

        gsap.fromTo(
          content,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            delay: i * 0.2 + 0.6,
          }
        )
      })
    }

    // Education column với clip-path từ phải
    gsap.fromTo(
      eduColumnRef.current,
      {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        opacity: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: eduColumnRef.current,
          start: "top 80%",
        },
      }
    )

    // Education timeline line draw
    gsap.fromTo(
      eduLineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: eduColumnRef.current,
          start: "top 75%",
        },
        delay: 0.3,
      }
    )

    // Education items
    const eduItems = eduColumnRef.current?.querySelectorAll(".timeline-item")
    if (eduItems) {
      eduItems.forEach((item, i) => {
        const dot = item.querySelector(".timeline-dot")
        const content = item.querySelector(".timeline-content")

        gsap.fromTo(
          dot,
          { scale: 0, rotate: 180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            delay: i * 0.2 + 0.5,
          }
        )

        gsap.fromTo(
          content,
          {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            delay: i * 0.2 + 0.6,
          }
        )
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-divider relative mx-auto max-w-6xl px-6 py-24"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog">
          Background
        </p>
        <h2 className="mb-4 text-3xl font-semibold text-navy-primary md:text-4xl">
          Experience & Education
        </h2>
      </div>

      {/* Two columns */}
      <div className="grid gap-12 md:grid-cols-2">
        {/* Experience */}
        <div ref={expColumnRef}>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-navy-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-analog/10">
              <svg
                className="h-4 w-4 text-blue-analog"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            Work Experience
          </h3>
          <div className="relative space-y-6">
            {/* Timeline line */}
            <div
              ref={expLineRef}
              className="absolute bottom-0 left-[7px] top-0 w-[2px] bg-gradient-to-b from-blue-analog via-navy-primary/30 to-transparent"
            />

            {experiences.map((item, index) => (
              <div key={index} className="timeline-item relative pl-8">
                <div className="timeline-dot absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-analog bg-beige-primary shadow-lg shadow-blue-analog/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-analog" />
                </div>
                <div className="timeline-content rounded-2xl border border-navy-primary/10 bg-beige-light p-4 transition-all duration-300 hover:border-navy-primary/20 hover:shadow-lg">
                  <span className="mb-1 inline-block rounded-full bg-blue-analog/10 px-3 py-1 text-xs font-medium text-blue-analog">
                    {item.period}
                  </span>
                  <h4 className="mt-2 text-lg font-semibold text-navy-primary">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-navy-light">
                    {item.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-dark/75">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={eduColumnRef}>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-navy-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-light/10">
              <svg
                className="h-4 w-4 text-purple-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </span>
            Education
          </h3>
          <div className="relative space-y-6">
            {/* Timeline line */}
            <div
              ref={eduLineRef}
              className="absolute bottom-0 left-[7px] top-0 w-[2px] bg-gradient-to-b from-purple-light via-navy-primary/30 to-transparent"
            />

            {education.map((item, index) => (
              <div key={index} className="timeline-item relative pl-8">
                <div className="timeline-dot absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-purple-light bg-beige-primary shadow-lg shadow-purple-light/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-light" />
                </div>
                <div className="timeline-content rounded-2xl border border-navy-primary/10 bg-beige-light p-4 transition-all duration-300 hover:border-navy-primary/20 hover:shadow-lg">
                  <span className="mb-1 inline-block rounded-full bg-purple-light/10 px-3 py-1 text-xs font-medium text-purple-light">
                    {item.period}
                  </span>
                  <h4 className="mt-2 text-lg font-semibold text-navy-primary">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-navy-light">
                    {item.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-dark/75">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
