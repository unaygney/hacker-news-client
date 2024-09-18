'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { LINKS, Link as TypeLink } from '@/lib/constants'
import { ibmPlexMono } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Close, Logo } from './icons'
import { useNavbar } from './providers'

export default function Sidebar({ className }: { className?: string }) {
  const { isActive, setIsActive } = useNavbar()

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setIsActive(false))

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>
      <aside
        ref={ref}
        className={cn(
          'fixed left-0 top-0 z-40 h-full w-[240px] bg-white transition-transform duration-300 ease-in-out',
          isActive ? 'translate-x-0' : '-translate-x-full',
          'px-4 py-6 lg:relative lg:block lg:translate-x-0 lg:border-r',
          className
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between py-4">
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
            {isActive && (
              <button
                aria-label="Close Overlay"
                onClick={() => setIsActive(false)}
                className="lg:hidden"
              >
                <Close />
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-1">
            {LINKS.map((link: TypeLink) => (
              <NavLink key={link.id} link={link} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

function NavLink({ link }: { link: TypeLink }) {
  const { setIsActive } = useNavbar()
  const pathname = usePathname()
  return (
    <Link
      onClick={() => setIsActive(false)}
      className={cn('flex items-center gap-3 rounded p-1.5 text-neutral-600', {
        'bg-orange-50 text-orange-600': pathname === link.link,
      })}
      href={link.link}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {link.icon}
      </span>
      <p className="flex-1 text-sm font-medium leading-5">{link.name}</p>
    </Link>
  )
}
