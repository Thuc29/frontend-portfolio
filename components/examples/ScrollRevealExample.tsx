"use client"

import ScrollReveal, { ScrollRevealItem } from "@/components/ui/ScrollReveal"

// Example 1: Skill Cards
export function SkillCardsExample() {
     const skills = [
          { name: "React", level: "Expert", icon: "⚛️" },
          { name: "TypeScript", level: "Advanced", icon: "📘" },
          { name: "Next.js", level: "Expert", icon: "▲" },
          { name: "Tailwind CSS", level: "Expert", icon: "🎨" },
          { name: "Framer Motion", level: "Advanced", icon: "✨" },
          { name: "Node.js", level: "Intermediate", icon: "🟢" },
     ]

     return (
          <section className="py-20 px-6">
               <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>

               <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {skills.map((skill) => (
                         <ScrollRevealItem key={skill.name}>
                              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                                   <div className="text-4xl mb-4">{skill.icon}</div>
                                   <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                                   <p className="text-gray-600 dark:text-gray-400">{skill.level}</p>
                              </div>
                         </ScrollRevealItem>
                    ))}
               </ScrollReveal>
          </section>
     )
}

// Example 2: Project Items
export function ProjectItemsExample() {
     const projects = [
          {
               title: "E-Commerce Platform",
               description: "A full-stack e-commerce solution with Next.js and Stripe",
               image: "🛍️",
               tags: ["Next.js", "TypeScript", "Stripe"],
          },
          {
               title: "Portfolio Website",
               description: "Modern portfolio with smooth animations and dark mode",
               image: "💼",
               tags: ["React", "Framer Motion", "Tailwind"],
          },
          {
               title: "Task Management App",
               description: "Collaborative task manager with real-time updates",
               image: "✅",
               tags: ["React", "Firebase", "Material-UI"],
          },
          {
               title: "Weather Dashboard",
               description: "Beautiful weather app with location-based forecasts",
               image: "🌤️",
               tags: ["React", "API Integration", "Charts"],
          },
     ]

     return (
          <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
               <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>

               <ScrollReveal className="space-y-8 max-w-4xl mx-auto" staggerDelay={0.15}>
                    {projects.map((project) => (
                         <ScrollRevealItem key={project.title}>
                              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
                                   <div className="flex items-start gap-6">
                                        <div className="text-6xl">{project.image}</div>
                                        <div className="flex-1">
                                             <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                             <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                  {project.description}
                                             </p>
                                             <div className="flex flex-wrap gap-2">
                                                  {project.tags.map((tag) => (
                                                       <span
                                                            key={tag}
                                                            className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                                       >
                                                            {tag}
                                                       </span>
                                                  ))}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </ScrollRevealItem>
                    ))}
               </ScrollReveal>
          </section>
     )
}

// Example 3: Simple List with Custom Stagger
export function SimpleListExample() {
     const items = ["First Item", "Second Item", "Third Item", "Fourth Item", "Fifth Item"]

     return (
          <section className="py-20 px-6">
               <h2 className="text-4xl font-bold text-center mb-12">Simple List Animation</h2>

               <ScrollReveal className="max-w-2xl mx-auto space-y-4" staggerDelay={0.1}>
                    {items.map((item, index) => (
                         <ScrollRevealItem key={index}>
                              <div className="p-6 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg">
                                   {item}
                              </div>
                         </ScrollRevealItem>
                    ))}
               </ScrollReveal>
          </section>
     )
}
