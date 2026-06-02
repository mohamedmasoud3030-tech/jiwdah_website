```markdown
# Mohamed-platform- Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute effectively to the **Mohamed-platform-** TypeScript codebase. You'll learn the project's coding conventions, how to implement or update features (especially for the LENA Digital House platform), manage migrations, and follow the repository's established workflows for consistent and maintainable development.

## Coding Conventions

### File Naming

- **CamelCase** is used for file names, especially for components and pages.
  - Example: `LenaPlatform.tsx`, `LenaRoot.tsx`

### Import Style

- **Alias imports** are preferred.
  - Example:
    ```typescript
    import { LenaExperience } from '@/components/LenaExperience';
    ```

### Export Style

- **Named exports** are used.
  - Example:
    ```typescript
    export function LenaPlatform() {
      // component code
    }
    ```

### Commit Messages

- **Conventional commits** with prefixes: `feat`, `chore`, `fix`
  - Example: `feat: add immersive experience to LenaPlatform`

## Workflows

### Add or Update LENA Platform Feature
**Trigger:** When introducing or enhancing LENA platform features or branding  
**Command:** `/add-lena-feature`

1. **Create or update** the `LenaPlatform.tsx` page component.
   - Example:
     ```typescript
     export function LenaPlatform() {
       return <div>Welcome to LENA Digital House!</div>;
     }
     ```
2. **Update site configuration** in `site.ts` for branding changes.
   - Example:
     ```typescript
     export const siteConfig = {
       title: 'LENA Digital House',
       themeColor: '#123456',
     };
     ```
3. **Modify routing** to include the LENA experience.
   - Update `LenaRoot.tsx` or `App.tsx` to add or adjust the route:
     ```typescript
     import { LenaPlatform } from './pages/LenaPlatform';

     // In your router setup
     <Route path="/lena" element={<LenaPlatform />} />
     ```

### LENA Migration or Build Fix
**Trigger:** When finalizing migration to LENA or fixing build issues after major changes  
**Command:** `/finalize-lena-migration`

1. **Update environment and documentation files**:
   - Edit `.env.example` to reflect new environment variables.
   - Update `README.md` with migration/build instructions.
2. **Update or restore LENA-related components and configuration**:
   - Ensure `LenaRoot.tsx` and `site.ts` reflect the latest platform logic.
3. **Update or add LENA stylesheet**:
   - Edit or create `lena.css` or `platform.css` for platform-specific styles.
     ```css
     /* lena.css */
     .lena-theme {
       background: #f0f0f0;
       color: #222;
     }
     ```
4. **Update entry points**:
   - Modify `index.html` or similar files to ensure correct asset inclusion and platform branding.

## Testing Patterns

- **Test files** use the pattern `*.test.*` (e.g., `LenaPlatform.test.tsx`).
- **Testing framework** is not explicitly specified, but standard TypeScript/React testing conventions likely apply.
- Example test file:
  ```typescript
  import { render } from '@testing-library/react';
  import { LenaPlatform } from './LenaPlatform';

  test('renders LENA platform page', () => {
    const { getByText } = render(<LenaPlatform />);
    expect(getByText(/LENA Digital House/)).toBeInTheDocument();
  });
  ```

## Commands

| Command                  | Purpose                                                        |
|--------------------------|----------------------------------------------------------------|
| /add-lena-feature        | Add or update LENA platform features or branding               |
| /finalize-lena-migration | Finalize migration or fix build issues for the LENA platform   |
```
