import { HTMLAttributes, ReactNode } from 'react'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  variant?: 'gradient' | 'default'
}

export interface HeadingProps extends TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface TextProps extends TypographyProps {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}