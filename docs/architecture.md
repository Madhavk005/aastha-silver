# AASTHA SILVER
## System Architecture Documentation
Version: 1.0
Status: Production Ready

---

# Overview

AASTHA SILVER follows a modern **Headless Commerce Architecture** built on Next.js 15 App Router.

The architecture prioritizes:

- Scalability
- Performance
- SEO
- Accessibility
- Maintainability
- Security
- Reusability

The system follows a **Feature-Driven + Layered Architecture** instead of traditional MVC.

---

# High Level Architecture

```
                       Users
                         │
                         │
              ┌──────────▼──────────┐
              │     Next.js 15      │
              │     App Router       │
              └──────────┬──────────┘
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
      ▼                  ▼                  ▼
 Server Components   Server Actions     Route Handlers
      │                  │                  │
      └──────────────┬───┴──────────────────┘
                     │
              Business Layer
                     │
     ┌───────────────┼────────────────┐
     │               │                │
     ▼               ▼                ▼
 Product        Authentication     Checkout
 Wishlist         Orders           Search
 Cart             Reviews          CMS
                     │
          ┌──────────┼───────────┐
          │          │           │
          ▼          ▼           ▼
      Supabase     Sanity      Clerk
          │
          ▼
      PostgreSQL
```

---

# Technology Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- GSAP
- Lucide React

---

## Backend

- Server Actions
- Route Handlers
- Supabase
- PostgreSQL

---

## CMS

Sanity

Responsible for

- Products
- Collections
- Homepage
- Blogs
- FAQs
- Testimonials
- Offers

---

## Authentication

Clerk

Supports

- Google
- Email
- OTP
- Magic Link

---

## Payments

- Razorpay
- Stripe

---

## Emails

Resend

---

## Deployment

Vercel

---

# Architecture Principles

## Feature Driven

Every feature owns

```
Components

Hooks

Actions

Services

Types

Utils
```

Example

```
features/

cart/

wishlist/

checkout/

search/

products/

collections/
```

---

## Layer Separation

Presentation Layer

↓

Business Layer

↓

Data Layer

↓

Infrastructure

Each layer has one responsibility.

---

# Directory Structure

```
app/

components/

features/

hooks/

actions/

services/

store/

providers/

schemas/

types/

config/

constants/

lib/

sanity/

public/

styles/
```

---

# App Directory

```
app/

(layout)

(page)

collections/

product/

cart/

checkout/

wishlist/

account/

journal/

about/

search/

api/

robots.ts

sitemap.ts

manifest.ts
```

---

# Components

```
components/

ui/

layout/

navigation/

cards/

buttons/

forms/

sections/

motion/

icons/

shared/
```

Never place business logic here.

---

# Features

Every business domain is isolated.

Example

```
features/

cart

wishlist

products

collections

checkout

orders

reviews

account

authentication
```

---

# Feature Structure

```
cart/

components/

actions/

hooks/

types/

services/

utils/
```

Each feature should be self-contained.

---

# Data Flow

```
User

↓

Server Component

↓

Server Action

↓

Service

↓

Database

↓

Return Data

↓

Render UI
```

Never bypass the service layer.

---

# Component Hierarchy

```
Page

↓

Section

↓

Feature

↓

Reusable Component

↓

Primitive UI
```

Example

```
Homepage

↓

Hero Section

↓

Featured Products

↓

Product Grid

↓

Product Card

↓

Button
```

---

# State Management

## Local

useState

---

## Complex Local

useReducer

---

## Global

Zustand

Stores

```
cart

wishlist

theme

user
```

---

## Server

TanStack Query

---

# Routing

Use App Router.

Example

```
/

collections

collections/[slug]

product/[slug]

cart

checkout

account

journal/[slug]
```

Dynamic routes use slugs.

---

# Server Components

Use Server Components whenever possible.

Ideal for

- Product Lists
- Collections
- Homepage
- Blog
- Search Results

---

# Client Components

Use only when required.

Examples

- Cart Drawer
- Filters
- Search
- Wishlist
- Checkout Forms
- Animations

---

# Server Actions

Server Actions are preferred.

Use Route Handlers only when

- Third-party APIs
- Webhooks
- Public endpoints

---

# API Layer

```
actions/

products/

orders/

checkout/

search/

users/
```

Actions communicate with services.

---

# Services

Responsible for

Business Logic

```
services/

product.service.ts

cart.service.ts

checkout.service.ts

review.service.ts
```

