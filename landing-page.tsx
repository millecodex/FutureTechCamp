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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null)
  const applyRef = useRef<HTMLDivElement>(null)
  const APPLY_FORM_URL = "https://forms.gle/exampleFormLink123456"
  
  //state to track whether the video is showing
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);


  
  useEffect(() => {
    let scrollTimeout: number | null = null;
  
    const handleScroll = () => {
      if (footerRef.current && applyRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const applyRect = applyRef.current.getBoundingClientRect()  
        const windowHeight = window.innerHeight
        
        // Hide button when footer is visible or when apply section is visible
        // Using a smaller threshold to hide button before footer is fully visible
        const isFooterVisible = footerRect.top < windowHeight - 50
        const isApplySectionVisible = applyRect.top < windowHeight && applyRect.bottom > 0
  
        if (!isFooterVisible && !isApplySectionVisible) {
          setIsFadingOut(false);
          setShowStickyButton(true);
        } else {
          setIsFadingOut(true);
          setTimeout(() => {
            setShowStickyButton(false);
          }, 300); // Match the transition duration
        }
      }
    };
    // tame that scroll
    const debouncedHandleScroll = () => {
      if (scrollTimeout !== null) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(handleScroll, 150);
    };
  
    window.addEventListener("scroll", debouncedHandleScroll)
    // Initial check
    handleScroll()
  
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      if (scrollTimeout !== null) {
        window.clearTimeout(scrollTimeout);
      }
    }
  }, [footerRef, applyRef])
  

  //video overlay component
  const VideoOverlay = () => {
    const handleClose = () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setShowVideo(false);
    };
  
    useEffect(() => {
      if (showVideo && videoRef.current) {
        videoRef.current.play();
      }
    }, [showVideo]);
  
    if (!showVideo) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          <button 
            onClick={handleClose}
            className="absolute -top-10 right-0 text-white hover:text-pink-500 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <video 
            ref={videoRef}
            className="w-full rounded-lg shadow-xl"
            controls
            loop
            preload="metadata"
          >
            <source src="/assets/kap-video-low.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  };
  

  // Define the props interface
  interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
  }

  // Add type annotation to the component
  const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps & { animate?: boolean }>(
    ({ children, className, id = "", animate = true }, ref) => {
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
          className={`${className} ${animate ? "transition-all duration-700 transform w-full" : "w-full"} ${
            animate && inView ? "opacity-100 translate-y-0" : animate ? "opacity-0 translate-y-10" : ""
          }`}
        >
          {children}
        </section>
      );
    }
  );
  
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section*/}
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
              <a href="https://www.rmit.edu.vn/about-us/schools-and-centres/school-of-science-engineering-and-technology" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/RMIT-Logo-header.png"
                  width={375}
                  height={150}
                  alt="RMIT University Logo"
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Experience University Learning Section; lets go Dark */}
      <AnimatedSection className="w-full py-16 md:py-24 border-t border-gray-200 bg-gray-800 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            This Summer Come Experience University Learning at RMIT in the School of Science, Engineering, and Technology.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Deploy Artificial Intelligence Strategies
              </h3>
              <div className="rounded-lg overflow-hidden h-80">
                <Image
                  src="/assets/student-2.jpg"
                  width={600}
                  height={400}
                  alt="Student projects at RMIT"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-white">Learn about the latest in articiial intelligence and machine learnign strategies to tackle problems big and small.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Learn to problem solve with Arduino robotics and code
              </h3>
              <div className="rounded-lg overflow-hidden h-80">
                <Image
                  src="/assets/student-1.jpg"
                  width={600}
                  height={400}
                  alt="Student projects at RMIT"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-white">Grasp problems, make plans, get alignment, and make course corrections.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 2. What We're All About Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-50 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8">
            What We're All About
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden max-w-5xl mx-auto">
            <iframe
              className="w-full h-[500px]"
              src="https://youtube.com/embed/lfQB5iPPyms"
              title="SpaceX Launch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Be Inspired Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-800 relative mt-8">
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
                <h3 className="text-xl font-bold text-gray-100">Work in teams</h3>
              </div>
              <p className="text-gray-200">
                Collaborate with and meet other students that are also passionate about science and technology.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-100">Play games</h3>
              </div>
              <p className="text-gray-200">Grasp problems, make plans, get alignment, execute, and course correct.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-100">Experience RMIT</h3>
              </div>
              <p className="text-gray-200">Learn in the same environment with the same facilites as RMIT University students.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Schedule Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-50 text-white mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            The Schedule for the Week of June 16-20
          </h2>

          {/* Hanoi Schedule */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Hanoi Campus</h3>
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
                    <td className="border border-gray-700 p-3 bg-gray-900">Welcome & Creative Coding I</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Build a shooter game with PyGame </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">AI-ML Workshop I</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Cyber Detective</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Arduino Robotics II</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Lunch
                      <br />
                      (12:00 - 13:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Campus Tour</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Celebration Lunch</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Afternoon
                      <br />
                      (13:00 - 16:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Creative Coding II</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Shooter game tournament</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">AI-ML Workshop I</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Arduino Robotics I</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Showcase & Awards</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Saigon Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Saigon Campus</h3>
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
                    <td className="border border-gray-700 p-3 bg-gray-900">Welcome & Intro to Python I</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">AI-ML I</td>
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
                    <td className="border border-gray-700 p-3 bg-gray-900">Campus Tour</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Group Lunch</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Celebration Lunch</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3 font-medium bg-gray-700">
                      Afternoon
                      <br />
                      (13:00 - 16:00)
                    </td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Python II</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">AI-ML II</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Field Trip</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Project Finalization</td>
                    <td className="border border-gray-700 p-3 bg-gray-900">Showcase & Awards</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Meet the Lecturers Section */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-800 mt-8">
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Meet the Lecturers
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Kapil Dev",
                position: "Founder of FutureTech Camp",
                specialty: "Visual Computing",
                image:
                  "/assets/Kap.png",
              },
              {
                name: "Jeff Nijsse",
                position: "Senior Lecturer",
                specialty: "Arduino Robotics",
                image:
                  "/assets/Jeff.jpg",
              },
              {
                name: "Linh Tran",
                position: "Lecturer",
                specialty: "Python Programming",
                image: "/assets/Linh.png",
              },
              {
                name: "Hoang Van",
                position: "Lecturer",
                specialty: "Generative AI",
                image: "/assets/Hoang.jpeg",
              },
              {
                name: "Sreenivas Tirumala",
                position: "Senior Lecturer",
                specialty: "Cyber Detective",
                image: "/assets/Sree.jpeg",
              },
              {
                name: "Nhat-Quang Tran",
                position: "Lecturer",
                specialty: "AI Ethics & Laws",
                image: "/assets/NQ.png",
              },
              {
                name: "Phong Ngo",
                position: "Lecturer",
                specialty: "Game Development",
                image: "/assets/Phong.jpeg",
              },
              { name: "Tom Huynh", 
                position: "Lecturer", 
                specialty: "iPhone Development", 
                image: "/assets/Tom.jpeg" 
              },
              { name: "Sam Goundar", 
                position: "Senior Lecturer", 
                specialty: "AI-ML", 
                image: "/assets/Sam.jpeg" 
              },
              { name: "Ben Scott", 
                position: "Lecturer", 
                specialty: "Cyber Detective", 
                image: "/assets/Ben.png" 
              },
            ].map((lecturer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 w-full aspect-square"
                onClick={() => lecturer.name === "Kapil Dev" && setShowVideo(true)}
                >
                  {lecturer.image ? (
                    <Image
                      src={lecturer.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={lecturer.name}
                      className={`w-full h-full object-cover ${lecturer.name === "Kapil Dev" ? "cursor-pointer" : ""}`}
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

                  {lecturer.name === "Kapil Dev" ? (
        <p 
          className="text-sm text-gray-600 cursor-pointer hover:text-pink-500 transition"
          onClick={() => setShowVideo(true)}
        >
          {lecturer.specialty}
        </p>
      ) : (
        <p className="text-sm text-gray-600">{lecturer.specialty}</p>
      )}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. FAQ Section - Changed to dark background */}
      <AnimatedSection className="w-full py-16 md:py-24 bg-gray-50 text-gray-800 mt-8" animate={false}>
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px]">
          <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">Who is this camp for?</AccordionTrigger>
                <AccordionContent className="text-gray-800">
                  Passionate high schoolers looking to learn about future tech. The program is designed for students who
                  are curious about technology and want to develop skills in coding, AI, and digital innovation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">
                  Where is this camp located?
                </AccordionTrigger>
                <AccordionContent className="text-gray-800">
                  Simultaneously on Saigon and Hanoi RMIT campuses. Students can choose the location that is most
                  convenient for them, with similar curriculum and activities at both campuses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">How much does it cost?</AccordionTrigger>
                <AccordionContent className="text-gray-800">
                  The cost of the camp will be sponsored by RMIT, however travel arrangements to and from campus each
                  day will be covered by the student. Lunch every day and all course resources will be provided by RMIT.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">Question 4 here</AccordionTrigger>
                <AccordionContent className="text-gray-800">This has answer three.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">Question 5 here</AccordionTrigger>
                <AccordionContent className="text-gray-800">This has answer three.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-gray-800">
                <AccordionTrigger className="text-lg font-medium text-gray-800">Quçestion 6 here</AccordionTrigger>
                <AccordionContent className="text-gray-800">This has answer three.</AccordionContent>
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
        animate={false}
      >
        <div className="container px-4 md:px-8 mx-auto max-w-[1400px] text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-6">Apply Now</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Space is limited. Programs available in Saigon and Hanoi campuses. <br />Secure your spot today!
          </p>
          <Button
  size="lg"
  className="bg-white text-purple-500 border border-purple-500 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-full shadow-lg relative overflow-hidden transition-all hover:shadow-purple-300/50 hover:scale-105 animate-pulse"
  onClick={() => window.open(APPLY_FORM_URL, "_blank")}
>
  Apply Now for FutureTech Camp 2025
</Button>
        </div>
      </AnimatedSection>

      {/* Sticky Apply Now Button */}
      {showStickyButton && (
  <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-gray-700 border-t border-gray-600 shadow-lg p-4 flex justify-center items-center z-50 animate-fade-in-up ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
    <Button
      size="lg"
      className="bg-gradient-to-r from-pink-600 to-purple-700 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg relative overflow-hidden transition-all hover:shadow-purple-300/50 hover:scale-105 border border-white"
      onClick={() => {
        // First scroll to the apply section
        const applySection = document.getElementById("apply-section")
        if (applySection) {
          applySection.scrollIntoView({ behavior: "smooth" })
        }
        
        // Then open the application URL in a new tab
        window.open(APPLY_FORM_URL, "_blank")
      }}
    >
      Apply Now for Future Tech Camp 2025
    </Button>
  </div>
)}
{/* Add the VideoOverlay component*/}
<VideoOverlay />

      {/* Footer  */}
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
              <a href="https://www.rmit.edu.vn/about-us/schools-and-centres/school-of-science-engineering-and-technology" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/RMIT-logo-25-static.png"
                  width={300}
                  height={100}
                  alt="RMIT University Logo"
                  className="object-contain"
                />
              </a>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                FutureTech Camp 2025
              </h3>
              <p className="text-sm text-gray-300">
                A premier technology education experience for high school students, hosted by RMIT University.
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
                <li className="text-sm">Email: futuretechcamp@rmit.edu.vn</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/RMITUniversityVietnam" className="text-white hover:text-pink-400">
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
                <Link href="https://www.instagram.com/rmituniversityvietnam/" className="text-white hover:text-pink-400">
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
                <Link href="https://www.youtube.com/c/RMITUniversityVietnam" className="text-white hover:text-pink-400" target="_blank" rel="noopener noreferrer">
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
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
    <path d="M10 9l5 3l-5 3z" />
  </svg>
</Link>
                <Link href="https://www.linkedin.com/company/rmit-university-vietnam" className="text-white hover:text-pink-400">
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

