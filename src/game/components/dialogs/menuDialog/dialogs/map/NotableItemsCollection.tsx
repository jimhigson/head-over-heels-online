import { addXy } from "../../../../../../utils/vectors/vectors";
import { roomGridSizeXY } from "./mapConstants";
import type { NotableItem } from "./NotableItem";
import { NotableItemSvg } from "./NotableItem";
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
      addXy(roomCentre, {
        x: -radiusFromCentreWith4,
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

export const NotableItemsCollection = <RoomId extends string>({
  notableItems,
}: {
  notableItems: Array<NotableItem<RoomId>>;
}) => {
  return (
    <g transform="translate(0, 14)">
      {notableItems.map((item, i) => {
        const isBigItem =
          item.type === "hushPuppy" || item.type === "teleporter";

        return (
          <g transform={layouts[notableItems.length][i]} key={i}>
            <NotableItemSvg
              key={i}
              notableItem={item}
              className={
                notableItems.length === 1 ?
                  isBigItem ?
                    "[--scale:1.66]"
                  : "[--scale:2]"
                : isBigItem ?
                  "[--scale:1.25]"
                : "[--scale:1.5]"
              }
            />
          </g>
        );
      })}
    </g>
  );
};
