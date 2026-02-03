"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: (
      <svg
        className="h-5 w-5"
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
    ),
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Floating blobs
    gsap.to(blob1Ref.current, {
      x: 20,
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
    gsap.to(blob2Ref.current, {
      x: -15,
      y: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Card với circle clip-path reveal từ center
    gsap.fromTo(
      cardRef.current,
      {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
      },
      {
        clipPath: "circle(100% at 50% 50%)",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    )

    // Content stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
      },
    })

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.4 },
      0.6
    )
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
          opacity: 1,
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 0.8,
        },
        0.7
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.9
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
        1
      )
      .fromTo(
        socialsRef.current?.children || [],
        {
          opacity: 0,
          clipPath: "circle(0% at 50% 50%)",
        },
        {
          opacity: 1,
          clipPath: "circle(100% at 50% 50%)",
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        1.1
      )
      .fromTo(
        cvRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        1.4
      )

    // Footer
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
        clipPath: "polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)",
      },
      {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-divider relative mx-auto max-w-6xl px-6 py-24"
    >
      <div
        ref={cardRef}
        className="surface relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        {/* Animated background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            ref={blob1Ref}
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-light/15 to-blue-analog/10 blur-3xl"
          />
          <div
            ref={blob2Ref}
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-analog/15 to-purple-light/10 blur-3xl"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p
            ref={labelRef}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-analog"
          >
            Get In Touch
          </p>
          <h2
            ref={titleRef}
            className="mb-4 text-3xl font-semibold text-navy-primary md:text-4xl"
          >
            Let&apos;s work together
          </h2>
          <p
            ref={descRef}
            className="mb-8 text-base leading-relaxed text-gray-dark/80"
          >
            I&apos;m currently open for new opportunities. Whether you have a
            project in mind or just want to chat, feel free to reach out!
          </p>

          {/* CTA Button */}
          <a
            ref={ctaRef}
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-2 rounded-full bg-navy-primary px-8 py-4 text-sm font-semibold text-beige-light transition-all duration-300 hover:scale-105 hover:bg-navy-dark hover:shadow-xl hover:shadow-navy-primary/20"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
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
            Send me an email
          </a>

          {/* Social Links */}
          <div ref={socialsRef} className="mt-10 flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-navy-primary/15 bg-beige-primary text-navy-primary transition-all duration-300 hover:scale-110 hover:border-navy-primary/30 hover:bg-navy-primary hover:text-beige-light hover:shadow-lg"
                aria-label={link.name}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Download CV */}
          <div ref={cvRef} className="mt-8">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium text-navy-light transition-all duration-300 hover:gap-3 hover:text-navy-primary"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="mt-12 text-center text-sm text-navy-light">
        <p>© 2024 Your Name. Built with Next.js & Tailwind CSS.</p>
      </div>
    </section>
  )
}
