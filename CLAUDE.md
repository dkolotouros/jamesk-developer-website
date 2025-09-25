# Claude Code Project Context

## Coding Style Preferences

### React Components
- **Export pattern**: Use inline `export default` with function components instead of separate export statements
- **Preferred pattern**:
  ```tsx
  export default forwardRef<HTMLButtonElement, Props>((props, ref) => {
    // component logic
  })
  ```
- **Avoid**:
  ```tsx
  const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    // component logic
  })

  Button.displayName = 'Button'
  export default Button
  ```

## Project Context
- Personal developer website built with Next.js 14+, TypeScript, and Tailwind CSS
- Following atomic design methodology for component architecture
- Currently in Phase 2: Building base UI component library
- Phase 1 (Project Setup & Foundation) completed with PR merged

## Development Workflow
- Feature branch workflow with conventional commits
- Professional Git history with phase-based development
- Comprehensive documentation and specifications in SPECIFICATIONS.md