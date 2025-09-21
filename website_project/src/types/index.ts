// Common TypeScript interfaces and types

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface AnimationProps {
  delay?: number
  duration?: number
  easing?: string
}

export interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
}

export type ComponentVariant = 'primary' | 'secondary' | 'ghost'
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl'
export type ColorScheme = 'purple' | 'pink' | 'blue'

export interface ProjectData {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface ContactInfo {
  email: string
  github: string
  linkedin: string
  twitter?: string
}