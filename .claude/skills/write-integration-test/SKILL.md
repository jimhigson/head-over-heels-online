---
name: write-integration-test
description: "Read BEFORE writing or editing a vitest play-through integration test (`src/game/mainLoop/playThroughIntegrationTests/*Integration.test.ts`, or any test that sets up a room and plays the game through). Covers how these tests are shaped: scene setup, playing through in phases, detecting what happened, reading item and character state, frame rates, rendering alongside, and snapshotting. For tests that check sounds, also read write-sound-integration-test."
---

# Writing play-through integration tests

A play-through integration test sets up a room, plays the game through with the
real engine, and checks what happened. This skill is about the *shape* of such
a test. For the helpers themselves, read their source and doc comments in
`src/_testUtils/` - they are the reference. If a helper's source doesn't make
its use clear, improve its doc comments there.

Tests that check sounds build on everything here - see
**write-sound-integration-test** for what they add.

Worked examples are in `src/game/mainLoop/playThroughIntegrationTests/`.

## The rules

### Run the real engine
- Fake only what the test environment lacks (browser abilities, input). Never `vi.mock` a first-party module in an integration test.
- Drive input through the mock input tracker the harness provides.

### Set up each test inline
- Put the room's items straight into the scene-setup call in each test. Duplication between tests beats per-file option consts or per-file helpers.
- Prefer one test that tells a story in phases over several tests repeating the same setup.

### Play through in phases with `until`
- Each play-through runs `until` something happens in the room, then `expect` checks what should have followed. Don't `until` and `expect` the same thing - the `until` already proved it.
- Detect events from the room's own state (eg an item's recorded collisions, standing-on, a switch's setting), not by reverse-engineering where things will end up (eg computing a resting coordinate from block sizes).
- Use the ready-made `until` conditions in `src/_testUtils/playThroughUntilHelpers.ts`, and add new general ones there rather than writing them inline.
- Consecutive play-throughs carry on from where the last one finished - the game state holds everything physical.

### Read state through the typed helpers
- Read items, item state, and the playable characters' state with the typed helpers in `src/_testUtils/characterState.ts` (generic over the item type, plus shortcuts per character), not by digging into rooms by hand.
- Read through a helper every time - never keep an item (or its state) in a variable to read later. Items can be replaced or leave the room during play.

### Frame rates
- When the behaviour could depend on frame rate (anything timing- or physics-sensitive), run the test across `testFrameRates` with `test.for`, passing the frame rate to every play-through. Otherwise the default frame rate is fine.

### Rendering alongside the physics
- To tick renderers, use `playGameThrough`'s rendering form with a test render state - never tick renderers by hand in frame callbacks.
- Make one render state per test, and share it across every phase of that test, so the renderers carry on from where the last phase finished.

### Snapshots
- Snapshot only the outcome: strip what is fixed from loading or is bookkeeping, so the snapshot changes only when behaviour does (see `sanitiseRoomState` in `laboratoryRoom.test.ts`).
- Strip with the typed helpers (eg `omit`); if the types object, fix the types rather than routing around them.
