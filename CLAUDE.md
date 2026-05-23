# Me
My name is Jim Higson and my tag on github is jimhigson

### Project Summary: Isometric Game Engine (PixiJS v8, Preact 11)
 *	Framework & Version: Built using PixiJS v8 with modern WebGL2 features.
 *	Graphics:
 *	Uses classic isometric projection with a 2:1 pixel ratio.
 * although using 2d sprites for rendering, the game takes place in a 3d coordinate space, with x and y defining width and depth, and z being height
 *	Sprites are mostly 24×24 pixels, although some are larger such as wall tiles and larger blocks, using two colours plus transparent background.
 *	The world origin (0,0,0) is at the bottom-front corner from the player’s view.
 *	Xyz vectors are used for all 3D positions, with Xy used for 2D screen-space.
 * the game runs at a variable frame rate - anything from 30fps to 240fps is possible

## Level Format:
 *	Game levels are stored as JSON files.
 *	Each level’s items field is an object (not array) mapping IDs to item data.
 *	All items have a type, position: Xyz, and config.
 *	Walls may have a times property (x/y) for repetition/length.
 * rooms for the original game are converted from xml to json via scripts in the src/campaignXml2Json dir
 * x and y co-ordinates are on the horizontal plane. The z dimension represents height/altitude in the game

## Room json patches
* the conversion from xml is often patched to change things from the original game using jsondiff
* if editing original campaign rooms, regenerate the patches with `pnpm gen:roomsPatch` 

## Item config
* per-item-type config comes from ItemConfigMap
* after making changes to config, run gen:roomSchema so the jsonschema used by the editor is also updated, then check that the result looks ok
* optional new properties mean that old rooms created in the editor will still comply
## item State
* the item state is the values in an item that can change during gameplay
* new properties in state should usually be optional, or at least the code should work if they are omitted, so that old save games still work

## Campaigns:
* the player can play the original campaign, a sequel, or
a community-contributed campagin made using the level editor
* the original campaign is 'burnt' into the game's source via codegen
* all other campaigns are loaded from the db via supabase's codegen
* all are loaded dynamically - either using the db or using import
* therefore, only the original campaign is playable offline
* the original campagin is converted from xml using the script at src/campaignXml2Json/scripts/xml2json.ts

## Preact / React

The runtime is Preact 11 (beta), but the codebase retains React import paths and type definitions:

* `@preact/preset-vite` aliases `react` → `preact/compat` and `react-dom` → `preact/compat` at build time, so `import { useState } from "react"` resolves to Preact at runtime
* Type-only imports (`import type { ReactNode } from "react"`) use `@types/react` v19 for type-checking — this is intentional, not a migration leftover
* Hooks should be imported from `preact/hooks` (e.g. `import { useEffect } from "preact/hooks"`), not from `"react"`
* Entry points use `import { render } from "preact"` directly
* Third-party React libraries (`react-redux`, `@floating-ui/react`, `@monaco-editor/react`, etc.) work through the compat layer
* No Preact-specific APIs like signals are used

## Rendering:
 *	Layers use Pixi’s RenderLayer, specifically to emulate colour clash of the zx spectrum

## Game engine
### Iterating room items
When iterating over `RoomStateItems` (the `room.items` object), use the typed helpers from `src/model/RoomState.ts` instead of `objectValues()` directly:
- `roomItemsIterable(roomItems)` - returns a raw `IterableIterator` with correct item types, for `for...of` loops or passing to constructors like `new Map()`
- `iterateRoomItems(roomItems)` - wraps in `iterate()` to provide iterator helper methods (`.map()`, `.filter()`, etc.)
- `iterateRoomItemEntries(roomItems)` - when you need both the item id and item value as `[id, item]` tuples

```ts
// Good - proper type inference
for (const item of roomItemsIterable(room.items)) {
  item.state.position; // correctly typed
}

// Good - with iterator helpers
iterateRoomItems(room.items).filter(isFreeItem).map(i => i.state.position);

// Bad - loses type information
for (const item of objectValues(room.items)) { ... }
```

