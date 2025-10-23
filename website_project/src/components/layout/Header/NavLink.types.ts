import { type AnchorHTMLAttributes } from 'react'

/**
 * Visual theme for navigation links
 * Maps to design system gradients and glow effects
 */
export type NavLinkTheme = 'primary' | 'secondary' | 'accent'

/**
 * Display variant for NavLink
 * - desktop: Enhanced hover effects with scale and rotation
 * - mobile: Simplified effects optimized for touch
 */
export type NavLinkVariant = 'desktop' | 'mobile'

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * Link destination (supports anchor links like #about)
   */
  href: string

  /**
   * Link text content
   */
  children: React.ReactNode

  /**
   * Visual theme determining gradient and glow colors
   * @default 'primary'
   */
  theme?: NavLinkTheme

  /**
   * Display variant for different contexts
   * @default 'desktop'
   */
  variant?: NavLinkVariant

  /**
   * Callback fired on link click
   * Use to handle smooth scrolling or analytics
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Whether this link is currently active
   * @default false
   */
  isActive?: boolean
}
