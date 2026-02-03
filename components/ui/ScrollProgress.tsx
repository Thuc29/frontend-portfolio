"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
     const progressRef = useRef<HTMLDivElement>(null)

     useGSAP(() => {
          const progress = progressRef.current
          if (!progress) return

          gsap.to(progress, {
               scaleX: 1,
               transformOrigin: "left center",
               ease: "none",
               scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3,
               },
          })
     }, [])

     return (
          <div className="fixed left-0 top-0 z-50 h-1 w-full bg-navy-primary/10">
               <div
                    ref={progressRef}
                    className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-blue-analog via-purple-light to-olive-yellow"
               />
          </div>
     )
}