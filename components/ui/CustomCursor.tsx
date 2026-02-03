"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function CustomCursor() {
     const cursorRef = useRef<HTMLDivElement>(null)
     const followerRef = useRef<HTMLDivElement>(null)

     useGSAP(() => {
          const cursor = cursorRef.current
          const follower = followerRef.current

          if (!cursor || !follower) return

          let mouseX = 0
          let mouseY = 0

          const handleMouseMove = (e: MouseEvent) => {
               mouseX = e.clientX
               mouseY = e.clientY

               gsap.to(cursor, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0,
               })

               gsap.to(follower, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          const handleMouseEnter = () => {
               gsap.to([cursor, follower], {
                    opacity: 1,
                    duration: 0.3,
               })
          }

          const handleMouseLeave = () => {
               gsap.to([cursor, follower], {
                    opacity: 0,
                    duration: 0.3,
               })
          }

          // Hover effects for interactive elements
          const handleHoverEnter = () => {
               gsap.to(cursor, {
                    scale: 0.5,
                    duration: 0.3,
                    ease: "power2.out",
               })
               gsap.to(follower, {
                    scale: 2,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          const handleHoverLeave = () => {
               gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
               })
               gsap.to(follower, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          // Event listeners
          document.addEventListener("mousemove", handleMouseMove)
          document.addEventListener("mouseenter", handleMouseEnter)
          document.addEventListener("mouseleave", handleMouseLeave)

          // Add hover effects to interactive elements
          const interactiveElements = document.querySelectorAll(
               "a, button, [role='button'], .cursor-hover"
          )

          interactiveElements.forEach((el) => {
               el.addEventListener("mouseenter", handleHoverEnter)
               el.addEventListener("mouseleave", handleHoverLeave)
          })

          return () => {
               document.removeEventListener("mousemove", handleMouseMove)
               document.removeEventListener("mouseenter", handleMouseEnter)
               document.removeEventListener("mouseleave", handleMouseLeave)

               interactiveElements.forEach((el) => {
                    el.removeEventListener("mouseenter", handleHoverEnter)
                    el.removeEventListener("mouseleave", handleHoverLeave)
               })
          }
     }, [])

     return (
          <>
               {/* Main cursor dot */}
               <div
                    ref={cursorRef}
                    className="pointer-events-none fixed left-0 top-0 z-9999 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-primary opacity-0 mix-blend-difference"
                    style={{ willChange: "transform" }}
               />

               {/* Follower circle */}
               <div
                    ref={followerRef}
                    className="pointer-events-none fixed left-0 top-0 z-9998 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-primary/30 opacity-0"
                    style={{ willChange: "transform" }}
               />
          </>
     )
}