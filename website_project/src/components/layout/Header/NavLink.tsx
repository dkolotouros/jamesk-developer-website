'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { type NavLinkProps, type NavLinkTheme } from './NavLink.types'

/**
 * Theme configuration mapping
 * Uses Tailwind design tokens defined in config
 */
const THEME_CONFIG: Record<NavLinkTheme, {
  gradient: string
  shadow: string
  dropShadow: string
}> = {
  primary: {
    gradient: 'from-primary-500 to-purple-700',
    shadow: 'shadow-glow-primary',
    dropShadow: 'drop-shadow-glow-primary',
  },
  secondary: {
    gradient: 'from-secondary-500 to-pink-600',
    shadow: 'shadow-glow-secondary',
    dropShadow: 'drop-shadow-glow-secondary',
  },
  accent: {
    gradient: 'from-accent-500 to-cyan-500',
    shadow: 'shadow-glow-accent',
    dropShadow: 'drop-shadow-glow-accent',
  },
}

/**
 * NavLink - Navigation link with enhanced hover effects
 *
 * Features:
 * - Gradient glow effects on hover
 * - Responsive variants for desktop/mobile
 * - Accessibility-first with ARIA labels and focus states
 * - Respects prefers-reduced-motion
 * - Theme support tied to design system
 *
 * @example
 * ```tsx
 * <NavLink href="#about" theme="primary">
 *   About
 * </NavLink>
 * ```
 */
export default function NavLink({
  href,
  children,
  theme = 'primary',
  variant = 'desktop',
  onClick,
  className,
  isActive = false,
  ...props
}: NavLinkProps) {
  const config = THEME_CONFIG[theme]

  const baseClasses = clsx(
    // Layout & Typography
    'relative inline-flex items-center justify-center',
    'px-4 py-2',
    'font-medium text-text-primary',

    // Transitions (respects prefers-reduced-motion)
    'transition-all duration-300',
    'motion-reduce:transition-none',

    // Focus states (WCAG compliant)
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background-primary',
    'focus-visible:ring-white/50',
    'rounded-lg',
  )

  const variantClasses = clsx({
    // Desktop: Scale + rotate on hover
    'hover:scale-110 hover:rotate-2 motion-reduce:hover:scale-100 motion-reduce:hover:rotate-0':
      variant === 'desktop',

    // Mobile: No transform effects (better for touch)
    'active:scale-95 motion-reduce:active:scale-100':
      variant === 'mobile',
  })

  const activeClasses = clsx({
    'font-bold': isActive,
  })

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, activeClasses, className)}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {/* Glowing background effect */}
      <span
        className={clsx(
          'absolute inset-0 -z-10 rounded-lg',
          'bg-gradient-to-r',
          config.gradient,
          config.shadow,
          'opacity-0 group-hover:opacity-100 hover:opacity-100',
          'transition-opacity duration-300',
          'motion-reduce:transition-none',
          {
            'opacity-100': isActive,
          }
        )}
        aria-hidden="true"
      />

      {/* Text with glow effect on hover */}
      <span
        className={clsx(
          'relative z-10',
          'transition-all duration-300',
          'motion-reduce:transition-none',
          `hover:filter hover:${config.dropShadow}`,
          {
            [`filter ${config.dropShadow}`]: isActive,
          }
        )}
      >
        {children}
      </span>
    </Link>
  )
}
