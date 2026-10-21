import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext } from "preact/hooks";

import { type PlayableItem } from "../../../../../../model/ItemInPlayNarrowedUnions";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import { type RoomJson } from "../../../../../../model/RoomJson";
import {
  type NotableItemsByCell,
  type NotableItemsInCell,
} from "./notableItemsByCell";
import {
  type PostfixRoomDecoratorComponent,
  type PrefixRoomDecoratorComponent,
  type RoomBehaviourComponent,
} from "./RoomDecoratorProps";

/**
 * the key of one placed cell of the map
 */
export type MapCellKey<RoomId extends string> = `${RoomId}/${string}`;

/**
 * the playable characters standing in one map cell
 */
export type CellPlayables<RoomId extends string> = {
  head: PlayableItem<"head", RoomId> | undefined;
  heels: PlayableItem<"heels", RoomId> | undefined;
  headOverHeels: PlayableItem<"headOverHeels", RoomId> | undefined;
};

/**
 * what the map's rooms and decorations draw from, beyond their own place on
 * the map. Its values are fixed for the map, or change only rarely, since every
 * part of the map reads them; what changes as rooms are edited or played is
 * given by its hooks instead, which each part calls for just its own room - so
 * a change to one room redraws only that room.
 *
 * The map's components call its hooks as hooks, so whatever hooks one calls
 * it must always call, for as long as the map is shown.
 */
export type MapContextValue<RoomId extends string> = {
  /**
   * the original campaign's main map has its own background
   */
  isOriginalCampaign: boolean;
  currentCharacterName: CharacterName;
  onPlayableClick: ((name: IndividualCharacterName) => void) | undefined;
  behaviours: RoomBehaviourComponent<RoomId>[];
  prefixDecorators: PrefixRoomDecoratorComponent<RoomId>[];
  postfixDecorators: PostfixRoomDecoratorComponent<RoomId>[];

  useRoomJson: (roomId: RoomId) => RoomJson<RoomId, string>;
  useNotableItemsInCell: (
    cellKey: MapCellKey<RoomId>,
  ) => NotableItemsInCell<RoomId> | undefined;
  /**
   * every cell's notable items - for parts of the map drawn between cells
   */
  useNotableItemsByCell: () => NotableItemsByCell<RoomId>;
  useCellPlayables: (
    roomId: RoomId,
    subRoomId: string,
  ) => CellPlayables<RoomId>;
  useRoomVisited: (roomId: RoomId) => boolean;
  useIsRoomSelected: (roomId: RoomId) => boolean;
};

const MapContext = createContext<MapContextValue<string> | null>(null);

export type MapContextProviderProps<RoomId extends string> = PropsWithChildren<{
  value: MapContextValue<RoomId>;
}>;

export const MapContextProvider = <RoomId extends string>({
  value,
  children,
}: MapContextProviderProps<RoomId>) => (
  // the context can't carry its room id type, so useMapContext's caller gives it back:
  <MapContext value={value as unknown as MapContextValue<string>}>
    {children}
  </MapContext>
);

export const useMapContext = <
  RoomId extends string,
>(): MapContextValue<RoomId> => {
  const maybeMapContext = useContext(MapContext);
  if (import.meta.env.DEV && maybeMapContext === null) {
    throw new Error("the map was drawn outside of a MapContext");
  }
  return maybeMapContext! as unknown as MapContextValue<RoomId>;
};

/**
 * the cell playables of a cell with none
 */
export const noCellPlayables: CellPlayables<never> = {
  head: undefined,
  heels: undefined,
  headOverHeels: undefined,
};
