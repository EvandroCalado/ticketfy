# Tech Stack & Build System

## Core Technologies

### Frontend
- **Next.js 15** with App Router and Turbopack for development
- **React 19** with Server Components and React Strict Mode
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling with CSS variables
- **Shadcn UI** (New York style) with Radix UI primitives
- **Lucide React** for icons

### Backend & Database
- **Prisma ORM** with PostgreSQL database
- **Oslo.js** for authentication primitives
- **Argon2** for password hashing
- **Zod** for schema validation and form handling

### State Management & Utils
- **Zustand** for global state management
- **nuqs** for URL state management
- **Big.js** for precise decimal calculations
- **Sonner** for toast notifications
- **next-themes** for theme management

## Development Tools

### Code Quality
- **ESLint** with Next.js, TypeScript, and Prettier configs
- **Prettier** with import sorting and Tailwind class sorting
- **Lefthook** for git hooks
- **TypeScript** strict mode enabled

### Testing
- **Vitest** for unit testing with coverage
- **Testing Library** for React component testing
- **jsdom** for DOM testing environment

## Common Commands

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint with max 0 warnings
pnpm typecheck        # TypeScript type checking

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ci          # Run tests once for CI
pnpm test:coverage    # Run tests with coverage report

# Database
pnpm seed             # Seed database with test data
npx prisma studio     # Open Prisma Studio
npx prisma generate   # Generate Prisma client

# Analysis
pnpm analyze          # Bundle analysis with @next/bundle-analyzer
```

## Build Configuration

- **Bundle Optimization**: Vendor chunks split for Radix UI and Lucide
- **Image Optimization**: WebP/AVIF formats with responsive sizes
- **Console Removal**: Automatic console.log removal in production
- **Package Optimization**: Optimized imports for Lucide and Radix UI
- **Prisma Integration**: Monorepo workaround plugin for proper builds
