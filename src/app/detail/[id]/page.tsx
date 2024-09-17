import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import Mark from '@/lib/markdown'
import { formatTimeAgo } from '@/lib/utils'

import { ArrowUp, Chat, Pen } from '@/components/icons'

export default async function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const article = await fetch(url).then((res) => res.json())

  console.log(article)

  return (
    <div className="flex flex-col gap-10">
      <div className="py-6 md:py-10 lg:py-8">
        <Link
          className="inline-flex items-center gap-1 text-orange-500"
          href="/"
        >
          <ArrowLeft className="h-5 w-5" />
          <p>Back</p>
        </Link>
      </div>
      <Header article={article} />
      <Mark>{article.text}</Mark>
    </div>
  )
}

function Header({ article }: { article: Record<string, unknown> }) {
  const commentCount = Array.isArray(article.kids) ? article.kids.length : 0
  return (
    <div className="flex flex-col gap-6 md:gap-4">
      <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-4xl md:leading-10">
        {article.title as string}
      </h1>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1">
          <ArrowUp className="text-neutral-900" />
          <p className="text-xs font-medium leading-4 text-neutral-600">{`${article.score} points`}</p>
        </div>
        <div className="flex items-center gap-1">
          <Pen className="text-neutral-900" />
          <p className="text-xs font-medium leading-4 text-neutral-600">
            by
            <span className="ml-0.5 text-orange-500">
              {article.by as string}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="text-neutral-900" width={16} height={16} />
          <p className="text-xs font-medium leading-4 text-neutral-600">{`${formatTimeAgo(article.time as number)}`}</p>
        </div>
        <div className="flex items-center gap-1">
          <Chat className="text-neutral-900" width={16} height={16} />
          <p className="text-xs font-medium leading-4 text-neutral-600">{`${commentCount} comments`}</p>
        </div>
      </div>
    </div>
  )
}
