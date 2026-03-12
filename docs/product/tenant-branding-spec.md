# Tenant Branding Spec

## Required Theme Tokens

- `background`
- `foreground`
- `card`
- `cardForeground`
- `muted`
- `mutedForeground`
- `border`
- `accent`
- `accentForeground`
- `heroFrom`
- `heroTo`
- `fontDisplay`
- `fontBody`

## Required Tenant Metadata

- `slug`
- `display name`
- `tagline`
- `public status`
- `primary domain`
- `theme reference`
- `active campaign reference`

## Rules

- Branding is data-driven; no tenant-specific hardcoded CSS branches.
- Every tenant must have a fallback platform theme.
- The same component tree must render any tenant portal using tokens only.
- Theme updates must be auditable and reversible.
