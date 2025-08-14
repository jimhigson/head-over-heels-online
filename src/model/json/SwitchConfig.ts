import type { BooleanStatePaths } from "../../store/slices/gameMenusSlice";
import type { Subset } from "../../utils/subset";
import type { ItemState, SwitchSetting } from "../ItemInPlay";

// switches are 'on rails' with a fairly restricted range of things they can change for the sake of avoiding
// errors in the json but this could be added to as needed. Technically, the engine can change any property
// of an item's state if it ignores these types
type SwitchItemModificationUnion<
  RoomId extends string,
  RoomItemId extends string,
> =
  // Monsters/platforms that are deactivated by default:
  | {
      expectType: "monster" | "movingPlatform";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>>,
        {
          activated?: false;
        }
      >;
      rightState: Subset<
        Partial<ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>>,
        {
          activated?: true;
          everActivated?: true;
        }
      >;
    }
  // Monsters/platforms that are activated by default:
  | {
      expectType: "monster" | "movingPlatform";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>>,
        {
          activated?: true;
          everActivated?: true;
        }
      >;
      rightState: Subset<
        Partial<ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>>,
        {
          activated?: false;
        }
      >;
    }
  // turning off disappearing blocks:
  | {
      expectType: "block";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"block", RoomId, RoomItemId>>,
        {
          disappearing?: {
            // currently, we only have the ability to totally turn on/off disappearing when touched by anything,
            // (in the ts types) for #blacktooth6. Not ability to change what triggers the disappearing etc
            on: "stand";
          };
        }
      >;
      rightState: Subset<
        Partial<ItemState<"block", RoomId, RoomItemId>>,
        {
          disappearing?: null;
        }
      >;
    }
  // gangs of switches (#penitentiary3)
  | {
      expectType: "switch";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"switch", RoomId, RoomItemId>>,
        {
          setting?: "left";
        }
      >;
      rightState: Subset<
        Partial<ItemState<"switch", RoomId, RoomItemId>>,
        {
          setting?: "right";
        }
      >;
    };

export type SwitchInRoomConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = {
  /** this switch targets items in the room */
  type: "in-room";
  // list of all items (de)activated by this switch
  modifies: Array<SwitchItemModificationUnion<RoomId, RoomItemId>>;
};

export type SwitchConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = { initialSetting: SwitchSetting } & (
  | SwitchInRoomConfig<
      RoomId,
      /** ids of items in this room */
      RoomItemId
    >
  | {
      /** this switch targets the redux store */
      type: "in-store";
      // special case for switches that read from and dispatch to the store:
      path: BooleanStatePaths;
    }
);
