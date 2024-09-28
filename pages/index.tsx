'use client'
import Image from "next/image";
import localFont from "next/font/local";
import { useState, useEffect } from 'react'
import { Dancing_Script, Great_Vibes } from 'next/font/google'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const navItems = [
  { name: 'Home', href: '/' },
  // { name: 'Gallery', href: '/gallery' },
  // { name: 'Contact', href: '/contact' },
]

interface WeddingInviteIntroProps {
  title: string
  subtitle: string
  coupleName: string
  weddingDate: string
  intro: string
  intro_subtitle: string
  weddingLocation: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  backgroundImage: string
  font: 'dancing-script' | 'great-vibes'
}

export default function Home({
  title = "Create Your Elegant Web Link Invitations",
  subtitle = "For Your Perfect Costa Rica Wedding",
  coupleName = "Sarah & John",
  weddingDate = "August 15, 2024",
  intro = "We are happy to share with you and we love",
  intro_subtitle = "you join our wedding",
  weddingLocation = "Playa Conchal, Costa Rica",
  ctaTitle = "Create Your Dream Invitation",
  ctaDescription = "Customizable designs for your perfect Costa Rica beach wedding",
  ctaButtonText = "Request your customized invitation",
  backgroundImage = "/card_wedding.png",
  font = 'dancing-script'
}: WeddingInviteIntroProps) {
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const selectedFont = font === 'dancing-script' ? dancingScript.className : greatVibes.className
  const [firstName, lastName] = coupleName.split('&').map(name => name.trim())

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-rose-700 text-lg font-semibold">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center"
                >
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                  >
                    <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.8 48.43" fill="#7a8892">
                      <g>
                        <polygon fill="#7a8892" points="22.45 4.49 21.2 3.11 18.64 .31 15.25 4.49 22.45 4.49" />
                        <polygon fill="#7a8892" points="23 5.67 14.83 5.67 15.01 6.19 19.24 18.7 23 5.67" />
                        <polygon fill="#7a8892" points="26.71 .62 24.75 4.49 29.07 4.49 26.71 .62" />
                        <polygon fill="#7a8892" points="24.23 5.67 20.85 17.38 28.99 5.67 24.23 5.67" />
                        <polygon fill="#7a8892" points="23.65 4.05 25.71 0 19.95 0 20.07 .13 23.65 4.05" />
                        <path fill="#7a8892" d="M37.8,29.53c0-7.66-4.72-14.63-11.78-17.51l-1.12,1.61-1.67,2.4c.06.02.12.04.18.06.09.03.17.06.26.09.1.03.19.07.29.11.08.03.17.06.25.1.1.04.19.08.29.12.08.04.16.07.25.11.1.04.19.09.28.13.08.04.16.08.24.11.09.05.19.1.28.15.08.04.15.08.23.12.09.05.19.11.28.16.07.04.14.08.21.13.1.06.19.12.28.18.07.04.13.08.2.13.1.07.2.14.3.21.05.04.11.08.16.11.14.1.27.2.41.31.01.01.03.02.04.03.15.12.29.24.43.36.05.04.1.09.14.13.09.08.19.16.28.25.06.05.11.11.17.16.08.08.16.15.24.23.06.06.11.12.17.18.07.08.15.15.22.23.06.06.11.13.17.19.07.08.14.15.2.23.06.07.11.13.16.2.06.08.13.16.19.24.05.07.11.14.16.21.06.08.12.16.18.24.05.07.1.14.15.21.06.08.11.16.17.25.05.07.1.15.14.22.05.08.11.17.16.25.05.08.09.15.13.23.05.09.1.17.15.26.04.08.08.16.13.23.05.09.09.18.14.27.04.08.08.16.12.24.04.09.09.18.13.27.04.08.07.16.11.24.04.09.08.19.12.28.03.08.07.16.1.25.04.09.07.19.11.28.03.08.06.17.09.25.03.1.06.19.09.29.03.08.05.17.08.25.03.1.06.2.08.3.02.08.05.17.07.25.03.1.05.2.07.31.02.08.04.17.06.25.02.1.04.21.06.32.02.08.03.17.05.25.02.11.03.22.05.33.01.08.02.16.03.25.01.12.03.23.04.35,0,.08.02.15.02.23.01.13.02.26.02.39,0,.07,0,.13.01.2,0,.2.01.39.01.59,0,7.82-6.36,14.17-14.17,14.17s-14.17-6.36-14.17-14.17c0-3.25,1.13-6.43,3.18-8.95.12-.15.24-.29.37-.44.04-.05.08-.09.13-.14.09-.09.17-.19.26-.28.05-.05.1-.11.16-.16.08-.08.16-.16.25-.25.06-.05.12-.11.17-.16.08-.08.16-.15.25-.23.06-.05.12-.11.18-.16.08-.07.17-.14.25-.21.06-.05.13-.1.19-.15.09-.07.17-.14.26-.2.06-.05.13-.1.19-.14.09-.07.18-.13.28-.19.06-.04.13-.09.19-.13.1-.07.2-.13.3-.19.06-.04.12-.08.18-.11.12-.07.24-.14.36-.21.04-.02.09-.05.13-.07.17-.09.33-.18.5-.27.04-.02.08-.04.12-.06.13-.06.26-.13.39-.19.06-.03.13-.06.19-.08.11-.05.22-.1.33-.14.07-.03.14-.06.21-.08.1-.04.21-.08.32-.12.08-.03.15-.05.23-.08.1-.04.21-.07.31-.1.08-.02.16-.05.23-.07.05-.02.1-.03.15-.05l-2.97-3.98C4.82,14.73,0,21.75,0,29.53c0,10.42,8.48,18.9,18.9,18.9s18.9-8.48,18.9-18.9Z" />
                        <polygon fill="#7a8892" points="13.58 5.67 8.85 5.67 12.71 10.85 16.47 15.9 16.47 15.9 17.01 16.63 17.53 17.32 14.05 7.06 13.58 5.67" />
                        <polygon fill="#7a8892" points="14.12 4 17.37 0 12.09 0 14.12 4" />
                        <polygon fill="#7a8892" points="13.05 4.49 11.08 .62 8.73 4.49 13.05 4.49" />
                      </g>
                    </svg>
                  </motion.svg>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={`${greatVibes.className} text-gray-600 text-2xl font-medium pt-1`}
                  >
                    Weddings at Costa Rica
                  </motion.span>
                </motion.div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${geistSans.className} text-gray-600 hover:text-rose-800 inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-rose-400 hover:text-rose-500 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto' } : { height: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden overflow-hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${geistSans.className} text-gray-600 hover:text-rose-800 block px-3 py-2 text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className={`${greatVibes.className} text-2xl sm:text-4xl md:text-5xl text-gray-800 mb-6`}>
            {title}
          </h1>
          <p className={`${dancingScript.className} text-md sm:text-2xl text-gray-600 mb-8`}>
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full max-w-2xl aspect-[3/4] rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={backgroundImage}
            alt="Wedding invitation background"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-10"
          />
          <div className="absolute inset-0 bg-gray-400 bg-opacity-10 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20">

            <div className={`${selectedFont} text-xl sm:text-2xl text-slate-500 mb-2 mt-1 text-center`}>
              {intro}
            </div>
            <div className={`${selectedFont} text-xl sm:text-2xl text-slate-500 mb-24 text-center`}>
              {intro_subtitle}
            </div>

            <div className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-rose-700 mb-6 text-center`}>
              <div className="text-4xl sm:text-5xl md:text-6xl mb-2">{firstName}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">&</div>
              <div className="text-4xl sm:text-5xl md:text-6xl mb-6">{lastName}</div>
            </div>
            <div className={`${selectedFont} text-xl sm:text-2xl text-slate-500 mb-4 text-center`}>
              {weddingDate}
            </div>
            <div className={`${selectedFont} text-lg sm:text-xl text-slate-500 text-center`}>
              {weddingLocation}
            </div>
            <Link href='https://wa.me/83464966?text=Hola!%20|%20Hi!,%20Nos%20interesa%20una%20invitación%20web%20|%20We%20are%20interested%20in%20a%20web%20invite%20link.' target="_blank">
              <button className={`${geistMono.className} bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold mt-10 py-2 px-6 rounded-full transition duration-300`}>
                {ctaButtonText}
              </button>
            </Link>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-center"
        >
          <h2 className={`${selectedFont} text-2xl sm:text-3xl text-gray-800 mb-4`}>{ctaTitle}</h2>
          <p className={`${geistMono.className} text-sm text-gray-600 mb-16`}>
            {ctaDescription}
          </p>
          <div className="text-xs text-gray-400">
          © 2024 modesignstudio.co
        </div>
        </motion.div>
      </div>
    </>
  )
};