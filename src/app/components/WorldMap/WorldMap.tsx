'use client'

import { useResponsiveSvg } from '@/app/hook'
import React from 'react'
import { useMap } from './useMap'

const WorldMap: React.FC = () => {
  const { width, height } = useResponsiveSvg()

  const svgRef = useMap()

  if (width === 0 || height === 0) return null

  return <svg ref={svgRef} width={width} height={height}></svg>
}

export default WorldMap
