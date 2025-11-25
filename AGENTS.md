## AGENTS INSTRUCTIONS

- Always use context7 mcp server to get latest documentations about package i used.

## Documentation References

Before writing any code, read these mandatory documents:

1. **STATE_MANAGEMENT.md** (STRICTLY ENFORCED)
   - Located: `docs/STATE_MANAGEMENT.md`
   - Purpose: Rulebook for all state management in React/Next.js
   - Covers: useState, useReducer, useContext, SWR
   - MANDATORY: Follow all rules without exception

2. **PROJECT_DOCUMENTATION.md**
   - Located: `docs/PROJECT_DOCUMENTATION.md`
   - Purpose: Technical reference for project structure, tech stack, conventions

3. **COMPANY_PROFILE.md**
   - Located: `docs/COMPANY_PROFILE.md`
   - Purpose: Company branding, messaging, target audience

## State Management Rules (CRITICAL)

⚠️ **READ docs/STATE_MANAGEMENT.md BEFORE WRITING STATE CODE**

Key Rules Summary:
- Local UI state → `useState` or `useReducer`
- Server/API data → `SWR` (NEVER in Context)
- Global UI state → `useContext` + `useState`/`useReducer`
- NO prop drilling > 2 levels
- NO duplicate state from SWR
- All data fetching hooks go in `/hooks` with prefix `useXxx`
- All Context providers go in `/contexts`

Violations will be rejected.
