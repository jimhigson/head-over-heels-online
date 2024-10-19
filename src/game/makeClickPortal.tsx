import { Container } from "pixi.js";
import { RoomId } from "../modelTypes";
import { RenderWorldOptions } from "./renderWorld";

export const makeClickPortal = (
  toRoom: RoomId,
  { onPortalClick }: RenderWorldOptions,
  ...sprite: Container[]
) => {
  sprite.forEach((sprite) =>
    sprite.on("click", () => {
      onPortalClick(toRoom);
    }),
  );
};

export function* makeClickPortals(
  toRoom: RoomId,
  options: RenderWorldOptions,
  sprites: Generator<Container>,
): Generator<Container> {
  for (const s of sprites) {
    makeClickPortal(toRoom, options, s);
    yield s;
  }
}
