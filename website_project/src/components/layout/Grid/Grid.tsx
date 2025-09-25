import { forwardRef } from 'react'
import { GridProps } from './Grid.types'

export default forwardRef<HTMLDivElement, GridProps>(
  ({
    cols = 1,
    gap = 'md',
    responsive = true,
    className = '',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'grid'

    const colStyles = responsive ? {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-1 md:grid-cols-6 lg:grid-cols-12'
    } : {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      12: 'grid-cols-12'
    }

    const gapStyles = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    }

    const gridClasses = [
      baseStyles,
      colStyles[cols],
      gapStyles[gap],
      className
    ].join(' ')

    return (
      <div
        ref={ref}
        className={gridClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)