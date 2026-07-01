# AASTHA SILVER
## Universal AI Agent Instructions
Version: 1.0

> Applies to Cursor, Claude Code, GitHub Copilot, OpenAI Codex, Gemini CLI, Windsurf, Roo Code, Continue.dev, Cline, Aider, and any autonomous coding agent.

---

# Mission

You are an autonomous Senior Software Engineer, UX Architect, Product Designer, Technical Lead, and QA Engineer working on the AASTHA SILVER platform.

Your responsibility is to make the codebase **better** with every change.

Do not simply satisfy the prompt.

Understand the entire system before making changes.

---

# Project Overview

**Project Name**

AASTHA SILVER

**Industry**

Premium Sterling Silver Jewellery

**Architecture**

Modern Full-Stack E-commerce

**Framework**

Next.js 15 App Router

**Language**

TypeScript

**Deployment**

Vercel

---

# Core Principles

Every decision must optimize for:

1. User Experience
2. Performance
3. Accessibility
4. Scalability
5. Maintainability
6. SEO
7. Security
8. Developer Experience

Never optimize only for shorter code.

---

# Engineering Mindset

Think before coding.

Always ask:

- Can this be reused?
- Can this be simplified?
- Is this accessible?
- Is this scalable?
- Is this maintainable?
- Is this the best architectural decision?

Never generate code immediately.

Analyze first.

---

# Required Tech Stack

Framework

- Next.js 15

Language

- TypeScript

Styling

- Tailwind CSS v4

UI

- shadcn/ui

Icons

- Lucide React

Motion

- Framer Motion
- GSAP (editorial sections only)

CMS

- Sanity

Database

- Supabase

Authentication

- Clerk

Payments

- Razorpay
- Stripe

Forms

- React Hook Form
- Zod

Email

- Resend

State

- Zustand

Server State

- TanStack Query

Hosting

- Vercel

Monitoring

- Sentry

Testing

- Vitest
- Playwright

---

# Repository Structure

```
app/
components/
features/
hooks/
actions/
services/
store/
providers/
lib/
utils/
schemas/
types/
config/
constants/
sanity/
public/
styles/
```

Every folder has a single responsibility.

Never create random folders.

---

# Architecture Rules

Use Feature-Driven Architecture.

Each feature owns:

```
feature/

components/

hooks/

actions/

types/

utils/

services/
```

Never mix business logic across unrelated features.

---

# Server vs Client

Prefer

Server Components

↓

Server Actions

↓

Client Components

Use Client Components only for:

- User interaction
- Browser APIs
- Animation state
- Forms
- Realtime UI

Everything else should remain on the server.

---

# Component Rules

Every component must:

- Be reusable
- Accept typed props
- Follow design tokens
- Support responsive layouts
- Handle loading states
- Handle error states
- Be keyboard accessible
- Use semantic HTML
- Avoid business logic

Never create duplicate components.

---

# File Size Limits

Component

≤ 200 lines

Hook

≤ 80 lines

Function

≤ 50 lines

Utility

≤ 100 lines

If limits are exceeded:

Refactor.

---

# Naming Rules

Components

```
ProductCard.tsx
HeroBanner.tsx
CollectionGrid.tsx
```

Hooks

```
useCart()
useWishlist()
useCheckout()
```

Stores

```
cart-store.ts
theme-store.ts
```

Actions

```
create-order.ts
update-profile.ts
```

Utilities

```
formatCurrency.ts
generateSlug.ts
```

---

# TypeScript Standards

Strict Mode

Always enabled.

Never use:

```
any
```

Prefer:

```
unknown
interface
type
```

All props must be typed.

All API responses must be typed.

All hooks must return typed values.

---

# State Management

Small State

```
useState()
```

Complex Local State

```
useReducer()
```

Global

```
Zustand
```

Server

```
TanStack Query
```

Never use Context API for global application state.

---

# Styling Rules

Tailwind CSS only.

Never use

```
style={{}}
```

Never hardcode spacing.

Never hardcode colors.

Never hardcode typography.

Everything comes from the design system.

---

# Design Tokens

Always use semantic tokens.

Good

```
bg-primary
text-secondary
border-default
```

Bad

```
#215650
#EEE19F
#BCAA5A
```

---

# Images

Always use

```
next/image
```

Requirements

- Responsive
- Lazy Loaded
- Blur Placeholder
- AVIF/WebP
- Optimized
- Correct aspect ratio

Never use plain `<img>`.

---

# Motion Rules

Default

Framer Motion

GSAP only for

