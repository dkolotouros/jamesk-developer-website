import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

interface UseIntersectionObserverResult {
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
}

/**
 * Custom hook for observing element intersection with viewport
 * Useful for scroll-triggered animations and lazy loading
 *
 * @param options - IntersectionObserver options with optional freezeOnceVisible
 * @returns Object containing isIntersecting state and intersection entry
 */
export default function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [RefObject<Element | null>, UseIntersectionObserverResult] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options

  const elementRef = useRef<Element | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isIntersecting, setIsIntersecting] = useState(false)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = elementRef.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !element) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      setIsIntersecting(entry.isIntersecting)
    }, observerParams)

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, root, rootMargin, frozen, elementRef.current])

  return [elementRef, { isIntersecting, entry }]
}