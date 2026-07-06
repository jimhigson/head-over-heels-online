import { type FunctionComponent, type RefObject } from "preact";

import { type Boundaries } from "../../../../../../model/map/roomGridPositions";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../../../../../model/map/sortRoomGridPositions";
import { type MapData } from "./MapData";

export type RoomDecoratorProps<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  boundaries: Boundaries;
  isCurrentRoom: boolean;
  isCurrentSubRoom: boolean;
  isSelected: boolean;
  allGridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  /** the whole map data, so decorators can read any geometry/linking they need */
  mapData: MapData<RoomId>;
};

export type RoomBehaviourProps<RoomId extends string> = {
  interactiveAreaRef: RefObject<null | SVGPathElement>;
  /**
   * id of the popover the room's interactive area references via
   * `interestfor`; a behaviour can render a `<Tip id={tipId}>` to give the
   * room a tooltip
   */
  tipId: string;
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

/** special component put before the rooms of a map's svg, so it draws under them */
export type PrefixRoomDecoratorComponent<RoomId extends string> =
  FunctionComponent<RoomDecoratorProps<RoomId>>;
