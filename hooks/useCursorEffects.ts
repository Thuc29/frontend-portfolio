"use client"

import { useCallback } from "react"
import gsap from "gsap"

export const useCursorEffects = () => {
  const createTrailEffect = useCallback((x: number, y: number) => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail fixed pointer-events-none z-[9995] h-1 w-1 rounded-full bg-blue-analog/40"
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`
    trail.style.transform = "translate(-50%, -50%)"
    
    document.body.appendChild(trail)
    
    gsap.to(trail, {
      opacity: 0,
      scale: 0.3,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        document.body.removeChild(trail)
      }
    })
  }, [])

  const createClickRipple = useCallback((x: number, y: number) => {
    const ripple = document.createElement("div")
    ripple.className = "fixed pointer-events-none z-[9994] rounded-full border-2 border-navy-primary/30"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.transform = "translate(-50%, -50%)"
    ripple.style.width = "10px"
    ripple.style.height = "10px"
    
    document.body.appendChild(ripple)
    
    gsap.to(ripple, {
      width: "60px",
      height: "60px",
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        document.body.removeChild(ripple)
      }
    })
  }, [])

  const magneticEffect = useCallback((element: HTMLElement, strength: number = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return {
    createTrailEffect,
    createClickRipple,
    magneticEffect
  }
}