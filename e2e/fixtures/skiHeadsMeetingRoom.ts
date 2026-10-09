import { type Campaign } from "../../src/model/modelTypes";
import { inferRoomJson, type RoomJson } from "../../src/model/RoomJson";

/**
 * two back-and-forth ski heads facing each other on adjacent squares, so they
 * collide and turn away from each other soon after the room starts - the
 * smallest room whose captures depend on monsters turning at the right moment
 */
export const skiHeadsMeetingRoom = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "skiHeadsMeetingRoom",
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
    skiHeadAway: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "away",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "monster",
    },
    skiHeadTowards: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "towards",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    head: {
      config: { which: "head" },
      position: { x: 0, y: 0, z: 0 },
      type: "player",
    },
  },
}) satisfies RoomJson<"skiHeadsMeetingRoom", string, "moonbase">;

/**
 * a single-room campaign wrapping {@link skiHeadsMeetingRoom}, for encoding
 * into a playtest-style `data:` campaign URL
 */
export const skiHeadsMeetingRoomCampaign: Campaign<"skiHeadsMeetingRoom"> = {
  locator: {
    campaignName: "ski-heads-meeting-room",
    userId: "e2e",
    version: -1,
  },
  rooms: { skiHeadsMeetingRoom },
};
