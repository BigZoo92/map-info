import React from 'react'
import { useResponsiveSvg } from '../../hook/'
import useStore from '../../store/useStore'
import { Tooltip } from '../Tooltip'
import { useMap } from './useMap'

const WorldMap: React.FC = () => {
  const { width, height } = useResponsiveSvg()
  const { isPopupOpen } = useStore()
  const { svgRef, tooltipRef } = useMap()

  if (width === 0 || height === 0) return null

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          pointerEvents: isPopupOpen ? 'none' : 'all',
        }}
      ></svg>
      <Tooltip tooltipRef={tooltipRef} />
    </div>
  )
}

export default WorldMap
