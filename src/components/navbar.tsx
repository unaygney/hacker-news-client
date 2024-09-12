'use client'

import Link from 'next/link'
import React from 'react'

import { ibmPlexMono } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Logo, Menu } from './icons'
import { useNavbar } from './providers'

export default function Navbar() {
  const { isActive, setIsActive } = useNavbar()

  return (
    <div className="flex flex-shrink-0 items-center justify-between border border-b border-neutral-200 px-3 py-4 md:px-8 lg:hidden">
      <Link href={'/'} className="inline-flex items-center gap-0.5">
        <Logo />
        <h3
          className={cn(
            'text-base font-medium tracking-[-0.96px] text-neutral-900',
            ibmPlexMono.className
          )}
        >
          Hacker News
        </h3>
      </Link>

      <button onClick={() => setIsActive(!isActive)}>
        <Menu />
      </button>
    </div>
  )
}
