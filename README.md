# stableui

A small React UI component library.

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
import 'stableui/styles.css'

import { Button } from 'stableui'

export default function Example() {
  return <Button>Click me</Button>
}
```

## Development

- `npm run dev` – story/demo app if added later
- `npm run build` – builds ESM and CJS to `dist/`
- `npm run typecheck` – TS type checking
- `npm run lint` – lint source

## License

MIT © 2025 Gabriel Zárate
