import { createElement } from 'react'
import { TextProps } from './Typography.types'

export default function Text({
  as = 'p',
  size = 'base',
  weight = 'normal',
  variant = 'default',
  className = '',
  children,
  ...props
}: TextProps) {
  const baseStyles = 'leading-relaxed'

  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const variantStyles = {
    default: 'text-gray-300',
    gradient: 'bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent'
  }

  const textClasses = [
    baseStyles,
    sizeStyles[size],
    weightStyles[weight],
    variantStyles[variant],
    className
  ].join(' ')

  return createElement(as, {
    className: textClasses,
    ...props
  }, children)
}