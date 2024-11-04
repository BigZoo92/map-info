import { ArticleCards } from './components/ArticleCards'
import { WorldMap } from './components/WorldMap'

export default function Home() {
  return (
    <section className="svg-container">
      <WorldMap />
      <ArticleCards />
    </section>
  )
}
