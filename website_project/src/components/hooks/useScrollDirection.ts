import { useEffect, useState, useRef } from 'react'

export type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  /**
   * Minimum scroll distance in pixels before direction change is detected
   * @default 10
   */
  threshold?: number

  /**
   * Initial scroll direction
   * @default null
   */
  initialDirection?: ScrollDirection
}

/**
 * Custom hook for detecting scroll direction
 * Useful for showing/hiding headers based on scroll behavior
 *
 * @param options - Configuration options
 * @returns Current scroll direction ('up', 'down', or null)
 *
 * @example
 * ```tsx
 * function Header() {
 *   const scrollDirection = useScrollDirection({ threshold: 10 })
 *
 *   return (
 *     <header className={scrollDirection === 'down' ? 'hidden' : 'visible'}>
 *       Navigation
 *     </header>
 *   )
 * }
 * ```
 */
export default function useScrollDirection(
  options: UseScrollDirectionOptions = {}
): ScrollDirection {
  const { threshold = 10, initialDirection = null } = options

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection)
  const lastScrollYRef = useRef(window.scrollY)
  const tickingRef = useRef(false)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Only update if scroll distance exceeds threshold
      if (Math.abs(scrollY - lastScrollYRef.current) < threshold) {
        tickingRef.current = false
        return
      }

      // Determine direction
      const newDirection: ScrollDirection = scrollY > lastScrollYRef.current ? 'down' : 'up'

      // Update state with functional update to avoid stale closure
      setScrollDirection(prev => {
        // Only update if direction actually changed
        if (prev !== newDirection) {
          return newDirection
        }
        return prev
      })

      lastScrollYRef.current = scrollY > 0 ? scrollY : 0
      tickingRef.current = false
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateScrollDirection)
        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return scrollDirection
}
