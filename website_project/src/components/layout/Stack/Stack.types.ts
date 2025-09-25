import { HTMLAttributes, ReactNode } from 'react'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  direction?: 'vertical' | 'horizontal'
  align?: 'start' | 'center' | 'end' | 'stretch'
}