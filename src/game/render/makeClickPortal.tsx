import { Container } from "pixi.js";
import { RenderOptions } from "../RenderOptions";
import { SetRequired } from "type-fest";

export const makeClickPortal = <RoomId extends string>(
  toRoom: RoomId,
  { onPortalClick }: SetRequired<RenderOptions<RoomId>, "onPortalClick">,
  ...sprite: Container[]
) => {
  sprite.forEach((sprite) => {
    sprite.eventMode = "static";
    sprite.on("pointertap", () => {
      onPortalClick(toRoom);
    });
  });
};
