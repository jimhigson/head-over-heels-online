import { Container, Graphics } from "pixi.js";
import { type TextureId } from "../../../../sprites/spriteSheetData";
import { mainPaletteSwapFilter } from "../../filters/paletteSwapFilters";
import { createSprite } from "../../createSprite";
import { moveContainerToBlockXyz } from "../../projectToScreen";
import { floorRenderExtent } from "../../renderExtent";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";

import type { ItemAppearance } from "../appearanceUtils";
import { renderOnce } from "../appearanceUtils";
import { objectEntries, objectValues } from "iter-tools";
import type { UnknownRoomState } from "../../../../model/modelTypes";
import { iterate } from "../../../../utils/iterate";
import type { DirectionXy4, Xy } from "../../../../utils/vectors/vectors";
import { originXy, addXy } from "../../../../utils/vectors/vectors";
import type { RoomJson } from "../../../../model/RoomJson";
import type { SceneryName } from "../../../../sprites/planets";
import type { JsonItem } from "../../../../model/json/JsonItem";
import { iterateToContainer } from "../../../iterateToContainer";

export type SidesWithDoors = Partial<Record<DirectionXy4, true>>;

function floorOverdraws(room: UnknownRoomState, blockMin: Xy): Container {
  const wallEntries = [
    ...iterate(objectEntries(room.roomJson.items)).filter(
      (entry): entry is [string, JsonItem<"wall">] => entry[1].type === "wall",
    ),
  ];
  const doorEntries = [
    ...iterate(objectEntries(room.roomJson.items)).filter(
      (entry): entry is [string, JsonItem<"door">] => entry[1].type === "door",
    ),
  ];

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
    iterate(wallEntries)
      .filter(isOnFarSide)
      .map(
        ([
          id,
          {
            config: { times, direction },
            position: wallPosition,
          },
        ]) => {
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
    iterate(doorEntries)
      .filter(isOnFarSide)
      .map(
        ([
          id,
          {
            config: { direction },
            position: wallPosition,
          },
        ]) => {
          // draw the corners on the floor:
          return createSprite({
            textureId: "floorOverdraw.behindDoor",
            label: id,
            ...projectBlockXyzToScreenXy(
              addXy(wallPosition, { x: 0.5, y: 0.5 }),
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
  container.addChild(new Graphics().circle(0, 0, 5).stroke(0xff8800));

  return container;
}

export const findExtraWalls = (
  items: RoomJson<SceneryName, string, string>["items"],
): Iterable<JsonItem<"wall">> => {
  return [
    ...iterate(objectValues(items)).filter((item) => item.type === "wall"),
  ];
};

export const floorAppearance: ItemAppearance<"floor"> = renderOnce(
  ({ item, room }) => {
    const {
      blockXMin,
      blockYMin,
      blockXMax,
      blockYMax,
      sidesWithDoors,
      edgeLeftX,
      edgeRightX,
    } = floorRenderExtent(room.roomJson);
    const blockXExtent = blockXMax - blockXMin;
    const blockYExtent = blockYMax - blockYMin;

    const {
      floor: floorType,
      color: { shade },
      roomJson: { items: jsonItems },
    } = room;

    const container = new Container({ label: `floor(${room.id})` });

    if (floorType !== "none") {
      const floorTileTexture: TextureId =
        floorType === "deadly" ?
          `generic${shade === "dimmed" ? ".dark" : ""}.floor.deadly`
        : `${floorType}${shade === "dimmed" ? ".dark" : ""}.floor`;

      const tilesContainer = new Container();

      // each sprite covers enough graphics for 2 blocks. we only need to
      // render a sprite for the 'white' squares on the chessboard (render or
      // not according to a checkerboard pattern)
      for (let ix = -1; ix <= blockXMax + 2; ix++) {
        for (let iy = (ix % 2) - 1; iy <= blockYMax + 2; iy += 2) {
          tilesContainer.addChild(
            moveContainerToBlockXyz(
              {
                x: ix + (sidesWithDoors.right ? -0.5 : 0),
                y: iy + (sidesWithDoors.towards ? -0.5 : 0),
              },
              createSprite({
                textureId: floorTileTexture,
              }),
            ),
          );
        }
      }

      tilesContainer.addChild(
        floorOverdraws(room, { x: blockXMin, y: blockYMin }),
      );

      const tilesMask = new Graphics()
        // Add the rectangular area to show
        .poly(
          [
            originXy,
            projectBlockXyzToScreenXy({ x: blockXExtent, y: 0 }),
            projectBlockXyzToScreenXy({ x: blockXExtent, y: blockYExtent }),
            projectBlockXyzToScreenXy({ x: 0, y: blockYExtent }),
          ],
          true,
        )
        .fill({ color: 0xff0000, alpha: 0.5 })
        // use a stroke to draw more than is strictly on the floor for the purpose of extending
        // under the pixelated edges of other sprites that are otherdrawn - otherwise the edge
        // would be a very smooth diagonal on modern screens
        .stroke({ width: 8 });

      tilesContainer.addChild(tilesMask);
      tilesContainer.filters = mainPaletteSwapFilter(room);
      tilesContainer.mask = tilesMask;

      container.addChild(tilesContainer);
    }

    /*
    const extraWalls = findExtraWalls(jsonItems);
    const { towards: towardsOverdraw, right: rightOverdraw } = edges({
      blockXExtent,
      blockYExtent,
      blockXMin,
      blockYMin,
      type: "floorOverdraw",
      extraWalls,
    });
    */

    //container.addChild(towardsOverdraw);
    //container.addChild(rightOverdraw);

    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMaskCutOffLeftAndRight = new Graphics()
      // Add the rectangular area to show
      .poly(
        [
          { x: edgeLeftX, y: 16 },
          { x: edgeLeftX, y: -999 },
          { x: edgeRightX, y: -999 },
          { x: edgeRightX, y: 16 },
        ],
        true,
      )
      .fill(0xffff00);

    container.addChild(floorMaskCutOffLeftAndRight);

    //const extraWallRanges = findExtraWallRanges([...extraWalls]);

    /*
    if (extraWallRanges !== undefined) {
      const floorOverdrawForExtraWalls = createFloorOverdrawForExtraWalls({
        extraWallRanges,
        blockXMin,
        blockYMin,
      });

      container.addChild(floorOverdrawForExtraWalls);
    }
      */

    container.mask = floorMaskCutOffLeftAndRight;

    // render on the top surface of the floor:
    container.y = -item.aabb.z;

    // the floor never changes rendering so can cache to optimise:
    container.cacheAsTexture(true);

    return container;
  },
);
