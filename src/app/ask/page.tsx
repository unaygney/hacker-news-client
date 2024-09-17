import React from 'react'

import Header from '@/components/header'
import { News } from '@/components/news'

export default function AskPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Ask"
        description="Explore community-driven Q&A where users seek insights and advice."
      />
      <News />
    </div>
  )
}
