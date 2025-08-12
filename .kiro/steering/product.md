# Product Overview

Ticketfy is a modern ticket management system built for Brazilian users, providing a comprehensive platform for creating, managing, and tracking support tickets.

## Core Features

- **Secure Authentication**: Robust authentication system with session management using Oslo.js and Argon2 password hashing
- **Ticket Management**: Full CRUD operations for tickets with status tracking (OPEN, IN_PROGRESS, DONE)
- **Comment System**: Threaded comments on tickets for collaboration
- **User Profiles**: User management with customizable avatars
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Real-time Notifications**: Toast notifications using Sonner

## User Experience

- **Language**: Portuguese (pt-BR) - all UI text, messages, and content should be in Portuguese
- **Accessibility**: Built with accessible components using Radix UI primitives
- **Performance**: Optimized with Next.js 15 Server Components and React 19
- **Theme Support**: System, light, and dark theme modes

## Business Logic

- Tickets have bounty values stored in cents (multiply by 100 when storing)
- Users can only edit/delete their own tickets and comments
- Authentication is required for all ticket operations
- Session management with automatic refresh and expiration handling
