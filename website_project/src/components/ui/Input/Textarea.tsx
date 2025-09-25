import { forwardRef } from 'react'
import { TextareaProps } from './Input.types'

export default forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    helperText,
    variant = 'default',
    size = 'md',
    resize = true,
    className = '',
    required = false,
    ...props
  }, ref) => {
    const baseStyles = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'

    const variantStyles = {
      default: 'bg-transparent border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500',
      filled: 'bg-gray-800 border-gray-800 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500'
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg'
    }

    const resizeStyles = resize ? 'resize-y' : 'resize-none'
    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''

    const textareaClasses = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      resizeStyles,
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
        <textarea
          ref={ref}
          className={textareaClasses}
          rows={4}
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