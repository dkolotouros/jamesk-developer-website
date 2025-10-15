import { renderHook, act } from '@testing-library/react'
import useIntersectionObserver from '../useIntersectionObserver'
import { jest, expect, beforeEach, afterEach, describe, it } from '@jest/globals'

// Mock IntersectionObserver
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
let mockCallback: (entries: IntersectionObserverEntry[]) => void

const createMockIntersectionObserver = (callback: any, options: any) => {
  mockCallback = callback
  return {
    observe: mockObserve,
    disconnect: mockDisconnect,
    root: options?.root || null,
    rootMargin: options?.rootMargin || '',
    thresholds: Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0]
  }
}

beforeEach(() => {
  mockObserve.mockClear()
  mockDisconnect.mockClear()

  global.IntersectionObserver = jest.fn().mockImplementation(createMockIntersectionObserver) as typeof IntersectionObserver
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('useIntersectionObserver', () => {
  it('should return ref and initial state', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    const [ref, state] = result.current

    expect(ref).toBeDefined()
    expect(ref.current).toBeNull()
    expect(state.isIntersecting).toBe(false)
    expect(state.entry).toBeUndefined()
  })

  it('should create IntersectionObserver when element is attached', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    // Initially no observer created
    expect(global.IntersectionObserver).not.toHaveBeenCalled()
    expect(mockObserve).not.toHaveBeenCalled()

    // Add element to ref
    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
        root: null,
        rootMargin: '0%',
      }
    )
    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('should create IntersectionObserver with custom options', () => {
    const options = {
      threshold: 0.5,
      rootMargin: '10px',
      root: document.createElement('div'),
    }

    const { result, rerender } = renderHook(() => useIntersectionObserver(options))
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        root: options.root,
        rootMargin: '10px',
      }
    )
    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('should update state when intersection changes', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    // Create mock intersection entry
    const mockEntry: IntersectionObserverEntry = {
      isIntersecting: true,
      intersectionRatio: 0.5,
      target: mockElement,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now(),
    }

    // Simulate intersection callback
    act(() => {
      mockCallback([mockEntry])
    })
    rerender()

    const [, state] = result.current
    expect(state.isIntersecting).toBe(true)
    expect(state.entry).toBe(mockEntry)
  })

  it('should disconnect observer on unmount', () => {
    const { result, rerender, unmount } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    expect(mockDisconnect).not.toHaveBeenCalled()

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should not create observer if IntersectionObserver is not supported', () => {
    // Save original
    const originalIO = global.IntersectionObserver

    // Remove IntersectionObserver support
    // @ts-expect-error - Testing browser compatibility
    global.IntersectionObserver = undefined

    const { result, rerender } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    expect(mockObserve).not.toHaveBeenCalled()

    // Restore IntersectionObserver
    global.IntersectionObserver = originalIO
  })

  it('should handle freezeOnceVisible option', () => {
    const { result, rerender } = renderHook(() =>
      useIntersectionObserver({ freezeOnceVisible: true })
    )
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    // First intersection - element becomes visible
    const visibleEntry: IntersectionObserverEntry = {
      isIntersecting: true,
      intersectionRatio: 1,
      target: mockElement,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now(),
    }

    act(() => {
      mockCallback([visibleEntry])
    })
    rerender()

    const [, state] = result.current
    expect(state.isIntersecting).toBe(true)

    // After becoming visible once, the observer should not be recreated
    // Reset the mock to track new calls
    mockDisconnect.mockClear()
    global.IntersectionObserver = jest.fn().mockImplementation(createMockIntersectionObserver) as typeof IntersectionObserver

    // Re-render should not create a new observer (frozen state)
    rerender()
    expect(global.IntersectionObserver).not.toHaveBeenCalled()
  })

  it('should handle threshold as array', () => {
    const options = { threshold: [0, 0.25, 0.5, 0.75, 1] }
    const { result, rerender } = renderHook(() => useIntersectionObserver(options))
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: null,
        rootMargin: '0%',
      }
    )
  })

  it('should handle intersection state changes correctly', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    const mockElement = document.createElement('div')
    act(() => {
      ref.current = mockElement
    })
    rerender()

    // Start not intersecting
    let [, state] = result.current
    expect(state.isIntersecting).toBe(false)

    // Enter viewport
    const enterEntry: IntersectionObserverEntry = {
      isIntersecting: true,
      intersectionRatio: 0.8,
      target: mockElement,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now(),
    }

    act(() => {
      mockCallback([enterEntry])
    })
    rerender()

    ;[, state] = result.current
    expect(state.isIntersecting).toBe(true)
    expect(state.entry?.intersectionRatio).toBe(0.8)

    // Exit viewport
    const exitEntry: IntersectionObserverEntry = {
      isIntersecting: false,
      intersectionRatio: 0,
      target: mockElement,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now() + 100,
    }

    act(() => {
      mockCallback([exitEntry])
    })
    rerender()

    ;[, state] = result.current
    expect(state.isIntersecting).toBe(false)
    expect(state.entry?.intersectionRatio).toBe(0)
  })
})