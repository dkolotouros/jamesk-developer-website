import { type NavLinkTheme } from './NavLink.types'

export interface NavItem {
  label: string
  href: string
  theme: NavLinkTheme
}

export interface HeaderProps {
  /**
   * Navigation items to display in the header
   */
  navItems?: NavItem[]

  /**
   * Logo text or component
   * @default "JK"
   */
  logo?: React.ReactNode

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Whether to enable auto-hide on scroll down
   * @default true
   */
  autoHide?: boolean
}
