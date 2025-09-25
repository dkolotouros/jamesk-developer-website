import { forwardRef } from 'react'
import { StackProps } from './Stack.types'

export default forwardRef<HTMLDivElement, StackProps>(
  ({
    spacing = 'md',
    direction = 'vertical',
    align = 'stretch',
    className = '',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'flex'

    const directionStyles = {
      vertical: 'flex-col',
      horizontal: 'flex-row'
    }

    const spacingStyles = direction === 'vertical' ? {
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
      '2xl': 'space-y-12'
    } : {
      xs: 'space-x-1',
      sm: 'space-x-2',
      md: 'space-x-4',
      lg: 'space-x-6',
      xl: 'space-x-8',
      '2xl': 'space-x-12'
    }

    const alignStyles = direction === 'vertical' ? {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    } : {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: 'justify-stretch'
    }

    const stackClasses = [
      baseStyles,
      directionStyles[direction],
      spacingStyles[spacing],
      alignStyles[align],
      className
    ].join(' ')

    return (
      <div
        ref={ref}
        className={stackClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)