import { ArticleCards } from './components/ArticleCards'
import { WorldMap } from './components/WorldMap'
import useStore from './store/useStore'

export default function App() {
  const { isPopupOpen } = useStore()
  return (
    <section className="svg-container">
      <WorldMap />
      {isPopupOpen && <ArticleCards />}
    </section>
  )
}
