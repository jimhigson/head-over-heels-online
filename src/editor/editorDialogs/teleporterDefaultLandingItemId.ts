import { resolveTeleporterLanding } from "../../model/json/resolveTeleporterLanding";
import { iterateRoomJsonItemIds } from "../../model/RoomJsonItemIterators";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../editorTypes";

/**
 * the item teleporters land on in a room when they name none - as the game
 * resolves it for each of them. Undefined unless they all land on the same
 * item, so an item has to be named
 */
export const teleporterDefaultLandingItemId = (
  destinationRoomId: EditorRoomId,
  destinationRoomJson: EditorRoomJson,
  /**
   * the room the teleporters being set are in
   */
  fromRoomId: EditorRoomId,
  /**
   * the teleporters whose destination is being set
   */
  settingTeleporterIds: readonly EditorRoomItemId[],
): EditorRoomItemId | undefined => {
  const destinationTeleporterIds = iterateRoomJsonItemIds(
    destinationRoomJson.items,
    "teleporter",
    "portableTeleporter",
  ).toArray();
  const isDestinationItemId = (itemId: string): itemId is EditorRoomItemId =>
    itemId in destinationRoomJson.items;
  const isInDestination = fromRoomId === destinationRoomId;

  const [firstLanding, ...otherLandings] = (
    settingTeleporterIds.length === 0 ?
      [undefined]
    : settingTeleporterIds).map((settingTeleporterId) =>
    resolveTeleporterLanding(
      // naming no item, so the default is resolved:
      {},
      destinationTeleporterIds,
      isDestinationItemId,
      isInDestination ? settingTeleporterId : undefined,
    ),
  );
  if (firstLanding.type !== "item") {
    return undefined;
  }
  const { itemId } = firstLanding;
  return (
      otherLandings.every(
        (landing) => landing.type === "item" && landing.itemId === itemId,
      )
    ) ?
      itemId
    : undefined;
};
