"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MagneticButton from "./MagneticButton"

export default function FloatingThemeToggle() {
     const { theme, toggleTheme } = useTheme()

     return (
          <div className="fixed bottom-6 right-6 z-100">
               <MagneticButton
                    className={`cursor-hover relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-md overflow-hidden border-2 ${theme === "light"
                         ? "bg-navy-dark/90 border-navy-dark text-beige-light hover:bg-navy-dark hover:border-navy-primary"
                         : "bg-amber-50/90 border-amber-50 text-blue-950 hover:bg-amber-50 hover:border-amber-50"
                         } ring-2 ring-offset-2 ${theme === "light"
                              ? "ring-navy-dark/30 ring-offset-white"
                              : "ring-amber-50/30 ring-offset-gray-900"
                         }`}
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
                                   <Sun className="h-6 w-6" />
                              </motion.div>
                         ) : (
                              <motion.div
                                   key="moon"
                                   initial={{ y: -20, opacity: 0, rotate: 90 }}
                                   animate={{ y: 0, opacity: 1, rotate: 0 }}
                                   exit={{ y: 20, opacity: 0, rotate: -90 }}
                                   transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                   <Moon className="h-6 w-6" />
                              </motion.div>
                         )}
                    </AnimatePresence>
               </MagneticButton>
          </div>
     )
}
