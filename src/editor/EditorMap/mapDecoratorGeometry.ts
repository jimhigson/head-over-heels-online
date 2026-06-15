import { roomGridSizeXY } from "../../game/components/dialogs/menuDialog/dialogs/map/mapConstants";
import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import {
  addXy,
  lengthXy,
  scaleXy,
  subXy,
  type Xy,
} from "../../utils/vectors/vectors";

/** half a room's grid size on the xy plane */
export const roomHalfXY = roomGridSizeXY / 2;

/** width of a teleporter arrow's shaft */
export const arrowShaftWidth = blockSizePx.x * 0.5;

/** screen position of a room's centre, relative to the room's own `<g>` origin */
export const roomCentreScreen = projectWorldXyzToScreenXy({
  x: roomHalfXY,
  y: roomHalfXY,
});

/** offset `point` by `amount` along the perpendicular of the unit direction `dir` */
export const alongPerp = (point: Xy, dir: Xy, amount: number): Xy =>
  addXy(point, scaleXy({ x: -dir.y, y: dir.x }, amount));

/** a closed svg path (`d` attribute) through `points` */
export const pointsToPath = (points: Xy[]): string =>
  `${points.map(({ x, y }, i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")} Z`;

/**
 * a closed rectangle silhouette of the given `width` running from `from` to
 * `to` - a straight line drawn as a filled shape (so it can be filled without a
 * stroke). returns the empty string when `from` and `to` coincide.
 */
export const linePath = (from: Xy, to: Xy, width: number): string => {
  const between = subXy(to, from);
  const length = lengthXy(between);
  if (length === 0) {
    return "";
  }
  const dir = scaleXy(between, 1 / length);
  const half = width / 2;
  return pointsToPath([
    alongPerp(from, dir, half),
    alongPerp(to, dir, half),
    alongPerp(to, dir, -half),
    alongPerp(from, dir, -half),
  ]);
};
