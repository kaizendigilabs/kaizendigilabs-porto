# Kaizen Digilabs - Project Documentation

> **Building digital solutions that evolve with purpose.**  
> Documentation for code agents and developers

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Code Conventions](#code-conventions)
6. [Key Features](#key-features)

---

## Project Overview

**Kaizen Digilabs** is a company profile website showcasing digital solutions built on the philosophy of continuous improvement (*Kaizen*). The platform targets startups, MSMEs, and businesses undergoing digital transformation.

### Core Principles
- Continuous iteration and innovation
- Data-driven product decisions
- Design built around user empathy
- Scalable and maintainable technology

### Repository Information
- **Repository Name:** kaizendigilabs
- **License:** Proprietary & Confidential
- **Contact:** kaizen.digilabs@gmail.com
- **Website:** https://kaizendigilabs.com

---

## Tech Stack

### Frontend Framework
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.x** - Type-safe development

### Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Merge Tailwind classes efficiently
- **clsx** - Conditional className utility

### UI Components
- **Lucide React** - Icon library (v0.554.0)
- **Shadcn UI** - Component library (v2.2.0)
- **Sonner** - Toast notifications (v2.0.7)

### Backend & Database
- **Supabase** - Backend as a Service
  - Authentication (via @supabase/ssr v0.7.0)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
- **@supabase/supabase-js** (v2.81.1) - JavaScript client

### Developer Tools
- **ESLint 9.x** - Code linting
- **@vercel/speed-insights** - Performance monitoring (v1.2.0)
- **PNPM** - Package manager (pnpm-workspace.yaml present)

### Infrastructure
- **Vercel** - Deployment platform
- **GitHub** - Version control

---

## Project Structure

```
kaizendigilabs/
├── app/                        # Next.js App Router directory
│   ├── dashboard/             # Dashboard route (empty - future)
│   ├── login/                 # Login route (empty - future)
│   ├── layout.tsx             # Root layout with fonts & metadata
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Global styles & CSS variables
│   └── favicon.ico            # Site favicon
│
├── components/                # React components
│   └── ui/                    # UI component library
│       ├── button.tsx         # Button component with variants
│       ├── card.tsx           # Card component
│       ├── skeleton.tsx       # Skeleton loader
│       ├── sonner.tsx         # Toast notification wrapper
│       └── spinner.tsx        # Loading spinner
│
├── lib/                       # Utility libraries & helpers
│   ├── supabase/             # Supabase client configurations
│   │   ├── admin.ts          # Admin client (service role)
│   │   ├── client.ts         # Browser client
│   │   ├── middleware.ts     # Middleware for session management
│   │   └── server.ts         # Server-side client
│   ├── types/                # TypeScript type definitions
│   │   └── database.ts       # Auto-generated Supabase types
│   └── utils.ts              # Utility functions (cn helper)
│
├── hooks/                     # Custom React hooks (empty)
│
├── supabase/                  # Supabase configuration
│   ├── migrations/           # Database migration files
│   │   ├── 2025102500_extensions_and_enums_table.sql
│   │   └── 2025102501_users_table.sql
│   └── .temp/               # Temporary Supabase files
│
├── public/                    # Static assets
│   ├── next.svg
│   ├── vercel.svg
│   ├── globe.svg
│   ├── file.svg
│   └── window.svg
│
├── docs/                      # Project documentation
│   └── PROJECT_DOCUMENTATION.md
│
├── AGENTS.md                  # Agent coding guidelines
├── README.md                  # Project readme
├── package.json               # Dependencies & scripts
├── pnpm-lock.yaml            # Lock file for PNPM
├── pnpm-workspace.yaml       # PNPM workspace config
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── eslint.config.mjs         # ESLint configuration
├── postcss.config.mjs        # PostCSS configuration
└── proxy.ts                   # Proxy configuration

```

---

## Architecture

### App Router Architecture

This project uses **Next.js 16 App Router** with the following patterns:

#### 1. **Route Organization**
- File-based routing in `/app` directory
- Route groups for future organization (dashboard, login prepared)
- Server Components by default
- Client Components explicitly marked with `'use client'`

#### 2. **Layout System**
```typescript
// app/layout.tsx
- Root layout wraps all pages
- Includes global metadata
- Font loading (Geist Sans & Geist Mono)
- Global components (Toaster, SpeedInsights)
```

#### 3. **Data Fetching Patterns**
- Server-side data fetching with Supabase Server Client
- Client-side with Supabase Browser Client
- Middleware for session management

#### 4. **Type Safety**
- Full TypeScript coverage
- Auto-generated database types from Supabase
- Path aliases configured:
  ```typescript
  @/*         → root directory
  @/app       → app directory
  @/components → components directory
  @/lib       → lib directory
  @/supabase  → supabase directory
  ```

---

### Supabase Client Patterns

#### 1. **Server Components** (app/...)
```typescript
import { createServerClient } from '@/lib/supabase/server';

const supabase = await createServerClient();
const { data, error } = await supabase.from('profiles').select('*');
```

#### 2. **Client Components** (use client)
```typescript
import { createBrowserClient } from '@/lib/supabase/client';

const supabase = createBrowserClient();
const { data, error } = await supabase.from('profiles').select('*');
```

#### 3. **Middleware** (middleware.ts)
```typescript
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
```

#### 4. **Admin Operations** (server-side only)
```typescript
import { createAdminClient } from '@/lib/supabase/admin';

// Service role key - full database access
const supabase = createAdminClient();
```

---

## Code Conventions

### General Guidelines

1. **Always use Context7 MCP server** for latest package documentation (per AGENTS.md)
2. **TypeScript strict mode** - All code must be type-safe
3. **Path aliases** - Use `@/` imports instead of relative paths
4. **Server-first** - Default to Server Components, use Client Components only when needed

---

### Component Patterns

#### 1. **UI Components** (components/ui/)
```typescript
// Use class-variance-authority for variants
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

**Key Libraries:**
- `class-variance-authority` - Variant management
- `tailwind-merge` (via `cn` util) - Merge Tailwind classes

---

#### 2. **Server Components** (default)
```typescript
// app/some-page/page.tsx
import { createServerClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createServerClient();
  const { data } = await supabase.from('profiles').select('*');
  
  return <div>{/* render data */}</div>;
}
```

---

#### 3. **Client Components**
```typescript
'use client';

import { createBrowserClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const supabase = createBrowserClient();
    // fetch data...
  }, []);
  
  return <div>{/* render */}</div>;
}
```

---

## Key Features

### 1. **Authentication System**
- Supabase Auth integration
- Session-based authentication
- Middleware-protected routes
- Auto profile creation on signup

### 2. **Role-Based Access Control (RBAC)**
- Single role per user
- Admin role with full access
- Last admin safeguard
- Row Level Security policies

### 3. **Type Safety**
- Full TypeScript coverage
- Auto-generated Supabase types
- Strict mode enabled
- Type-safe database queries

### 4. **UI Component Library**
- Modular UI components in `components/ui/`
- Variant-based styling with CVA
- Light mode focused design

### 5. **Performance Monitoring**
- Vercel Speed Insights integration
- Performance tracking in production

### 6. **Styling System**
- Tailwind CSS 4.x
- Custom CSS variables
- Light mode focused design
- Responsive design utilities

---

## Migration Notes (Development → Production)

The database schema includes extensive **HARDENING CHECKLIST** comments for production deployment. Key areas:

### 1. **RLS Policies**
- Replace `*_dev` policies with stricter production policies
- Remove universal `SELECT` access from `roles` table
- Add granular permission checks

### 2. **Security Functions**
- Review all `SECURITY DEFINER` functions
- Ensure `set search_path = public` on all security functions
- Add rate limiting to auth endpoints

### 3. **Access Control**
- Revoke default PUBLIC grants
- Grant minimal permissions per role
- Hide admin functions from authenticated users

### 4. **Operations**
- Enable audit logging
- Set up PITR backups
- Rotate service role keys
- Lock down CORS settings
- Test last admin guard trigger

### 5. **Environment**
- Move sensitive keys to secret manager
- Restrict redirect URLs to production domain
- Enable statement timeouts

---

## Additional Resources

### Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Appendix: Tech Stack Summary

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 16.0.0 | React framework, App Router |
| **Runtime** | React | 19.2.0 | UI library |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Database** | PostgreSQL (Supabase) | — | Relational database |
| **Auth** | Supabase Auth | 2.81.1 | Authentication & sessions |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **UI Components** | Lucide React | 0.554.0 | Icons |
| **State** | React 19 hooks | — | Local state management |
| **Forms** | — | — | (TBD - future feature) |
| **Deployment** | Vercel | — | Hosting & CI/CD |
| **Package Manager** | PNPM | — | Dependency management |
| **Linting** | ESLint | 9.x | Code quality |
| **Monitoring** | Vercel Speed Insights | 1.2.0 | Performance analytics |

---

## Contact & Support

**Email:** kaizen.digilabs@gmail.com  
**Website:** https://kaizendigilabs.com  
**Repository:** Private (Kaizen Digital Labs)

---

**© 2025 Kaizen Digital Labs. All rights reserved.**  
*This documentation is proprietary and confidential.*
