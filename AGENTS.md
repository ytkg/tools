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
*   `src/tools/`: This directory contains the individual tool components. Each file represents a single tool page.
*   `src/tools/__tests__/`: Contains the test files for each tool.
*   `public/`: Static assets that are served directly.

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
    *   If adding a new tool, create a new component file in `src/tools/`.
    *   Add the new route in `src/App.tsx`.
    *   Add a link to the new tool in the navigation list in `src/components/Layout.tsx`.
    *   **Important:** If you add a new tool, remember to update the "Available Tools" list at the end of this document.

4.  **Lint and Test:**
    Before finalizing your changes, ensure your code adheres to the project's style guidelines and that all tests pass.
    ```bash
    npm run lint
    npm test
    ```
    Fix any errors or warnings reported by the linter and ensure all tests pass.

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
