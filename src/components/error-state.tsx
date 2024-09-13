import Link from 'next/link'
import React from 'react'

import { EmotionSad } from './icons'

export default function ErrorState() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-[272px] flex-col items-center justify-center gap-5 p-6 text-center">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-600 shadow">
          <EmotionSad />
        </span>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-medium leading-7 text-neutral-900">
            Unexpected error
          </h4>
          <p className="text-base font-normal leading-6 text-neutral-900">
            We&apos;re facing some issues at the moment. Please try again later
            or contact support at
            <Link
              className="text-orange-600"
              href={'mailto:support@codepulse.com'}
            >
              support@codepulse.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
