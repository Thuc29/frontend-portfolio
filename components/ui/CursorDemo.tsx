"use client"

import { useState } from "react"

export default function CursorDemo() {
     const [showDemo, setShowDemo] = useState(false)

     if (!showDemo) {
          return (
               <div className="fixed bottom-4 right-4 z-50">
                    <button
                         onClick={() => setShowDemo(true)}
                         className="cursor-hover rounded-full bg-navy-primary px-4 py-2 text-sm font-medium text-beige-primary shadow-lg transition-all duration-300 hover:bg-navy-dark hover:scale-105"
                    >
                         Test Cursor
                    </button>
               </div>
          )
     }

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-primary/80 backdrop-blur-sm">
               <div className="max-w-md rounded-2xl bg-beige-primary p-8 shadow-2xl">
                    <h3 className="mb-6 text-2xl font-bold text-navy-primary">
                         Enhanced Cursor Demo
                    </h3>

                    <div className="space-y-4">
                         <button className="cursor-hover w-full rounded-lg bg-blue-analog px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-analog/80">
                              Hover me - Button Effect
                         </button>

                         <a
                              href="#"
                              className="cursor-hover block rounded-lg border-2 border-navy-primary px-4 py-3 text-center font-semibold text-navy-primary transition-all duration-300 hover:bg-navy-primary hover:text-beige-primary"
                         >
                              Link with Arrow Effect
                         </a>

                         <input
                              type="text"
                              placeholder="Input field with edit cursor"
                              className="cursor-hover w-full rounded-lg border border-navy-primary/30 px-4 py-3 text-navy-primary placeholder-navy-primary/50 focus:border-blue-analog focus:outline-none"
                         />

                         <div className="relative overflow-hidden rounded-lg">
                              <img
                                   src="/images/placeholder.jpg"
                                   alt="Image with zoom cursor"
                                   className="cursor-hover h-32 w-full object-cover"
                                   onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement
                                        target.style.display = 'none'
                                        const nextElement = target.nextElementSibling as HTMLElement
                                        if (nextElement) {
                                             nextElement.style.display = 'flex'
                                        }
                                   }}
                              />
                              <div className="hidden h-32 w-full items-center justify-center bg-gray-light text-gray-dark">
                                   Image placeholder
                              </div>
                         </div>

                         <video
                              className="cursor-hover h-32 w-full rounded-lg bg-gray-light object-cover"
                              muted
                              loop
                         >
                              <source src="/videos/demo.mp4" type="video/mp4" />
                              Video not supported
                         </video>
                    </div>

                    <button
                         onClick={() => setShowDemo(false)}
                         className="cursor-hover mt-6 w-full rounded-lg bg-navy-primary px-4 py-3 font-semibold text-beige-primary transition-all duration-300 hover:bg-navy-dark"
                    >
                         Close Demo
                    </button>
               </div>
          </div>
     )
}