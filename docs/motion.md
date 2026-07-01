# AASTHA SILVER
## Motion Design System
Version: 1.0
Status: Production Ready

---

# Mission

Motion at AASTHA SILVER exists to communicate elegance, guide attention, reinforce hierarchy, and create emotional connection.

Motion should never exist simply because it can.

Every animation must have purpose.

The interface should feel handcrafted, luxurious, and effortless.

---

# Motion Philosophy

Motion should feel like

- Breathing
- Silk fabric moving
- Jewellery catching light
- Luxury retail
- Editorial storytelling

Never feel

- Game UI
- Mobile app gimmicks
- Social media animations
- PowerPoint effects

---

# Core Principles

## Elegant

Soft.

Calm.

Confident.

---

## Invisible

The user notices the experience.

Not the animation.

---

## Meaningful

Every animation must communicate

- hierarchy
- navigation
- feedback
- confirmation
- delight

---

## Responsive

Motion must feel equally premium on

Desktop

Tablet

Mobile

---

## Respectful

Respect

prefers-reduced-motion.

Never force motion.

---

# Motion Categories

## Page Motion

Navigation

Route transitions

Loading

Section reveals

---

## Micro Motion

Hover

Buttons

Cards

Wishlist

Cart

Search

Inputs

Dropdowns

---

## Product Motion

Gallery

Zoom

Variants

Quick View

Wishlist

Purchase

---

## Scroll Motion

Parallax

Fade

Reveal

Editorial storytelling

Sticky transitions

---

## Feedback Motion

Success

Error

Loading

Progress

Confirmation

---

# Motion Language

The motion vocabulary consists of

Fade

↓

Reveal

↓

Slide

↓

Scale

↓

Opacity

↓

Depth

↓

Parallax

Avoid introducing additional motion styles.

---

# Duration Scale

## Instant

120ms

Used for

Checkboxes

Toggles

Radio

---

## Fast

200ms

Used for

Buttons

Icons

Hover

Inputs

---

## Normal

350ms

Used for

Cards

Menus

Dropdowns

---

## Slow

550ms

Used for

Sections

Drawers

Modals

---

## Luxury

900ms

Used for

Hero

Editorial

Landing Experience

---

# Easing

## Standard

ease-out

General UI

---

## Gentle

cubic-bezier(.22,.61,.36,1)

Luxury transitions

---

## Editorial

cubic-bezier(.19,1,.22,1)

Hero reveals

---

Avoid

Bounce

Elastic

Overshoot

Back easing

---

# Page Transitions

## Navigation

Fade

+

Slight vertical movement

Duration

400ms

---

Never

Slide entire pages sideways.

---

# Hero Animation

Sequence

Background

↓

Headline

↓

Subheadline

↓

CTA

↓

Product

↓

Scroll indicator

Stagger

120ms

Maximum

900ms

---

# Hero Image

Scale

1.08

↓

1.00

Opacity

0%

↓

100%

Duration

1.2s

---

# Text Reveal

Animation

Fade

+

Y

24px

↓

0px

Duration

700ms

Stagger

80ms

Never animate letters individually.

Animate words or lines.

---

# Buttons

Hover

Background transition

150ms

↓

Soft elevation

↓

Tiny scale

1.02

---

Pressed

Scale

0.98

Duration

120ms

---

Loading

Spinner

+

Opacity

Never shift layout.

---

# Product Cards

Hover

Image zoom

1.05

↓

Shadow

↓

Wishlist fades in

↓

Quick Add slides upward

Duration

300ms

---

Never rotate cards.

Never flip cards.

---

# Product Gallery

Thumbnail

↓

Crossfade

↓

Main Image

Duration

300ms

Zoom

Smooth transform

No abrupt swaps.

---

# Collection Banner

Fade

↓

Reveal

↓

Parallax image

↓

Headline

↓

CTA

Total

900ms

---

# Navigation

Sticky transition

Transparent

↓

Solid background

↓

Blur

↓

Shadow

Duration

300ms

---

Mega Menu

Fade

↓

Scale

98%

↓

100%

Duration

250ms

---

# Search

Search bar

Expand

↓

Fade

↓

Input focus

Duration

220ms

Results

Stagger

40ms

---

# Cart Drawer

Slide

Right

↓

Left

Duration

450ms

Overlay

Opacity

0

↓

100%

Blur

4px

---

# Wishlist

Heart

Outline

↓

Fill

↓

Scale

1.2

↓

1

Duration

220ms

---

# Add To Cart

Button

↓

Loading

↓

Success

↓

Drawer opens

No page refresh.

