"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
     language: Language
     setLanguage: (lang: Language) => void
     t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
     en: {
          // Navigation
          "nav.home": "Home",
          "nav.about": "About",
          "nav.skills": "Skills",
          "nav.projects": "Projects",
          "nav.experience": "Experience",
          "nav.contact": "Contact",

          // Header
          "header.downloadCV": "Download CV",
          "header.contact": "Contact",

          // Hero
          "hero.greeting": "Hello - I'm",
          "hero.name": "Tran Danh Thuc",
          "hero.role": "Frontend Developer",
          "hero.description": "A passionate Frontend Developer who loves building beautiful and responsive websites with modern technologies.",
          "hero.viewWork": "View My Work",
          "hero.getInTouch": "Get In Touch",

          // Skills
          "skills.title": "Skills & Technologies",
          "skills.subtitle": "Tech Stack",
          "skills.hover": "Hover to reveal • Touch to pause",

          // Projects
          "projects.title": "Featured Projects",
          "projects.subtitle": "Selected Work",
          "projects.hover": "Hover to reveal • Click to explore",

          // Contact
          "contact.title": "stay connected",
          "contact.email": "Email",
          "contact.phone": "Phone",
          "contact.location": "Location",
          "contact.connect": "Connect",
          "contact.newsletter": "Contact with me",
          "contact.placeholder": "your@email.com",
          "contact.footer": "Crafted with passion & code.",
     },
     vi: {
          // Navigation
          "nav.home": "Trang chủ",
          "nav.about": "Giới thiệu",
          "nav.skills": "Kỹ năng",
          "nav.projects": "Dự án",
          "nav.experience": "Kinh nghiệm",
          "nav.contact": "Liên hệ",

          // Header
          "header.downloadCV": "Tải CV",
          "header.contact": "Liên hệ",

          // Hero
          "hero.greeting": "Xin chào - Tôi là",
          "hero.name": "Trần Danh Thức",
          "hero.role": "Lập trình viên Frontend",
          "hero.description": "Một lập trình viên Frontend đam mê xây dựng các trang web đẹp và responsive với công nghệ hiện đại.",
          "hero.viewWork": "Xem Dự Án",
          "hero.getInTouch": "Liên Hệ Ngay",

          // Skills
          "skills.title": "Kỹ Năng & Công Nghệ",
          "skills.subtitle": "Công Nghệ Sử Dụng",
          "skills.hover": "Di chuột để xem • Chạm để tạm dừng",

          // Projects
          "projects.title": "Dự Án Nổi Bật",
          "projects.subtitle": "Các Dự Án Đã Làm",
          "projects.hover": "Di chuột để xem • Nhấp để khám phá",

          // Contact
          "contact.title": "giữ liên lạc",
          "contact.email": "Email",
          "contact.phone": "Điện thoại",
          "contact.location": "Địa chỉ",
          "contact.connect": "Kết nối",
          "contact.newsletter": "Liên hệ với tôi",
          "contact.placeholder": "email@cua-ban.com",
          "contact.footer": "Được tạo với đam mê & code.",
     },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
     const [language, setLanguageState] = useState<Language>("en")

     useEffect(() => {
          // Check localStorage
          const savedLanguage = localStorage.getItem("language") as Language | null
          if (savedLanguage) {
               setLanguageState(savedLanguage)
          }
     }, [])

     const setLanguage = (lang: Language) => {
          setLanguageState(lang)
          localStorage.setItem("language", lang)
     }

     const t = (key: string): string => {
          return translations[language][key] || key
     }

     return (
          <LanguageContext.Provider value={{ language, setLanguage, t }}>
               {children}
          </LanguageContext.Provider>
     )
}

export function useLanguage() {
     const context = useContext(LanguageContext)
     if (context === undefined) {
          throw new Error("useLanguage must be used within a LanguageProvider")
     }
     return context
}
