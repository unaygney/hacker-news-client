import React from 'react'

import Header from '@/components/header'
import { News } from '@/components/news'

export default function ShowPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Show"
        description="Showcase your projects, products, and discoveries to the Hacker News audience."
      />
      <News />
    </div>
  )
}
