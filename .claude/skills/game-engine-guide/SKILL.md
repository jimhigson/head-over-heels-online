---
name: game-engine-guide
description: Game engine internals reference — vector in-place mutation safety policy, available vector utilities, item times/multiplied items, and moved-items tracking. Use when working on physics, item positioning, vector maths, or the main loop.
---

## Vector Operations and In-Place Mutations
 * **In-place vector functions** are available in `src/utils/vectors/vectors.ts` with `InPlace` suffix (e.g., `addXyzInPlace`, `scaleXyzInPlace`, `subXyzInPlace`, etc.)
 * **Safety policy for in-place operations**:
   - ONLY use in-place operations on vectors you just created in the same function/scope
   - NEVER modify `item.state.position` in-place - always create a new vector
   - Safe to use in-place on: freshly created temporary vectors, module-level constants at initialization, vectors created and immediately returned
   - When chaining operations: create with non-in-place function, then modify with in-place functions
   - In-place functions return the modified object, so they can be used inline: `return subXyzInPlace(productXyz(a, b), c)`
 * **Available in-place vector utilities**:
   - `addXyInPlace`, `subXyInPlace`, `scaleXyInPlace` - for 2D vectors
   - `addXyzInPlace`, `subXyzInPlace`, `scaleXyzInPlace` - for 3D vectors
   - `productXyzInPlace`, `elementWiseProductXyzInPlace` - element-wise multiplication
   - `roundXyzInPlace`, `roundXyzToXyHalvesInPlace`, `xyzSnapIfCloseToIntegersInPlace` - rounding operations
   - `absXyzInPlace`, `perpendicularXyzInPlace`, `unitVectorInPlace` - transformations
   - `componentInDirectionInPlace` - in `src/utils/vectors/componentInDirection.ts`
 * **Random number utilities** in `src/utils/random/randomFromArray.ts`:
   - `randomBetween(min, max)` - returns a random number between min and max (inclusive)
   - `randomFromArray(array)` - returns a random element from an array

## Item Times and Multiplied Items
 * Items can have a `times` property (Partial<Xyz>) that indicates repetition in 3D space
 * **Type-safe utilities for handling times**:
   - `getJsonItemTimes(item: JsonItemUnion): Xyz` - gets complete times from JSON items
   - `getItemInPlayTimes(item: UnionOfAllItemInPlayTypes): Xyz` - gets complete times from in-play items
   - `completeTimesXyz(times: Partial<Xyz>): Xyz` - fills in missing dimensions with 1
   - Both `getJsonItemTimes` and `getItemInPlayTimes` use internal type guards to avoid `any` types
 * Walls handle times specially based on their direction and tiles
 * When creating effects (like bubbles) for items with times, create one effect per segment

## Tracking moved items

* `progressGameState()` returns a `MovedItems` map (defined in `src/game/mainLoop/MovedItems.ts`) containing items whose position changed during the physics tick
* The map value is a `MovedAxes` bitmask (`1 | 2 | 3`): bit 1 = XY movement, bit 2 = Z movement
* Construction: positions are snapshotted before physics, then compared axis-by-axis using `computeMovedAxes()`
* The map is accumulated across sub-ticks by `progressWithSubTicks()` (ORing the axis bitmasks) and passed to renderers
* Key consumers:
  - `assignLatentMovementFromStandingOn()`: propagates delayed horizontal movement to items standing on moved items
  - `snapInactiveItemsToPixelGrid()`: snaps stationary items to integers (sets XY axis bit)
  - `updateZEdges()`: incrementally updates the z-sorting graph only for moved items (avoids O(n²) comparisons every frame)
  - `ItemPositionRenderer.tick()`: only recalculates screen position for items in the map
* Flow: `progressGameState` → `progressWithSubTicks` → `MainLoop.tick` → `RoomRenderer.tick` → item renderers
