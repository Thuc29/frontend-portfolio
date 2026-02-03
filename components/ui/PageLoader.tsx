"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function PageLoader() {
     const loaderRef = useRef<HTMLDivElement>(null)
     const progressRef = useRef<HTMLDivElement>(null)
     const textRef = useRef<HTMLDivElement>(null)
     const [isLoading, setIsLoading] = useState(true)

     useGSAP(() => {
          const loader = loaderRef.current
          const progress = progressRef.current
          const text = textRef.current

          if (!loader || !progress || !text) return

          // Loading animation
          const tl = gsap.timeline()

          // Progress bar animation
          tl.to(progress, {
               width: "100%",
               duration: 2.5,
               ease: "power2.inOut",
          })

          // Text animations
          tl.fromTo(
               text.children,
               { opacity: 0, y: 20 },
               {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
               },
               0.5
          )

          // Exit animation
          tl.to(
               loader,
               {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: () => setIsLoading(false),
               },
               "+=0.5"
          )
     }, [])

     if (!isLoading) return null

     return (
          <div
               ref={loaderRef}
               className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-beige-primary"
          >
               {/* Logo/Text */}
               <div ref={textRef} className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-navy-primary md:text-5xl">
                         Danh Thuc
                    </h1>
                    <p className="mt-2 text-lg text-navy-light">Frontend Developer</p>
               </div>

               {/* Progress bar */}
               <div className="relative h-1 w-64 overflow-hidden rounded-full bg-navy-primary/10">
                    <div
                         ref={progressRef}
                         className="h-full w-0 bg-linear-to-r from-blue-analog to-purple-light"
                    />
               </div>

               {/* Loading text */}
               <p className="mt-4 text-sm text-navy-light">Loading experience...</p>
          </div>
     )
}