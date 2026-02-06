"use client"

import { useState } from "react"

export function useSpotlight() {
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlightPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return {
    spotlightPosition,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  }
}
