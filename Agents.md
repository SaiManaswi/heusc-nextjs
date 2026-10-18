# Agents Guide

This repository is a Next.js application using Mantine UI, a custom layout shell, and a mixed legacy Pages Router setup. Keep the app clean and maintainable by following the structure below when adding features or changing UI.

## Project overview

- Runtime: Next.js 16.4.2
- UI library: Mantine
- Styling: CSS modules and global styles
- App shell: custom layout in `src/components/layout` with a Mantine provider in `src/components/providers`
- Primary page entrypoints live under `pages/`

## Standard structure

- `pages/` — route pages and legacy routing files
- `src/components/` — reusable UI and shared app components
- `src/components/providers/` — app-level providers such as `MantineProvider`
- `src/theme/` — theme definition for Mantine
- `src/styles/` — global CSS and shared styling assets
- `public/` — static assets served directly by Next.js
- `styles/` — existing CSS modules retained during transition

## Development conventions

- Prefer adding reusable interface code under `src/components/` instead of implementing large UI blocks directly in route files.
- Keep all new Mantine usage consistent with the theme defined in `src/theme/index.js`.
- Do not duplicate global styling; use the centralized global stylesheet and CSS modules when available.
- Keep route pages focused on data flow and composition, not UI-specific logic.
- If you add a new UI feature, add a matching structure under `src/components/` or `src/features/` rather than stuffing it into `pages/`.
- Keep compatibility with the existing Pages Router unless a full app-router migration is explicitly requested.

## Mantine guidance

- Use Mantine components for forms, drawers, modals, buttons, and layout primitives.
- Prefer theme tokens and shared configuration over hard-coded values.
- For global CSS, edit `src/styles/globals.css` when needed; keep the rest of the styling in local CSS modules where possible.

## Workflow for AI agents and contributors

1. Read the relevant page and component before editing.
2. Prefer minimal, localized changes.
3. Keep imports aligned with the project structure and avoid introducing new scattered directories.
4. Preserve existing behavior unless the task explicitly changes it.
5. Verify with a production build when the change affects app rendering or dependencies.

## Useful commands

- Install dependencies: `corepack yarn install --ignore-engines --non-interactive --network-timeout 600000`
- Run the app: `corepack yarn dev`
- Run production build: `corepack yarn build`

## Notes for the owner

This is a student project and the app is currently in a transitional state. The repo is intentionally organized to support both legacy pages-based routes and a cleaner standard structure for future iteration. You can migrate more of the current components into `src/components` and `src/features` over time without breaking existing routes.