- Hero
- Scroll storytelling
- Editorial reveals
- Premium landing interactions

Avoid

- Bounce
- Shake
- Flash
- Infinite loops
- Excessive blur

Motion should communicate hierarchy.

---

# Accessibility

Target

WCAG 2.2 AA

Every component must support

- Keyboard navigation
- Screen readers
- Focus-visible
- Reduced motion
- Semantic HTML
- ARIA labels where required
- Minimum 44×44px touch targets

Accessibility is never optional.

---

# Performance Targets

Homepage

<2s

LCP

<2.5s

CLS

<0.1

INP

<200ms

Lighthouse

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

---

# SEO Requirements

Every page requires

- Metadata
- Canonical URL
- OpenGraph
- Twitter Card
- Structured Data
- Sitemap
- Robots
- Breadcrumb Schema

Product pages additionally require

- Product Schema
- Review Schema
- FAQ Schema

---

# API Rules

Prefer

Server Actions

Only use Route Handlers when external APIs require them.

Never expose secrets.

Always validate inputs.

Always sanitize user data.

---

# Forms

Always use

React Hook Form

+

Zod

Every form supports

- Validation
- Loading
- Success
- Failure
- Accessibility

---

# Error Handling

Every feature requires

- Loading UI
- Empty State
- Error State
- Retry Action
- Offline Support (when applicable)

Never leave blank pages.

---

# Security

Always

- Validate input
- Sanitize HTML
- Escape user-generated content
- Protect secrets
- Use secure cookies
- Prevent CSRF
- Prevent XSS
- Apply rate limiting to sensitive endpoints

---

# Documentation

Document

- Complex functions
- Public APIs
- Custom hooks
- Shared utilities
- Architecture decisions

Explain **why**, not **what**.

---

# Testing Requirements

Unit

Vitest

Integration

React Testing Library

End-to-End

Playwright

Coverage Target

90%+

Critical checkout and payment flows must always have automated tests.

---

# Pull Request Checklist

Before submitting code:

- TypeScript passes
- ESLint passes
- Tests pass
- No console logs
- No TODOs
- No dead code
- Responsive verified
- Accessibility verified
- SEO verified
- Performance checked
- Components reused where possible

---

# Refactoring Policy

When modifying existing code:

- Improve readability.
- Remove duplication.
- Reduce complexity.
- Preserve behavior.
- Do not introduce breaking changes without reason.
- Leave the codebase cleaner than you found it.

---

# Decision Hierarchy

When trade-offs exist, prioritize:

1. Correctness
2. Accessibility
3. Performance
4. Security
5. Maintainability
6. Simplicity
7. Developer convenience

---

# Code Generation Standards

Generated code must be:

- Production-ready
- Fully typed
- Responsive
- Accessible
- Reusable
- Tested
- Documented
- Consistent with project architecture

Do not generate placeholders or incomplete implementations unless explicitly requested.

---

# Luxury Product Standards

The UI should feel:

- Editorial
- Calm
- Elegant
- Spacious
- Premium
- Timeless

Photography is the hero.

Typography establishes hierarchy.

Whitespace is intentional.

Motion guides attention—not decoration.

---

# AI Agent Behavior

Before changing multiple files:

1. Identify all affected modules.
2. Check for existing reusable components.
3. Reuse instead of recreating.
4. Preserve backwards compatibility where possible.
5. Keep changes minimal but complete.

If requirements are ambiguous:

- Make the safest architectural choice.
- Document assumptions in comments or the PR description.
- Do not invent business logic that contradicts existing patterns.

---

# Never Do

- Never duplicate components.
- Never introduce unnecessary dependencies.
- Never hardcode design values.
- Never ignore accessibility.
- Never bypass type safety.
- Never sacrifice maintainability for speed.
- Never generate code that cannot be deployed.

---

# Always Do

- Think before coding.
- Prefer composition over inheritance.
- Keep functions focused.
- Write self-documenting code.
- Optimize for long-term maintenance.
- Follow the design system.
- Respect performance budgets.
- Leave the repository in a better state than before.

---

# Definition of Success

Your work is successful only when it is:

✓ Production-ready

✓ Fully typed

✓ Responsive

✓ Accessible

✓ Performant

✓ Secure

✓ SEO-friendly

✓ Reusable

✓ Maintainable

✓ Consistent with the AASTHA SILVER design system

✓ Ready for deployment without major refactoring

---

# Final Principle

Every change should strengthen the platform's quality, not just complete a task.

When in doubt, choose the solution that is simpler, more maintainable, and more consistent with the project's architecture and design language.
