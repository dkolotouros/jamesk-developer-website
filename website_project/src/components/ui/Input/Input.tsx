import { forwardRef } from 'react'
import { InputProps } from './Input.types'

export default forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    variant = 'default',
    size = 'md',
    className = '',
    required = false,
    ...props
  }, ref) => {
    const baseStyles = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

    const variantStyles = {
      default: 'bg-transparent border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus-visible:ring-purple-500',
      filled: 'bg-gray-800 border-gray-800 text-white placeholder-gray-400 focus:border-purple-500 focus-visible:ring-purple-500'
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg'
    }

    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus-visible:ring-red-500' : ''

    const inputClasses = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      errorStyles,
      className
    ].join(' ')

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)