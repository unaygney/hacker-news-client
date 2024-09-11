import { IBM_Plex_Mono, Noto_Sans } from 'next/font/google'

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
})
export const ibmPlexMono = IBM_Plex_Mono({
  display: 'swap',
  subsets: ['latin'],
  weight: ['500'],
})
