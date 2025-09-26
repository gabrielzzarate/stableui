#!/usr/bin/env node

/**
 * Helper script to add new shadcn components and ensure CSS is properly updated
 * Usage: node scripts/add-component.js <component-name>
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]

if (!componentName) {
  console.error('Please provide a component name')
  console.log('Usage: node scripts/add-component.js <component-name>')
  process.exit(1)
}

console.log(`Adding shadcn component: ${componentName}`)

try {
  // Add the component using shadcn CLI
  execSync(`npx shadcn@latest add ${componentName}`, { stdio: 'inherit' })

  // Update the main index.ts file to export the new component
  const indexPath = path.join(__dirname, '../src/index.ts')
  const indexContent = fs.readFileSync(indexPath, 'utf8')

  // Get the component file to determine the export name
  const componentPath = path.join(__dirname, `../src/components/ui/${componentName}.tsx`)

  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, 'utf8')

    // Extract export names from the component file
    const exportMatches = componentContent.match(/export\s+(?:const|function|class)\s+(\w+)/g)
    if (exportMatches) {
      const exportNames = exportMatches
        .map((match) => {
          const nameMatch = match.match(/export\s+(?:const|function|class)\s+(\w+)/)
          return nameMatch ? nameMatch[1] : null
        })
        .filter(Boolean)

      // Add exports to index.ts
      const newExports = exportNames
        .map((name) => `import { ${name} } from '@/components/ui/${componentName}'`)
        .join('\n')
      const exportLine = `export { ${exportNames.join(', ')} }`

      // Check if imports already exist
      if (!indexContent.includes(`from '@/components/ui/${componentName}'`)) {
        const updatedContent = indexContent.replace(
          /(import.*from.*@\/components\/ui.*\n)+/,
          `$&${newExports}\n`,
        )

        // Add to exports
        const exportMatch = updatedContent.match(/export\s*\{([^}]*)\}/)
        if (exportMatch) {
          const currentExports = exportMatch[1].trim()
          const newExportList = currentExports
            ? `${currentExports}, ${exportNames.join(', ')}`
            : exportNames.join(', ')
          const finalContent = updatedContent.replace(
            /export\s*\{[^}]*\}/,
            `export { ${newExportList} }`,
          )

          fs.writeFileSync(indexPath, finalContent)
          console.log(`✅ Updated src/index.ts with exports: ${exportNames.join(', ')}`)
        }
      }
    }
  }

  console.log(`✅ Successfully added ${componentName} component`)
  console.log('📝 CSS will be automatically updated on next build')
} catch (error) {
  console.error('❌ Error adding component:', error.message)
  process.exit(1)
}
