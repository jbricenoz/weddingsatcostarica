"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card } from "@/components/ui/card"
import { values, FontConfig } from '../../lib/data'
import { MapPin, Bell, Mail } from 'lucide-react'
import { FooterLink as FooterLinkType } from '../../lib/data'

const FooterLink: React.FC<FooterLinkType> = ({ text, url, icon }) => {
  const IconComponent = icon === 'Mail' ? Mail : icon === 'MapPin' ? MapPin : Bell

  return (
    <a 
      href={url}
      target='_blank'
      className="text-gray-400 hover:text-gray-600 transition-colors flex items-center text-xs sm:text-sm"
    >
      <IconComponent className="mr-1" size={12} />
      {text}
    </a>
  )
}

const TypewriterEffect: React.FC<{ text: string; delay?: number; font: FontConfig; customStyle?:string; onComplete?: () => void }> = ({ text, delay = 0, font, customStyle, onComplete }) => {
  const controls = useAnimation()

  useEffect(() => {
    const animateText = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5, delay }
      })

      await controls.start({
        clipPath: 'inset(-25px -5% -25px -25px)',
        transition: { duration: 1, ease: "easeInOut" }
      })

      onComplete && onComplete()
    }

    animateText()
  }, [text, delay, controls, onComplete])

  return (
    <motion.span
      className={`${font.size} ${font.style} ${font.weight} ${font.color} inline-block; ${customStyle}`}
      style={{ fontFamily: font.family}}
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      animate={controls}
    >
      {text}
    </motion.span>
  )
}

