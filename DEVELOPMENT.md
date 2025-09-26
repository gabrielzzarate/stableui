# Development Guide: stableui

## What is stableui?

`stableui` is a **React UI component library** that provides pre-built, styled components for building modern web applications. Think of it as a toolbox of ready-to-use UI pieces (buttons, calendars, date pickers, etc.) that you can import and use in your React projects.

## Why Use a Component Library?

### The Problem Without a Library

Imagine you're building a web app and need a button. Without a component library, you'd have to:

1. Write HTML for the button
2. Write CSS to style it
3. Handle different button states (hover, active, disabled)
4. Make it accessible for screen readers
5. Ensure it works across different browsers
6. Repeat this process for every UI element

### The Solution With stableui

With stableui, you simply:

```tsx
import { Button } from 'stableui'

function MyApp() {
  return <Button>Click me!</Button>
}
```

That's it! The button comes with professional styling, accessibility features, and works everywhere.

## Project Architecture

### 📁 Folder Structure

```
stableui/
├── src/
│   ├── components/ui/          # All UI components
│   │   ├── button/            # Button component
│   │   │   ├── button.tsx     # Component implementation
│   │   │   ├── button.stories.tsx  # Storybook stories
│   │   │   └── index.ts       # Clean exports
│   │   ├── calendar/          # Calendar component
│   │   ├── datepicker/        # Date picker component
│   │   └── ...
│   ├── lib/                   # Utility functions
│   ├── index.css             # Global styles
│   └── index.ts              # Main library exports
├── .storybook/               # Storybook configuration
├── dist/                     # Built library files
└── package.json              # Project configuration
```

### 🧩 Component Organization

Each component lives in its own folder with:

- **Component file** (`component.tsx`): The actual React component
- **Stories file** (`component.stories.tsx`): Examples and documentation
- **Index file** (`index.ts`): Clean export for easy importing

## Technology Stack

### Core Technologies

- **React**: The UI framework
- **TypeScript**: Adds type safety to JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and bundler

### Component Foundation

- **Radix UI**: Provides accessible, unstyled components
- **shadcn/ui**: Design system and component patterns
- **Lucide React**: Beautiful icon library

### Development Tools

- **Storybook**: Interactive component development and documentation
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## How It Works

### 1. Component Creation

Components are built using Radix UI primitives (accessible, unstyled components) and styled with Tailwind CSS:

```tsx
// Example: Button component
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        // ... more variants
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        // ... more sizes
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
```

### 2. Build Process

The library is built using Vite in "library mode":

- **Input**: `src/index.ts` (exports all components)
- **Output**:
  - `dist/index.js` (ES modules)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript definitions)
  - `dist/style.css` (Compiled CSS)

### 3. Publishing

The built files are published to npm, making them available to any React project.

## Development Workflow

### 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start Storybook**: `npm run storybook`
4. **Open browser**: Visit `http://localhost:6006`

### 📝 Adding a New Component

1. **Use the helper script**:

   ```bash
   npm run add-component <component-name>
   ```

   This automatically:
   - Adds the component using shadcn CLI
   - Updates exports in `src/index.ts`
   - Ensures CSS is properly configured

2. **Create stories** for the component in Storybook
3. **Test the component** in Storybook
4. **Build and verify**: `npm run build`

### 🎨 Component Development with Storybook

Storybook provides an isolated environment to develop components:

- **Visual testing**: See how components look in different states
- **Interactive documentation**: Play with component props
- **Accessibility testing**: Built-in accessibility checks
- **Responsive testing**: Test on different screen sizes

### 🔧 Available Scripts

- `npm run build` - Build the library for production
- `npm run storybook` - Start Storybook development server
- `npm run lint` - Check code quality
- `npm run typecheck` - Verify TypeScript types
- `npm run add-component` - Add new components easily

## Key Benefits

### 🎯 For Developers

- **Consistency**: All components follow the same design patterns
- **Accessibility**: Built-in ARIA attributes and keyboard navigation
- **Type Safety**: Full TypeScript support with autocomplete
- **Performance**: Optimized bundle size with tree-shaking
- **Documentation**: Interactive examples in Storybook

### 🎨 For Designers

- **Design System**: Consistent spacing, colors, and typography
- **Customizable**: Easy to theme and modify
- **Responsive**: Works on all screen sizes
- **Modern**: Follows current design trends

### 🏢 For Organizations

- **Faster Development**: No need to build UI from scratch
- **Maintainable**: Centralized component updates
- **Scalable**: Easy to add new components
- **Quality**: Battle-tested components with accessibility features

## Real-World Usage

### In a React App

```tsx
// Install the library
npm install stableui

// Import styles (required)
import 'stableui/dist/style.css'

// Import and use components
import { Button, Calendar, DatePicker } from 'stableui'

function MyApp() {
  return (
    <div>
      <Button variant="primary">Save Changes</Button>
      <Calendar mode="single" />
      <DatePicker placeholder="Select a date" />
    </div>
  )
}
```

### Component Variants

Most components support multiple variants:

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Subtle</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

## Best Practices

### ✅ Do's

- Use Storybook to develop and test components
- Follow the existing component patterns
- Write stories for all component variants
- Test accessibility features
- Keep components focused and single-purpose

### ❌ Don'ts

- Don't modify components without updating stories
- Don't skip TypeScript types
- Don't forget to test in different browsers
- Don't break existing component APIs
- Don't ignore accessibility requirements

## Troubleshooting

### Common Issues

1. **Storybook won't start**: Check for Yarn PnP conflicts
2. **Styles not loading**: Ensure CSS is imported in your app
3. **TypeScript errors**: Run `npm run typecheck` to identify issues
4. **Build failures**: Check for missing dependencies

### Getting Help

- Check Storybook for component examples
- Review the component source code
- Test components in isolation
- Use browser dev tools to debug styling issues

### Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Storybook Tutorials](https://storybook.js.org/docs/react/get-started/introduction)
- [Radix UI Documentation](https://www.radix-ui.com/)

## Conclusion

stableui is designed to make UI development faster, more consistent, and more accessible. By providing pre-built, well-tested components, it allows developers to focus on building features rather than reinventing UI elements. The combination of TypeScript, Storybook, and modern build tools creates a robust development experience that scales from small projects to large applications.

Whether you're building your first React app or working on a complex enterprise application, stableui provides the foundation for creating beautiful, accessible, and maintainable user interfaces.
