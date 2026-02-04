"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useCursorEffects } from "@/hooks/useCursorEffects"

export default function CustomCursor() {
     const cursorRef = useRef<HTMLDivElement>(null)
     const followerRef = useRef<HTMLDivElement>(null)
     const textRef = useRef<HTMLDivElement>(null)
     const [cursorText, setCursorText] = useState("")
     const [isClicking, setIsClicking] = useState(false)

     // Check if mobile on component mount
     const [isMobile] = useState(() => {
          if (typeof window !== 'undefined') {
               return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
               )
          }
          return false
     })
     const { createTrailEffect, createClickRipple } = useCursorEffects()

     useGSAP(() => {
          const cursor = cursorRef.current
          const follower = followerRef.current
          const text = textRef.current

          if (!cursor || !follower || !text) return

          let mouseX = 0
          let mouseY = 0
          let isMoving = false
          let moveTimeout: NodeJS.Timeout
          let trailTimeout: NodeJS.Timeout

          const handleMouseMove = (e: MouseEvent) => {
               mouseX = e.clientX
               mouseY = e.clientY

               // Immediate cursor movement
               gsap.set(cursor, {
                    x: mouseX,
                    y: mouseY,
               })

               // Smooth follower movement with elastic effect
               gsap.to(follower, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.6,
                    ease: "power3.out",
               })

               // Text follows with slight delay
               gsap.to(text, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.4,
                    ease: "power2.out",
               })

               // Movement detection for dynamic effects
               if (!isMoving) {
                    isMoving = true
                    gsap.to(follower, {
                         scale: 1.2,
                         duration: 0.2,
                         ease: "power2.out",
                    })
               }

               clearTimeout(moveTimeout)
               moveTimeout = setTimeout(() => {
                    isMoving = false
                    gsap.to(follower, {
                         scale: 1,
                         duration: 0.3,
                         ease: "power2.out",
                    })
               }, 150)

               // Create trail effect occasionally
               clearTimeout(trailTimeout)
               trailTimeout = setTimeout(() => {
                    if (Math.random() > 0.7) {
                         createTrailEffect(mouseX, mouseY)
                    }
               }, 100)
          }

          const handleMouseDown = (e: MouseEvent) => {
               setIsClicking(true)
               createClickRipple(e.clientX, e.clientY)

               gsap.to(cursor, {
                    scale: 0.8,
                    duration: 0.1,
                    ease: "power2.out",
               })
               gsap.to(follower, {
                    scale: 0.9,
                    duration: 0.1,
                    ease: "power2.out",
               })
          }

          const handleMouseUp = () => {
               setIsClicking(false)

               gsap.to(cursor, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(2)",
               })
               gsap.to(follower, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(2)",
               })
          }

          const handleMouseEnter = () => {
               gsap.to([cursor, follower], {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
               })
          }

          const handleMouseLeave = () => {
               gsap.to([cursor, follower, text], {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          // Enhanced hover effects for different element types
          const handleHoverEnter = (e: Event) => {
               const target = e.target as HTMLElement
               const elementType = target.tagName.toLowerCase()
               const hasText = target.textContent?.trim()
               const isButton = elementType === 'button' || target.classList.contains('cursor-hover')

               if (isButton) {
                    gsap.to(cursor, {
                         scale: 0.3,
                         duration: 0.3,
                         ease: "back.out(2)",
                    })
                    gsap.to(follower, {
                         scale: 2.5,
                         duration: 0.4,
                         ease: "back.out(1.7)",
                         borderWidth: "2px",
                         borderColor: "rgba(26,18,101,0.6)",
                    })

                    // Show text for buttons
                    if (hasText && hasText.length < 20) {
                         setCursorText(hasText)
                         gsap.to(text, {
                              opacity: 1,
                              scale: 1,
                              duration: 0.3,
                              ease: "back.out(2)",
                         })
                    }
               } else if (elementType === 'a') {
                    gsap.to(cursor, {
                         scale: 0.5,
                         duration: 0.3,
                         ease: "power2.out",
                    })
                    gsap.to(follower, {
                         scale: 2,
                         duration: 0.3,
                         ease: "power2.out",
                         rotation: 45,
                         borderColor: "rgba(74,144,226,0.6)",
                    })
                    setCursorText("→")
                    gsap.to(text, {
                         opacity: 1,
                         scale: 1,
                         duration: 0.3,
                         ease: "power2.out",
                    })
               } else if (elementType === 'input' || elementType === 'textarea') {
                    gsap.to(cursor, {
                         scale: 0.1,
                         duration: 0.3,
                         ease: "power2.out",
                    })
                    gsap.to(follower, {
                         scale: 1.5,
                         duration: 0.3,
                         ease: "power2.out",
                         borderColor: "rgba(189,183,107,0.6)",
                    })
                    setCursorText("✎")
                    gsap.to(text, {
                         opacity: 1,
                         scale: 1,
                         duration: 0.3,
                         ease: "power2.out",
                    })
               } else {
                    // Default hover effect
                    gsap.to(cursor, {
                         scale: 0.6,
                         duration: 0.3,
                         ease: "power2.out",
                    })
                    gsap.to(follower, {
                         scale: 1.8,
                         duration: 0.3,
                         ease: "power2.out",
                    })
               }
          }

          const handleHoverLeave = () => {
               gsap.to(cursor, {
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)",
               })
               gsap.to(follower, {
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                    rotation: 0,
                    borderWidth: "1px",
                    borderColor: "rgba(26,18,101,0.4)",
               })
               gsap.to(text, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    ease: "power2.out",
               })
               setCursorText("")
          }

          // Special effects for specific elements
          const handleVideoHover = () => {
               setCursorText("▶")
               gsap.to(follower, {
                    scale: 3,
                    duration: 0.4,
                    ease: "power2.out",
                    borderColor: "rgba(221,160,221,0.6)",
               })
               gsap.to(text, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          const handleImageHover = () => {
               gsap.to(follower, {
                    scale: 2.5,
                    duration: 0.4,
                    ease: "power2.out",
                    borderWidth: "3px",
                    borderColor: "rgba(74,144,226,0.6)",
               })
               setCursorText("🔍")
               gsap.to(text, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          // Event listeners
          document.addEventListener("mousemove", handleMouseMove, { passive: true })
          document.addEventListener("mousedown", handleMouseDown)
          document.addEventListener("mouseup", handleMouseUp)
          document.addEventListener("mouseenter", handleMouseEnter)
          document.addEventListener("mouseleave", handleMouseLeave)

          // Add hover effects to interactive elements
          const interactiveElements = document.querySelectorAll(
               "a, button, [role='button'], .cursor-hover, input, textarea"
          )
          const videoElements = document.querySelectorAll("video")
          const imageElements = document.querySelectorAll("img")

          interactiveElements.forEach((el) => {
               el.addEventListener("mouseenter", handleHoverEnter)
               el.addEventListener("mouseleave", handleHoverLeave)
          })

          videoElements.forEach((el) => {
               el.addEventListener("mouseenter", handleVideoHover)
               el.addEventListener("mouseleave", handleHoverLeave)
          })

          imageElements.forEach((el) => {
               el.addEventListener("mouseenter", handleImageHover)
               el.addEventListener("mouseleave", handleHoverLeave)
          })

          return () => {
               clearTimeout(moveTimeout)
               clearTimeout(trailTimeout)
               document.removeEventListener("mousemove", handleMouseMove)
               document.removeEventListener("mousedown", handleMouseDown)
               document.removeEventListener("mouseup", handleMouseUp)
               document.removeEventListener("mouseenter", handleMouseEnter)
               document.removeEventListener("mouseleave", handleMouseLeave)

               interactiveElements.forEach((el) => {
                    el.removeEventListener("mouseenter", handleHoverEnter)
                    el.removeEventListener("mouseleave", handleHoverLeave)
               })

               videoElements.forEach((el) => {
                    el.removeEventListener("mouseenter", handleVideoHover)
                    el.removeEventListener("mouseleave", handleHoverLeave)
               })

               imageElements.forEach((el) => {
                    el.removeEventListener("mouseenter", handleImageHover)
                    el.removeEventListener("mouseleave", handleHoverLeave)
               })
          }
     }, [createTrailEffect, createClickRipple])



     return (
          !isMobile ? (
               <>
                    {/* Main cursor dot */}
                    <div
                         ref={cursorRef}
                         className={`pointer-events-none fixed left-0 top-0 z-9999 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow-lg transition-all duration-100 ${isClicking ? "bg-blue-analog" : "bg-navy-primary"
                              }`}
                         style={{
                              willChange: "transform",
                              mixBlendMode: "difference",
                         }}
                    />

                    {/* Follower circle with gradient border */}
                    <div
                         ref={followerRef}
                         className="pointer-events-none fixed left-0 top-0 z-9998 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-primary/40 opacity-0 backdrop-blur-sm transition-colors duration-300"
                         style={{
                              willChange: "transform",
                              background: "radial-gradient(circle, rgba(26,18,101,0.05) 0%, transparent 70%)",
                              boxShadow: "0 0 20px rgba(26,18,101,0.1)",
                         }}
                    />

                    {/* Dynamic text */}
                    <div
                         ref={textRef}
                         className="pointer-events-none fixed left-0 top-0 z-9997 -translate-x-1/2 -translate-y-1/2 opacity-0"
                         style={{ willChange: "transform" }}
                    >
                         <div className="relative translate-x-6 translate-y-6">
                              <span className="rounded-full bg-navy-primary/90 px-3 py-1 text-xs font-semibold text-beige-primary backdrop-blur-md shadow-lg">
                                   {cursorText}
                              </span>
                         </div>
                    </div>
               </>
          ) : null
     )
}