Similarly, when iterating over `RoomJsonItems` (editor/JSON room items), use the helpers from `src/model/RoomJson.ts`:
- `roomJsonItemsIterable(roomJson)` - takes the whole `RoomJson` object, returns `IterableIterator` of items (no ids)
- `roomJsonItemsEntriesIterable(roomJson.items)` - returns `[id, item]` tuples
- `iterateRoomJsonItemsWithIds(roomJson.items, ...types?)` - returns iterator helper with `[id, item]` tuples, optionally filtered by item type

Prefer `roomJsonItemsIterable` when you only need items without ids. Use `iterateRoomJsonItemsWithIds` when you need the id or want built-in type filtering.

## Editor Features:
 * there is a level editor also built for creating new rooms for the game
 * this is for creating new non-original levels which are specific to the remake
 *	A level editor supports door placement which removes or splits walls where the door appears.

### Schema
 * the editor's json editor is monaco and there is a json schema generated from typescript types by running `pnpm gen:roomSchema`
 * the purpose of the schema is to provide auto-complete and correctness constraints in the editor
 * this first flattens (`flattenType.ts`) the typescript types to a simpler representation
 * it then converts from the flat/simpler types to a json schema

### Generated types
 * all _generated dirs are codegen'd - never edit them directly
 * files in `src/_generated/types/` (e.g. `ItemInPlayUnion.ts`) are regenerated via `pnpm gen:types`
 * if you add or change item types in `src/model/ItemInPlay.ts`, run `pnpm gen:types` to regenerate


## Git

* Don't switch to main first when creating a new branch, do `git fetch && git switch -c (new branch) origin/main`
* For tasks assigned that include making a branch, completing a task on it, always use a worktree 
* before writing commit messages check the release-please schema; then write a single-line only commit message
* always make PRs with `gh pr create -f` -ie, don't put a title or description body, let 'gh' use the commit
* always compare, or branch from `origin/main`, not `main`; `git fetch` first where appropriate

