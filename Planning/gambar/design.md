---
version: alpha
name: Airbnb
description: Warm coral accent. Photography-driven. Rounded UI.
colors:
  primary: "#222222"
  secondary: "#717171"
  tertiary: "#FF385C"
  neutral: "#F7F7F7"
  surface: "#FFFFFF"
  on-primary: "#FFFFFF"
typography:
  display:
    fontFamily: Inter
    fontSize: 4.5rem
    fontWeight: 700
    letterSpacing: "-0.03em"
  h1:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 700
  body:
    fontFamily: Inter
    fontSize: 0.98rem
    lineHeight: 1.55
  label:
    fontFamily: Inter
    fontSize: 0.78rem
    fontWeight: 600
    letterSpacing: "0"
rounded:
  sm: 8px
  md: 12px
  lg: 18px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
---
## Overview

Airbnb: warm coral accent, photography-first layout, rounded UI, friendly circular sans.

## Colors

The palette is built around high-contrast neutrals and a single accent that drives interaction.

- **Primary (`#222222`):** Headlines and core text.
- **Secondary (`#717171`):** Borders, captions, and metadata.
- **Tertiary (`#FF385C`):** The sole driver for interaction. Reserve it.
- **Neutral (`#F7F7F7`):** The page foundation.

## Typography

- **display:** Inter 4.5rem
- **h1:** Inter 2.25rem
- **body:** Inter 0.98rem
- **label:** Inter 0.78rem

## Do's and Don'ts

- **Do** use Tertiary for exactly one action per screen.
- **Do** let Neutral carry the composition — negative space is a feature.
- **Don't** introduce gradients. This system is flat on purpose.
- **Don't** mix Tertiary with alternate accents; the single-accent rule is load-bearing.
