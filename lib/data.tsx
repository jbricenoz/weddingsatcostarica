import bg from '../pages/margieandjoshua/bg_wedding.png';
import bg_card from '../pages/margieandjoshua/card_wedding.png';

export interface FontConfig {
  family: string;
  size: string;
  style: string;
  weight: string;
  color: string;
}

export interface TextConfig {
  content: string;
  font: FontConfig;
}

export interface FooterLink {
  text: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface Config {
  backgroundImage: {
    url: string;
    opacity: number;
  };
  cardBackgroundImage: {
    enabled: boolean;
    url: string;
    opacity: number;
  };
  floatingHeartSvg: string;
  texts: {
    invited: TextConfig;
    toTheWeddingOf: TextConfig;
    giftText: TextConfig;
    coupleNames: {
      firstPerson: string;
      secondPerson: string;
      ampersand: string;
      font: FontConfig;
    };
    date: TextConfig;
    location: TextConfig;
    rsvp: TextConfig;
  };
  fontUrls: string[];
  footerLinks: {
    text: string;
    url: string;
    icon: string;
    enabled: boolean;
  }[];
}

export const values:Config  = {
  backgroundImage: {
    url: bg.src,
    opacity: 0.1
  },
  cardBackgroundImage: {
    enabled: true,
    url: bg_card.src,
    opacity: 0.2
  },
  floatingHeartSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
  </svg>`,
  texts: {
    invited: {
      content: "Estás cordialmente invitado.",
      font: {
        family: "'Dancing Script', cursive",
        size: "text-2xl",
        style: "font-normal",
        weight: "font-normal",
        color: "text-gray-700"
      }
    },
    toTheWeddingOf: {
      content: "a nuestra boda",
      font: {
        family: "'Great Vibes', cursive",
        size: "text-3xl",
        style: "font-normal",
        weight: "font-normal",
        color: "text-rose-700"
      }
    },
    coupleNames: {
      firstPerson: "Margie",
      secondPerson: "Joshua",
      ampersand: "&",
      font: {
        family: "'Great Vibes', cursive",
        size: "text-6xl",
        style: "font-normal",
        weight: "font-bold",
        color: "text-rose-800"
      }
    },
    date: {
      content: "27 de Octubre,  2:00 pm",
      font: {
        family: "'Great Vibes', cursive",
        size: "text-2xl",
        style: "font-normal",
        weight: "font-light",
        color: "text-gray-700"
      }
    },
    location: {
      content: "Villa del Lago, Garita Alajuela",
      font: {
        family: "'Great Vibes', cursive",
        size: "text-2xl",
        style: "font-normal",
        weight: "font-light",
        color: "text-gray-700"
      }
    },
    giftText: {
      content: 'Muestras de cariño en efectivo o sinpe móvil',
      font: {
        family: "'Montserrat', sans-serif",
        size: "text-xs",
        style: "font-normal",
        weight: "font-semibold",
        color: "text-gray-400"
      }
    },
    rsvp: {
      content: "rsvp",
      font: {
        family: "'Montserrat', sans-serif",
        size: "text-lg",
        style: "font-normal",
        weight: "font-semibold",
        color: "text-white"
      }
    }
  },
  fontUrls: [
    "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap",
    "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
  ],
  footerLinks: [
    { text: "RSVP", url: "https://wa.me/87838791?text=Hola,%20Estamos%20complacidos%20de%20acompañarlos%20y%20confirmar%20nuestra%20asistencia%20a%20su%20boda.", icon: "Mail", enabled: true },
    { text: "Waze", url: "https://waze.com/ul/hd1u0c4pq4", icon: "MapPin", enabled: true },
    { text: "Reminder", url: "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20241027T080000Z%2F20241027T133000Z&details=We%20want%20to%20have%20the%20pleasure%20of%20having%20you%20all%20in%20our%20celebration%20because%20we%20believe%20close%20friends%20are%20important%20for%20our%20union.%20Please%20join%20us%20to%20celebrate%20our%20wedding.&location=Villa%20del%20Lago&text=Margie%20And%20Joshua%20Wedding%20At%20Costa%20Rica", icon: "Bell", enabled: true }
  ]
}