import { itemBehaviourKey, type ItemInPlay } from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { type JsonItem } from "../../../model/json/JsonItem";
import { type RoomState } from "../../../model/RoomState";
import { getItemInPlayTimes } from "../../../model/times";
import {
  hashStringToNumber0to1,
  hashXyzToNumber0to1,
} from "../../../utils/maths/hashing";
import {
  addXyz,
  boxWithSize,
  originXyz,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { defaultBaseState } from "../loadRoom/itemDefaultStates";
import { positionCentredInBlock } from "../loadRoom/positionCentredInBlock";
import { addItemToRoom } from "./addItemToRoom";
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
}: {
  touchedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  room: RoomState<RoomId, RoomItemId>;
}) => {
  deleteItemFromRoom({ room, item: touchedItem });

  // Get the times for this item (will be unitXyz for items without times)
  const times = getItemInPlayTimes(touchedItem);

  // Determine what the bubbles represent (same for all segments)
  const was =
    touchedItem.type === "pickup" ?
      { type: "pickup" as const, gives: touchedItem.config.gives }
    : touchedItem.type === "hushPuppy" ? { type: "hushPuppy" as const }
    : touchedItem.type === "firedDoughnut" ? { type: "firedDoughnut" as const }
    : { type: "disappearing" as const };

  const bubblesJson: JsonItem<"bubbles", RoomId, RoomItemId> = {
    type: "bubbles",
    config: { style: "white", was },
    position: originXyz,
  };
  const bubblesAabb = boundingBoxForItem(bubblesJson);
  // bubbles animate from the hash of the box they would load with at the origin:
  const bubblesHash = hashXyzToNumber0to1(
    boxWithSize(positionCentredInBlock(bubblesJson), bubblesAabb),
  );

  // need the bounding box from before it was multiplied 'times' was applied.
  // simple division doesn't work here because the multiplied takes into account
  // gaps between items
  const touchedItemHalfAabb = scaleXyz(boundingBoxForItem(touchedItem), 0.5);

  // Create bubbles for each segment (will be just one bubble for regular items)
  for (let x = 0; x < times.x; x++) {
    for (let y = 0; y < times.y; y++) {
      for (let z = 0; z < times.z; z++) {
        // this must be deterministic for room snapshots:
        const partUniqueId = `${touchedItem.id}/${x},${y},${z}`;
        const bubblesId = `bubbles/${partUniqueId}` as RoomItemId;

        // Calculate position for this segment's bubble
        const segmentOffset = {
          x: x * blockSizePx.x,
          y: y * blockSizePx.y,
          z: z * blockSizePx.z,
        };

        // Position bubble at the center of this segment
        const segmentCentre = addXyz(
          touchedItem.state.box,
          segmentOffset,
          touchedItemHalfAabb,
        );

        // number in range 0.75...1.25
        const pseudoRandomFactor =
          hashStringToNumber0to1(partUniqueId) * 0.5 + 0.75;

        const bubblesItem: ItemInPlay<"bubbles", RoomId, RoomItemId> = {
          type: "bubbles",
          hash: bubblesHash,
          id: bubblesId,
          jsonItemId: bubblesId,
          config: bubblesJson.config,
          [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
            "bubbles",
            bubblesJson.config,
          ),
          state: {
            ...defaultBaseState(),
            box: boxWithSize(
              subXyz(segmentCentre, scaleXyz(bubblesAabb, 0.5)),
              bubblesAabb,
            ),
            // remove bubbles after a time with random variation
            expires:
              room.roomTime +
              // fade out after a pseudo-random, deterministic (hashed) duration:
              fadeInOrOutDuration * pseudoRandomFactor,
          },
        };

        addItemToRoom({ room, item: bubblesItem });
      }
    }
  }
};
