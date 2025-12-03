import { Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type { ItemInPlay } from "../../../../model/ItemInPlay";
import type { RoomState } from "../../../../model/RoomState";

import { iterateRoomItems } from "../../../../model/RoomState";
import { wallTimes } from "../../../../model/times";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import {
  perpendicularAxisXy,
  subXyz,
  tangentAxis,
} from "../../../../utils/vectors/vectors";
import { createSprite } from "../../createSprite";
import { projectWorldXyzToScreenXy } from "../../projections";

// the original game had floor tiles that didn't go all the way up to the walls.
// that was an artifact, but I like it, so I render small rectangular sprites to
// make the same effect
export const renderFloorOverdraws = (
  { state: { position: floorPosition } }: ItemInPlay<"floor", string, string>,
  roomState: RoomState<string, string>,
  colourised: boolean,
): Container => {
  const isOnFarSide = (
    item: ItemTypeUnion<"doorFrame" | "wall", string, string>,
  ): boolean =>
    item.config.direction === "away" || item.config.direction === "left";

  const floorOverdraws = iterateToContainer(
    iterateRoomItems(roomState.items)
      .filter(
        (
          otherItem,
        ): otherItem is ItemTypeUnion<"doorFrame" | "wall", string, string> => {
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
          spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
        });
      }),
    new Container({ label: "floorOverdraws" }),
  );

  return floorOverdraws;
};
