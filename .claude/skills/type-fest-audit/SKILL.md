---
name: type-fest-audit
description: Find and apply places where hand-rolled TypeScript types could use type-fest (OverrideProperties, Merge, SetOptional, SetRequired, Arrayable, Promisable, AsyncReturnType, Constructor, DistributedOmit/Pick, UnknownRecord, Tagged, Split, Replace...). Includes compiler-API scan scripts, a one-match-at-a-time replacer that keeps only what typechecks, and a verification protocol. Use when asked to audit, tidy or modernise types with type-fest.
---

Text search cannot find these patterns reliably (types span lines, key unions are aliased, re-added keys are nested). Scan with the TypeScript compiler API, apply, and let the typechecker decide what is equivalent.

## 1. Compare versions first, every time

- installed: `grep -m1 '"version"' node_modules/type-fest/package.json` (and the range in `package.json`)
- latest: `<package manager> view type-fest version`, release notes at https://github.com/sindresorhus/type-fest/releases
- report both. If the project is behind, OFFER to upgrade; do not upgrade unasked. Newer releases add utilities (and change results of existing ones), so a scan against an old version can miss replacements
- before upgrading read the notes for every release in between: minimum TypeScript and Node versions, required compiler options, removed or renamed types, changed results. Check `view type-fest@latest peerDependencies engines`
- after an upgrade typecheck every project and look at any type-level test that fails: a changed result can be a fix rather than a regression, decide with evidence
- read the `.d.ts` of the installed version (`node_modules/type-fest/source/<name>.d.ts`) before relying on a utility's exact signature or options; the readme on `main` can describe unreleased changes

## 2. Scripts

Run with a Node that runs TypeScript directly (22.18+ / 23.6+): `node <skill-dir>/scripts/<name>.ts <options>`. They load the project's own `typescript`, so they see types as its compiler does. Typecheck the scripts themselves with `tsc -p <skill-dir>`.

