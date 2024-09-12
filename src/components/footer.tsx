import Link from 'next/link'
import React from 'react'

import { SOCIAL_LINKS, type SocialLink } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-4 p-4 md:flex-row md:justify-between md:p-8 lg:px-0">
      <p className="text-center text-sm font-normal leading-5 text-neutral-600 md:text-start">
        © Hacker News,Inc. All rights reserved.
      </p>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map((link: SocialLink) => (
          <SocialLink key={link.id} link={link} />
        ))}
      </div>
    </footer>
  )
}

function SocialLink({ link }: { link: SocialLink }) {
  return (
    <Link
      target="_blank"
      referrerPolicy="no-referrer"
      className="inline-flex h-6 w-6 items-center justify-center"
      href={link.link}
    >
      {link.icon}
    </Link>
  )
}
