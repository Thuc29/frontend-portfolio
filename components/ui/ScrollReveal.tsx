"use client"

import { motion, Variants } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
     children: ReactNode
     className?: string
     staggerDelay?: number
}

const itemVariants: Variants = {
     hidden: {
          y: 30,
          opacity: 0
     },
     visible: {
          y: 0,
          opacity: 1,
          transition: {
               type: "spring" as const,
               stiffness: 100,
               damping: 20,
          },
     },
}

export default function ScrollReveal({ children, className = "", staggerDelay = 0.2 }: ScrollRevealProps) {
     const customContainerVariants: Variants = {
          hidden: { opacity: 0 },
          visible: {
               opacity: 1,
               transition: {
                    staggerChildren: staggerDelay,
               },
          },
     }

     return (
          <motion.div
               className={className}
               variants={customContainerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
          >
               {children}
          </motion.div>
     )
}

export function ScrollRevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
     return (
          <motion.div className={className} variants={itemVariants}>
               {children}
          </motion.div>
     )
}
