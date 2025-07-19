import { getConsolidatableVector } from "../../consolidateItems/ConsolidatableJsonItem";
import { eachAxis } from "../../utils/vectors/eachAxis";
import {
  type Xyz,
  elementWiseProductXyz,
  addXyz,
} from "../../utils/vectors/vectors";
import type { EditorJsonItemUnion } from "../editorTypes";

/* times has to be a natural number (>=1)
 *  Map:
 *    n > 0 => n
 *    n = 0 => 1
 *    n < 0 => -n +1  // to reduce number of 1s on result number line
 *
 * n: ... -3  -2 -1  0  1  2  3 ...
 *                      ^^^^^^^^^^^ n > 0
 *                  ^^^ n = 0
 *    ^^^^^^^^^^ n< -1
 *
 * r: ...  4   3  2  1  1  2  3 ...
 *
 */
const naturalTimes = (integerTimes: Xyz) =>
  eachAxis(
    (n) =>
      n > 0 ? n
      : n > -1 ? 1
      : -n + 1,
    integerTimes,
  );

export const resizeTimesAndPosition = ({
  jsonItem,
  blockDragAccVec,
  resizeEdgeDirection: resizeEdge,
  startTimes,
  startPosition,
}: {
  jsonItem: EditorJsonItemUnion;
  blockDragAccVec: Xyz;
  resizeEdgeDirection: Xyz;
  startTimes: Xyz;
  startPosition: Xyz;
}) => {
  const sizeChangeInDragDirection = elementWiseProductXyz(
    blockDragAccVec,
    resizeEdge,
    getConsolidatableVector(jsonItem),
  );

  const integerNewTimes = addXyz(startTimes, sizeChangeInDragDirection);

  const newTimes = naturalTimes(integerNewTimes);

  const newPosition = eachAxis(
    (resizeEdgeA, integerNewTimesA, startPositionA, startTimesA, newTimesA) => {
      const onFlipSide = integerNewTimesA < 1;

      const positionByUpperBound =
        // the plane direction we were resizing in - negative resize direction means
        // displace
        resizeEdgeA < 0 !==
        // ...but this is xor'd with if we have flipped over to the 'wrong' side
        //   // for that resize plane
        onFlipSide;

      return (
        positionByUpperBound ?
          // position by the upper bound:
          onFlipSide ? startPositionA - newTimesA + 1
          : startPositionA + startTimesA - newTimesA
          // position by the lower bound:
        : onFlipSide ? startPositionA + startTimesA - 1
        : startPositionA
      );
    },
    resizeEdge,
    integerNewTimes,
    startPosition,
    startTimes,
    newTimes,
  );

  return { newTimes, newPosition };
};
