import { type ClassValue, clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getUrlUpToTld(url: string): string {
  const tlds = ['.com', '.org', '.net', '.io', '.co', '.edu']

  for (const tld of tlds) {
    if (url.includes(tld)) {
      return url.split(tld)[0] + tld
    }
  }

  return url
}
export function formatTimeAgo(unixTimestamp: number): string {
  unixTimestamp = unixTimestamp || 0
  const formattedTime = formatDistanceToNow(new Date(unixTimestamp * 1000), {
    addSuffix: true,
  })
  return formattedTime.replace('about ', '')
}
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function determineTopicByPage(pathname: string): string {
  if (pathname === '/') {
    return 'newstories'
  } else if (pathname.includes('/ask')) {
    return 'askstories'
  } else if (pathname.includes('/jobs')) {
    return 'jobstories'
  } else if (pathname.includes('/show')) {
    return 'showstories'
  } else {
    return 'newstories'
  }
}
