import type { ReactElement } from "react";
import { addXy } from "../../../../../../utils/vectors/vectors";
import { roomGridSizeXY } from "./mapConstants";
import { translateXyz } from "./svgHelpers";

const radiusFromCentreWith2 = roomGridSizeXY / 5;
const radiusFromCentreWith4 = roomGridSizeXY / 4;
const roomCentre = {
  x: roomGridSizeXY / 2,
  y: roomGridSizeXY / 2,
};

const layouts = {
  1: [translateXyz(roomCentre)],
  2: [
    translateXyz(
      addXy(roomCentre, {
        x: -radiusFromCentreWith2,
        y: radiusFromCentreWith2,
      }),
    ),
    translateXyz(
      addXy(roomCentre, {
        x: radiusFromCentreWith2,
        y: -radiusFromCentreWith2,
      }),
    ),
  ],
  3: [
    translateXyz(
      addXy(roomCentre, {
        x: radiusFromCentreWith4,
        y: radiusFromCentreWith4,
      }),
    ),
    translateXyz(
      addXy(roomCentre, {
        x: -radiusFromCentreWith4,
        y: radiusFromCentreWith4,
      }),
    ),
    translateXyz(
      addXy(roomCentre, {
        x: radiusFromCentreWith4,
        y: -radiusFromCentreWith4,
      }),
    ),
  ],
  4: [
    translateXyz(
      addXy(roomCentre, {
        x: -radiusFromCentreWith4,
        y: -radiusFromCentreWith4,
      }),
    ),
    translateXyz(
      addXy(roomCentre, {
        x: -radiusFromCentreWith4,
        y: radiusFromCentreWith4,
      }),
    ),
    translateXyz(
      addXy(roomCentre, {
        x: radiusFromCentreWith4,
        y: -radiusFromCentreWith4,
      }),
    ),
    translateXyz(
      addXy(roomCentre, { x: radiusFromCentreWith4, y: radiusFromCentreWith4 }),
    ),
  ],
} as unknown as string[][];

export const ItemInRoomLayout = ({
  children,
  heightAdjust = 0,
}: {
  children: Array<ReactElement | undefined | false>;
  heightAdjust?: number;
}) => {
  const elementChildren = children.filter(
    (c) => c !== undefined && c !== false,
  );

  return (
    <g transform={`translate(0, ${heightAdjust})`}>
      {elementChildren.map((childElement, i) => {
        return (
          <g transform={layouts[elementChildren.length][i]} key={i}>
            {childElement}
          </g>
        );
      })}
    </g>
  );
};
