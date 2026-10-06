# TypeScript setup (temporary)

> This file documents workarounds for TypeScript 7.x tooling immaturity. It is temporary: delete it, and the
> workarounds it describes, as soon as they stop being needed. Check each item below whenever TypeScript, the VS Code
> TypeScript 7 extension, typescript-eslint or ts-morph release, and remove what is no longer required.

## Packages

| `package.json` entry | Resolves to | Why |
|---|---|---|
| `@typescript/native-preview` | `typescript@7.1.0-dev.*` (7.1 nightly) | The native compiler. Provides `tsc` for `pnpm check:type` and the language server for VS Code |
| `typescript` | `@typescript/typescript6` (6.0 API) | Tooling that imports the classic compiler API at load time: `eslint-plugin-unused-imports` (via `@typescript-eslint/*` and `ts-api-utils`), run as an oxlint jsPlugin |

* `ts-morph` (used by `gen:types` and `gen:roomSchema`) bundles its own compiler, so it does not use either entry
* `dpdm` and `ts-json-schema-generator` pin their own `typescript@5.x`

## Why the native compiler is aliased as `@typescript/native-preview`

The VS Code TypeScript 7 extension (`TypeScriptTeam.native-preview`) only offers "Use Workspace Version" for a package
at `node_modules/@typescript/native-preview` - a name that is no longer published to npm
([microsoft/TypeScript#64565](https://github.com/microsoft/TypeScript/issues/64565)). The extension also ignores a
workspace `js/ts.tsdk.path` until that picker option has been chosen once in the workspace. Aliasing the nightly to
that name makes it detectable.

## VS Code

`.vscode/settings.json` sets:

* `"js/ts.experimental.useTsgo": true` - use the TypeScript 7 extension instead of the built-in JS tsserver
* `"js/ts.tsdk.path": "node_modules/@typescript/native-preview"` - use the repo's 7.1 nightly instead of the extension's
  bundled 7.0.x

One-time per-machine steps:

1. Install or update the TypeScript 7 extension (`code --update-extensions`), and make sure it is not disabled
2. Open a `.ts` file, then run "TypeScript: Select TypeScript Version" → "Use Workspace Version"
3. Confirm: the TypeScript 7 output channel logs `Resolved to .../@typescript/typescript-<platform>/lib/tsc`, not a
   path inside `~/.vscode/extensions`

## pnpm

The nightly is newer than pnpm's `minimumReleaseAge`, so `typescript` and `@typescript/*` are listed in
`minimumReleaseAgeExclude` in `pnpm-workspace.yaml`.

## Removal checklist

| When | Do |
|---|---|
| TypeScript 7.1 stable ships | Pin `@typescript/native-preview` to the stable version, or rename it back to a plain dependency once the extension detects `node_modules/typescript` |
| #64565 is fixed | Rename the alias away from `@typescript/native-preview`; update `js/ts.tsdk.path` |
| typescript-eslint supports the 7.1 API (and `eslint-plugin-unused-imports` follows) | Drop the `typescript` → `@typescript/typescript6` alias; make `typescript` the native compiler |
| No longer on nightlies | Remove `typescript` and `@typescript/*` from `minimumReleaseAgeExclude` |
| All of the above | Delete this file and the `CLAUDE.md` typechecking note that refers to it |
