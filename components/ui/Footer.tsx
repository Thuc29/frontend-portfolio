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
          name: "Twitter",
          href: "https://twitter.com",
          icon: (
               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
               </svg>
          ),
     },
]

export default function Footer() {
     const footerRef = useRef<HTMLElement>(null)
     const contentRef = useRef<HTMLDivElement>(null)

     useGSAP(() => {
          gsap.fromTo(
               contentRef.current,
               {
                    opacity: 0,
                    y: 30,
               },
               {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                         trigger: footerRef.current,
                         start: "top 90%",
                    },
               }
          )

          // Social links animation
          const socialItems = contentRef.current?.querySelectorAll(".social-link")
          if (socialItems) {
               gsap.fromTo(
                    socialItems,
                    { opacity: 0, scale: 0, rotation: -180 },
                    {
                         opacity: 1,
                         scale: 1,
                         rotation: 0,
                         duration: 0.5,
                         stagger: 0.1,
                         ease: "back.out(2)",
                         scrollTrigger: {
                              trigger: footerRef.current,
                              start: "top 85%",
                         },
                         delay: 0.3,
                    }
               )
          }
     }, [])

     return (
          <footer
               ref={footerRef}
               className="relative border-t border-navy-primary/10 bg-beige-primary py-12"
          >
               <div ref={contentRef} className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center gap-8 text-center">
                         {/* Logo */}
                         <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-primary text-beige-light">
                                   <span className="font-bold">DT</span>
                              </div>
                              <div>
                                   <h3 className="text-lg font-semibold text-navy-primary">Danh Thuc</h3>
                                   <p className="text-sm text-navy-light">Frontend Developer</p>
                              </div>
                         </div>

                         {/* Social Links */}
                         <div className="flex items-center gap-4">
                              {socialLinks.map((link) => (
                                   <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link cursor-hover group flex h-12 w-12 items-center justify-center rounded-full border border-navy-primary/15 bg-beige-light text-navy-primary transition-all duration-300 hover:scale-110 hover:border-navy-primary/30 hover:bg-navy-primary hover:text-beige-light hover:shadow-lg"
                                        aria-label={link.name}
                                   >
                                        <span className="transition-transform duration-300 group-hover:scale-110">
                                             {link.icon}
                                        </span>
                                   </a>
                              ))}
                         </div>

                         {/* Quick Links */}
                         <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                              {["About", "Projects", "Experience", "Contact"].map((item) => (
                                   <button
                                        key={item}
                                        onClick={() => {
                                             const element = document.getElementById(item.toLowerCase())
                                             element?.scrollIntoView({ behavior: "smooth" })
                                        }}
                                        className="cursor-hover text-navy-light transition-colors duration-300 hover:text-navy-primary"
                                   >
                                        {item}
                                   </button>
                              ))}
                         </div>

                         {/* Copyright */}
                         <div className="border-t border-navy-primary/10 pt-6 text-center">
                              <p className="text-sm text-navy-light">
                                   © {new Date().getFullYear()} Danh Thuc. Built with{" "}
                                   <span className="text-red-500">♥</span> using Next.js & Tailwind CSS.
                              </p>
                              <p className="mt-1 text-xs text-navy-light/70">
                                   Designed & Developed with passion for great user experiences.
                              </p>
                         </div>

                         {/* Back to top */}
                         <button
                              onClick={() => {
                                   window.scrollTo({ top: 0, behavior: "smooth" })
                              }}
                              className="cursor-hover group flex h-10 w-10 items-center justify-center rounded-full bg-navy-primary/10 text-navy-primary transition-all duration-300 hover:bg-navy-primary hover:text-beige-light hover:scale-110"
                              aria-label="Back to top"
                         >
                              <svg
                                   className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                   fill="none"
                                   stroke="currentColor"
                                   viewBox="0 0 24 24"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                   />
                              </svg>
                         </button>
                    </div>
               </div>

               {/* Decorative elements */}
               <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-20 -top-10 h-40 w-40 rounded-full bg-blue-analog/5 blur-3xl" />
                    <div className="absolute -bottom-10 -left-20 h-40 w-40 rounded-full bg-purple-light/5 blur-3xl" />
               </div>
          </footer>
     )
}