"use client"
import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
} from "@/components/sections"
import Header from "@/components/ui/Header"
import SideTimeline from "@/components/ui/SideTimeline"
import CustomCursor from "@/components/ui/CustomCursor"
import PageLoader from "@/components/ui/PageLoader"
import ScrollProgress from "@/components/ui/ScrollProgress"
import { useGSAP } from "@gsap/react"
import { ScrollSmoother } from "gsap/all"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function Home() {
  useGSAP(() => {
    // Enhanced ScrollSmoother with better performance
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    })

    // Global parallax effects
    const parallaxElements = gsap.utils.toArray("[data-speed]") as Element[]
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed")
      gsap.to(element, {
        yPercent: -50 * Number(speed),
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    // Smooth reveal for sections
    const sections = gsap.utils.toArray("section") as Element[]
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })
  }, [])
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <main className="min-h-screen">
        <Header />
        <SideTimeline />
        <div id='smooth-wrapper'>
          <div id='smooth-content'>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </div>
      </main>
    </>
  )
}
