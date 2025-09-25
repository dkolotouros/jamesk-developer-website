import { createElement } from 'react'
import { HeadingProps } from './Typography.types'

export default function Heading({
  as = 'h1',
  variant = 'default',
  className = '',
  children,
  ...props
}: HeadingProps) {
  const baseStyles = 'font-bold leading-tight tracking-tight'

  const sizeStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl'
  }

  const variantStyles = {
    default: 'text-white',
    gradient: 'bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent'
  }

  const headingClasses = [
    baseStyles,
    sizeStyles[as],
    variantStyles[variant],
    className
  ].join(' ')

  return createElement(as, {
    className: headingClasses,
    ...props
  }, children)
}