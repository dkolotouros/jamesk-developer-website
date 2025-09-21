# Component Architecture

This project follows Atomic Design principles for scalable, maintainable components.

## Structure

```
components/
├── ui/                    # Atoms - Base reusable components
│   ├── Button/           # Primary, secondary, ghost variants
│   ├── Card/             # Flexible container with hover effects
│   ├── Typography/       # H1-H6, P, semantic text components
│   ├── Input/            # Form inputs with consistent styling
│   └── Icon/             # SVG icon components
├── layout/               # Molecules - Layout components
│   ├── Header/           # Sticky navigation with backdrop blur
│   ├── Footer/           # Site footer
│   ├── Container/        # Responsive container wrapper
│   ├── Grid/             # CSS Grid layout helper
│   └── Stack/            # Flexbox stack layout
├── sections/            # Organisms - Page-specific sections
│   ├── Hero/             # Landing section with animations
│   ├── About/            # About section with skills
│   ├── Projects/         # Portfolio showcase
│   └── Contact/          # Contact form and links
├── animations/          # Animation components
│   ├── FadeIn/           # Fade-in animation wrapper
│   ├── ScrollTrigger/    # Scroll-triggered animations
│   └── ParallaxBackground/ # Parallax background effects
└── hooks/               # Custom hooks
    ├── useIntersectionObserver.ts
    ├── useScrollDirection.ts
    ├── useMediaQuery.ts
    └── useMouse.ts
```

## Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Composition over inheritance**: Combine simple components for complex ones
- **Prop-driven variants**: Control styling and behavior through props
- **TypeScript interfaces**: Clear prop types for all components
- **Performance-first**: CSS-only animations, optimized renders