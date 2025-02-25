import { Container } from "pixi.js";
import type { JsonItem } from "../../../../model/json/JsonItem";
import type { AnyRoomJson } from "../../../../model/RoomJson";
import { iterate } from "../../../../utils/iterate";
import { objectEntries } from "iter-tools";
import { createSprite } from "../../createSprite";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";
import {
  addXyz,
  directionAxis,
  perpendicularAxisXy,
} from "../../../../utils/vectors/vectors";

type BlockMins = {
  blockXMin: number;
  blockYMin: number;
};
/**
 * creates the floor edge sprites - either the actual edge, or the overdraw for the edges
 s*/
export const renderEdge = (
  { blockXMin, blockYMin }: BlockMins,
  roomJson: AnyRoomJson,
): { towards: Container; right: Container } => {
  const isOnNearSide = (
    entry: [string, JsonItem<"wall"> | JsonItem<"door">],
  ): entry is [
    string,
    (JsonItem<"wall"> | JsonItem<"door">) & {
      config: { direction: "towards" | "right" };
    },
  ] =>
    entry[1].config.direction === "towards" ||
    entry[1].config.direction === "right";

  // move the origin to the true origin of the room, not the origin of the floor object - this
  // makes positioning things easier:
  const originDisplacement = projectBlockXyzToScreenXy({
    x: -blockXMin,
    y: -blockYMin,
  });

  const result = {
    towards: new Container({ label: "towards", ...originDisplacement }),
    right: new Container({ label: "right", ...originDisplacement }),
  };

  iterate(objectEntries(roomJson.items))
    .filter(
      (entry): entry is [string, JsonItem<"wall"> | JsonItem<"door">] =>
        entry[1].type === "wall" || entry[1].type === "door",
    )
    .filter(isOnNearSide)
    .forEach(([id, wallOrDoor]) => {
      const {
        config: { direction },
        position: wallPosition,
      } = wallOrDoor;

      const alongMinX = direction === "right" && wallPosition.x === 0;
      const alongMinY = direction === "towards" && wallPosition.y === 0;

      // floor edges on the walls with doors need to be set back:
      const spatialPosition =
        alongMinX ? { ...wallPosition, x: blockXMin }
        : alongMinY ? { ...wallPosition, y: blockYMin }
        : wallPosition;

      const sprite = createSprite({
        label: id,
        textureId: `floorEdge.${direction}`,
        ...projectBlockXyzToScreenXy(spatialPosition),
        times:
          wallOrDoor.type === "wall" ?
            wallOrDoor.config.times
          : { [perpendicularAxisXy(directionAxis(direction))]: 2 },
      });

      result[direction].addChild(sprite);

      // add an extra half to join with set-back walls (if needed)
      if (direction === "right" && wallPosition.y === 0 && blockYMin < 0) {
        result[direction].addChild(
          createSprite({
            label: `${id}-wxtraHalf`,
            textureId: `floorEdge.half.${direction}`,
            ...projectBlockXyzToScreenXy(addXyz(spatialPosition, { y: -0.5 })),
          }),
        );
      }
      if (direction === "towards" && wallPosition.x === 0 && blockXMin < 0) {
        result[direction].addChild(
          createSprite({
            label: `${id}-wxtraHalf`,
            textureId: `floorEdge.half.${direction}`,
            ...projectBlockXyzToScreenXy(addXyz(spatialPosition, { x: -0.5 })),
          }),
        );
      }
    });

  return result;
};
