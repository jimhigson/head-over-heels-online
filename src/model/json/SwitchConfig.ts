import type { BooleanStatePaths } from "../../store/slices/gameMenusSlice";
import type { Subset } from "../../utils/subset";
import type { DirectionXy4, Xyz } from "../../utils/vectors/vectors";
import type { ItemState, SwitchSetting } from "../ItemInPlay";
import type { ItemStateMap } from "../ItemStateMap";

// switches are 'on rails' with a fairly restricted range of things they can change for the sake of avoiding
// errors in the json but this could be added to as needed. Technically, the engine can change any property
// of an item's state if it ignores these types
export type SwitchItemModificationUnion<
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
    }
  // gangs of switches but opposite-direction
  | {
      expectType: "switch";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"switch", RoomId, RoomItemId>>,
        {
          setting?: "right";
        }
      >;
      rightState: Subset<
        Partial<ItemState<"switch", RoomId, RoomItemId>>,
        {
          setting?: "left";
        }
      >;
    }
  | {
      expectType: "switch";
      targets: RoomItemId[];
      // switches have some shorthand to go together or opposite:
      flip: "same" | "opposite";
    }
  | {
      expectType: "conveyor";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemState<"conveyor", RoomId, RoomItemId>>,
        {
          direction?: DirectionXy4;
          disappearing?: {
            on: "stand";
          } | null;
        }
      >;
      rightState: Subset<
        Partial<ItemState<"conveyor", RoomId, RoomItemId>>,
        {
          direction?: DirectionXy4;
          disappearing?: {
            on: "stand";
          } | null;
        }
      >;
    }
  | {
      expectType: "joystick";
      targets: RoomItemId[];
      leftState: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["joystick"], "controls">
      >;
      rightState: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["joystick"], "controls">
      >;
    }
  | {
      expectType: "emitter";
      targets: RoomItemId[];
      leftState: Partial<ItemStateMap<RoomId, RoomItemId>["emitter"]>;
      rightState: Partial<ItemStateMap<RoomId, RoomItemId>["emitter"]>;
    }
  | {
      expectType: "lift";
      targets: RoomItemId[];
      leftState: Partial<ItemStateMap<RoomId, RoomItemId>["lift"]>;
      rightState: Partial<ItemStateMap<RoomId, RoomItemId>["lift"]>;
    }
  | {
      expectType: "teleporter";
      targets: RoomItemId[];
      leftState: Subset<
        Partial<ItemStateMap<RoomId, RoomItemId>["teleporter"]>,
        {
          toRoom: RoomId;
          toPosition: Xyz;
        }
      >;
      rightState: Subset<
        Partial<ItemStateMap<RoomId, RoomItemId>["teleporter"]>,
        {
          toRoom: RoomId;
          toPosition: Xyz;
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
