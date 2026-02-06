"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Code2, Github, Linkedin, Facebook, MessageCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const mascotRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mascot movement
  const springConfig = { damping: 25, stiffness: 150 }
  const mascotX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig)
  const mascotY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), springConfig)
  const mascotRotate = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize mouse position to -1 to 1
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useGSAP(
    () => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Stagger animation for content
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )

      // Mascot float animation
      gsap.to(mascotRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: sectionRef }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Newsletter signup:", email)
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Curved Top Divider SVG */}
      <div className="relative -mb-1">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ height: "120px" }}
        >
          <path
            d="M0,64 C240,20 480,0 720,20 C960,40 1200,80 1440,64 L1440,120 L0,120 Z"
            fill="#8B5CF6"
          />
        </svg>
      </div>

      <section
        id="contact"
        ref={sectionRef}
        className="relative overflow-hidden bg-[#8B5CF6] px-6 pt-10 md:pt-14"
      >
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Grid Layout - 3 Columns */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
            {/* Column 1: Newsletter Form */}
            <div className="contact-item flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-8 font-sans text-5xl font-bold leading-tight text-black md:text-6xl lg:text-7xl">
                  stay
                  <br />
                  connected
                </h2>

                <form onSubmit={handleSubmit} className="relative">
                  <div className="group relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full border-b-2 border-black/30 bg-transparent pb-3 pr-16 text-lg text-black placeholder-black/50 transition-all duration-300 focus:border-black focus:outline-none"
                    />

                    {/* Submit Button - Circle with Arrow */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute bottom-1 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-110 disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>

                  <p className="mt-4 text-sm text-black/70">
                    Contact with me
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Column 2: 3D Business Card */}
            <div className="contact-item relative flex items-center justify-center md:col-span-1">
              <motion.div
                ref={mascotRef}
                style={{
                  x: mascotX,
                  y: mascotY,
                  rotateY: mascotRotate,
                }}
                className="relative"
              >
                {/* 3D Business Card */}
                <div className="relative h-64 w-full md:h-80 md:w-80 lg:h-96 lg:w-96">
                  {/* Card Container with 3D perspective */}
                  <motion.div
                    className="relative h-full w-full"
                    style={{ perspective: "1000px" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Shadow */}
                    <div className="absolute bottom-0 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/30 blur-2xl" />

                    {/* Main Card */}
                    <motion.div
                      className="relative h-full w-full rounded-3xl bg-white p-8 shadow-2xl"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Card Border Gradient */}
                      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-500 via-blue-500 to-purple-600 p-[2px]">
                        <div className="h-full w-full rounded-3xl bg-white" />
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        {/* Top Section */}
                        <div>
                          <motion.div
                            className="mb-3 inline-flex rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 p-3"
                            animate={{
                              boxShadow: [
                                "0 10px 30px rgba(139, 92, 246, 0.3)",
                                "0 10px 40px rgba(139, 92, 246, 0.5)",
                                "0 10px 30px rgba(139, 92, 246, 0.3)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Code2 className="h-12 w-12 text-white" />
                          </motion.div>

                          <h3 className="mb-2 text-2xl font-bold text-gray-900">
                            Tran Danh Thuc
                          </h3>
                          <p className="text-lg font-semibold text-purple-600">
                            Frontend Developer
                          </p>
                        </div>

                        {/* Middle Section - Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {["React", "Next.js", "TypeScript", "Tailwind"].map((tech, i) => (
                            <motion.span
                              key={tech}
                              className="rounded-full bg-linear-to-r from-purple-100 to-blue-100 px-3 py-1 text-xs font-semibold text-purple-700"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 + 0.5 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Bottom Section - QR Code Placeholder */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <motion.div
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-blue-500 text-white"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <Github className="h-5 w-5" />
                            </motion.div>
                            <motion.div
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-500 text-white"
                              whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                              <Linkedin className="h-5 w-5" />
                            </motion.div>
                          </div>

                          {/* QR Code Style Decoration */}
                          <div className="grid h-16 w-16 grid-cols-3 gap-1 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 p-2">
                            {[...Array(9)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="rounded-sm bg-white"
                                animate={{
                                  opacity: [1, 0.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating Particles */}
                      <motion.div
                        className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-linear-to-br from-purple-400 to-blue-400"
                        animate={{
                          y: [-10, 10, -10],
                          x: [-5, 5, -5],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-linear-to-br from-blue-400 to-purple-400"
                        animate={{
                          y: [10, -10, 10],
                          x: [5, -5, 5],
                        }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Column 3: Contact Information */}
            <div className="contact-item flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-black/60">
                    Email
                  </h3>
                  <motion.a
                    href="mailto:thuc290803@gmail.com"
                    className="group relative inline-block text-2xl font-bold text-black md:text-3xl"
                    whileHover={{ x: 5 }}
                  >
                    thuc290803@gmail.com
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-black/60">
                    Phone
                  </h3>
                  <motion.a
                    href="tel:+84123456789"
                    className="group relative inline-block text-2xl font-bold text-black md:text-3xl"
                    whileHover={{ x: 5 }}
                  >
                    +84 387 029 603
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-black/60">
                    Location
                  </h3>
                  <p className="text-xl font-semibold text-black md:text-2xl">
                    Gia Binh, Bac Ninh
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-black/60">
                    Connect
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        name: "GitHub",
                        url: "https://github.com/Thuc29",
                        icon: <Github className="h-5 w-5" />
                      },
                      {
                        name: "LinkedIn",
                        url: "https://www.linkedin.com/in/thực-trần-danh-764777323",
                        icon: <Linkedin className="h-5 w-5" />
                      },
                      {
                        name: "Facebook",
                        url: "https://www.facebook.com/ImThuc29",
                        icon: <Facebook className="h-5 w-5" />
                      }
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-2 text-base font-semibold text-black transition-colors hover:text-black/70"
                        whileHover={{ y: -2 }}
                      >
                        {social.icon}
                        <span className="hidden sm:inline">{social.name}</span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="mt-10 border-t border-black/20 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm font-medium text-black/70">
                © 2026 Tran Danh Thuc. Crafted with passion & code.
              </p>
              <div className="flex gap-6">
                <motion.a
                  href="#"
                  className="group relative text-sm font-semibold text-black"
                  whileHover={{ y: -2 }}
                >
                  Resume
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="group relative text-sm font-semibold text-black"
                  whileHover={{ y: -2 }}
                >
                  Source Code
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
