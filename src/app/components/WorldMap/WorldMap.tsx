'use client'

import React from 'react'
import { useMap } from './useMap'

const WorldMap: React.FC = () => {
  const svgRef = useMap()

  return <svg ref={svgRef} width={1000} height={600}></svg>
}

export default WorldMap
