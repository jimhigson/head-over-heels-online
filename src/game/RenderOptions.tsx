import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { SetRequired } from "type-fest";

export const hasItemClick = <RoomId extends string>(
  options: RenderOptions<RoomId>,
): options is SetRequired<RenderOptions<RoomId>, "onItemClick"> => {
  return options.onItemClick !== undefined;
};

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

export type RenderOptions<RoomId extends string> = {
  onItemClick?: (item: AnyItemInPlay<RoomId>) => void;
  showBoundingBoxes: ShowBoundingBoxes;
};
