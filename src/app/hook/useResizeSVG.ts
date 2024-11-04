'use client'

import { useDebounce, useWindowSize } from '@uidotdev/usehooks'
import { useCallback, useEffect, useState } from 'react'

type Size = {
  width: number
  height: number
}

export const useResponsiveSvg = () => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const debouncedWindowWidth = useDebounce(windowWidth, 100)
  const debouncedWindowHeight = useDebounce(windowHeight, 100)

  const resizeSvg = useCallback(() => {
    const parent = document.querySelector('.svg-container')
    console.log(parent)
    if (parent) {
      const { width, height } = parent.getBoundingClientRect()
      setSize({ width, height })
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    resizeSvg()
  }, [debouncedWindowWidth, debouncedWindowHeight, resizeSvg])

  return size
}