## Style & Tooling:
 * do not make barrel files inside a package. Within a package, import directly from the file that declares the property you want. The single exception: each package's top-level `src/index.ts` serves as the package's public API and must re-export every symbol the package exposes externally, so the barrel doubles as an explicit list of the package's public surface. Cross-package imports always go through the barrel (eg `import { RoomJson } from "@blockstacking/hoh-common"`, never via deep paths).
 * inline calls to hooks so long as they don't cause conditional calling or otherwise break the rules of hooks
 * extract a custom hook for any nameable piece of logic that groups multiple base hooks together (eg a `useMemo` + `useSelector` that computes a derived value). The hook name documents the intent.
 * instead of `<Fragment>`, write the shorthand `<>` instead where possible
 * do not use bare `PropsWithChildren` — its default type param is `unknown`, which silently widens props. If a component takes no props beyond `children`, write `PropsWithChildren<EmptyObject>` (importing `EmptyObject` from `type-fest`). Otherwise pass the actual props type as the generic.
 * extract a named props type for components rather than writing the shape inline at the destructure site. Name it `<ComponentName>Props` and export it. Eg `type FooProps = { ... }; export const Foo = ({ x }: FooProps) => ...` — not `export const Foo = ({ x }: { x: number }) => ...`.
 * do not add an import, save, and then later add code  that uses it. The linter will remove the imports.
 * do not add comments that only explain things that are obvious from the line they are documenting. For example, do not do this - these comments are redundant - I would rather no docs than this useless docs:
 ```ts
 // load the file
 loadFile('path);
 ```
 ```ts
   /**
   * Sets the block size
   */
  set blockSize(value: number) {
```
 * when using regex, use named captures where it makes the intent clearer (over array indexes in the match object)
 * use double-quotes for js strings unless templates or strings containing double quotes
 * use arrow functions when defining new functions, other than where this isn't possible, for example when making generators
 * do not write IIFEs (immediately-invoked function expressions) to scope-gate a computation. Prefer extracting a named helper function (usually at module scope) that you call conditionally — this avoids both the IIFE ceremony and the need for a `let`, keeping the call site a single `const`. Use `if` + `let` only when extraction is impractical.
 * work is not complete until `pnpm check` passes. Make this pass before calling work done.
 *	Written in TypeScript using modern features (destructuring, `for...of`, not `.forEach()` etc.).
 * when extracting values from arrays, use multiple levels of destructuring if possible. Eg:
 ```ts
 const [[, wall]] = result;
 ```
 *  when destructuring arrays, if you don't need some of the first elements, use a hole in the array. eg: `const [,foo] = array;` not `const [_ignored, foo] = array;` 
 * also, use destructuring even if just getting the first element: `const [foo] = array` not `const foo = array[0]`
 *  All typescript types should appear with an initial capital letter
 *	Project uses pnpm and Node.js 23.
 *	Prettier-style formatting, with the experimental 'curious ternary' option enabled.
 *  do not run code through prettier or linting etc after editing - assume the work is a work in progress
 *	Code avoids legacy constructs and uses satisfies never for exhaustive switches.
 *  when writing a ts source, either as a script or in the game or editor, run it through eslint and prettier to fix linting and formatting issues. Use the --fix or --write options as appropriate so that these tools can fix the source
 * do not use `import *` - instead, import the individual parts of the package that you need.
 * for private methods of classes, use this.#foo, not `private foo` as per modern js. However, if it is a constructor param, using `(private foo)` is preferable as it removes the need for a separate assignment statement
 * if making a switch/case that is intended to be exaustive, use `default: xxx satisfies never` so that ts confirms this.
 * write jsdoc, but instead of @param, put `/** */` comments before the parameters themselves, like this:
 ```ts
 export const foo = (
    /** 
     * x is a number 
     */ 
    x: number
) => { /* ... */ };
 ```
 * name all files after their most important export, including matching the case. For example, a file that exports a 
 class called `Grid` should be called `Grid.ts`. Or a component called `MyComponent` would be in `MyComponent.tsx`. A function called `foo` would be in `foo.ts`.
 * do not use very generic variable names such as `data`
 * Do not use `any` unless completely necessary. Cast to a type that better describes what we know about the data - it is very rare to have a variable that can genuinely have any value.
 * when writing generic types with defaults, avoid `= string` as a default — prefer forcing call sites to be explicit about the type parameter so tagged/branded types aren't accidentally widened
 * write typescript type assertions to narrow down types where useful and necessary
 * for `key in obj` narrowing, extract a type predicate function rather than casting after the check:
 ```ts
 const isFoo = (key: string): key is FooKey => key in fooMap;
 ```
 * use `as const satisfies` for lookup objects to get both narrow literal types and compile-time key validation:
 ```ts
 const map = { ArrowLeft: "left", ArrowRight: "right" } as const satisfies { [K in Key]?: Direction };
 ```
 * never write comments that say something like `/* this now does foo */` because this assumes the reader has familiarity with previous versions of the code, which are invisible to them unless they look in git history. All descriptions should be of the current version, as it is now, not in reference to previous versions.

* use iterator helper methods, and don't turn iterators into arrays using `[...iter]` unless really necessary; for example, use the helper methods to call `.map` or `.filter` directly on the iter. Only write to an array if we need to pass to an api that requires one, or we need to refer to the collection more than once. In this case, use `.toArray()` to convert it.