Never place UI logic inside services.

---

# Utilities

```
utils/

currency.ts

slug.ts

date.ts

price.ts

validation.ts
```

Pure functions only.

---

# Configuration

```
config/

site.ts

navigation.ts

theme.ts

seo.ts
```

No business logic.

---

# Constants

```
constants/

collections.ts

payments.ts

currencies.ts

routes.ts
```

Static values only.

---

# Types

```
types/

product.ts

collection.ts

review.ts

cart.ts

order.ts
```

Centralized interfaces.

---

# Providers

```
providers/

theme-provider.tsx

query-provider.tsx

clerk-provider.tsx
```

Global providers only.

---

# CMS Architecture

Sanity

```
Products

Collections

Homepage

Hero

Blogs

Testimonials

Offers

FAQs

Settings
```

All content editable.

---

# Database

Supabase

Main Tables

```
users

orders

order_items

wishlist

addresses

reviews

payments

coupons
```

---

# Authentication Flow

```
Visitor

↓

Clerk

↓

JWT

↓

Server

↓

Database
```

---

# Cart Flow

Product

↓

Add To Cart

↓

Zustand

↓

Persist

↓

Checkout

↓

Order

↓

Payment

---

# Checkout Flow

Cart

↓

Address

↓

Shipping

↓

Payment

↓

Confirmation

↓

Email

↓

Dashboard

---

# Search Flow

Search

↓

Server Action

↓

Products

Collections

Blogs

↓

Results

---

# Image Pipeline

Sanity

↓

Cloudinary

↓

Next Image

↓

AVIF

↓

Responsive Images

↓

Browser

---

# Performance Strategy

Use

- Server Components
- Streaming
- Partial Prerendering (PPR)
- Image Optimization
- Lazy Loading
- Route Prefetching
- Code Splitting

---

# Caching Strategy

Products

ISR

Collections

ISR

Homepage

ISR

Blogs

Static

Account

Dynamic

Checkout

No Cache

---

# SEO Architecture

Each page generates

```
Metadata

Canonical

OpenGraph

Twitter

JSON-LD

Breadcrumb

Schema
```

---

# Security

All requests

↓

Validation

↓

Authentication

↓

Authorization

↓

Business Rules

↓

Database

Never trust client data.

---

# Error Boundaries

Each route includes

```
loading.tsx

error.tsx

not-found.tsx
```

Graceful failure is mandatory.

---

# Analytics Architecture

GA4

↓

Events

↓

Funnels

↓

Dashboards

Tracked Events

```
View Product

Search

Wishlist

Add To Cart

Checkout

Purchase
```

---

# Monitoring

- Sentry
- Vercel Analytics
- Speed Insights
- Google Search Console

---

# Deployment Pipeline

GitHub

↓

Pull Request

↓

Preview Deployment

↓

Code Review

↓

Merge

↓

Production Deployment

↓

Monitoring

---

# CI/CD

Every commit must

- Pass TypeScript
- Pass ESLint
- Pass Tests
- Build Successfully
- Meet Lighthouse Targets

Deployment blocks on failures.

---

# Architecture Rules

Always

- Prefer Server Components.
- Keep business logic outside UI.
- Use feature-based organization.
- Reuse components.
- Use semantic design tokens.
- Optimize for performance.
- Maintain strict typing.

Never

- Duplicate logic.
- Hardcode design values.
- Mix concerns.
- Create oversized components.
- Expose secrets.
- Ignore accessibility.

---

# Scalability Roadmap

### Phase 1

- Core ecommerce
- CMS
- Checkout
- Wishlist
- Reviews

### Phase 2

- AI Product Recommendations
- Loyalty Program
- Gift Finder
- Multi-language
- International Shipping

### Phase 3

- Mobile Apps
- AR Virtual Try-On
- Subscription Products
- Omnichannel Inventory
- Retail Store Integration

---

# Definition of Success

The architecture is considered successful when it is:

✓ Modular

✓ Scalable

✓ Testable

✓ Secure

✓ Performant

✓ Accessible

✓ SEO-friendly

✓ Maintainable

✓ Feature-driven

✓ Ready for long-term growth

---

# Guiding Principle

**Architecture should make the correct implementation the easiest implementation. Every layer, module, and decision should reduce complexity, encourage reuse, and support the long-term evolution of AASTHA SILVER without sacrificing performance or the premium customer experience.**
