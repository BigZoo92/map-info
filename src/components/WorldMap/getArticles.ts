import { NewsParams, NewsResponse } from './types'

export default async function getArticles(
  country: string,
  params: NewsParams = {}
): Promise<NewsResponse | null> {
  try {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY
    if (!apiKey) throw new Error('API key not found')

    const url = new URL('https://newsapi.org/v2/top-headlines')
    url.searchParams.append('q', country)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString())
      }
    })

    url.searchParams.append('apiKey', apiKey)

    const response = await fetch(url.toString())
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`)

    const data: NewsResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return null
  }
}
