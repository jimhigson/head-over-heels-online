import { SetRequired } from "type-fest";

export const hasPortalClick = <RoomId extends string>(
  options: RenderOptions<RoomId>,
): options is SetRequired<RenderOptions<RoomId>, "onPortalClick"> => {
  return options.onPortalClick !== undefined;
};

export type RenderOptions<RoomId extends string> = {
  onPortalClick?: (roomId: RoomId) => void;
  showBoundingBoxes?: boolean;
};
