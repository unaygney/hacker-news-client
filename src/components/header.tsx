import React from 'react'

export default function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <header className="flex flex-col gap-2 py-8">
      <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl md:leading-8 lg:px-0">
        {title}
      </h1>
      <p className="text-xs font-normal leading-4 text-neutral-500 md:text-sm md:leading-5">
        {description}
      </p>
    </header>
  )
}
