import React from 'react'

import Header from '@/components/header'
import { News } from '@/components/news'

export default function JobsPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Jobs"
        description="Connect with top tech job opportunities and company hiring posts."
      />
      <News />
    </div>
  )
}
