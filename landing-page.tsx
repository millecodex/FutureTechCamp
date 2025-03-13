"use client"

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState, forwardRef, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useInView } from "react-intersection-observer"

export default function LandingPage() {
  const [showStickyButton, setShowStickyButton] = useState(true)
  //const footerRef = useRef(null)
  //const applyRef = useRef(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const applyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current && applyRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const applyRect = applyRef.current.getBoundingClientRect()  
        const windowHeight = window.innerHeight
        
        // Hide button when footer is visible or when apply section is visible
        // Using a smaller threshold to hide button before footer is fully visible
        const isFooterVisible = footerRect.top < windowHeight - 100
        const isApplySectionVisible = applyRect.top < windowHeight && applyRect.bottom > 0

        setShowStickyButton(!isFooterVisible && !isApplySectionVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define the props interface
  interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
  }

  // Add type annotation to the component
  // Create a reusable animation section component
  const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
    ({ children, className, id = "" }, ref) => {
      const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px",
      });
  
      // Combine the forwarded ref with the inView ref
      const setRefs = React.useCallback(
        (element: HTMLElement | null) => {
          // Set the inViewRef
          inViewRef(element);
          
          // Forward the ref
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        },
        [inViewRef, ref]
      );
  
      return (
        <section
          ref={setRefs}
          id={id}
          className={`${className} transition-all duration-700 transform w-full ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {children}
        </section>
      );
    }
  );
  

  /* // Create a reusable animation section component
  const AnimatedSection = ({ children, className, id = "" }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "-50px 0px",
    })

    return (
      <section
        ref={ref}
        id={id}
        className={`${className} transition-all duration-700 transform w-full ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {children}
      </section>
    )
  } */

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section - Updated with larger logo and title */}
      <section className="w-full py-16 md:py-20 bg-gray-50">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-8 flex-col sm:flex-row">
              <div className="space-y-4 flex-1">
                <h1 className="text-7xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  FutureTech Camp
                </h1>
                <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  What the smartest kids do after school.
                </h2>
                <p className="text-gray-700 md:text-lg">
                  Solve complex problems and make friends with bright kids from around the world. Team games that unlock
                  real-world skills.
                </p>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rmit-logo-NvXfm8RbxMYDQOYh5K1nZxohipF5GO.png"
                width={250}
                height={100}
                alt="RMIT University Logo"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Experience University Learning Section */}
      <AnimatedSection className="w-full py-16 md:py-24 border-t border-gray-200 bg-gray-50 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Experience University Learning at RMIT
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Problem solve with code
              </h3>
              <div className="rounded-lg overflow-hidden h-80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/student-1-x4OMGM2uVgkkJhltws8g1nhEU5Ftjw.jpeg"
                  width={600}
                  height={400}
                  alt="Group of excited students"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-700">Mistakes are expected and recognized as opportunities to learn and grow.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Learn to apply Artificial Intelligence
              </h3>
              <div className="rounded-lg overflow-hidden h-80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/student-2-QYtjqkbdnIEXuWLF4QUNy7mxYuHRp2.jpeg"
                  width={600}
                  height={400}
                  alt="Student working with AI visualization"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-700">Grasp problems, make plans, get alignment, and make course corrections.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* What We're All About Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-900 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8">
            What We're All About
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden max-w-5xl mx-auto">
            <iframe
              className="w-full h-[500px]"
              src="https://www.youtube.com/embed/tLuyH98TLks"
              title="SpaceX Launch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Be Inspired Section - Changed to light background */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-50 relative mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px] relative z-10">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Be inspired by real Lecturers and Professors
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-medium">Work in teams</h3>
              </div>
              <p className="text-gray-600">
                Collaborate with peers from all over the world. Communication and teamwork are key.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-medium">Play games</h3>
              </div>
              <p className="text-gray-600">Grasp problems, make plans, get alignment, execute, and course correct.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-medium">Learn with teachers</h3>
              </div>
              <p className="text-gray-600">Hone skills with tailored feedback and guidance from skilled educators.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Schedule Section - Dark background */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-800 text-white mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            The Schedule for the Week - June 16-20
          </h2>

          {/* Hanoi Schedule */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Hanoi Campus</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Time</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Monday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Tuesday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Wednesday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Thursday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Morning
                      <br />
                      (9:00 - 12:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Welcome & Team Building</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Coding Fundamentals</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">AI Workshop</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Project Development</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Final Presentations</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Lunch
                      <br />
                      (12:00 - 13:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Campus Tour</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Guest Speaker</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Celebration Lunch</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Afternoon
                      <br />
                      (13:00 - 16:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Introduction to Tech</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Team Challenges</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Robotics Lab</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Project Work</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Awards & Closing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Saigon Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Saigon Campus</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Time</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Monday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Tuesday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Wednesday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Thursday</th>
                    <th className="border border-gray-700 p-3 bg-gray-700 text-white">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Morning
                      <br />
                      (9:00 - 12:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Orientation & Icebreakers</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Design Thinking</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Game Development</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Innovation Workshop</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Demo Day Prep</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Lunch
                      <br />
                      (12:00 - 13:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Welcome Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Tech Talk</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Industry Mentors</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Farewell Lunch</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Afternoon
                      <br />
                      (13:00 - 16:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Tech Exploration</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Coding Challenge</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Field Trip</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Project Finalization</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Showcase & Certificates</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Meet the Lecturers Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-50 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Meet the Lecturers
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Kap",
                position: "Founder of FutureTech Camp",
                specialty: "Senior Lecturer",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kap-uAxfJ8jf2WJS9KcCM7L1dbcL1Ivf3P.jpeg",
              },
              {
                name: "Jeff",
                position: "Senior Lecturer",
                specialty: "Arduino Robotics",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STEM-Fair-053%20-%20Copy.jpg-RTn8YwOiQ683j03BVObR5yZgloYUnr.jpeg",
              },
              {
                name: "Dr. Sarah Nguyen",
                position: "Associate Professor",
                specialty: "Artificial Intelligence & Machine Learning",
                image: null,
              },
              {
                name: "Prof. David Tran",
                position: "Department Head",
                specialty: "Computer Science & Robotics",
                image: null,
              },
              {
                name: "Dr. Michael Pham",
                position: "Senior Lecturer",
                specialty: "Game Development & Interactive Media",
                image: null,
              },
              {
                name: "Dr. Lisa Hoang",
                position: "Assistant Professor",
                specialty: "Digital Innovation & Entrepreneurship",
                image: null,
              },
              {
                name: "Prof. Robert Le",
                position: "Professor",
                specialty: "Cybersecurity & Ethical Hacking",
                image: null,
              },
              { name: "Dr. Emily Truong", position: "Lecturer", specialty: "Data Science & Analytics", image: null },
            ].map((lecturer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 w-full h-48">
                  {lecturer.image ? (
                    <Image
                      src={lecturer.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={lecturer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{lecturer.name}</h3>
                  <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                    {lecturer.position}
                  </p>
                  <p className="text-sm text-gray-600">{lecturer.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section - Changed to dark background */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-800 text-white mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">Who is this camp for?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Passionate high schoolers looking to learn about future tech. The program is designed for students who
                  are curious about technology and want to develop skills in coding, AI, and digital innovation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">
                  Where is this camp located?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Simultaneously on Saigon and Hanoi RMIT campuses. Students can choose the location that is most
                  convenient for them, with identical curriculum and activities at both campuses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">How much does it cost?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  The cost of the camp will be sponsored by RMIT, however travel arrangements to and from campus each
                  day will be covered by the student.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">Question 4 here</AccordionTrigger>
                <AccordionContent className="text-gray-300">This has answer three.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">Question 5 here</AccordionTrigger>
                <AccordionContent className="text-gray-300">This has answer three.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-white/20">
                <AccordionTrigger className="text-lg font-medium text-white">Question 6 here</AccordionTrigger>
                <AccordionContent className="text-gray-300">This has answer three.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. Apply Now Section - Gradient background */}
      <AnimatedSection
        id="apply-section"
        ref={applyRef}
        className="w-full py-16 md:py-24 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
      >
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px] text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-6">Apply Now</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Space is limited. Programs available in Saigon and Hanoi campuses. Secure your spot today!
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-500 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-full shadow-lg relative overflow-hidden transition-all hover:shadow-purple-300/50 hover:scale-105 animate-pulse"
          >
            Apply Now for FutureTech Camp 2025
          </Button>
        </div>
      </AnimatedSection>

      {/* Sticky Apply Now Button */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-gray-700 border-t border-gray-600 shadow-lg p-4 flex justify-center items-center z-50 animate-fade-in-up">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-600 to-purple-700 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg relative overflow-hidden transition-all hover:shadow-purple-300/50 hover:scale-105 border border-white"
            onClick={() => {
              const applySection = document.getElementById("apply-section")
              if (applySection) {
                applySection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Apply Now for Future Tech Camp 2025
          </Button>
        </div>
      )}

      {/* Footer with RMIT Saigon campus background */}
      <footer ref={footerRef} className="w-full py-16 bg-gray-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        ></div>
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px] relative z-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rmit-logo-NvXfm8RbxMYDQOYh5K1nZxohipF5GO.png"
                  width={150}
                  height={50}
                  alt="RMIT University Logo"
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                FutureTech Camp
              </h3>
              <p className="text-sm text-gray-300">
                A premier technology education program for students, hosted by RMIT University.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Locations</h3>
              <ul className="space-y-2">
                <li className="text-sm">RMIT Saigon South Campus</li>
                <li className="text-sm">702 Nguyen Van Linh, District 7</li>
                <li className="text-sm">Ho Chi Minh City, Vietnam</li>
              </ul>
              <ul className="space-y-2">
                <li className="text-sm">RMIT Hanoi Campus</li>
                <li className="text-sm">Handi Resco Building, 521 Kim Ma</li>
                <li className="text-sm">Ba Dinh District, Hanoi, Vietnam</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm">Email: futuretech@rmit.edu.vn</li>
                <li className="text-sm">Phone: +84 28 3776 1300</li>
                <li className="text-sm">Fax: +84 28 3776 1399</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-white hover:text-pink-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-pink-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-pink-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-pink-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
              <p className="text-sm text-gray-300">
                © {new Date().getFullYear()} RMIT University Vietnam.
                <br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

