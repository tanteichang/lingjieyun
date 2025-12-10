# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with routing in `src/pages` + `src/pages-sub` and layouts in `src/layouts`. Shared UI and logic sit in `src/components`, `src/hooks`, `src/utils`, and Pinia stores under `src/store`. API bindings and HTTP helpers live in `src/api`, `src/http`, and `src/service`, while assets sit in `src/static`, `src/style`, and `uni.scss`. Environment presets (`env/`), platform manifests, and build tooling (`manifest.config.ts`, `pages.config.ts`, `project.config.json`, `vite.config.ts`, `uno.config.ts`, `scripts/`) sit at the repo root. Bundles land in `dist/` per platform.

## Build, Test, and Development Commands
Use PNPM (enforced via `preinstall`). `pnpm dev:h5` runs H5 with hot reload at http://localhost:9000, while `pnpm dev:mp` and `pnpm dev:app` emit mini-program and native outputs for their IDEs. Ship builds with `pnpm build:h5`, `pnpm build:mp`, or `pnpm build:app`; append `:test`/`:prod` to lock envs. `pnpm type-check` runs `vue-tsc --noEmit`, `pnpm lint` / `pnpm lint:fix` apply ESLint + UnoCSS rules, `pnpm openapi` regenerates typed clients, and `pnpm init-baseFiles` seeds placeholder configs after cloning.

## Coding Style & Naming Conventions
Follow the project ESLint preset (`eslint.config.mjs`) with 2-space indentation, single quotes, and trailing commas where valid. Vue SFCs use `<script setup lang="ts">` with camelCase composables and kebab-case files (e.g., `scroll-list.vue`). Stores are PascalCase functions (`useUserStore`), Uno utility classes handle styling, and new tokens go through `uno.config.ts`. Keep service modules strongly typed, declare interfaces in `src/types` or `typings.ts`, and export shared constants from `src/utils`. Run `pnpm lint:fix` before committing.

## Testing Guidelines
This template relies on `@dcloudio/uni-automator` for smoke and UI automation. Until end-to-end suites mature, treat `pnpm type-check` + `pnpm lint` as the minimum gate and exercise flows manually in both H5 and mp-weixin. Name future spec files after their target (e.g., `login.automator.spec.ts`) and keep fixtures inside `mock/` for reuse.

## Commit & Pull Request Guidelines
Commits must follow Conventional Commits (`feat:`, `fix:`, `chore:`) because `@commitlint/config-conventional` guards pushes. Keep commits focused and passing `pnpm lint && pnpm type-check`. Pull requests need a concise summary, linked issue, screenshots/GIFs for UI changes (H5 + mp-weixin when applicable), and notes about platform impacts or manifest edits. Re-run the relevant `pnpm build:*` command when touching `manifest.config.ts` or `pages.config.ts`, and mention any IDE steps reviewers must follow.

## Configuration & Security Notes
Secret keys and app IDs belong in `.env.*` files inside `env/`; never commit real credentials. Mini-program IDs appear in `project.private.config.json`—update locally only. When adding new request clients, register interceptors in `src/http/interceptor.ts` so tokens stay centralized.
