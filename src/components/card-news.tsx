import { Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { formatTimeAgo, getUrlUpToTld } from '@/lib/utils'

import { ArrowUp, Article, Chat, Pen } from './icons'

export default function CardNews({
  story,
}: {
  story: Record<string, unknown>
}) {
  const commentCount = Array.isArray(story.kids) ? story.kids.length : 0

  return (
    <Link
      href={typeof story.url === 'string' ? story.url : `/detail/${story.id}`}
      className="flex items-center gap-4 py-6 transition-colors duration-200 hover:bg-orange-50"
      target={typeof story.url === 'string' ? '_blank' : ''}
    >
      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-stone-50 text-neutral-700">
        <Article />
      </span>
      <div className="flex flex-col gap-2 text-neutral-600">
        <div className="flex w-full flex-wrap items-center">
          <h3 className="text-sm font-medium leading-5 text-neutral-900">
            {typeof story.title === 'string' ? story.title : 'Başlık Yok'}
          </h3>
          {typeof story.url === 'string' && (
            <p className="ml-1 text-xs font-normal leading-4 text-neutral-600">
              ({getUrlUpToTld(story.url)})
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <ArrowUp className="text-neutral-900" />
            <p className="text-xs font-medium leading-4">{`${story.score} points`}</p>
          </div>
          <div className="flex items-center gap-1">
            <Pen className="text-neutral-900" />
            <p className="text-xs font-medium leading-4">
              by
              <span className="ml-0.5 text-orange-500">
                {story.by as string}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="text-neutral-900" width={16} height={16} />
            <p className="text-xs font-medium leading-4">{`${formatTimeAgo(story.time as number)}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <Chat className="text-neutral-900" />
            <p className="text-xs font-medium leading-4">{`${commentCount} comments`}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
