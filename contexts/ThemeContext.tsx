"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
     theme: Theme
     toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
     // Lazy initialization - chỉ chạy 1 lần khi component mount
     const [theme, setTheme] = useState<Theme>(() => {
          if (typeof window === "undefined") return "light"

          const savedTheme = localStorage.getItem("theme") as Theme | null
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
               ? "dark"
               : "light"

          return savedTheme || systemTheme
     })

     // Sync với DOM khi theme thay đổi
     useEffect(() => {
          document.documentElement.classList.toggle("dark", theme === "dark")
          localStorage.setItem("theme", theme)
     }, [theme])

     const toggleTheme = () => {
          setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
     }

     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}

export function useTheme() {
     const context = useContext(ThemeContext)
     if (context === undefined) {
          throw new Error("useTheme must be used within a ThemeProvider")
     }
     return context
}
