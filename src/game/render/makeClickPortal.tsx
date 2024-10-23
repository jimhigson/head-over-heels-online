import { Container } from "pixi.js";
import { RenderOptions } from "../gameMain";

export const makeClickPortal = <RoomId extends string>(
  toRoom: RoomId,
  { onPortalClick }: RenderOptions<RoomId>,
  ...sprite: Container[]
) => {
  sprite.forEach((sprite) =>
    sprite.on("click", () => {
      onPortalClick(toRoom);
    }),
  );
};

export function* makeClickPortals<RoomId extends string>(
  toRoom: RoomId,
  options: RenderOptions<RoomId>,
  sprites: Generator<Container>,
): Generator<Container> {
  for (const s of sprites) {
    makeClickPortal(toRoom, options, s);
    yield s;
  }
}
