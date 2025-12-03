import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../GameState";

import { getItemInPlayTimes } from "../../../model/times";
import { hashStringToNumber0to1 } from "../../../utils/maths/hashStringToNumber0to1";
import {
  addXyz,
  originXyz,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { addItemFromJsonToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { updateItemPosition } from "./updateItemPosition";

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

  // need the bounding box from before it was multiplied 'times' was applied.
  // simple division doesn't work here because the multiplied takes into account
  // gaps between items
  const touchedItemHalfAabb = scaleXyz(
    boundingBoxForItem(touchedItem).aabb,
    0.5,
  );

  // Create bubbles for each segment (will be just one bubble for regular items)
  for (let x = 0; x < times.x; x++) {
    for (let y = 0; y < times.y; y++) {
      for (let z = 0; z < times.z; z++) {
        // this must be deterministic for room snapshots, since the starting animation frame
        // of the bubbles is calculated based off this:
        const partUniqueId = `${touchedItem.id}/${x},${y},${z}`;
        const bubblesItem = addItemFromJsonToRoom({
          itemType: "bubbles",
          config: {
            style: "white",
            was,
          },
          // give any placeholder position during loading:
          position: originXyz,
          room,
          gameState,
          additionalIdPart: partUniqueId,
        });

        // Calculate position for this segment's bubble
        const segmentOffset = {
          x: x * blockSizePx.x,
          y: y * blockSizePx.y,
          z: z * blockSizePx.z,
        };

        // Position bubble at the center of this segment
        const segmentCentre = addXyz(
          touchedItem.state.position,
          segmentOffset,
          touchedItemHalfAabb,
        );

        // and then give the true position:
        updateItemPosition(
          room,
          bubblesItem,
          subXyz(
            segmentCentre,
            // TODO: use subXyzInPlace once it is merged
            scaleXyz(bubblesItem.aabb, 0.5),
          ),
        );

        // number in range 0.75...1.25
        const pseudoRandomFactor =
          hashStringToNumber0to1(partUniqueId) * 0.5 + 0.75;

        // remove bubbles after a time with random variation
        bubblesItem.state.expires =
          room.roomTime +
          // fade out after a pseudo-random, deterministic (hashed) duration:
          fadeInOrOutDuration * pseudoRandomFactor;
      }
    }
  }
};
