'use client'

import * as d3 from 'd3'
import { geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldData from 'world-atlas/countries-50m.json'
import { WorldData } from './types'

export const getGeo = (
  width: number,
  height: number,
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  const projection = d3
    .geoNaturalEarth1()
    .scale(200)
    .translate([width / 2, height / 2])
  const pathGenerator = geoPath().projection(projection)

  const typedWorldData = worldData as WorldData

  const countries = feature(
    typedWorldData,
    typedWorldData.objects.countries
    //@ts-ignore
  ).features.filter((country) => country.properties.name !== 'Antarctica')

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .on('zoom', (event) => {
      svg.selectAll('path').attr('transform', event.transform.toString())
    })
  return { pathGenerator, countries, zoom }
}
