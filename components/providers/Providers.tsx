"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import FloatingThemeToggle from "@/components/ui/FloatingThemeToggle"

export function Providers({ children }: { children: React.ReactNode }) {
     return (
          <ThemeProvider>
               <LanguageProvider>
                    <FloatingThemeToggle />
                    {children}
               </LanguageProvider>
          </ThemeProvider>
     )
}
