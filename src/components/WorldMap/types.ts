import { GeometryCollection, Objects, Topology } from 'topojson-specification'

export type GeoJsonProperties = Record<string, unknown>

export interface CountryProperties extends GeoJsonProperties {
  name: string
}

export interface WorldObjects extends Objects {
  countries: GeometryCollection<CountryProperties>
  land: GeometryCollection
}

export type WorldData = Topology<WorldObjects>

export type NewsParams = {
  category?: string
  q?: string
  pageSize?: number
  page?: number
}

export type NewsArticle = {
  source: { id: string | null; name: string }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export type NewsResponse = {
  status: string
  totalResults: number
  articles: NewsArticle[]
}
