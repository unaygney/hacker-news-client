import React from 'react'

import Header from '@/components/header'
import { News } from '@/components/news'

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Header
        title="New"
        description="Discover the latest submissions in the Hacker News community."
      />

      <News />
    </div>
  )
}
