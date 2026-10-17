---
name: write-sound-integration-test
description: "Read BEFORE writing or editing a vitest integration test that checks the game's sounds (a `*WithSound…Integration.test.ts`, eg 'the scrape sound stops when a pushed block hits a wall'). Adds, on top of write-integration-test (load that first), what sound tests need: faked web audio, the room's sound rendered by the engine's own sound renderers, and checking what is audible. Also load when a sound bug needs reproducing in a test."
---

# Writing sound integration tests

**Read and follow write-integration-test first.** A sound integration test is
a play-through integration test, and everything there applies. This skill adds
only what sound needs on top.

The helpers are `src/_testUtils/sounds/*.ts` - read their source and doc
comments; they are the reference.

## What sound adds

### Web audio
- Web audio is a test implementation that keeps a real node graph, and `fetch` is stubbed - our loader, renderers and audio code all run for real.
- Start the file with `// @vitest-environment happy-dom`, which provides the `window` that web audio is installed on.

### The render state renders the room's sound
- The test render state renders the sound of every item in the room, with the sound renderers the engine itself would pick, as items come and go - so the test hears what the game would.
- It also advances audio time with game time, so scheduled starts, stops and fades take effect.

### Checking sounds
- After each phase, `expect` which sounds are playing, and whether each is a spot effect or a loop.
- When waiting for a sound to stop, play on for long enough for its fade-out - the sound test utils provide a duration for this.

### Isolation
- Load sounds in `beforeEach`, and reset sound state in `afterEach`, so nothing audible carries over between tests.
