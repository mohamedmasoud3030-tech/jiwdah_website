```markdown
# jiwdah_website Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the core development patterns, coding conventions, and workflows used in the `jiwdah_website` TypeScript codebase. It covers how to add or update pages, components, content modules, styles, and providers/hooks, as well as how to remove legacy sections. The repository uses conventional commits, modular file organization, and a mixture of export styles. This guide will help you contribute effectively and consistently.

## Coding Conventions

- **Language:** TypeScript
- **Framework:** None detected (React conventions observed)
- **File Naming:** PascalCase for components, pages, and sections (`MyComponent.tsx`, `HomePage.tsx`)
- **Import Style:** Uses alias imports  
  ```typescript
  import Navbar from '@/components/Navbar';
  ```
- **Export Style:** Mixed (default and named exports)
  ```typescript
  // Default export
  export default function Footer() { ... }

  // Named export
  export function useTheme() { ... }
  ```
- **Commit Messages:** Conventional commits  
  - Prefixes: `feat`, `chore`, `refactor`
  - Example: `feat: add bilingual support to About page`

## Workflows

### Add or Rebuild Page
**Trigger:** When introducing a new page or significantly updating an existing one  
**Command:** `/new-page`

1. Create or modify a file in `artifacts/jiwdah/src/pages/{PageName}.tsx`
2. Implement or update the page's content and logic

**Example:**
```typescript
// artifacts/jiwdah/src/pages/AboutUs.tsx
import Layout from '@/components/Layout';

export default function AboutUs() {
  return (
    <Layout>
      <h1>About Us</h1>
      {/* Page content */}
    </Layout>
  );
}
```

---

### Add or Update Component
**Trigger:** When introducing or updating a UI component (e.g., Navbar, Footer)  
**Command:** `/new-component`

1. Create or modify a file in `artifacts/jiwdah/src/components/{ComponentName}.tsx`
2. Implement or update the component's logic and styles

**Example:**
```typescript
// artifacts/jiwdah/src/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav>
      {/* Navigation items */}
    </nav>
  );
}
```

---

### Remove Legacy or Unused Section
**Trigger:** When cleaning up the codebase by removing old or unused sections  
**Command:** `/remove-section`

1. Delete file(s) in `artifacts/jiwdah/src/sections/{SectionName}.tsx`

**Example:**
```bash
rm artifacts/jiwdah/src/sections/OldHeroSection.tsx
```

---

### Add or Update Content Module
**Trigger:** When introducing or updating structured content (e.g., services, site copy)  
**Command:** `/update-content`

1. Create or modify a file in `artifacts/jiwdah/src/content/{ContentName}.ts`
2. Populate or update the content data

**Example:**
```typescript
// artifacts/jiwdah/src/content/services.ts
export const services = [
  { name: 'Consulting', description: 'Expert advice' },
  // ...
];
```

---

### Add or Update Style System
**Trigger:** When introducing or updating global styles, design tokens, or accessibility styles  
**Command:** `/update-styles`

1. Create or modify CSS files in `artifacts/jiwdah/src/`
2. Route or load styles in `artifacts/jiwdah/src/App.css` or related files

**Example:**
```css
/* artifacts/jiwdah/src/platform.css */
:root {
  --primary-color: #0055ff;
}
```

---

### Add or Update Provider or Hook
**Trigger:** When adding or updating React providers or hooks for global state or preferences  
**Command:** `/new-provider`

1. Create or modify provider/hook in `artifacts/jiwdah/src/providers/` or `artifacts/jiwdah/src/hooks/`
2. Wire provider/hook in `artifacts/jiwdah/src/main.tsx` or related entry point

**Example:**
```typescript
// artifacts/jiwdah/src/providers/ThemeProvider.tsx
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```typescript
// artifacts/jiwdah/src/main.tsx
import { ThemeProvider } from '@/providers/ThemeProvider';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

---

## Testing Patterns

- **Framework:** Unknown (not detected)
- **Test File Pattern:** Files matching `*.test.*`
- **Example:**
  ```typescript
  // artifacts/jiwdah/src/components/Navbar.test.tsx
  import { render } from '@testing-library/react';
  import Navbar from './Navbar';

  test('renders navigation links', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Home')).toBeInTheDocument();
  });
  ```

## Commands

| Command         | Purpose                                                         |
|-----------------|-----------------------------------------------------------------|
| /new-page       | Add or rebuild a page in the platform                           |
| /new-component  | Add or update a UI component                                    |
| /remove-section | Remove legacy or unused sections from the codebase              |
| /update-content | Add or update content modules (e.g., services, site copy)       |
| /update-styles  | Add or update global styles or design tokens                    |
| /new-provider   | Add or update React providers or hooks for global state         |
```