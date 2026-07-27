import { type Campaign } from "../../../../model/modelTypes";
import { inferRoomJson, type RoomJson } from "../../../../model/RoomJson";

/**
 * a room whose draw-order cycles come and go at MID-TRANSITION angles, built
 * to expose faults in any masking scheme that freezes cycle decisions to the
 * quarter angles. Two independent trios, each a tower (non-warp: excluded
 * from the cuboid mesh, so its mid-turn carves can only come from the art
 * masking path) interlocked with an organic column and an artificial row:
 *
 * - trio A (away-left): its cycle towerA→rowA exists ONLY at θ ≈ 25°..37.5° -
 *   at neither bounding quarter. A masking graph frozen at the quarters never
 *   carves towerA, so it stamps uncarved over rowA through that band.
 * - trio B (towards-right): its cycle towerB→rowB exists settled at 0° but
 *   dissolves at θ ≈ 26.5°. A frozen mask keeps carving towerB up to the 45°
 *   flip - a stale hole where rowB no longer overlaps.
 *
 * The exact bands are pinned by the unit test alongside; the
 * cameraRotationSweep e2e renders the room across them.
 *
 * Used by both the sortZ graph unit tests and the cameraRotationSweep e2e.
 */
export const quarterMaskFaultRoom = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "quarterMaskFaultRoom",
  planet: "moonbase",
  items: {
    floor: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },

    // trio A - the θ-only cycle (25°..44.5°):
    towerA: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    columnA: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    rowA: {
      config: { style: "artificial", times: { x: 3 } },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },

    // trio B - the settled cycle that dissolves at θ ≈ 24.5°:
    towerB: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    columnB: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    rowB: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },

    head: {
      config: { which: "head" },
      position: { x: 0, y: 0, z: 0 },
      type: "player",
    },
  },
}) satisfies RoomJson<"quarterMaskFaultRoom", string, "moonbase">;

/**
 * a single-room campaign wrapping {@link quarterMaskFaultRoom}, for encoding
 * into a playtest-style `data:` campaign URL in the e2e sweep
 */
export const quarterMaskFaultRoomCampaign: Campaign<"quarterMaskFaultRoom"> = {
  locator: {
    campaignName: "quarter-mask-fault-room",
    userId: "e2e",
    version: -1,
  },
  rooms: { quarterMaskFaultRoom },
};
