---
name: move-to-package
description: Procedure for moving files from src/ into monorepo packages. Use when moving, extracting, or migrating files into @blockstacking/* packages.
---

Use `git mv` + manual import rewriting (grep/sed) for all file moves. **Do not use `ts-morph`'s `sourceFile.move()`** — it rewrites all cross-package imports as relative paths instead of converting them to `@blockstacking/*` barrel imports, creating more cleanup than it saves.

## Steps per file move

1. `git mv src/old/path.ts packages/<pkg>/src/path.ts`
2. `grep -rn` for the old import path across `src/` and `packages/`
3. Rewrite each hit to import from the `@blockstacking/<pkg>` barrel
4. Update the moved file's own imports: relative `src/` paths → `@blockstacking/*` barrel imports where the target already lives in a package
5. **Rewrite any self-imports through the barrel.** If the moved file imported from `@blockstacking/<pkg>` before the move (when it was external to that package), those imports are now self-imports through the barrel and must become direct relative paths (e.g. `@blockstacking/hoh-db` → `./campaign`). Self-imports create circular dependencies caught by `dpdm`. Easy to miss because the import was correct before the move.
6. Add the newly exposed symbols to the destination package's `src/index.ts` barrel
7. Run `pnpm fix` to auto-fix import ordering
