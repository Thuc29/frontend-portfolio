"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import MagneticButton from "./MagneticButton"

interface LanguageSwitcherProps {
     colorScheme: {
          downloadBtn: string
          mobileMenuBg: string
          mobileMenuText: string
          mobileMenuHover: string
     }
}

export default function LanguageSwitcher({ colorScheme }: LanguageSwitcherProps) {
     const { language, setLanguage } = useLanguage()
     const [isOpen, setIsOpen] = useState(false)
     const dropdownRef = useRef<HTMLDivElement>(null)

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
               }
          }

          document.addEventListener("mousedown", handleClickOutside)
          return () => document.removeEventListener("mousedown", handleClickOutside)
     }, [])

     const languages = [
          { code: "en" as const, label: "English", flag: "🇬🇧" },
          { code: "vi" as const, label: "Tiếng Việt", flag: "🇻🇳" },
     ]

     return (
          <div ref={dropdownRef} className="relative">
               <MagneticButton
                    className={`cursor-hover relative flex h-10 items-center gap-2 rounded-full ${colorScheme.downloadBtn} px-3 transition-all duration-300 hover:scale-105 shadow-sm backdrop-blur-sm`}
                    strength={0.2}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Change language"
                    aria-expanded={isOpen}
               >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-bold uppercase">{language}</span>

                    {/* Dropdown arrow */}
                    <motion.svg
                         className="h-3 w-3"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                         animate={{ rotate: isOpen ? 180 : 0 }}
                         transition={{ duration: 0.2 }}
                    >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
               </MagneticButton>

               {/* Dropdown Menu */}
               <AnimatePresence>
                    {isOpen && (
                         <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className={`absolute right-0 top-full mt-2 w-48 rounded-xl ${colorScheme.mobileMenuBg} p-2 shadow-xl backdrop-blur-md border`}
                         >
                              {languages.map((lang) => (
                                   <motion.button
                                        key={lang.code}
                                        onClick={() => {
                                             setLanguage(lang.code)
                                             setIsOpen(false)
                                        }}
                                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${language === lang.code
                                             ? "bg-blue-analog/20 text-blue-analog"
                                             : `${colorScheme.mobileMenuText} ${colorScheme.mobileMenuHover}`
                                             }`}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                   >
                                        <span className="text-xl">{lang.flag}</span>
                                        <span className="flex-1">{lang.label}</span>
                                        {language === lang.code && (
                                             <motion.svg
                                                  className="h-4 w-4"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                             >
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                             </motion.svg>
                                        )}
                                   </motion.button>
                              ))}
                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     )
}
