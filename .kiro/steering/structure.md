# Project Structure & Architecture

## Folder Organization

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication routes (sign-in, sign-up, etc.)
│   ├── (root)/            # Main application routes
│   │   ├── (protected)/   # Routes requiring authentication
│   │   └── about/         # Public routes
│   ├── globals.css        # Global styles and Tailwind imports
│   └── layout.tsx         # Root layout with providers
├── actions/               # Global server actions (auth, cookies)
├── components/            # Reusable React components
│   ├── shared/           # Application-specific shared components
│   └── ui/               # Shadcn UI components (auto-generated)
├── constants/            # Application constants and enums
├── hooks/                # Custom React hooks
├── lib/                  # Core utilities and configurations
├── stores/               # Zustand global state stores
├── types/                # Global TypeScript type definitions
└── utils/                # Helper functions and utilities
```

## Architecture Patterns

### Route Organization
- **Route Groups**: Use `(auth)` and `(protected)` for logical grouping
- **Co-location**: Keep actions, components, and schemas close to their routes
- **Nested Layouts**: Leverage layout.tsx files for shared UI patterns

### Server Actions Pattern
```typescript
// Always use 'use server' directive
'use server';

// Standard action signature
export const actionName = async (
  prevState: unknown,
  formData: FormData,
): Promise<ActionState> => {
  try {
    // 1. Authentication check if needed
    const { user } = await getAuth();
    if (!user) redirect(signInPath());

    // 2. Schema validation
    const data = schema.parse(Object.fromEntries(formData));

    // 3. Database operations
    await prisma.model.create({ data });

    // 4. Revalidation and redirect
    revalidatePath('/path');

    return { success: true, message: 'Success message' };
  } catch (error) {
    return formErrorHandler(error, formData);
  }
};
```

### Component Patterns
- **Client Components**: Use `'use client'` only when necessary (hooks, events)
- **Server Components**: Default for data fetching and static content
- **Composition**: Prefer composition over complex prop drilling
- **Shadcn Integration**: Extend UI components in `components/ui/`

### File Naming Conventions
- **kebab-case**: For file and folder names
- **PascalCase**: For React components
- **camelCase**: For functions and variables
- **SCREAMING_SNAKE_CASE**: For constants

### Import Organization (Prettier sorted)
1. Next.js and React imports
2. Third-party libraries
3. Internal imports with `@/` alias
4. Relative imports with `./` or `../`

## Key Architectural Decisions

### Authentication Flow
- Session-based auth with Oslo.js primitives
- Server actions for auth operations
- Middleware-free approach using `getAuth()` in components/actions

### Data Layer
- Prisma ORM with generated client in `prisma/generated/`
- Database operations in server actions or dedicated functions
- Zod schemas for validation co-located with features

### Styling Approach
- Tailwind CSS with CSS variables for theming
- Shadcn UI components as base layer
- Custom components in `components/shared/`
- Responsive-first design patterns

### State Management
- Server state via React Server Components
- Client state via Zustand stores in `src/stores/`
- URL state via nuqs for search params and filters
- Form state via React's useActionState hook
