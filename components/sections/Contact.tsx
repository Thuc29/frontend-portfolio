"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
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
    color: "#333333",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0077B5",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#1DA1F2",
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "#EA4335",
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useGSAP(
    () => {
      // Header animation
      gsap.fromTo(
        ".contact-header",
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Form fields stagger
      gsap.fromTo(
        ".form-field",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
          },
        }
      )

      // Social links animation
      gsap.fromTo(
        ".social-link",
        {
          opacity: 0,
          scale: 0,
          rotate: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-links",
            start: "top 85%",
          },
        }
      )
    },
    { scope: sectionRef }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-divider relative min-h-screen px-6 py-24"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-linear-to-br from-blue-analog/10 to-purple-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-linear-to-tr from-purple-light/10 to-blue-analog/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="contact-header mb-16 text-center">
          <motion.p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-analog"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          <h2 className="mb-6 text-5xl font-bold text-navy-primary md:text-6xl lg:text-7xl">
            Let&apos;s Create Something
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-dark/70">
            Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div className="form-field relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => { }}
                  onBlur={() => { }}
                  className="peer w-full rounded-2xl border-2 border-navy-primary/10 bg-beige-light px-6 py-4 text-navy-primary transition-all duration-300 placeholder:text-transparent focus:border-blue-analog focus:outline-none focus:ring-4 focus:ring-blue-analog/10"
                  placeholder="Your Name"
                  required
                />
                <label
                  htmlFor="name"
                  className={`pointer-events-none absolute left-6 top-4 text-gray-dark/60 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:bg-beige-primary peer-focus:px-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-analog ${formData.name ? "-top-3 left-4 bg-beige-primary px-2 text-xs font-semibold text-blue-analog" : ""
                    }`}
                >
                  Your Name
                </label>
              </div>

              {/* Email Field */}
              <div className="form-field relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => { }}
                  onBlur={() => { }}
                  className="peer w-full rounded-2xl border-2 border-navy-primary/10 bg-beige-light px-6 py-4 text-navy-primary transition-all duration-300 placeholder:text-transparent focus:border-blue-analog focus:outline-none focus:ring-4 focus:ring-blue-analog/10"
                  placeholder="your@email.com"
                  required
                />
                <label
                  htmlFor="email"
                  className={`pointer-events-none absolute left-6 top-4 text-gray-dark/60 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:bg-beige-primary peer-focus:px-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-analog ${formData.email ? "-top-3 left-4 bg-beige-primary px-2 text-xs font-semibold text-blue-analog" : ""
                    }`}
                >
                  Email Address
                </label>
              </div>

              {/* Message Field */}
              <div className="form-field relative">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => { }}
                  onBlur={() => { }}
                  className="peer w-full resize-none rounded-2xl border-2 border-navy-primary/10 bg-beige-light px-6 py-4 text-navy-primary transition-all duration-300 placeholder:text-transparent focus:border-blue-analog focus:outline-none focus:ring-4 focus:ring-blue-analog/10"
                  placeholder="Your message..."
                  required
                />
                <label
                  htmlFor="message"
                  className={`pointer-events-none absolute left-6 top-4 text-gray-dark/60 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:bg-beige-primary peer-focus:px-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-analog ${formData.message ? "-top-3 left-4 bg-beige-primary px-2 text-xs font-semibold text-blue-analog" : ""
                    }`}
                >
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full overflow-hidden rounded-2xl bg-navy-primary px-8 py-4 text-base font-bold text-beige-light transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-navy-primary/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-blue-analog to-purple-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Contact Cards */}
            <div className="mb-8 space-y-4">
              <motion.a
                href="mailto:hello@example.com"
                className="group flex items-center gap-4 rounded-2xl border border-navy-primary/10 bg-beige-light p-6 transition-all duration-300 hover:scale-[1.02] hover:border-blue-analog/30 hover:shadow-xl"
                whileHover={{ x: 5 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-analog/10 text-blue-analog transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-analog group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-dark/60">Email</p>
                  <p className="text-lg font-bold text-navy-primary">hello@example.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+1234567890"
                className="group flex items-center gap-4 rounded-2xl border border-navy-primary/10 bg-beige-light p-6 transition-all duration-300 hover:scale-[1.02] hover:border-purple-light/30 hover:shadow-xl"
                whileHover={{ x: 5 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-light/10 text-purple-light transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-light group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-dark/60">Phone</p>
                  <p className="text-lg font-bold text-navy-primary">+1 (234) 567-890</p>
                </div>
              </motion.a>

              <motion.div
                className="group flex items-center gap-4 rounded-2xl border border-navy-primary/10 bg-beige-light p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-olive-yellow/10 text-olive-yellow">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-dark/60">Location</p>
                  <p className="text-lg font-bold text-navy-primary">Your City, Country</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-dark/60">
                Connect With Me
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group flex h-14 w-14 items-center justify-center rounded-xl border border-navy-primary/10 bg-beige-light text-navy-primary transition-all duration-300 hover:scale-110 hover:border-navy-primary/30 hover:shadow-lg"
                    whileHover={{ y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {link.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <motion.a
              href="#"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-light transition-all duration-300 hover:gap-3 hover:text-navy-primary"
              whileHover={{ x: 5 }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume (PDF)
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-24 border-t border-navy-primary/10 pt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-dark/60">
          © 2024 Your Name. Designed & Built with ❤️ using Next.js & Tailwind CSS
        </p>
      </motion.div>
    </section>
  )
}