Scan options (both scan scripts): `--root <dir>` (default: cwd), `--tsconfig <file>` relative to root, repeatable (default `tsconfig.json`; pass every project's tsconfig), `--exclude <text>` repeatable (path substring to skip; `node_modules` is always skipped). Output: one JSON object per line.

| #   | script               | does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `findOverrides.ts`   | read-only. Types that `Omit`/`Except` keys and add the same keys back (with `&`, `Pick`, or `interface extends`): reports omitted, re-added and not-re-added keys. Also `Partial/Required<Pick/Omit>`, `NonNullable/Required` over `X["k"]`, and `Omit`/`Pick` over a union                                                                                                                                                                                                                                                   |
| 2   | `findAllTypeFest.ts` | read-only, noisy on purpose (filter by `kind`). About 60 patterns: mapped-type modifiers, `T[keyof T]`, `T \| T[]`, `T \| Promise<T>`, `Awaited<ReturnType<F>>`, `new (...args) => T`, `Record<string, unknown/never>`, template-literal `infer`, `UnionToIntersection`/`IsEqual`/`IsNever` idioms, `[T, ...T[]]`, `string & {}`, symbol-branded intersections, intersections re-declaring a key the other member has (resolved with the checker), and a census of generic conditional/mapped/infer aliases to review by hand |
| 3   | `replaceType.ts`     | edits files in place: `--match "<type text>" --with <text> [--import-from <module>] [--import-name <name>] [--only <n>] <files...>`. Matching ignores whitespace and handles multi-line types; adds or extends the import                                                                                                                                                                                                                                                                                                     |
| 4   | `tryHits.ts`         | same options as `replaceType.ts` plus `--typecheck "<cmd>"` (repeatable, run in root, must exit 0). Applies one match at a time and keeps it only if every command passes, otherwise puts it back                                                                                                                                                                                                                                                                                                                             |

## 3. Workflow

1. compare versions (above)
2. scan with both scan scripts over every tsconfig; list findings in a numbered table
3. apply one pattern at a time, smallest blast radius first, typechecking after each. Use `tryHits.ts` where a bulk replacement breaks only some call sites
4. record what was rejected and why in the PR description or notes so it is not retried

## 4. Verify

- snapshot before each experiment with `git stash create` (prints a SHA, leaves the stash stack and index alone). Undo a single file with `git restore --source=<sha> --worktree -- <file>`
- typecheck EVERY tsconfig project the repository has: errors can appear in only some
- to claim a new type equals the old one, write a probe that must live inside a tsconfig's `include`: `export const check: IsEqual<NewType, OldType> = true;` (`IsEqual` from type-fest), typecheck, then delete it. Probe the real instantiations, not `Parameters<typeof fn>[0]` of a generic function (false negatives)
- if the changed types feed a generated artefact (JSON schema, API report, docs), regenerate it and diff. Any diff means behaviour changed outside the type system: stop and decide
- run the linter and formatter on the changed files only, then the test suite and any circular-dependency check
- import with `import type { X } from "type-fest"`: it is erased entirely, so type-fest stays out of the runtime bundle

## 5. Pattern to utility

| #   | hand-rolled                                                        | utility                                                               |
| --- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| 1   | `Omit<B, K> & { k: T }`, keys re-added                             | `OverrideProperties<B, { k: T }>` (keys must exist in `B`) or `Merge` |
| 2   | `Omit<B, K> & Partial<Pick<B, K>>`                                 | `SetOptional<B, K>`                                                   |
| 3   | `B & Required<Pick<B, K>>` or re-declared required keys            | `SetRequired<B, K>`                                                   |
| 4   | `Omit`/`Pick` over a union                                         | `DistributedOmit` / `DistributedPick`                                 |
| 5   | nested key re-declared in an intersection                          | `OverridePropertiesDeep`, `MergeDeep`, `SetProperty<B, "a.b", T>`     |
| 6   | `T \| T[]` / `T \| Promise<T>`                                     | `Arrayable<T>` / `Promisable<T>`                                      |
| 7   | `Awaited<ReturnType<F>>`                                           | `AsyncReturnType<F>`                                                  |
| 8   | `new (...args: any[]) => T`                                        | `Constructor<T>`                                                      |
| 9   | `Record<string, unknown>` / `Record<string, never>`                | `UnknownRecord` / `EmptyObject`                                       |
| 10  | `T[keyof T]`                                                       | `ValueOf<T>`                                                          |
| 11  | `{ -readonly [K in keyof T]: T[K] }`                               | `Writable<T>` / `WritableDeep<T>`                                     |
| 12  | `declare const brand: unique symbol` intersection (never assigned) | `Tagged<T, "name">`                                                   |
| 13  | template-literal `infer` splitting or replacing                    | `Split`, `Replace`, `RemovePrefix`, `RemoveSuffix`, `CamelCase`...    |
| 14  | intersection re-declaring keys the other side has                  | `Merge` / `OverrideProperties`                                        |

## 6. Pitfalls (each learned from a typechecker failure)

- `OverrideProperties<Base, ...>` fails when `Base` contains an unresolved generic: use `Merge`. It also requires every overridden key to exist in `Base`, and takes the override's optionality
- `Merge` distributes over unions, so it replaces `Union & { k: T }` when every member has `k`. It does NOT replace an intersection that narrows a discriminated union to some members, nor a type predicate's `Item & { type: "x" }`: the union members are kept, not filtered
- `Omit`/`Pick` on a union collapse it to the shared keys; the distributed versions keep per-member shapes and only accept keys the members have (this can expose an omitted key that never existed)
- `MergeDeep` deep-simplifies both sides: with generic type parameters inside it can break unrelated code, in a self-referencing alias it is circular, and as a type predicate's type it often fails "must be assignable to its parameter". Fine on concrete types. Prefer `SetProperty` or `OverridePropertiesDeep` when available and test them the same way
- `Required<X> & Y` where `Y` makes some optional keys required: `SetRequired<X, keys>` and drop the redeclared types
- `Partial<Pick<T, K>>` (a partial subset, other keys dropped) has no equivalent: `SetOptional` keeps every key
- a `declare const brand: unique symbol` that is never assigned is a phantom brand (`Tagged`). A symbol with a runtime value that is assigned and read is a real property: not `Tagged`
- `UnknownRecord` is `Record<PropertyKey, unknown>`: helpers that infer a key type from the record then infer `PropertyKey` and break callers indexing with `string`. Convert one match at a time and keep what compiles
- `Readonly<T[]>` is the built-in `ReadonlyArray<T>`, and `Readonly<T[]> | T[]` is redundant
- replacing an `Omit<Union, K>` with a distributed form can change generated schemas or validators even though it typechecks: regenerate and diff