const FloatingHeart: React.FC<{ delay: number; svg: string }> = ({ delay, svg }) => {
  return (
    <motion.div
      className="absolute text-rose-200 z-10"
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

const BackgroundImage: React.FC<{ imageUrl: string; opacity: number }> = ({ imageUrl, opacity }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 300 }
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  const backgroundX = useTransform(smoothX, [-100, 100], [-10, 10])
  const backgroundY = useTransform(smoothY, [-100, 100], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  return (
    <motion.div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{
        backgroundImage: `url(${imageUrl})`,
        opacity: opacity,
        x: backgroundX,
        y: backgroundY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    />
  )
}

const TextLoadingAnimation: React.FC = () => {
  const controls = useAnimation()
  const loadingTexts = ["Weddings", "at", "Costa Rica"]

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [20, 0],
      transition: { duration: 1, ease: "easeOut" }
    })
  }, [controls])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
      <div className="text-center">
        <motion.div 
          className="text-gray-400 flex flex-col items-center"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          {loadingTexts.map((text, index) => (
            <TypewriterEffect 
              key={index}
              text={text} 
              font={{
                size: index === 1 ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl",
                style: "font-normal",
                weight: "font-normal",
                color: "text-gray-400",
                family: "'Great Vibes', cursive"
              }}
              delay={index * 0.5}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function WeddingInvitation() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
      controls.start({ opacity: 1, y: 0 })
    }, 5000) // Increased loading time to allow for the new animation

    return () => clearTimeout(timer)
  }, [controls])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500) // Show content 0.5 seconds after the card is visible
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setShowFooter(true)
      }, 2000) // Show footer 2 seconds after the content is shown
      return () => clearTimeout(timer)
    }
  }, [showContent])

  if (isLoading) {
    return <TextLoadingAnimation />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white p-4 relative overflow-hidden">
      <style jsx global>{`
        ${values.fontUrls.map(url => `@import url('${url}');`).join('\n')}
      `}</style>
      <BackgroundImage imageUrl={values.backgroundImage.url} opacity={values.backgroundImage.opacity} />
      <div className="flex-grow flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] aspect-[5/7] z-10"
        >
          <Card className="w-full h-full bg-white overflow-hidden rounded-none relative" style={{
            boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)'
          }}>
            {values.cardBackgroundImage.enabled && (
              <BackgroundImage 
                imageUrl={values.cardBackgroundImage.url} 
                opacity={values.cardBackgroundImage.opacity} 
              />
            )}
            
            <div className="relative h-full flex flex-col justify-between z-10 p-16 sm:p-14 md:p-20 lg:p-28">
              {/* Floating hearts */}
              {[...Array(10)].map((_, i) => (
                <FloatingHeart key={i} delay={i * 0.5} svg={values.floatingHeartSvg} />
              ))}
              
              {/* Content wrapper */}
              <motion.div 
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 1 }}
              >
                {/* Top section */}
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <div className="mb-1 lg:mb-2" style={{ lineHeight: 0.8  }}>
                    <TypewriterEffect 
                      text={values.texts.invited.content} 
                      font={{
                        ...values.texts.invited.font,
                        size: "text-md sm:text-lg md:text-xl lg:text-2xl"
                      }}
                      customStyle='line-height: 0.7;'
                    />
                  </div>
                  <div style={{ lineHeight: 0.8  }}>
                    <TypewriterEffect 
                      text={values.texts.toTheWeddingOf.content} 
                      font={{
                        ...values.texts.toTheWeddingOf.font,
                        size: "text-md sm:text-lg md:text-xl lg:text-3xl"
                      }}
                    customStyle='line-height: 0.7;'
                    />
                  </div>
                </div>

                {/* Center section */}
                <div className="flex flex-col items-center justify-center flex-grow space-y-2 text-rose-800"  style={{ lineHeight: 0.4  }}>
                  <TypewriterEffect 
                    text={values.texts.coupleNames.firstPerson} 
                    font={{
                      ...values.texts.coupleNames.font,
                      size: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                    }}
                    customStyle='line-height: 0.6;'
                    // customStyle="ml-2 sm:ml-3 md:ml-4 lg:ml-6"
                  />
                  <TypewriterEffect 
                    text={values.texts.coupleNames.ampersand} 
                    font={{
                      ...values.texts.coupleNames.font,
                      size: "text-md xs:text-md sm:text-md md:text-2xl lg:text-3xl"
                    }}
                    customStyle="ml-3 sm:ml-3 md:ml-4 lg:ml-6"
                  />
                  <TypewriterEffect 
                    text={values.texts.coupleNames.secondPerson} 
                    font={{
                      ...values.texts.coupleNames.font,
                      size: "text-4xl xs:text-md sm:text-5xl md:text-6xl lg:text-7xl"
                    }}
                    customStyle='line-height: 0.6 !important;'
                    // customStyle="ml-2 sm:ml-3 md:ml-4 lg:ml-6"
                  />
                </div>

                {/* Bottom section */}
                <div className="text-center mt-4 sm:mt-6 md:mt-8">
                  <div className="mb-2">
                    <TypewriterEffect 
                      text={values.texts.date.content} 
                      font={{
                        ...values.texts.date.font,
                        size: "text-lg sm:text-sm md:text-lg lg:text-2xl"
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <TypewriterEffect 
                      text={values.texts.location.content} 
                      font={{
                        ...values.texts.location.font,
                        size: "text-lg sm:text-sm md:text-base lg:text-xl"
                      }}
                    />
                  </div>
                  <div>
                    <TypewriterEffect 
                       text={values.texts.giftText.content} 
                       font={{
                         ...values.texts.giftText.font,
                         size: "text-xs sm:text-sm md:text-base lg:text-xs"
                       }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
      <motion.footer
        className="w-full text-center py-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showFooter ? 1 : 0, y: showFooter ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
            <div className="flex flex-wrap justify-center items-center space-x-2 mb-2">
          {values.footerLinks.map((link, index) => (
            <React.Fragment key={link.text}>
              {link.enabled && <FooterLink {...link} />}
              {index < values.footerLinks.length - 1 && link.enabled && values.footerLinks[index + 1].enabled && (
                <span className="text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs text-gray-400">
          © 2024 modesignstudio.co
        </div>
      </motion.footer>
    </div>
  )
}