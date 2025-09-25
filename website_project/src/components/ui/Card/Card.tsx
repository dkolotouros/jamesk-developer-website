import { forwardRef } from 'react'
import { CardProps } from './Card.types'

export default forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'rounded-xl border transition-all duration-300'

    const variantStyles = {
      default: 'bg-gray-900 border-gray-800',
      interactive: 'bg-gray-900 border-gray-800 cursor-pointer hover:border-gray-700',
      glass: 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm'
    }

    const paddingStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    const hoverStyles = hover ? 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10' : ''

    const cardClasses = [
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      hoverStyles,
      className
    ].join(' ')

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)