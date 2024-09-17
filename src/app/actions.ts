'use server'

export const fetchData = async (
  pageParam: number,
  topic: string = 'newstories'
) => {
  const url = `https://hacker-news.firebaseio.com/v0/${topic}.json`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch top stories')
    }

    const topStoryIds: number[] = await response.json()
    const selectedIds = topStoryIds.slice(pageParam, pageParam + 20)

    const stories = await Promise.all(
      selectedIds.map(async (id) => {
        const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        const storyResponse = await fetch(storyUrl)
        if (!storyResponse.ok) {
          throw new Error(`Failed to fetch story with ID: ${id}`)
        }
        return await storyResponse.json()
      })
    )

    return {
      stories,
      nextCursor: pageParam + 20,
      prevCursor: pageParam > 0 ? pageParam - 20 : undefined,
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    throw new Error('Failed to fetch news data. Please try again later.')
  }
}
export async function fetchPartDetails(partId: number) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${partId}.json`
  const response = await fetch(url)
  return response.json()
}
