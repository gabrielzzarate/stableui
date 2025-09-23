### stableui — Project Overview

This repository is a small React UI component library meant to be published to npm and reused across projects.

### What it provides

- React components: currently exports a `Button` from `src/components/ui/button.tsx` via `src/index.ts`.
- TypeScript types: `.d.ts` declaration files are generated and shipped.
- Dual builds: ESM and CJS outputs for broad compatibility.

### Build system

- Vite (library mode) bundles the code.
  - Entry: `src/index.ts`
  - Formats: `es` → `dist/index.js`, `cjs` → `dist/index.cjs`
  - External: `react`, `react-dom` (kept as peer dependencies)
- Type declarations via `vite-plugin-dts` using `tsconfig.build.json`.
- Tailwind plugin (`@tailwindcss/vite`) is included for local dev convenience.

Key files

- `vite.config.ts`: Vite library config and DTS plugin.
- `tsconfig.build.json`: Clean TS config for type generation (JSX enabled, paths).
- `src/index.ts`: Public entry re-exporting components.
- `package.json`: Export map, peers, scripts, publish config.

### Scripts

- `npm run dev` – local dev server (for demos if added later)
- `npm run build` – builds ESM, CJS, and types into `dist/`
- `npm run typecheck` – TypeScript checking
- `npm run lint` – ESLint on source

### Package configuration

- Exports: maps `types` → `dist/index.d.ts`, `import` → `dist/index.js`, `require` → `dist/index.cjs`.
- Peer dependencies: `react`, `react-dom` (`^18 || ^19`). Not bundled.
- sideEffects: `false` for tree-shaking. If shipping CSS, consider `["**/*.css"]`.
- Files: only `dist/`, `README.md`, `LICENSE` are published.
- publishConfig: `{ "access": "public" }` for public packages.

### CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push/PR:

- Install → Lint → Typecheck → Build.

### Developing components

1. Add components under `src/components/...`.
2. Re-export from `src/index.ts` to make them public.
3. Keep `react`/`react-dom` as peers; avoid bundling them.
4. Keep helper libs like `clsx`/`class-variance-authority` as regular deps.

### Publishing

1. `npm login`
2. `npm run build`
3. Optional: `npm pack --dry-run` to preview contents
4. `npm publish`

### Versioning

Use semver. To bump patch without tagging:

- `npm version patch --no-git-tag-version`

### Notes

- If you add CSS that must be included at runtime, ensure it’s emitted to `dist/` and adjust `sideEffects` accordingly.
- For additional entry points (e.g. `exports: { "./button": ... }`), configure builds and types per entry.
