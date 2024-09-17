import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import Mark from '@/lib/markdown'
import { formatTimeAgo } from '@/lib/utils'

import { ArrowUp, Chat, Pen } from '@/components/icons'
import { Progress } from '@/components/ui/progress'

import { fetchPartDetails } from '@/app/actions'

export default async function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const article = await fetch(url).then((res) => res.json())

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
      {article.type === 'poll' && <Poll parts={article.parts} />}
      {article.kids && <CommentsList commentIds={article.kids} isRoot={true} />}
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

async function Poll({ parts }: { parts: number[] }) {
  if (!parts) return null

  const partsDetails = await Promise.all(
    parts.map((partId: number) => fetchPartDetails(partId))
  )

  const totalScore = partsDetails.reduce(
    (acc, part) => acc + (part.score || 0),
    0
  )

  return (
    <div className="md:12 flex flex-col gap-2 py-9">
      {partsDetails.map((part) => {
        const value = totalScore > 0 ? (part.score / totalScore) * 100 : 0

        return (
          <div key={part.id} className="flex items-center">
            <Progress name={part.text} value={value} className="flex-1" />
            <p className="max-w-[70px] text-sm font-medium leading-5 text-neutral-900">
              ({part.score} points)
            </p>
          </div>
        )
      })}
    </div>
  )
}

async function CommentsList({
  commentIds,
  isRoot,
}: {
  commentIds: number[]
  isRoot?: boolean
}) {
  const comments = await Promise.all(
    commentIds.map((id) => fetchPartDetails(id))
  )

  return (
    <div className="flex flex-col gap-4">
      {isRoot && (
        <div className="py-4">
          <h2 className="text-lg font-semibold leading-7 text-neutral-900 lg:text-2xl">
            {comments.length} Comments
          </h2>
        </div>
      )}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} isRoot={isRoot} />
      ))}
    </div>
  )
}

function Comment({ comment, isRoot }: { comment: any; isRoot?: boolean }) {
  return (
    <div className={`${isRoot ? 'border-b border-neutral-200' : ''} py-4 pl-4`}>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold leading-5 text-neutral-900">
          {comment.by}
        </p>
        <p className="text-sm font-medium leading-5 text-neutral-600">•</p>
        <p className="text-xs font-normal leading-4 text-neutral-600">
          {formatTimeAgo(comment.time)}
        </p>
      </div>
      <Mark
        components={{
          p: ({ children }) => (
            <p className="text-sm font-normal leading-5 text-neutral-900">
              {children}
            </p>
          ),
        }}
      >
        {comment.text}
      </Mark>

      {comment.kids && (
        <div className="mt-3 border-l border-neutral-200 pl-4">
          <CommentsList commentIds={comment.kids} />
        </div>
      )}
    </div>
  )
}
