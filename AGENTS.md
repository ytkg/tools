# AGENTS.md

This document contains notes and instructions for AI agents working on this codebase.

## Project Overview

This is a web application that provides a collection of useful developer tools. It is built with the following technologies:

*   **Framework/Tooling:** React, TypeScript, Vite
*   **UI Library:** Material-UI (MUI)
*   **Routing:** `react-router-dom`
*   **Linting:** ESLint with TypeScript support
*   **Testing:** Vitest, React Testing Library

## Project Structure

The codebase is organized as follows:

*   `src/main.tsx`: The main entry point for the application.
*   `src/App.tsx`: The root component that sets up the application's routing and theme.
*   `src/components/`: This directory holds reusable components, such as the main `Layout.tsx`.
*   `src/data/`: This directory holds the data that populates the tool navigation list. `tools-list.ts` contains the raw data (name, path, description), while `tools.tsx` adds the corresponding UI icon for each tool.
*   `src/tools/`: This directory contains the individual tool components. Each file represents a single tool page.
*   `src/tools/__tests__/`: Contains the test files for each tool.
*   `public/`: Static assets that are served directly.

## Development Conventions

### Layout
**IMPORTANT:** The Material-UI `Grid` component in this project's specific version (`@mui/material@^7.3.1`) is unstable and causes persistent build errors. **Do not use the `<Grid>` component.** For all layout needs, use the `<Box>` component with flexbox styling.

Example:
```tsx
// Good:
import { Box } from '@mui/material';

<Box sx={{ display: 'flex', gap: 2 }}>
  <Box sx={{ width: '50%' }}>Left</Box>
  <Box sx={{ width: '50%' }}>Right</Box>
</Box>

// Bad:
import Grid from '@mui/material/Grid'; // Or any other Grid import

<Grid container spacing={2}>
  <Grid xs={6}>Left</Grid>
  <Grid xs={6}>Right</Grid>
</Grid>
```

## Development Scripts

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the TypeScript code and builds the application for production.
*   `npm run lint`: Runs the ESLint linter to check for code quality issues. Use `npm run lint -- --fix` to automatically correct issues.
*   `npm test`: Runs the Vitest test suite.
*   `npm run preview`: Starts a local server to preview the production build.

## Task Execution Procedure

Here is a typical workflow for completing a task in this repository.

1.  **Install Dependencies:**
    If this is your first time working on the project, or if dependencies have changed, install the necessary Node.js modules.
    ```bash
    npm install
    ```

2.  **Understand the Codebase:**
    *   Review `src/App.tsx` to understand routing and theme setup.
    *   Review `src/components/Layout.tsx` to understand the main page structure.
    *   Examine the existing components in `src/tools/` as examples for new tools.

3.  **Implement Changes:**
    *   Locate the relevant files for your task.
    *   If adding a new tool, follow these steps:
        1. Create the new tool component file in `src/tools/`.
        2. Add the new route in `src/App.tsx`.
        3. Add the tool's metadata (text, path, description, tags) to the `toolList` array in `src/data/tools-list.ts`.
        4. Import a suitable Material-UI icon and add it to the `icons` object in `src/data/tools.tsx`, using the new tool's path as the key.
        5. **Important:** Remember to also update the "Available Tools" list at the end of this document.

4.  **Lint, Test, and Build:**
    Before finalizing your changes, run the all-in-one check script to ensure your code adheres to the project's style guidelines, that all tests pass, and that the project builds successfully.
    ```bash
    npm run check
    ```
    This command will run `lint`, `test`, and `build` in sequence. Fix any errors or warnings reported by any of these steps.

    **Important:** When adding new features (e.g., new components, new logic), you **must** add corresponding tests in the `src/tools/__tests__` directory to validate their functionality.

5.  **Submit Your Work:**
    Once you are confident in your changes:
    a. Use the `request_code_review()` tool to get feedback on your work.
    b. Address any suggested changes.
    c. Use the `submit()` tool to commit your changes with a clear, descriptive message.

## Available Tools

To avoid proposing tools that already exist, please check the following list of currently implemented tools before starting your work.

*   JSON Formatter
*   Base64 Converter
*   Character Counter
*   QR Code Generator
*   Unix Timestamp Converter
*   URL Encoder/Decoder
*   Color Converter
*   Markdown Previewer
*   JWT Decoder
*   Hash Generator
*   Time Zone Converter
*   IP Address Viewer
*   Keyboard Event Viewer
