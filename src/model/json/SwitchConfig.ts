import type { UserSettingsBooleanPaths } from "../../store/slices/userSettings/userSettingsSlice";
import type { Subset } from "../../utils/Subset";
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
      targets?: RoomItemId[];
      /**
       * true is a shorthand for monsters/platforms that are activated by default:
       *   {leftState: {activated: true, everActivated:true}, rightState: {activated:false}},
       * false is shorthand for monsters/platforms that are deactivated by default:
       *   {leftState: {activated: false}, rightState: {activated: true, everActivated:true}},
       */
      activates?: boolean;

      /** shortcut - gives this direction for left state and opposite direction for right state */
      switchedDirection?: DirectionXy4;

      leftState?: Partial<
        Pick<
          ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>,
          "activated" | "disappearing" | "everActivated" | "expires" | "facing"
        >
      >;
      rightState?: Partial<
        Pick<
          ItemState<"monster" | "movingPlatform", RoomId, RoomItemId>,
          "activated" | "disappearing" | "everActivated" | "expires" | "facing"
        >
      >;
    }
  // turning off disappearing blocks:
  | {
      // ganged switches:
      // test on:
      //    * original/#penitentiary3
      //    * original/#moonbase13
      //    * sequel/turtle_dance
      expectType: "switch";
      targets?: RoomItemId[];
      /** this switch will flip the other switch when it is flipped */
      flip: true;
    }
  | {
      expectType: "block";
      targets?: RoomItemId[];
      /**
       * if true, equivalent to leftState disappearing on stand, right state not disappearing
       * if false, equivalent to leftState not disappearing, right state disappearing on stand
       */
      makesStable: boolean;
    }
  | {
      expectType: "block";
      targets?: RoomItemId[];
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
      expectType: "charles";
      targets?: RoomItemId[];
      /**
       * true is a shorthand for charles bots that are activated by default:
       *   {leftState: {activated: true}, rightState: {activated: false}},
       * false is shorthand for charles bots that are deactivated by default:
       *   {leftState: {activated: false}, rightState: {activated: true}},
       */
      activates?: boolean;
      leftState?: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["charles"], "activated">
      >;
      rightState?: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["charles"], "activated">
      >;
    }
  | {
      expectType: "conveyor";
      targets?: RoomItemId[];
      /**
       * true is a shorthand for conveyors that the switch enables
       *   {leftState: {disabled: false}, rightState: {disabled: true}},
       * false is a shorthand for conveyors that the switch disables
       *   {leftState: {disabled: true}, rightState: {disabled: false}},
       */
      activates?: boolean;
      /**
       * true means the left setting reverses the conveyor (opposite of config direction),
       * false means the right setting reverses it.
       * "reverse" = set direction to the opposite of the item's config.direction.
       */
      reverses?: boolean;
      leftState?: Subset<
        Partial<ItemState<"conveyor", RoomId, RoomItemId>>,
        {
          disabled?: boolean;
          direction?: DirectionXy4;
          disappearing?: {
            on: "stand";
          } | null;
        }
      >;
      rightState?: Subset<
        Partial<ItemState<"conveyor", RoomId, RoomItemId>>,
        {
          disabled?: boolean;
          direction?: DirectionXy4;
          disappearing?: {
            on: "stand";
          } | null;
        }
      >;
    }
  | {
      expectType: "deadlyBlock";
      targets?: RoomItemId[];
      /**
       * true is a shorthand for deadly blocks that start disabled:
       *   {leftState: {disabled: true}, rightState: {disabled: false}},
       * false is a shorthand for deadly blocks that start enabled:
       *   {leftState: {disabled: false}, rightState: {disabled: true}},
       */
      disables?: boolean;
      leftState?: Partial<
        Pick<ItemState<"deadlyBlock", RoomId, RoomItemId>, "disabled">
      >;
      rightState?: Partial<
        Pick<ItemState<"deadlyBlock", RoomId, RoomItemId>, "disabled">
      >;
    }
  | {
      expectType: "emitter";
      targets?: RoomItemId[];
      leftState: Partial<ItemStateMap<RoomId, RoomItemId>["emitter"]>;
      rightState: Partial<ItemStateMap<RoomId, RoomItemId>["emitter"]>;
    }
  | {
      expectType: "joystick";
      targets?: RoomItemId[];
      leftState: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["joystick"], "controls">
      >;
      rightState: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["joystick"], "controls">
      >;
    }
  | {
      expectType: "lift";
      targets?: RoomItemId[];
      leftState: Partial<ItemStateMap<RoomId, RoomItemId>["lift"]>;
      rightState: Partial<ItemStateMap<RoomId, RoomItemId>["lift"]>;
    }
  | {
      expectType: "teleporter";
      targets?: RoomItemId[];
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
    }
  | {
      expectType: "timer";
      targets?: RoomItemId[];
      activates?: boolean;
      leftState?: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["timer"], "activated">
      >;
      rightState?: Partial<
        Pick<ItemStateMap<RoomId, RoomItemId>["timer"], "activated">
      >;
    };

export type SwitchInRoomConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = {
  /**
   * this switch targets items in the room. This is the default, so
   * also used if undefined
   */
  type?: "in-room" | undefined;
  // list of all items (de)activated by this switch
  modifies: Array<SwitchItemModificationUnion<RoomId, RoomItemId>>;
};

type SwitchConfigForUserSettings = {
  /** this switch targets the redux store */
  type: "in-store";
  // special case for switches that read from and dispatch to the store:
  path: UserSettingsBooleanPaths;
};

export type SwitchConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = { initialSetting: SwitchSetting } & (
  | SwitchConfigForUserSettings
  | SwitchInRoomConfig<
      RoomId,
      /** ids of items in this room */
      RoomItemId
    >
);

export type StoreActionName = "nextSpritesOption";

type ButtonConfigForUserSettings = {
  type: "in-store";
  action: StoreActionName;
};

type ButtonInRoomConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> = {
  /**
   * this button targets items in the room. This is the default, so
   * also used if undefined
   */
  type?: "in-room" | undefined;
  modifies: Array<SwitchItemModificationUnion<RoomId, RoomItemId>>;
};

export type ButtonConfig<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
> =
  | ButtonConfigForUserSettings
  | ButtonInRoomConfig<
      RoomId,
      /** ids of items in this room */
      RoomItemId
    >;