* when working with object entries or keys, use the custom `entries()` and `keys()` functions from `src/utils/entries` instead of `Object.entries()` or `Object.keys()`. These preserve type information, avoiding the need for type casts:
 ```ts
 // Good - types are preserved
 for (const [key, value] of entries(myRecord)) {
   const foo = someObject[key]; // key has the correct type
 }

 // Bad - requires type cast
 for (const [key, value] of Object.entries(myRecord)) {
   const foo = someObject[key as MyKeyType]; // need to cast
 }

 // Good - key type is preserved
 const validKeys = keys(myRecord); // returns MyKeyType[]

 // Bad - returns string[]
 const validKeys = Object.keys(myRecord); // need to cast to MyKeyType[]
 ```
 Similarly, prefer `valuesIter()` over `Object.values()` — it returns an iterator that short-circuits with `.find()` or `.some()` without allocating an intermediate array.

* this is a project based in the uk. Use British English only, even if variables are named differently to library functions
with names in US English.

* if a value's typescript type is not nullable, do not add checks for it being null/undefined, even explicit checks like using `?.`
if unsure if the type is nullable, assume that it is not nullable (or undefinable) and let the typecheck inform you later

* Do not use any in typescript. IF you are copying the parameters of another function, use Parameters<typeof func> 
instead of `any`

* never use comments or tests names such as "works as before" - the reader some time from now will now know the history of how
things used to work. Describe always the current state of how things work, not the state in relation to some forgotten past state.

* when adding effects, or any other hook with a dependency array, include all dependencies the eslint exhaustive-deps rule would include, even
if we know the value never changes

* Never use SCREAMING_SNAKE_CASE for consts, use camelCase always

* write numbers with separators for thousands. Ie, write 1_000, not 1000.

* when asked to write a type for something, check if there already exists a well-defined type in the codebase for that thing, then import it and use it if it exists. Don't just write an inline copy of the value as a type. This is repetitive and adds no actual checking.

* for string values, do not write `"foo" as const` - if this is required to apply narrowing, it is more intentional to write `"foo" as "foo"`

* any time catching an rethrowing an error, do like this:

```
catch(e) {
throw new Error(
     // do not include e.message in the created error's message:
      `Some error message`,
      // use cause instead:
      { cause: e },
    );
}
```    

* all modules with side-effects MUST be listed in package.json, otherwise the bundler will assume they are pure

 ## Tests
 When writing unit tests, do not put a top-level `describe` at the top of the file that wraps all tests. This is redundant since the test runner will give the test suite name anyway.

 Prefer one `expect` per test, except for where this would create a large amount of duplication of set-up code for the test

 Do not run tests, lint etc for small changes - these will often be conversational and incremental and it slows us down too much

 Do not use tests to document code that is probably wrong - it is
 better to have a failing test than to make tests pass by making the tests model broken behaviour in code

 In Vitest, include types where possible. Eg:

 ```ts
 expect<Foo>({}).toEqual<Bar>({})
 ```

 * use `test.for` instead of `test.each` 

 ### End to end (playwright)

 * before running, do `pnpm build:game` or else it'll run against old build, unless sure nothing has been edited since the last run - if unsure, assume edits.

 * run playwright using `pnpm playwright test` etc

## Vite
* There are two vite configs - for the editor and the game.
* the editor vite starts in a different dir, as given by the package.json file

## Running

Before running any commands, ensure you have the correct node version by running `eval "$(fnm env)" && fnm use`.

Maintain familiarity with the scripts in package.json. Call these with `pnpm` where possible, in preference to running scripts directly.

Use `pnpm fix` to auto-fix linting and formatting errors (runs both eslint --fix and prettier --write).

No not use `npx`, use `pnpm`. Do not call `pnpm vitest` directly, call `pnpm check:test` instead, and similar commands for typechecking and other commands that need to be called - if a script exists in package.json to do the test at hand, prefer that unless it comes with major drawbacks.

## Visual Regression Testing

* Playwright visual regression tests run against production builds (`pnpm build:game && pnpm preview:game`) for stability
* Screenshots are not tagged with OS platform names because all rendering is canvas-based (WebGL)
* We assume canvas rendering is identical across platforms - this is the current working assumption
* Tests run on macOS locally and Linux on GitHub Actions (to save Actions budget)
* If platform differences emerge, we'll need to revisit this approach, but for now we expect pixel-perfect matches

