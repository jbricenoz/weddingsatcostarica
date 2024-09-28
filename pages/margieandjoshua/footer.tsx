import React from 'react'
import { MapPin, Bell, Mail } from 'lucide-react'
import { FooterLink as FooterLinkType } from './config'

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

interface FooterLinksProps {
  links: FooterLinkType[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 mb-2">
      {links.map((link, index) => (
        <React.Fragment key={link.text}>
          {link.enabled && <FooterLink {...link} />}
          {index < links.length - 1 && link.enabled && links[index + 1].enabled && (
            <span className="text-gray-400">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}