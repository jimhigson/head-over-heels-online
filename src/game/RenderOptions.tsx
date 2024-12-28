import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { Container } from "pixi.js";
import type { SetRequired } from "type-fest";

export const hasItemClick = <RoomId extends string>(
  options: RenderOptions<RoomId>,
): options is SetRequired<RenderOptions<RoomId>, "onItemClick"> => {
  return options.onItemClick !== undefined;
};

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

export type RenderOptions<RoomId extends string> = {
  onItemClick?: (item: AnyItemInPlay<RoomId>, container: Container) => void;
  showBoundingBoxes: ShowBoundingBoxes;
  showShadowMasks: boolean;
  scaleFactor: number;
};

export const defaultRenderOptions: RenderOptions<string> = {
  showBoundingBoxes: "none",
  showShadowMasks: false,
  scaleFactor: 1,
};
