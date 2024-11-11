import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { useResponsiveSvg } from '../../hook'
import useStore from '../../store/useStore'
import { colors } from '../../style/styles'
import { getGeo } from './geo'
import getArticles from './getArticles'

export const useMap = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { width, height } = useResponsiveSvg()
  const { addArticle, clearArticles, openPopup } = useStore()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!svgRef.current) return
    if (width === 0) return
    const tooltip = d3.select(tooltipRef.current)
    const svg = d3.select(svgRef.current)

    const { pathGenerator, countries, zoom } = getGeo(width, height, svg)

    svg.selectAll('*').remove()

    svg.call(zoom)

    svg
      .selectAll('path')
      .data(countries)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', colors.blue.transparent || colors.blue.light)
      .attr('stroke', colors.blue.default)
      .attr('class', 'country')
      .on('mouseover', function (event, d) {
        d3.select(this).attr(
          'fill',
          colors.purple.transparent || colors.purple.light
        )
        tooltip
          .style('display', 'block')
          //@ts-ignore
          .text(d.properties.name)
      })
      .on('mouseleave', function () {
        d3.select(this).attr(
          'fill',
          colors.blue.transparent || colors.blue.light
        )
        tooltip.style('display', 'none')
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`)
      })
      .on('click', async function (event, d) {
        //@ts-ignore
        const countryName = d.properties.name
        try {
          const articles = await getArticles(countryName, {
            pageSize: 5,
          })
          openPopup()
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

  return { svgRef, tooltipRef }
}
