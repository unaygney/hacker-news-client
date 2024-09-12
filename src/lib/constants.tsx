import {
  Ask,
  Facebook,
  Github,
  Home,
  Instagram,
  Jobs,
  Show,
  X,
  Youtube,
} from '@/components/icons'

export const LINKS = [
  {
    id: 0,
    name: 'New',
    link: '/',
    icon: <Home />,
  },
  {
    id: 1,
    name: 'Ask',
    link: '/ask',
    icon: <Ask />,
  },
  {
    id: 2,
    name: 'Show',
    link: '/show',
    icon: <Show />,
  },
  {
    id: 3,
    name: 'Jobs',
    link: '/jobs',
    icon: <Jobs />,
  },
] as const
export const SOCIAL_LINKS = [
  {
    id: 0,
    name: 'Youtube',
    link: '#',
    icon: <Youtube />,
  },
  {
    id: 1,
    name: 'Instagram',
    link: '#',
    icon: <Instagram />,
  },
  {
    id: 2,
    name: 'Facebook',
    link: '#',
    icon: <Facebook />,
  },
  {
    id: 3,
    name: 'Github',
    link: '#',
    icon: <Github />,
  },
  {
    id: 4,
    name: 'X',
    link: '#',
    icon: <X />,
  },
] as const

// types
export type Link = (typeof LINKS)[number]
export type SocialLink = (typeof SOCIAL_LINKS)[number]
