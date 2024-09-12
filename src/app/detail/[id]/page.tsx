import React from 'react'

export default function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return <div>DetailPage : {id}</div>
}
