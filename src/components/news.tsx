'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { ArrowDown, Loader2 } from 'lucide-react'

import { fetchNews } from '@/app/actions'

import CardNews from './card-news'
import ErrorState from './error-state'
import { Button } from './ui/button'

export function News() {
  const queryKey = ['topStories']

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,

    error,
  } = useInfiniteQuery({
    queryKey,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }: { pageParam: number }) => fetchNews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  })

  if (isLoading)
    return (
      <div className="flex w-full justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    )

  if (error) return <ErrorState />

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.stories.map((story) => (
            <CardNews story={story} key={story.id} />
          ))}
        </div>
      ))}

      <Button
        variant={'outline'}
        className="inline-flex items-center justify-center gap-1"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        More
        {isFetchingNextPage ? (
          <Loader2 width={16} height={16} className="animate-spin" />
        ) : (
          <ArrowDown width={16} height={16} />
        )}
      </Button>
    </div>
  )
}
