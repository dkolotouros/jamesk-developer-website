import { HTMLAttributes, ReactNode } from 'react'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}