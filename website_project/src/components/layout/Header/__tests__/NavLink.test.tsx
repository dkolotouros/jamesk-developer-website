import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest, expect, describe, it } from '@jest/globals'
import NavLink from '../NavLink'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

describe('NavLink', () => {
  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<NavLink href="#about">About</NavLink>)
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    })

    it('should render with correct href', () => {
      render(<NavLink href="#projects">Projects</NavLink>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#projects')
    })

    it('should apply custom className', () => {
      render(
        <NavLink href="#test" className="custom-class">
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('custom-class')
    })

    it('should render with default theme (primary)', () => {
      const { container } = render(<NavLink href="#test">Test</NavLink>)
      const link = container.querySelector('a')
      expect(link).toBeInTheDocument()
      // Component should have default styling classes
      expect(link).toHaveClass('relative', 'inline-flex')
    })
  })

  describe('Theme Support', () => {
    it('should apply primary theme classes', () => {
      const { container } = render(
        <NavLink href="#test" theme="primary">
          Test
        </NavLink>
      )
      const glowBg = container.querySelector('[aria-hidden="true"]')
      expect(glowBg).toHaveClass('from-primary-500')
    })

    it('should apply secondary theme classes', () => {
      const { container } = render(
        <NavLink href="#test" theme="secondary">
          Test
        </NavLink>
      )
      const glowBg = container.querySelector('[aria-hidden="true"]')
      expect(glowBg).toHaveClass('from-secondary-500')
    })

    it('should apply accent theme classes', () => {
      const { container } = render(
        <NavLink href="#test" theme="accent">
          Test
        </NavLink>
      )
      const glowBg = container.querySelector('[aria-hidden="true"]')
      expect(glowBg).toHaveClass('from-accent-500')
    })
  })

  describe('Variant Support', () => {
    it('should apply desktop variant classes', () => {
      render(
        <NavLink href="#test" variant="desktop">
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('hover:scale-110', 'hover:rotate-2')
    })

    it('should apply mobile variant classes', () => {
      render(
        <NavLink href="#test" variant="mobile">
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('active:scale-95')
    })

    it('should default to desktop variant', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('hover:scale-110')
    })
  })

  describe('Active State', () => {
    it('should apply active state styling when isActive is true', () => {
      render(
        <NavLink href="#test" isActive>
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('font-bold')
      expect(link).toHaveAttribute('aria-current', 'page')
    })

    it('should not apply active state styling when isActive is false', () => {
      render(
        <NavLink href="#test" isActive={false}>
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).not.toHaveClass('font-bold')
      expect(link).not.toHaveAttribute('aria-current')
    })

    it('should default to inactive state', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')
      expect(link).not.toHaveAttribute('aria-current')
    })
  })

  describe('Accessibility', () => {
    it('should have proper focus-visible classes', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-white/50'
      )
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')

      await user.tab()
      expect(link).toHaveFocus()
    })

    it('should support ARIA current for active links', () => {
      render(
        <NavLink href="#test" isActive>
          Test
        </NavLink>
      )
      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
    })

    it('should have rounded corners for focus outline', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('rounded-lg')
    })
  })

  describe('Reduced Motion Support', () => {
    it('should include motion-reduce classes for transitions', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('motion-reduce:transition-none')
    })

    it('should disable scale transform in reduced motion mode', () => {
      render(
        <NavLink href="#test" variant="desktop">
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'motion-reduce:hover:scale-100',
        'motion-reduce:hover:rotate-0'
      )
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()

      render(
        <NavLink href="#test" onClick={handleClick}>
          Test
        </NavLink>
      )

      await user.click(screen.getByRole('link'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should pass event to onClick handler', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()

      render(
        <NavLink href="#test" onClick={handleClick}>
          Test
        </NavLink>
      )

      await user.click(screen.getByRole('link'))
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()

      render(<NavLink href="#test">Test</NavLink>)

      // Should not throw
      await expect(user.click(screen.getByRole('link'))).resolves.not.toThrow()
    })
  })

  describe('HTML Attributes', () => {
    it('should pass through additional props', () => {
      render(
        <NavLink href="#test" data-testid="custom-link" aria-label="Custom label">
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-testid', 'custom-link')
      expect(link).toHaveAttribute('aria-label', 'Custom label')
    })

    it('should support custom aria attributes', () => {
      render(
        <NavLink href="#test" aria-describedby="description">
          Test
        </NavLink>
      )
      expect(screen.getByRole('link')).toHaveAttribute('aria-describedby', 'description')
    })
  })

  describe('Glow Effect Structure', () => {
    it('should render glow background element', () => {
      const { container } = render(<NavLink href="#test">Test</NavLink>)
      const glowBg = container.querySelector('[aria-hidden="true"]')
      expect(glowBg).toBeInTheDocument()
      expect(glowBg).toHaveClass('absolute', 'inset-0', 'bg-gradient-to-r')
    })

    it('should render text wrapper for glow effect', () => {
      const { container } = render(<NavLink href="#test">Test Content</NavLink>)
      // Text should be wrapped in a span
      const textWrapper = container.querySelector('span.relative.z-10')
      expect(textWrapper).toBeInTheDocument()
      expect(textWrapper).toHaveTextContent('Test Content')
    })

    it('should hide glow background from screen readers', () => {
      const { container } = render(<NavLink href="#test">Test</NavLink>)
      const glowBg = container.querySelector('[aria-hidden="true"]')
      expect(glowBg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Integration', () => {
    it('should combine theme, variant, and active state correctly', () => {
      render(
        <NavLink href="#test" theme="secondary" variant="mobile" isActive>
          Test
        </NavLink>
      )
      const link = screen.getByRole('link')

      // Should have mobile variant classes
      expect(link).toHaveClass('active:scale-95')
      // Should have active state
      expect(link).toHaveAttribute('aria-current', 'page')
      expect(link).toHaveClass('font-bold')
    })

    it('should maintain all base classes regardless of configuration', () => {
      render(<NavLink href="#test">Test</NavLink>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass(
        'relative',
        'inline-flex',
        'items-center',
        'justify-center',
        'px-4',
        'py-2',
        'font-medium',
        'text-text-primary'
      )
    })
  })
})
