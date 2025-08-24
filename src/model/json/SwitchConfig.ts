import type { BooleanStatePaths } from "../../store/slices/gameMenusSlice";
import type { Subset } from "../../utils/subset";
import type { DirectionXy4, Xyz } from "../../utils/vectors/vectors";
import type { SwitchSetting } from "../ItemInPlay";
import type { ItemState } from "../ItemState";
import type { ItemStateMap } from "../ItemStateMap";

// switches are 'on rails' with a fairly restricted range of things they can change for the sake of avoiding
// errors in the json but this could be added to as needed. Technically, the engine can change any property
// of an item's state if it ignores these types
export type SwitchItemModificationUnion<
  RoomId extends string,
  RoomItemId extends string,
> =
  // ganged switches:
  // test on:
  //    * original/#blacktooth6
  //    * sequel/turtle_dance
  | {
      expectType: "monster" | "movingPlatform";
      targets: RoomItemId[];
      /**
       * true is a shorthand for monsters/platforms that are activated by default:
       *   {leftState: {activated: true, everActivated:true}, rightState: {activated:false}},
       * false is shorthand for monsters/platforms that are deactivated by default:
       *   {leftState: {activated: false}, rightState: {activated: true, everActivated:true}},
       */
      activates?: boolean;
      leftState?: Partial<
        Pick<
          ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>,
          "activated" | "everActivated" | "disappearing" | "expires" | "facing"
        >
      >;
      rightState?: Partial<
        Pick<
          ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>,
          "activated" | "everActivated" | "disappearing" | "expires" | "facing"
        >
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
  | {
      expectType: "block";
      targets: RoomItemId[];
      /**
       * if true, equivalent to leftState disappearing on stand, right state not disappearing
       * if false, equivalent to leftState not disappearing, right state disappearing on stand
       */
      makesStable: boolean;
    }
  // ganged switches:
  // test on:
  //    * original/#penitentiary3
  //    * original/#moonbase13
  //    * sequel/turtle_dance
  | {
      expectType: "switch";
      targets: RoomItemId[];
      /** this switch will flip the other switch when it is flipped */
      flip: true;
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

export type ButtonConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = {
  // list of all items (de)activated by this button
  modifies: Array<SwitchItemModificationUnion<RoomId, RoomItemId>>;
};
