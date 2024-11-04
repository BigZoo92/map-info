'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { getGeo } from './geo'
import getArticles from './getArticles'

export const useMap = ({
  width,
  height,
}: {
  width: number
  height: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)

    const { pathGenerator, countries, zoom } = getGeo(width, height, svg)

    svg.selectAll('*').remove()

    svg.call(zoom)

    svg
      .selectAll('path')
      .data(countries)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', '#ccc')
      .attr('stroke', '#333')
      .attr('class', 'country')
      .on('mouseover', function () {
        d3.select(this).attr('fill', '#69b3a2')
      })
      .on('mouseleave', function () {
        d3.select(this).attr('fill', '#ccc')
      })
      .on('click', async (event, d) => {
        const countryName = d.properties.name
        console.log(`Pays cliqué : ${countryName}`)

        // Appel de la fonction fetchNewsByCountry en passant le code du pays (par exemple, le code ISO 3166)
        try {
          const articles = await getArticles(countryName, {
            pageSize: 5,
          })
          if (articles && articles.articles) {
            console.log(`Articles pour ${countryName}:`, articles.articles)
            // Logique pour afficher les articles, par exemple dans un modal ou une section de la page
            // Exemple d'affichage d'un titre d'article
            articles.articles.forEach((article) => {
              console.log(`- ${article.title}`)
            })
          } else {
            console.log(`Aucun article trouvé pour ${countryName}.`)
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des articles:', error)
        }
      })
  }, [])

  return svgRef
}
