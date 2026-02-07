"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MagneticButton from "./MagneticButton"

interface ThemeToggleProps {
     colorScheme: {
          downloadBtn: string
     }
}

export default function ThemeToggle({ colorScheme }: ThemeToggleProps) {
     const { theme, toggleTheme } = useTheme()

     return (
          <MagneticButton
               className={`cursor-hover relative flex h-10 w-10 items-center justify-center rounded-full ${colorScheme.downloadBtn} transition-all duration-300 hover:scale-110 shadow-sm backdrop-blur-sm overflow-hidden`}
               strength={0.2}
               onClick={toggleTheme}
               aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
               <AnimatePresence mode="wait" initial={false}>
                    {theme === "light" ? (
                         <motion.div
                              key="sun"
                              initial={{ y: -20, opacity: 0, rotate: -90 }}
                              animate={{ y: 0, opacity: 1, rotate: 0 }}
                              exit={{ y: 20, opacity: 0, rotate: 90 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                         >
                              <Sun className="h-5 w-5" />
                         </motion.div>
                    ) : (
                         <motion.div
                              key="moon"
                              initial={{ y: -20, opacity: 0, rotate: 90 }}
                              animate={{ y: 0, opacity: 1, rotate: 0 }}
                              exit={{ y: 20, opacity: 0, rotate: -90 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                         >
                              <Moon className="h-5 w-5" />
                         </motion.div>
                    )}
               </AnimatePresence>
          </MagneticButton>
     )
}
