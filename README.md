# stableui

A React UI component library built with shadcn/ui components and precompiled CSS.

## Install

```bash
npm install stableui
```

Peer dependencies:

- react: ^18 || ^19
- react-dom: ^18 || ^19

## Usage

```tsx
// Import styles once in your app (required)
import 'stableui/dist/style.css'

import { Button } from 'stableui'

export default function Example() {
  return <Button>Click me</Button>
}
```

### No Tailwind setup required

This library ships with fully precompiled CSS, so consuming apps don't need Tailwind or any additional configuration. Just import the CSS and use the components.

## Development

- `npm run dev` – simple playground at `src/playground/App.tsx`
- `npm run build` – builds ESM and CJS to `dist/`
- `npm run typecheck` – TS type checking
- `npm run lint` – lint source

### Adding new components

The CSS management has been streamlined! When adding new shadcn/ui components:

#### Option 1: Use the helper script (Recommended)

```bash
npm run add-component <component-name>
```

This will:

- Add the component using shadcn CLI
- Automatically update `src/index.ts` with the new exports
- Ensure CSS is properly configured

#### Option 2: Manual process

1. **Add the component**:

   ```bash
   npx shadcn@latest add <component-name>
   ```

2. **Export the component** in `src/index.ts`:

   ```tsx
   import { NewComponent } from '@/components/ui/new-component'
   export { NewComponent }
   ```

3. **Build and test**:
   ```bash
   npm run build
   ```

#### CSS Management

- **Single source of truth**: All styles are managed in `src/index.css`
- **Automatic scanning**: Tailwind automatically scans all component files
- **No manual CSS updates needed**: New components will work automatically
- **Build integration**: CSS is automatically included in the build process

The consuming apps will automatically get the new styles without any changes needed.

## License

MIT © 2025 Gabriel Zárate
