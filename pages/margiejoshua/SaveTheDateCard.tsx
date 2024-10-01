'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Birthstone_Bounce, Nunito_Sans, Great_Vibes } from 'next/font/google'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import bg from './bg.jpg';
const birthstone = Birthstone_Bounce({ subsets: ['latin'], weight: '400' })
const nunito = Nunito_Sans({ subsets: ['latin'], weight: ['200', '300'] })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' })

interface SaveTheDateCardProps {
  names?: string
  date?: string
  location?: string
  additionalText?: string
  loadingText?: string
  wazeLink?: string
  backgroundImage?: string
}

const TypewriterEffect: React.FC<{ text: string; delay?: number; className?: string; onComplete?: () => void }> = ({ text, delay = 50, className = '', onComplete }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [text, delay, currentIndex, onComplete])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  )
}

const FloatingHeart: React.FC = () => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      opacity: [0, 0.2, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 10 + Math.random() * 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    })
  }, [controls])

  return (
    <motion.div
      className="absolute text-3xl text-white pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
    >
      ♡
    </motion.div>
  )
}

export default function SaveTheDateCard({
  names = 'Couple Names',
  date = 'Wedding Date',
  location = 'Wedding Location',
  additionalText = 'formal invitation to follow',
  loadingText = 'Weddings At Costa Rica',
  wazeLink = 'https://waze.com/ul/hd1u0c4pq4',
  backgroundImage = bg.src
}: SaveTheDateCardProps) {
  const [loading, setLoading] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const [showCardContent, setShowCardContent] = useState(false)
  const [showFooterContent, setShowFooterContent] = useState(false)
  const [cardTextComplete, setCardTextComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 6000) // Adjust timing for smoother transition
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowCard(true)
        setTimeout(() => {
          setShowCardContent(true)
        }, 500) // Wait 500ms before starting to render the text
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loading])

  useEffect(() => {
    if (cardTextComplete) {
      const timer = setTimeout(() => {
        setShowFooterContent(true)
      }, 1000) // Wait 1 second after card text is complete before showing footer content
      return () => clearTimeout(timer)
    }
  }, [cardTextComplete])

  const handleCardTextComplete = useCallback(() => {
    setCardTextComplete(true)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-white p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.3
        }}
      />
      <div className="flex-grow flex items-center justify-center w-full z-10">
        <div className="relative w-full max-w-[5in] aspect-[5/7]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <TypewriterEffect
                      text={loadingText}
                      delay={100}
                      className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl text-black block`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            <motion.div 
              key="card"
              className="absolute inset-0 bg-black text-white p-6 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: showCard ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {[...Array(20)].map((_, index) => (
                <FloatingHeart key={index} />
              ))}
              {showCardContent && (
                <>
                  <motion.div
                    className={`${birthstone.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none z-10`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <TypewriterEffect text="Save" delay={100} className="block" />
                    <TypewriterEffect text="the" delay={100} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-5 block -mt-4 sm:-mt-5 md:-mt-6 lg:-mt-8" />
                    <TypewriterEffect text="date" delay={100} className="block -mt-4 sm:-mt-5 md:-mt-6 lg:-mt-8" onComplete={handleCardTextComplete} />
                  </motion.div>
                  <motion.div 
                    className={`${nunito.className} text-xs sm:text-sm tracking-wider z-10`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="mb-4 sm:mb-6 uppercase tracking-[0.3em] text-sm sm:text-base font-extralight">
                      {names.split('+').map((name, index) => (
                        <React.Fragment key={name}>
                          {index > 0 && <span className="text-base sm:text-lg mx-1 sm:mx-2">+</span>}
                          <span>{name.trim()}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="mb-1 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-light">
                      are getting married
                    </div>
                    <div className="mb-4 sm:mb-6 uppercase tracking-[0.15em] font-light text-[10px] sm:text-xs">
                      <span className="block">{date}</span>
                      <span className="block">{location}</span>
                    </div>
                    <div className="text-[7px] sm:text-[9px] uppercase tracking-[0.3em] font-light">
                      {additionalText}
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className={`${nunito.className} text-[8px] sm:text-[10px] tracking-wider text-black mt-4 text-center w-full h-[20px] z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showCard ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {showFooterContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="text-md flex justify-center items-center space-x-2">
                <span>&copy; 2024 Weddings at Costa Rica</span>
                <span>|</span>
                <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Waze</a>
                <span>|</span>
                <span>Don't forget to RSVP</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}