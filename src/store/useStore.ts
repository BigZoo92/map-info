import { create } from 'zustand'
import { NewsArticle } from '../components/WorldMap/types'

interface StoreState {
  articles: NewsArticle[] | null
  addArticle: (articles: NewsArticle[]) => void
  clearArticles: () => void
}

const useStore = create<StoreState>((set) => ({
  articles: null,
  addArticle: (articles) => set(() => ({ articles })),
  clearArticles: () => set(() => ({ articles: [] })),
}))

export default useStore
