import { Container } from "pixi.js";
import { createSprite } from "../../createSprite";
import { projectWorldXyzToScreenXy } from "../../projections";

import {
  tangentAxis,
  perpendicularAxisXy,
  subXyz,
} from "../../../../utils/vectors/vectors";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import type { RoomState } from "../../../../model/RoomState";
import { iterateRoomItems } from "../../../../model/RoomState";
import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type { ItemInPlay } from "../../../../model/ItemInPlay";
import { wallTimes } from "../../../../model/times";

export const renderFloorOverdraws = (
  { state: { position: floorPosition } }: ItemInPlay<"floor", string, string>,
  roomState: RoomState<string, string>,
): Container => {
  const isOnFarSide = (
    item: ItemTypeUnion<"wall" | "doorFrame", string, string>,
  ): boolean =>
    item.config.direction === "away" || item.config.direction === "left";

  const floorOverdraws = iterateToContainer(
    iterateRoomItems(roomState.items)
      .filter(
        (
          otherItem,
        ): otherItem is ItemTypeUnion<"wall" | "doorFrame", string, string> => {
          return (
            otherItem.type === "wall" ||
            // for heightened doors (with legs), draw a corner the same as for walls:
            otherItem.type === "doorLegs"
          );
        },
      )
      // TODO: use collision detection to test if the wall/door intersects the floor
      .filter(isOnFarSide)
      .map((item): Container => {
        const {
          id,
          config: { direction },
          state: { position: doorOrWallPosition },
        } = item;

        // draw the corners on the floor:
        return createSprite({
          textureId: "floorOverdraw.cornerNearWall",
          label: id,
          ...projectWorldXyzToScreenXy(
            subXyz(doorOrWallPosition, floorPosition),
          ),
          times:
            item.type === "wall" ?
              wallTimes(item.config)
              // doors are two blocks wide:
            : { [perpendicularAxisXy(tangentAxis(direction))]: 2 },
          anchor: { x: 0, y: 1 },
          flipX: direction === "away",
        });
      }),
    new Container({ label: "floorOverdraws" }),
  );

  return floorOverdraws;
};