---

# Checkout

Step transitions

Crossfade

↓

Slide

8px

Duration

300ms

---

# Forms

Focus

Border transition

↓

Glow

↓

Label movement

Duration

180ms

---

Validation

Success

↓

Checkmark

↓

Fade

Error

↓

Shake

No.

Instead

↓

Color

↓

Message

↓

Icon

---

# Accordions

Height

Auto

↓

Open

Duration

250ms

Chevron

180°

Rotation

---

# Tabs

Underline

Slides

Fade content

Duration

250ms

---

# Modals

Scale

96%

↓

100%

Opacity

0

↓

100%

Duration

300ms

Backdrop

Fade

Blur

---

# Toasts

Slide

Bottom

↓

Up

Fade

Duration

250ms

Auto dismiss

4s

---

# Skeleton Loading

Instead of

Spinner

Use

Animated shimmer

Opacity

Subtle

Duration

1.4s

Infinite

---

# Progress Indicators

Linear

Smooth

Never jump.

---

# Image Loading

Blur Placeholder

↓

Fade

↓

Sharp Image

Duration

500ms

---

# Scroll Animations

Only animate

Once

Never animate every scroll repeatedly.

---

Reveal Distance

32px

↓

0

Opacity

0

↓

100%

---

Parallax

Maximum

12%

Never

30%

40%

50%

---

# Testimonials

Card

↓

Fade

↓

Scale

98%

↓

100%

---

# Newsletter

Input

↓

Reveal

↓

Button

↓

Success

↓

Checkmark

---

# Footer

Reveal

↓

Fade

↓

Icons

↓

Links

Stagger

50ms

---

# Mobile Motion

Reduce

Distance

↓

Duration

↓

Parallax

↓

Complexity

Keep

Fast

Responsive

Natural

---

# Reduced Motion

Respect

```
prefers-reduced-motion
```

Disable

Parallax

Zoom

Reveal

Scale

Keep only

Opacity

Instant transitions

Essential feedback

---

# GSAP Usage

Allowed

Hero

Editorial storytelling

Parallax

Pinned sections

Scroll timelines

Image sequences

Never use GSAP for

Buttons

Inputs

Forms

Menus

Cards

Basic UI

---

# Framer Motion Usage

Default animation library.

Use for

Components

Cards

Dialogs

Dropdowns

Tabs

Buttons

Modals

Drawers

Lists

---

# Performance Budget

Animation FPS

60 FPS

Animation Duration

<1.2s

GPU Accelerated

Transform

Opacity

Avoid animating

Width

Height

Top

Left

Margin

Padding

Filter

Blur (large)

Box Shadow (heavy)

---

# Animation Accessibility

Every animation must

Respect reduced motion

Maintain focus

Never trap keyboard users

Never hide content

Never rely on animation for understanding

---

# Motion Tokens

```ts
motion.instant

motion.fast

motion.normal

motion.slow

motion.luxury

motion.hero

motion.page

motion.hover

motion.reveal

motion.modal

motion.drawer

motion.toast
```

---

# Animation Checklist

Every animation should answer

Does it guide attention?

Does it improve hierarchy?

Does it reinforce luxury?

Does it improve usability?

Does it maintain 60 FPS?

Is it accessible?

Would removing it make the experience worse?

If not,

Don't animate.

---

# Anti Patterns

Never

❌ Bounce

❌ Elastic

❌ Shake on validation

❌ Flip animations

❌ Rotating cards

❌ Infinite floating objects

❌ Constant background movement

❌ Flashing elements

❌ Auto-playing motion with sound

❌ Overlapping animation timelines

❌ Delayed interaction because of animation

❌ Scroll-jacking

❌ Excessive blur

❌ Heavy particle effects

---

# Luxury Motion Reference

The overall motion language should resemble the calm confidence of premium brands and editorial experiences rather than high-energy consumer apps.

Think:

- Deliberate transitions
- Soft fades
- Gentle reveals
- Natural image zooms
- Smooth scrolling
- Thoughtful pacing

The animation should support the jewellery, not compete with it.

---

# Definition of Success

Motion is successful when

✓ It feels effortless.

✓ It communicates hierarchy.

✓ It improves usability.

✓ It reinforces luxury.

✓ It runs at 60 FPS.

✓ It respects accessibility.

✓ It never distracts from the jewellery.

✓ Users remember the experience, not the animation.

---

# Guiding Principle

**Motion is the invisible layer that transforms a functional interface into a premium experience. It should create rhythm, clarity, and emotion while remaining subtle enough that the jewellery always remains the hero.**
