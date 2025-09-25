# Personal Developer Website

A high-performance personal developer portfolio website built with modern web technologies, showcasing development skills and projects with stunning visual effects and exceptional user experience.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+, TypeScript, Tailwind CSS
- **Performance Optimized**: Targeting 95+ Lighthouse scores and Core Web Vitals
- **Stunning Animations**: CSS-only animations with scroll triggers and hover effects
- **Fully Accessible**: WCAG 2.1 AA compliant with proper semantic HTML
- **Responsive Design**: Mobile-first approach with elegant transitions
- **Modular Architecture**: Atomic design principles with reusable components

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3+
- **Runtime**: React 18+
- **Development**: ESLint, Prettier, Git hooks

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/
│   │   ├── ui/             # Base reusable components (atoms)
│   │   ├── layout/         # Layout components (molecules)
│   │   ├── sections/       # Page sections (organisms)
│   │   ├── animations/     # Animation wrappers
│   │   └── hooks/          # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   └── styles/             # Global styles and Tailwind config
├── public/                 # Static assets
└── SPECIFICATIONS.md       # Detailed project requirements
```

## 🎯 Performance Goals

- **Lighthouse Performance**: 95+ score
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🎨 Design Features

### Enhanced Navigation
- Sticky header with backdrop blur
- Glowing hover effects with gradient backgrounds
- Smooth scroll navigation between sections

### Visual Effects
- Scroll-triggered animations using Intersection Observer
- CSS-only animations for optimal performance
- Glassmorphism design elements
- Color-coded gradients for different sections

### Accessibility
- Full keyboard navigation support
- Screen reader optimized
- Proper focus management
- High contrast ratios

## 🏗️ Development Phases

- ✅ **Phase 1**: Project Setup & Foundation
- 🚧 **Phase 2**: Base UI Component Library
- ⏳ **Phase 3**: Animation System & Custom Hooks
- ⏳ **Phase 4**: Enhanced Navigation
- ⏳ **Phase 5**: Section Components
- ⏳ **Phase 6**: Hybrid Routing Implementation
- ⏳ **Phase 7**: Performance Optimization
- ⏳ **Phase 8**: Documentation & Testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd jamesk_website

# Navigate to project directory
cd website_project

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests for CI (no watch, with coverage)

# Quality Check (runs all checks)
npm run quality      # Run type-check + lint + format:check + test:ci
```

## ⚙️ Development Setup

### Branch Protection Rules (Required for Contributors)

To ensure code quality and prevent broken builds, set up branch protection rules:

1. **Navigate to Repository Settings**:
   - Go to your GitHub repository
   - Click "Settings" tab → "Branches" in sidebar
   - Click "Add rule" for `main` branch

2. **Configure Protection Settings**:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
     - Required checks: `test (18.x)`, `test (20.x)`, `build-check`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Include administrators** (applies rules to all users)

3. **Testing Requirements**:
   - All PRs must pass unit tests with 80%+ coverage
   - TypeScript compilation must succeed
   - Linting and formatting checks must pass
   - Production build must complete successfully

### Code Quality Standards
- **Unit Testing**: Jest + React Testing Library with 80% coverage minimum
- **Type Safety**: Strict TypeScript with no `any` types
- **Code Style**: Prettier + ESLint with Next.js config
- **Git Workflow**: Feature branches → PR → merge (no direct commits to main)

## 📖 Documentation

For detailed project specifications, architecture decisions, and implementation guidelines, see [SPECIFICATIONS.md](./SPECIFICATIONS.md).

Track current implementation progress in [PROGRESS.md](./PROGRESS.md).

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Please open an issue to discuss any changes.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies and best practices.