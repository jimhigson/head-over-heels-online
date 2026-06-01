import { type FunctionComponent, type RefObject } from "react";

import { type Boundaries } from "./roomGridPositions";
import { type SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";

export type RoomDecoratorProps<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  boundaries: Boundaries;
  isCurrentRoom: boolean;
  isCurrentSubRoom: boolean;
  isSelected: boolean;
  allGridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
};

export type RoomBehaviourProps<RoomId extends string> = {
  interactiveAreaRef: RefObject<null | SVGPathElement>;
  roomId: RoomId;
  subRoomId: string;
  isCurrentRoom: boolean;
};

/** special component that is put into every room's <g> element, to add special behaviours, given a ref pointing to the room's <path> element */
export type RoomBehaviourComponent<RoomId extends string> = FunctionComponent<
  RoomBehaviourProps<RoomId>
>;

/** special component put at the end of a map's svg to add additional behaviour */
export type PostfixRoomDecoratorComponent<RoomId extends string> =
  FunctionComponent<RoomDecoratorProps<RoomId>>;
