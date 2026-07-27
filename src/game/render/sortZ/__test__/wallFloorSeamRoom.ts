import { type Campaign } from "../../../../model/modelTypes";
import { inferRoomJson, type RoomJson } from "../../../../model/RoomJson";

/**
 * the smallest room that isolates the wall/floor seam: a plain floor, a single
 * "away" wall sitting along its far edge, and one playable so the game boots.
 * Nothing else - so the draw-order graph is tiny (floor, wall, head) and a
 * camera-rotation sweep shows ONLY the thin line where the wall's base meets
 * the floor's edge, the draw-order decision we want to pin (floor vs the wall
 * it abuts, decided by the ADJACENT/seam branch of the z-comparator at the
 * continuous transition angle).
 *
 * Used by both the sortZ graph unit tests (which validate the whole graph) and
 * the cameraRotationSweep e2e (which renders it).
 */
export const wallFloorSeamRoom = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "wallFloorSeamRoom",
  planet: "moonbase",
  items: {
    floor: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    // one wall along the far (away) edge; its base is the seam with the floor:
    wallAway: {
      config: {
        direction: "away",
        tiles: ["coil", "coil", "coil", "coil", "coil", "coil"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    head: {
      config: { which: "head" },
      position: { x: 2, y: 2, z: 0 },
      type: "player",
    },
  },
}) satisfies RoomJson<"wallFloorSeamRoom", string, "moonbase">;

/**
 * a single-room campaign wrapping {@link wallFloorSeamRoom}, for encoding into
 * a playtest-style `data:` campaign URL in the e2e sweep
 */
export const wallFloorSeamRoomCampaign: Campaign<"wallFloorSeamRoom"> = {
  locator: {
    campaignName: "wall-floor-seam-room",
    userId: "e2e",
    version: -1,
  },
  rooms: { wallFloorSeamRoom },
};
