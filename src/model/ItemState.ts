import type { Xyz } from "../utils/vectors/vectors";
import type { Disappear } from "./Disappear";
import type { ItemInPlayType, SwitchSetting } from "./ItemInPlay";
import type { ItemStateMap } from "./ItemStateMap";
import type { StoodOnBy } from "./StoodOnBy";
import type { TimedRelationWithOtherItem } from "./TimedRelationWithOtherItem";

export type BaseItemState<RoomItemId extends string = string> = {
  /**
   * this is owned by the item itself, which it can modify in-place if it
   * wishes to avoid gc. Nothing else should keep a reference to this, since
   * it can change at any time.
   *
   * However, because doing so is likely to create hard-to-find bugs, we also
   * should not mutate this in-place, unless we are absolutely certain nobody else
   * has a reference to it (like, we just created the vector object)
   */
  position: Readonly<Xyz>;

  /**
   * The item will be removed from the room after the room it is in has more than this roomTime.
   * To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the current roomTime + duration of an animation
   * that needs to play
   *
   * If null, the item is not scheduled for removal (the normal case)
   */
  expires: null | number;

  /**
   * ids of items stood on by this item
   * - these are ids, not object references to maintain serialisability
   */
  stoodOnBy: StoodOnBy<RoomItemId>;

  /**
   * if given, the item disappears after the specified interaction.
   * This must be null (not undefined) so switches can tell the difference
   * between having no setting, and having a setting to change to null
   * when they make something not disappearing
   */
  disappearing: Disappear | null;

  /**
   * the time when this item was last changed by a switch (or button) in the room -
   * this exists so we can flash the item on being switched
   */
  switchedAtRoomTime: number;
  /**
   * if has ever been changed by a switch, the setting the switch last
   * moved into to change this item
   */
  switchedSetting?: SwitchSetting;

  /**
   * when this item last stopped being stood on. This is used to render items
   * (the spring) that renders differently when it has been stepped off
   *
   * TODO: could this only be for springs, since that is all that uses it?
   */
  stoodOnUntilRoomTime: number;

  /** the roomTime when this item last had a force applied to it, and who did the pushing/acting */
  actedOnAt: TimedRelationWithOtherItem<RoomItemId>;
};

export type ItemState<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> =
  T extends keyof ItemStateMap<RoomId, RoomItemId> ?
    BaseItemState<RoomItemId> & ItemStateMap<RoomId, RoomItemId>[T]
  : BaseItemState<RoomItemId>;
