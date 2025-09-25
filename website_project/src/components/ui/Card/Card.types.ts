import { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  variant?: 'default' | 'interactive' | 'glass'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}