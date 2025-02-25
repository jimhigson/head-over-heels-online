import { Container } from "pixi.js";
import { createSprite } from "../../createSprite";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";

import { objectEntries } from "iter-tools";
import { iterate } from "../../../../utils/iterate";
import type { Xy } from "../../../../utils/vectors/vectors";
import { addXy } from "../../../../utils/vectors/vectors";
import type { JsonItem } from "../../../../model/json/JsonItem";
import { iterateToContainer } from "../../../iterateToContainer";
import type { AnyRoomJson } from "../../../../model/RoomJson";

export const floorOverdraws = (
  roomJson: AnyRoomJson,
  blockMin: Xy,
): Container => {
  const isOnFarSide = ([_itemId, item]: [
    string,
    JsonItem<"wall" | "door">,
  ]): boolean =>
    item.config.direction === "away" || item.config.direction === "left";

  const container = new Container({
    label: "floorOverdraws",
    // move the origin to the true origin of the room, not the origin of the floor object - this
    // makes positioning things easier:
    ...projectBlockXyzToScreenXy({
      x: -blockMin.x,
      y: -blockMin.y,
    }),
  });

  const floorOverdraws = iterateToContainer(
    iterate(objectEntries(roomJson.items))
      .filter(
        (entry): entry is [string, JsonItem<"wall">] =>
          entry[1].type === "wall",
      )
      .filter(isOnFarSide)
      .map(
        ([
          id,
          {
            config: { times, direction },
            position: wallPosition,
          },
        ]): Container => {
          // draw the corners on the floor:
          return createSprite({
            textureId: "floorOverdraw.cornerNearWall",
            label: id,
            ...projectBlockXyzToScreenXy(wallPosition),
            times,
            anchor: { x: 0, y: 1 },
            flipX: direction === "away",
          });
        },
      ),
    new Container({ label: "floorOverdraws" }),
  );
  const doorOverdraws = iterateToContainer(
    iterate(objectEntries(roomJson.items))
      .filter(
        (entry): entry is [string, JsonItem<"door">] =>
          entry[1].type === "door",
      )
      .filter(isOnFarSide)
      .map(
        ([
          id,
          {
            config: { direction },
            position: doorPosition,
          },
        ]): Container => {
          // draw the corners on the floor:
          return createSprite({
            textureId: "floorOverdraw.behindDoor",
            label: id,
            ...projectBlockXyzToScreenXy(
              addXy(doorPosition, { x: 0.5, y: 0.5 }),
            ),
            anchor: { x: 0, y: 1 },
            flipX: direction === "away",
          });
        },
      ),
    new Container({ label: "doorOverdraws" }),
  );

  container.addChild(floorOverdraws);
  container.addChild(doorOverdraws);
  // debugging circle to indicate where the origin is for our rendering
  // container.addChild(new Graphics().circle(0, 0, 5).stroke(0xff8800));

  return container;
};
