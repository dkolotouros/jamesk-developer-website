import { forwardRef } from 'react'
import { ContainerProps } from './Container.types'

export default forwardRef<HTMLDivElement, ContainerProps>(
  ({
    size = 'lg',
    centerContent = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'mx-auto px-4 sm:px-6 lg:px-8'

    const sizeStyles = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-none'
    }

    const centerStyles = centerContent ? 'flex items-center justify-center' : ''

    const containerClasses = [
      baseStyles,
      sizeStyles[size],
      centerStyles,
      className
    ].join(' ')

    return (
      <div
        ref={ref}
        className={containerClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)