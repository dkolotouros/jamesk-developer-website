'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { type HeaderProps, type NavItem } from './Header.types'
import NavLink from './NavLink'
import useScrollDirection from '@/components/hooks/useScrollDirection'

/**
 * Default navigation configuration
 * Maps sections to their visual themes
 */
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', theme: 'primary' },
  { label: 'Projects', href: '#projects', theme: 'secondary' },
  { label: 'Contact', href: '#contact', theme: 'accent' },
]

/**
 * Header - Main navigation header with enhanced effects
 *
 * Features:
 * - Sticky positioning with auto-hide on scroll down
 * - Backdrop blur when scrolled
 * - Responsive mobile menu
 * - Smooth scroll to anchor links
 * - Integration with useScrollDirection hook
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Header
 *   navItems={[
 *     { label: 'About', href: '#about', theme: 'primary' }
 *   ]}
 *   logo="JK"
 *   autoHide
 * />
 * ```
 */
export default function Header({
  navItems = DEFAULT_NAV_ITEMS,
  logo = 'JK',
  className = '',
  autoHide = true,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const scrollDirection = useScrollDirection({ threshold: 10 })

  // Track scroll position for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section for navigation highlighting
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections referenced in navigation
    navItems.forEach((item) => {
      if (item.href.startsWith('#')) {
        const element = document.querySelector(item.href)
        if (element) observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [navItems])

  /**
   * Handle navigation link clicks
   * Implements smooth scrolling for anchor links
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMobileMenuOpen(false)

        // Update URL without triggering scroll
        window.history.pushState(null, '', href)
      }
    }
  }

  /**
   * Toggle mobile menu
   * Prevents body scroll when menu is open
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev

      // Prevent body scroll when menu is open
      if (newState) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }

      return newState
    })
  }

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Determine if header should be hidden
  const shouldHide = autoHide && scrollDirection === 'down' && !isMobileMenuOpen

  return (
    <header
      className={clsx(
        // Fixed positioning
        'fixed top-0 left-0 right-0 z-50',

        // Auto-hide animation
        'transition-transform duration-300 ease-smooth',
        'motion-reduce:transition-none',
        {
          '-translate-y-full': shouldHide,
          'translate-y-0': !shouldHide,
        },

        className
      )}
    >
      <nav
        className={clsx(
          'transition-all duration-300 ease-smooth',
          'motion-reduce:transition-none',
          {
            // Scrolled state: backdrop blur + border
            'bg-background-primary/80 backdrop-blur-md border-b border-white/10': isScrolled,
            // Top of page: transparent
            'bg-transparent': !isScrolled,
          }
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className={clsx(
                'text-2xl font-bold text-text-primary',
                'transition-opacity duration-200',
                'hover:opacity-80',
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-white/50',
                'focus-visible:ring-offset-2',
                'focus-visible:ring-offset-background-primary',
                'rounded-lg',
                'px-2 py-1'
              )}
              aria-label="Home"
            >
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1" role="list">
              {navItems.map((item) => (
                <div key={item.label} role="listitem">
                  <NavLink
                    href={item.href}
                    theme={item.theme}
                    variant="desktop"
                    onClick={(e) => handleNavClick(e, item.href)}
                    isActive={activeSection === item.href}
                  >
                    {item.label}
                  </NavLink>
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={clsx(
                'md:hidden',
                'inline-flex items-center justify-center',
                'p-2 rounded-lg',
                'text-text-primary',
                'hover:bg-white/10',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-inset',
                'focus:ring-white/50',
                'transition-colors duration-200'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
            >
              {/* Animated hamburger/close icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  // Close icon (X)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={clsx(
            'md:hidden',
            'transition-all duration-300 ease-smooth',
            'motion-reduce:transition-none',
            {
              'max-h-screen opacity-100': isMobileMenuOpen,
              'max-h-0 opacity-0 overflow-hidden': !isMobileMenuOpen,
            }
          )}
          role="list"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background-secondary/95 backdrop-blur-md border-t border-white/10">
            {navItems.map((item) => (
              <div key={item.label} role="listitem">
                <NavLink
                  href={item.href}
                  theme={item.theme}
                  variant="mobile"
                  onClick={(e) => handleNavClick(e, item.href)}
                  isActive={activeSection === item.href}
                  className="block w-full"
                >
                  {item.label}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
