import { renderHook, act } from '@testing-library/react'
import useScrollDirection from '../useScrollDirection'
import { jest, expect, beforeEach, afterEach, describe, it } from '@jest/globals'

// Mock window.scrollY
let scrollY = 0
Object.defineProperty(window, 'scrollY', {
  get: () => scrollY,
  configurable: true,
})

// Mock requestAnimationFrame
let rafCallbacks: FrameRequestCallback[] = []
const mockRAF = jest.fn((callback: FrameRequestCallback) => {
  rafCallbacks.push(callback)
  return rafCallbacks.length
})

// Track hook unmount functions for cleanup
let cleanupFunctions: Array<() => void> = []

beforeEach(() => {
  scrollY = 0
  rafCallbacks = []
  cleanupFunctions = []
  window.requestAnimationFrame = mockRAF as typeof window.requestAnimationFrame
  mockRAF.mockClear()
})

// afterEach(() => {
//   // Unmount all hooks to clean up event listeners
//   cleanupFunctions.forEach(cleanup => cleanup())
//   cleanupFunctions = []

//   jest.resetAllMocks()
//   scrollY = 0
//   rafCallbacks = []
// })

// Helper to simulate scroll
const simulateScroll = (newScrollY: number) => {
  act(() => {
    scrollY = newScrollY
    window.dispatchEvent(new Event('scroll'))

    // Execute all pending requestAnimationFrame callbacks
    rafCallbacks.forEach(callback => callback(Date.now()))
    rafCallbacks = []
  })
}

describe('useScrollDirection', () => {
  it('should return null initially', () => {
    const { result, unmount } = renderHook(() => useScrollDirection())
    expect(result.current).toBeNull()
    unmount()
  })

  it('should return custom initial direction when provided', () => {
    const { result } = renderHook(() =>
      useScrollDirection({ initialDirection: 'down' })
    )
    expect(result.current).toBe('down')
  })

  it('should detect scroll down', () => {
    const { result, unmount } = renderHook(() => useScrollDirection({ threshold: 10 }))
    cleanupFunctions.push(unmount)

    // Initially null
    expect(result.current).toBeNull()

    // Scroll down by more than threshold
    simulateScroll(50)

    // Should detect scroll down
    expect(result.current).toBe('down')
  })

  it('should detect scroll up', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }))

    // Scroll down first
    simulateScroll(100)
    expect(result.current).toBe('down')

    // Scroll up
    simulateScroll(50)
    expect(result.current).toBe('up')
  })

  it('should respect threshold - no change below threshold', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 20 }))

    expect(result.current).toBeNull()

    // Scroll by less than threshold (20px)
    simulateScroll(15)

    // Should still be null
    expect(result.current).toBeNull()
  })

  it('should respect threshold - change when exceeded', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 20 }))

    expect(result.current).toBeNull()

    // Scroll by more than threshold (20px)
    simulateScroll(25)

    // Should detect direction
    expect(result.current).toBe('down')
  })

  it('should use default threshold of 10px', () => {
    const { result } = renderHook(() => useScrollDirection())

    // Scroll by 5px (less than default threshold of 10)
    simulateScroll(5)
    expect(result.current).toBeNull()

    // Scroll by 15px (more than default threshold)
    simulateScroll(15)
    expect(result.current).toBe('down')
  })

  it('should use requestAnimationFrame for performance', () => {
    renderHook(() => useScrollDirection())

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'))

    // Should have called requestAnimationFrame
    expect(mockRAF).toHaveBeenCalled()
  })

  it('should throttle multiple scroll events with RAF', () => {
    renderHook(() => useScrollDirection())

    // Trigger multiple scroll events rapidly
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))

    // Should only call RAF once (ticking mechanism)
    expect(mockRAF).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple direction changes', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }))

    // Scroll down
    simulateScroll(50)
    expect(result.current).toBe('down')

    // Scroll up
    simulateScroll(20)
    expect(result.current).toBe('up')

    // Scroll down again
    simulateScroll(80)
    expect(result.current).toBe('down')

    // Scroll up again
    simulateScroll(30)
    expect(result.current).toBe('up')
  })

  it('should not update state if direction has not changed', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }))

    // Scroll down
    simulateScroll(50)
    const firstDirection = result.current
    expect(firstDirection).toBe('down')

    // Continue scrolling down
    simulateScroll(100)
    // Should still be 'down' (same reference if properly optimized)
    expect(result.current).toBe('down')
  })

  it('should handle scroll to top (0)', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }))

    // Scroll down
    simulateScroll(100)
    expect(result.current).toBe('down')

    // Scroll back to top
    simulateScroll(0)
    expect(result.current).toBe('up')
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useScrollDirection())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })

  it('should add event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

    renderHook(() => useScrollDirection())

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    addEventListenerSpy.mockRestore()
  })

  it('should update when threshold option changes', () => {
    const { result, rerender } = renderHook(
      ({ threshold }) => useScrollDirection({ threshold }),
      { initialProps: { threshold: 50 } }
    )

    // Scroll by 30px (less than 50)
    simulateScroll(30)
    expect(result.current).toBeNull()

    // Change threshold to 20
    rerender({ threshold: 20 })

    // Scroll by 35px from start (more than 20, less than 50)
    simulateScroll(35)
    expect(result.current).toBe('down')
  })
})
