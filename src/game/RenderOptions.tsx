import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { SetRequired } from "type-fest";

export const hasItemClick = <RoomId extends string>(
  options: RenderOptions<RoomId>,
): options is SetRequired<RenderOptions<RoomId>, "onItemClick"> => {
  return options.onItemClick !== undefined;
};

export type RenderOptions<RoomId extends string> = {
  onItemClick?: (item: UnknownItemInPlay<RoomId>) => void;
  showBoundingBoxes?: boolean;
};
