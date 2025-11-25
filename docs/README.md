# Kaizen Digilabs - Documentation Index

Welcome to the Kaizen Digilabs documentation hub. This directory contains comprehensive documentation for developers and AI code agents working on the project.

---

## Documentation Files

### 🏢 [COMPANY_PROFILE.md](./COMPANY_PROFILE.md)
**Company profile reference for website development**

Complete company information including:
- **Company Identity:** Name etymology, description
- **Philosophy:** Kaizen (continuous improvement)
- **Tagline:** "Iterate, Innovate, Improve" breakdown
- **Vision & Mission:** Company direction and purpose
- **Target Audience:** UMKM & Institusi Pendidikan
- **Services:** Web/Mobile Development, UI/UX, Visual Branding
- **Brand Values:** Core principles and personality
- **Key Messages:** Positioning for target audiences

**Target Audience:** Developers, designers, and content creators building the website

---

### ⚙️ [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
**State management rulebook - STRICTLY ENFORCED**

Mandatory rules for state management in all projects:
- **State Classification:** Local UI, Server/Data, Global UI
- **useState & useReducer:** When and how to use
- **useContext Rules:** What belongs (and doesn't belong) in Context
- **SWR Guidelines:** Server state management best practices
- **Folder Structure:** Where to put Context, hooks, and utilities
- **Anti-Patterns:** Common mistakes to avoid
- **Examples:** Real-world implementations

**Target Audience:** All developers and AI code agents

---

### 📘 [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
**Comprehensive project reference guide**

**Target Audience:** Developers and AI code agents who need to understand the codebase

---

## Quick Reference

### Tech Stack Summary
```
Framework:       Next.js 16 + React 19 + TypeScript 5
Database:        PostgreSQL (Supabase)
Styling:         Tailwind CSS 4
UI:              Lucide Icons + Headless UI
Deployment:      Vercel
Package Manager: PNPM
```

### Project Structure
```
app/          → Next.js App Router (routes & pages)
components/   → React components (UI library)
lib/          → Utilities, Supabase clients, types
hooks/        → Custom React hooks
supabase/     → Database migrations
public/       → Static assets
docs/         → Project documentation (you are here)
```

### Key Scripts
```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm db:types         # Generate Supabase types
pnpm db:migrate       # Run database migrations
pnpm db:reset:types   # Reset DB & regenerate types
```

### Path Aliases
```typescript
@/*           → Root directory
@/app         → app/
@/components  → components/
@/lib         → lib/
@/supabase    → supabase/
```

### Database Tables
- **profiles** - User profile data (linked to auth.users)
- **roles** - Role definitions (RBAC)
- **user_roles** - User-to-role mapping (one role per user)

### Authentication Flow
1. User signs up → Supabase Auth
2. Auto-create profile → `handle_new_auth_user()` trigger
3. Session stored in cookies → `@supabase/ssr`
4. Middleware validates session → Redirects to `/login` if unauthenticated

### Authorization (RBAC)
- Single role per user
- `admin` role = full access
- Helper functions: `has_role()`, `is_user_admin()`
- Last admin safeguard (cannot delete/demote)

---

## Code Agent Guidelines

> **From AGENTS.md:**
> Always use Context7 MCP server to get latest documentation about packages used.

### When Coding:
1. ✅ Check `PROJECT_DOCUMENTATION.md` first for project structure & conventions
2. ✅ Use path aliases (`@/`) instead of relative imports
3. ✅ Default to Server Components, use Client Components only when needed
4. ✅ Follow existing component patterns (CVA + cn utility)
5. ✅ Use Supabase Server Client in Server Components
6. ✅ Use Supabase Browser Client in Client Components
7. ✅ Always reset schema and regenerate types after database changes (`pnpm db:reset:types`)
8. ✅ Use Context7 for latest package documentation

### Avoid:
- ❌ Exposing `SUPABASE_SERVICE_ROLE_KEY` to client
- ❌ Relative imports when path alias is available
- ❌ Manual type definitions for database (use `pnpm db:types`)
- ❌ Modifying RLS policies without understanding security implications
- ❌ Deleting/demoting the last admin user

---

**© 2025 Kaizen Digital Labs. All rights reserved.**
