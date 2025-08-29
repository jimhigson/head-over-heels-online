import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../GameState";

import { getItemInPlayTimes } from "../../../model/times";
import { blockSizeXyzPx } from "../../../sprites/spritePivots";
import { randomBetween } from "../../../utils/random/randomFromArray";
import {
  addXyz,
  originXyz,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { addItemFromJsonToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";

/**
 * remove an item (with bubbles)
 */
export const makeItemFadeOut = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem,
  room,
  gameState,
}: {
  touchedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  room: RoomState<RoomId, RoomItemId>;
  gameState: GameState<RoomId>;
}) => {
  deleteItemFromRoom({ room, item: touchedItem });

  // Get the times for this item (will be unitXyz for items without times)
  const times = getItemInPlayTimes(touchedItem);

  // Determine what the bubbles represent (same for all segments)
  const was =
    touchedItem.type === "pickup" ?
      { type: "pickup" as const, gives: touchedItem.config.gives }
    : touchedItem.type === "hushPuppy" ? { type: "hushPuppy" as const }
    : { type: "disappearing" as const };

  const touchedItemHalfAabb = scaleXyz(touchedItem.aabb, 0.5);

  // Create bubbles for each segment (will be just one bubble for regular items)
  for (let x = 0; x < times.x; x++) {
    for (let y = 0; y < times.y; y++) {
      for (let z = 0; z < times.z; z++) {
        const bubblesItem = addItemFromJsonToRoom({
          itemType: "bubbles",
          config: {
            style: "white",
            was,
          },
          // give any placeholder position:
          position: originXyz,
          room,
          gameState,
        });

        // Calculate position for this segment's bubble
        const segmentOffset = {
          x: x * blockSizeXyzPx.x,
          y: y * blockSizeXyzPx.y,
          z: z * blockSizeXyzPx.z,
        };

        // Position bubble at the center of this segment
        const segmentCentre = addXyz(
          touchedItem.state.position,
          segmentOffset,
          touchedItemHalfAabb,
        );

        // TODO: use subXyzInPlace once it is merged
        bubblesItem.state.position = subXyz(
          segmentCentre,
          scaleXyz(bubblesItem.aabb, 0.5),
        );

        // remove bubbles after a time with random variation
        bubblesItem.state.expires =
          room.roomTime + fadeInOrOutDuration * randomBetween(0.5, 1.5);
      }
    }
  }
};
