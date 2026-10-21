import { canonicalize } from "json-canonicalize";

import { getConsolidatableVector } from "../../consolidateItems/ConsolidatableJsonItem";
import { isRoomStructureItemType } from "../../model/json/isRoomStructureItemType";
import { getJsonItemTimes } from "../../model/times";
import { addXyz, scaleXyz, type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { directionAxis } from "../toolbar/buttons/nudgeDirections";

/**
 * multiplying adds to the selection's leading edge, shrinking takes away
 * its trailing edge
 */
export type MultiplyType = "multiply" | "shrink";

/**
 * how multiplying (or shrinking) the selection in a direction changes each
 * selected item
 */
export type MultiplyPlan = {
  /**
   * items that take `times` along the axis, so grow or shrink
   */
  resizedItemIds: EditorRoomItemId[];
  /**
   * items that get a copy one block along in the direction
   */
  copiedItemIds: EditorRoomItemId[];
  /**
   * copies at the selection's trailing edge, removed by shrinking
   */
  deletedItemIds: EditorRoomItemId[];
};

/**
 * the room's structure and the players can't be copied - a room has only
 * one of each player
 */
const isCopyable = (item: EditorJsonItemUnion) =>
  !isRoomStructureItemType(item.type) && item.type !== "player";

const isResizableAlong = (item: EditorJsonItemUnion, direction: Xyz): boolean =>
  getConsolidatableVector(item)[directionAxis(direction)] !== 0;

const positionKey = ({ x, y, z }: Xyz) => `${x},${y},${z}`;

const identityKey = ({ type, config }: EditorJsonItemUnion) =>
  canonicalize({ type, config });

const selectedItemsOf = (
  roomJson: EditorRoomJson,
  selectedJsonItemIds: EditorRoomItemId[],
) =>
  selectedJsonItemIds
    .map((id): [EditorRoomItemId, EditorJsonItemUnion | undefined] => [
      id,
      roomJson.items[id],
    ])
    .filter(
      (entry): entry is [EditorRoomItemId, EditorJsonItemUnion] =>
        entry[1] !== undefined,
    );

/**
 * whether every selected item can be multiplied in the direction - resized
 * along it, or copied
 */
export const canMultiplyAlong = (
  roomJson: EditorRoomJson,
  selectedJsonItemIds: EditorRoomItemId[],
  direction: Xyz,
): boolean => {
  const selectedItems = selectedItemsOf(roomJson, selectedJsonItemIds);
  return (
    selectedItems.length > 0 &&
    selectedItems.every(
      ([, item]) => isResizableAlong(item, direction) || isCopyable(item),
    )
  );
};

/**
 * what multiplying or shrinking the selection one block in a world direction
 * does to each selected item. Items resizable along the direction's axis are
 * resized; others are copied, but only at the selection's leading edge -
 * where no identical selected item is already one block ahead - and are only
 * deleted at its trailing edge, where one is ahead but none behind, so a line
 * of copies never shrinks to nothing
 */
export const multiplyPlan = (
  roomJson: EditorRoomJson,
  selectedJsonItemIds: EditorRoomItemId[],
  /**
   * a world unit vector
   */
  direction: Xyz,
  multiplyType: MultiplyType,
): MultiplyPlan => {
  const selectedItems = selectedItemsOf(roomJson, selectedJsonItemIds);
  const axis = directionAxis(direction);

  const selectedIdentityByPosition = new Map(
    selectedItems.map(([, item]) => [
      positionKey(item.position),
      identityKey(item),
    ]),
  );
  const hasIdenticalSelectedItemAt = (item: EditorJsonItemUnion, offset: Xyz) =>
    selectedIdentityByPosition.get(
      positionKey(addXyz(item.position, offset)),
    ) === identityKey(item);
  const behind = scaleXyz(direction, -1);

  const resizable = selectedItems.filter(([, item]) =>
    isResizableAlong(item, direction),
  );
  const copyable = selectedItems.filter(
    ([, item]) => !isResizableAlong(item, direction) && isCopyable(item),
  );

  return multiplyType === "multiply" ?
      {
        resizedItemIds: resizable.map(([id]) => id),
        copiedItemIds: copyable
          .filter(([, item]) => !hasIdenticalSelectedItemAt(item, direction))
          .map(([id]) => id),
        deletedItemIds: [],
      }
    : {
        resizedItemIds: resizable
          .filter(([, item]) => getJsonItemTimes(item)[axis] > 1)
          .map(([id]) => id),
        copiedItemIds: [],
        deletedItemIds: copyable
          // the trailing end of a line of copies, but never a lone item:
          .filter(
            ([, item]) =>
              hasIdenticalSelectedItemAt(item, direction) &&
              !hasIdenticalSelectedItemAt(item, behind),
          )
          .map(([id]) => id),
      };
};
