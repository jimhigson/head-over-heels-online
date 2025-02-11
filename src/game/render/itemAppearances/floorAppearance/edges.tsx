import { Container } from "pixi.js";
import type { JsonItem } from "../../../../model/json/JsonItem";
import { iterate } from "../../../../utils/iterate";
import { createSprite } from "../../createSprite";
import { moveContainerToBlockXyz } from "../../projectToScreen";

type EdgesOptions = {
  blockXExtent: number;
  blockYExtent: number;
  blockXMin: number;
  blockYMin: number;
  type: "floorOverdraw" | "floorEdge";
  extraWalls: Iterable<JsonItem<"wall">>;
};
/**
 * creates the floor edge sprites - either the actual edge, or the overdraw for the edges
 s*/
export const edges = ({
  blockXExtent,
  blockYExtent,
  blockXMin,
  blockYMin,
  type,
  extraWalls,
}: EdgesOptions): { right: Container; towards: Container } => {
  const towards = new Container({ label: "towards" });
  for (let ix = 0; ix <= blockXExtent; ix += 0.5) {
    // for moonbase33 really - the only room with an edge caused by 'extra' walls:
    const worldX = ix + blockXMin + 0.5;
    const wall = iterate(extraWalls).find(
      (w) =>
        w.config.side === "towards" &&
        w.position.x <= worldX &&
        w.position.x >= worldX - 1,
    );
    const y = wall === undefined ? 0 : wall.position.y + 1 - blockYMin;

    const blockXy = { x: ix, y };
    const pivot = { x: 7, y: 0 };
    towards.addChild(
      moveContainerToBlockXyz(
        blockXy,
        createSprite({
          pivot,
          texture: `${type}.towards`,
        }),
      ),
    );
  }
  const right = new Container({ label: "right" });
  for (let iy = 0; iy <= blockYExtent; iy += 0.5) {
    const worldY = iy + blockYMin + 0.5;
    const wall = iterate(extraWalls).find(
      (w) =>
        w.config.side === "right" &&
        w.position.y <= worldY &&
        w.position.y >= worldY - 1,
    );
    const x = wall === undefined ? 0 : wall.position.x + 1 - blockXMin;

    right.addChild(
      moveContainerToBlockXyz(
        { x, y: iy },
        createSprite({
          pivot: { x: 0, y: 0 },
          texture: `${type}.right`,
        }),
      ),
    );
  }
  return { right, towards };
};