## typechecking
* use tsgo `as pnpm tsgo`

## Attitude

* If I make mistakes, or I suggest something that sounds incorrect, for example, I give a reason for something
failing that seems unlikely, please point this out frankly rather than trying to be too agreeable.

* Do not make edits unless I ask for them. For example, if I say "read and understand file x", do not produce edits that you think might result from understanding this file. Even if I do not give an action other than editing the code, do not edit the code without explicit instruction from me.

* when debugging, do not continue until I have described the problem in enough detail to understand.
* when debugging, use `console.log` - it is ok that this gives linter warnings while debugging - that's the point of them so we must remove logging before finishing our debugging session
* if we must add console.log, but the linting complains, there's no good reason to change to console.error, console.warn etc just to avoid the linting - this is following the letter but not the rule of the restrictions. It is ok to leave that linting error for me to fix.

* if you find code has changed that you did not expect, assume I have edited the file on purpose and do not revert my edits back to what you wrote last time. Exception is for code I obviously wouldn't edit such as generated files. Infer my intention from my edits; do not frustrate this intention.

* Do not celebrate writing code by saying things like "Perfect!" until we have confirmed that the code is correct and satisfactory. Everything you write is provisional and not finished unless I say so.

* Do not claim to have fixed something or say something like "this works now" if you cannot possibly know that it has worked. Ie, if you can't see the visual output of a browser, do not claim that an image is "perfect" - this is annoying and untrue. Say only what you can actually verify.

* do not assume questions are statements of value. If I say 'why are you doing x', do not assume I'm saying that x is a poor choice, simply and only answer what was asked.

* NEVER do work in response to a question, this is ALWAYS a request for a response, NEVER a request to do work. NEVER do work in this case, even if it sounds like it could be a request. If a message contains both an instruction and a question, NEVER do work, this is to be taken as a question overall.

* Do NOT treat statements of fact from the use as requests to do something unless they are unambiguously asking for work to be done

* When suggesting new code, give files and line numbers, ie don't say "call the new function x", say "call new function x at (callsite)"

* Do not remove comments in code you refactor, unless the comment is no longer applicable

* DO NOT offer temporary solutions such as "for now". Do not tell the user work they are interested in is not part of the current PR. It is the agent's job to help the user, not decide what they should work on.

## Sources

* Give sources as URLs for all claims such as "this api does this" whenever possible
* when looking up docs from the web, give the url you found and quote the exact text you found that is relevant

# Using Pixi
* Do not tell me what pixi v7 would do. I know it is still quite popular, but I don't use it so it is irrelevant. Also, be careful not to write code for v7, bearing in mind that you may have seen a lot of examples that use v7 and earlier since it is still quite popular
* When reading pixi docs, check that the docs relate to v8.x and ignore if they are for an earlier version. On pixijs.com you can often tell by looking at the URL

# html layout
* the whole html part of the layout engine is for menus and dialogs. These are scaled dynamically
using css variable --scale, which scales everything up or down. The reason for this is to maintain
a retro upscaled blocky look even on high resolution screens. The other important variable is 
--block, which is an 8px size but scaled using --scale.

# github
for all interactions with github, use the `gh` command

# git worktrees
Always create new worktrees under `/Users/jim/dev/hohjs.worktrees/<branch-name>`
(eg `git worktree add /Users/jim/dev/hohjs.worktrees/my-feature my-feature`).
That parent directory is in Claude's `additionalDirectories`, so any worktree
created beneath it is accessible without prompting for permission.

# Agents

- if you are Claude Opus 4.7 remind me to switch using `claude --model claude-opus-4-6[1m]` as soon as you read this
- never write "Co-Authored-By: Claude Opus 4.6..." or anything similar in commit messages or anywhere else

## Comms

- only edit on messages from me that end in "E". If there is no "E" at the end do zero edits
- if implementing a plan, no non-planned edits without discussing first