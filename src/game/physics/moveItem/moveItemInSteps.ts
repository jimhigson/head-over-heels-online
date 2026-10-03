import {
  lengthXyz,
  scaleXyzWriteInto,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { moveItem, type MoveItemOptions } from "./moveItem";

/** the furthest any single step may move */
const maxStepLengthPx = 1;

const stepBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * incrementally move an item by posDelta in equal small steps (<= 1px), so obstructions
 * get pushed along the direction of travel, not popped out on a shorter sideways mtv
 */
export const moveItemInSteps = <
  RoomId extends string,
  RoomItemId extends string,
>({
  posDelta,
  ...moveItemOptions
}: MoveItemOptions<RoomId, RoomItemId>): void => {
  const stepCount = Math.ceil(lengthXyz(posDelta) / maxStepLengthPx);
  if (stepCount === 0) {
    return;
  }

  scaleXyzWriteInto(stepBuffer, posDelta, 1 / stepCount);
  const stepOptions: MoveItemOptions<RoomId, RoomItemId> = {
    ...moveItemOptions,
    posDelta: stepBuffer,
  };
  const { subjectItem, room } = moveItemOptions;
  for (let i = 0; i < stepCount; i++) {
    if (room.items[subjectItem.id] === undefined) {
      // a step moved the subject out of the room (eg through a portal):
      return;
    }
    moveItem(stepOptions);
  }
};
