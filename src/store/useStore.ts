import { create } from 'zustand'
import { NewsArticle } from '../components/WorldMap/types'

interface StoreState {
  articles: NewsArticle[] | null
  addArticle: (articles: NewsArticle[]) => void
  clearArticles: () => void
  isPopupOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

const useStore = create<StoreState>((set) => ({
  articles: null,
  isPopupOpen: false,
  addArticle: (articles) => set(() => ({ articles })),
  clearArticles: () => set(() => ({ articles: [] })),
  openPopup: () => set({ isPopupOpen: true }),
  closePopup: () => set({ isPopupOpen: false }),
}))

export default useStore
