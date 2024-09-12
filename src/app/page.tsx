import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

import CardNews from '@/components/card-news'
import Header from '@/components/header'

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Header
        title="New"
        description="Discover the latest submissions in the Hacker News community."
      />

      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <News />
      </Suspense>
    </div>
  )
}

async function News() {
  const url = 'https://hacker-news.firebaseio.com/v0/topstories.json'

  const topStoryIds: number[] = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.slice(0, 20))

  const stories = await Promise.all(
    topStoryIds.map(async (id) => {
      const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      return await fetch(storyUrl).then((res) => res.json())
    })
  )

  return (
    <div>
      {stories.map((story) => (
        <CardNews story={story} key={story.i} />
      ))}
    </div>
  )
}
