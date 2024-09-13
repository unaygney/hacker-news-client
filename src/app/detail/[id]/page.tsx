import React from 'react'

export default async function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const article = await fetch(url).then((res) => res.json())
  console.log(article)

  return <div>DetailPage : {id}</div>
}
