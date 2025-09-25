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
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
npm run type-check # Run TypeScript checks
```

## 📖 Documentation

For detailed project specifications, architecture decisions, and implementation guidelines, see [SPECIFICATIONS.md](./SPECIFICATIONS.md).

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Please open an issue to discuss any changes.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies and best practices.