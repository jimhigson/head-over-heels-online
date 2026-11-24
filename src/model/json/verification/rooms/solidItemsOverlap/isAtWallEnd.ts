import {
  alongAxisOfDirectionXy,
  boxMaxOnAxis,
  type XyzBox,
} from "../../../../../utils/vectors/vectors";
import type { LoadedItem } from "./LoadedItem";

/**
 * whether the overlap of two walls' boxes is at an end of this wall, along
 * the axis it runs on
 */
export const isAtWallEnd = (
  wall: LoadedItem & { type: "wall" },
  overlap: Readonly<XyzBox>,
): boolean => {
  const axis = alongAxisOfDirectionXy(wall.config.direction);
  return (
    overlap[axis] === wall.state.box[axis] ||
    boxMaxOnAxis(overlap, axis) === boxMaxOnAxis(wall.state.box, axis)
  );
};
