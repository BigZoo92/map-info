'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { useResponsiveSvg } from '../../hook'
import useStore from '../../store/useStore'
import { getGeo } from './geo'
import getArticles from './getArticles'

export const useMap = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { width, height } = useResponsiveSvg()
  const { addArticle, clearArticles } = useStore()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!svgRef.current) return
    if (width === 0) return

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
        try {
          const articles = await getArticles(countryName, {
            pageSize: 5,
          })
          if (articles && articles.articles) {
            clearArticles()
            addArticle(articles.articles)
          } else {
            console.log(`Aucun article trouvé pour ${countryName}.`)
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des articles:', error)
        }
      })
  }, [width, svgRef, height])

  return svgRef
}
