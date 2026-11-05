# Project improvements beyond accessibility

This file summarizes product, visual, testing, and development-workflow improvements that are separate from the accessibility audit in `ACCESSIBILITY_AUDIT.md`.

## Test coverage

- Added tests for the application, components, sorting behavior, and fixtures.
- The latest Vitest coverage run passed all 33 tests across 9 test files.
- All 9 measured source files reached 100% statement, branch, function, and line coverage.
- Run the configured coverage script with `pnpm run test:coverage`.

## Light and dark themes

- Added a light/dark theme switch in the page header, with sun and moon icons.
- Defined semantic theme tokens for surfaces, text, borders, and feedback colors.
- Corrected the dark-theme result status colors so Qualified uses a distinct green background and Eliminated uses a distinct red background.

## Results table sorting

- Added sorting for the Rank and Bib columns in ascending and descending order.
- The table starts in its original order. The first sort activation sorts ascending; repeated activation toggles direction.
- Added vertically stacked up/down SVG indicators. The active direction is filled while the inactive arrow remains outlined; the icon geometry stays the same.

## Development workflow

- Added Biome configuration for consistent formatting and linting, plus VS Code workspace settings to format supported files with Biome on save.
- Configured Vitest to use `vmThreads`, reducing repeated `happy-dom` environment creation while preserving test-file isolation.
