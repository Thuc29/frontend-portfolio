"use client"

import { useRef, ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface MagneticButtonProps {
     children: ReactNode
     className?: string
     strength?: number
     onClick?: () => void
}

export default function MagneticButton({
     children,
     className = "",
     strength = 0.3,
     onClick,
}: MagneticButtonProps) {
     const buttonRef = useRef<HTMLButtonElement>(null)

     useGSAP(() => {
          const button = buttonRef.current
          if (!button) return

          const handleMouseMove = (e: MouseEvent) => {
               const rect = button.getBoundingClientRect()
               const centerX = rect.left + rect.width / 2
               const centerY = rect.top + rect.height / 2

               const deltaX = (e.clientX - centerX) * strength
               const deltaY = (e.clientY - centerY) * strength

               gsap.to(button, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.3,
                    ease: "power2.out",
               })
          }

          const handleMouseLeave = () => {
               gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)",
               })
          }

          button.addEventListener("mousemove", handleMouseMove)
          button.addEventListener("mouseleave", handleMouseLeave)

          return () => {
               button.removeEventListener("mousemove", handleMouseMove)
               button.removeEventListener("mouseleave", handleMouseLeave)
          }
     }, [strength])

     return (
          <button
               ref={buttonRef}
               className={`cursor-hover transition-all duration-300 ${className}`}
               onClick={onClick}
          >
               {children}
          </button>
     )
}