# Fair Play Studio

A Vite + React + TypeScript playground wired with Tailwind Catalyst presets, Zustand state, Dexie persistence, Workbox offline support, and an internationalised interface.

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

- `npm run dev` – Start the Vite development server.
- `npm run build` – Type-check and create a production build.
- `npm run preview` – Preview the production build locally.
- `npm run test` – Run the Vitest suite once.
- `npm run test:watch` – Run tests in watch mode.
- `npm run typecheck` – Execute TypeScript project references.

## Tooling highlights

- **Tailwind CSS** configured with custom Catalyst-inspired presets and project colour system.
- **Zustand** stores with persistent local storage, including a demo game state and settings store.
- **Dexie** database schema for recording session history.
- **i18next** bootstrapped with English and Hebrew translations.
- **Workbox** service worker registration for offline-ready builds.
- **Vitest + Testing Library** ready for component testing.

## Deployment

The repository includes a [`vercel.json`](./vercel.json) configuration optimised for the Vite build. To deploy on [Vercel](https://vercel.com/):

1. Create a new Vercel project and connect this repository.
2. Leave the install command as `npm install` and set the build command to `npm run build`.
3. Set the output directory to `dist` (Vercel detects this automatically from the config).
4. Optionally enable preview deployments on pull requests to exercise the interactive board before promoting to production.

Once the build completes, Vercel will serve the optimised static bundle alongside the Workbox-powered service worker.
