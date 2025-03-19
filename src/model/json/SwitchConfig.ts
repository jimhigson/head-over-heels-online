import type { GameMenusState } from "../../store/slices/gameMenusSlice";
import type { ToggleablePaths } from "../../utils/Toggleable";
import type { ItemInPlayType, ItemState } from "../ItemInPlay";

type SwitchItemModification<
  RoomId extends string,
  RoomItemId extends string,
  T extends ItemInPlayType,
  K extends keyof ItemState<T, RoomId, RoomItemId>,
  Left extends ItemState<T, RoomId, RoomItemId>[K],
  Right extends ItemState<T, RoomId, RoomItemId>[K],
> = {
  expectType: T;
  target: RoomItemId;
  key: K;
  left: Left;
  right: Right;
};
// switches are 'on rails' with a fairly restricted range of things they can change for the sake of avoiding
// errors in the json but this could be added to as needed. Technically, the engine can change any property
// of an item's state if it ignores these types
type SwitchItemModificationUnion<
  RoomId extends string,
  RoomItemId extends string,
> =
  | SwitchItemModification<
      RoomId,
      RoomItemId,
      "monster" | "movingPlatform",
      "activated",
      // deactivated by default:
      false,
      true
    >
  | SwitchItemModification<
      RoomId,
      RoomItemId,
      "monster" | "movingPlatform",
      "activated",
      // activated by default:
      true,
      false
    >
  // turning off disappearing blocks:
  | SwitchItemModification<
      RoomId,
      RoomItemId,
      "block",
      "disappear",
      "onStand",
      null
    >
  // gangs of switches (#penitentiary3)
  | SwitchItemModification<
      RoomId,
      RoomItemId,
      "switch",
      "setting",
      "left",
      "right"
    >;
export type SwitchConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> =
  | {
      /** this switch targets items in the room */
      type: "in-room";
      // list of all items (de)activated by this switch
      modifies: Array<NoInfer<SwitchItemModificationUnion<RoomId, RoomItemId>>>;
    }
  | {
      /** this switch targets the redux store */
      type: "in-store";
      // special case for switches that read from and dispatch to the store:
      path: ToggleablePaths<GameMenusState>;
    };
