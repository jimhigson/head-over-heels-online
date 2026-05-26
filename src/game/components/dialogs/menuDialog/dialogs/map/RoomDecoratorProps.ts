import { type FunctionComponent, type ReactElement } from "react";

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

export type WrapClickableRoomDecoratorComponentProps<RoomId extends string> =
  RoomDecoratorProps<RoomId> & {
    children: ReactElement;
  };

export type PostfixRoomDecoratorComponent<RoomId extends string> =
  FunctionComponent<RoomDecoratorProps<RoomId>>;

export type WrapClickableRoomDecoratorComponent<RoomId extends string> =
  FunctionComponent<WrapClickableRoomDecoratorComponentProps<RoomId>>;
