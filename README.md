# Rick and Morty Memory Game

A card-matching memory game built with React, TypeScript and Vite. Each round loads 6 random characters from the [Rick and Morty API](https://rickandmortyapi.com/), so the board is different every game.

## How to play

1. **Home**: 6 random characters are loaded and shown as a preview.
2. **Game**: the 12 cards (6 pairs) are shuffled, briefly revealed so you can memorize them, then turned face down. Flip two cards per turn:
   - If they match, the pair is removed and your hit count goes up.
   - If they don't, both cards flip back face down.
3. **Result**: once every pair is found, you see how many turns you took. From there you can replay with the same characters or go back to the home page for a new set.

## Tech stack

- [React 19](https://react.dev/) with the [React Compiler](https://react.dev/learn/react-compiler)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Sass](https://sass-lang.com/) for styles
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for unit tests
- [pnpm](https://pnpm.io/) as the package manager

## Getting started

### Prerequisites

- Node.js (a current LTS version)
- pnpm

### Installation

```bash
pnpm install
```

### Environment variables

Copy `.env.template` to `.env.local` and set the API URL:

```bash
VITE_API_URL=https://rickandmortyapi.com/api
```

### Run in development

```bash
pnpm dev
```

## Available scripts

| Script               | Description                                |
| -------------------- | ------------------------------------------ |
| `pnpm dev`           | Start the development server               |
| `pnpm build`         | Type-check and build for production        |
| `pnpm preview`       | Preview the production build locally       |
| `pnpm lint`          | Run ESLint                                 |
| `pnpm test`          | Run tests in watch mode                    |
| `pnpm test:run`      | Run tests once                             |
| `pnpm test:coverage` | Run tests and generate a coverage report   |

## Project structure

```
src/
├── app/              # App shell: router, global context (GameProvider) and hooks
├── components/       # Shared UI components (Button, Header, Loading, Text)
├── config/           # Environment configuration
├── features/
│   ├── characters/   # Character fetching from the API, types and helpers
│   └── memory-game/  # Game board, cards, game logic hook and reducer
├── pages/            # Home, Game and Result pages
├── styles/           # Global styles and Sass settings
├── utils/            # Generic helpers (e.g. shuffle)
└── test/             # Test setup
```
