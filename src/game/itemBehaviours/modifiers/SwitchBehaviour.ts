import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { type SwitchItemModificationUnion } from "../../../model/json/SwitchConfig";
import { type RoomState } from "../../../model/RoomState";
import { toggleUserSetting } from "../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../store/store";
import { neverTime } from "../../../utils/neverTime";
import { type ItemTouchEvent } from "../../physics/handleTouch/ItemTouchEvent";
import { switchMinTimeBetweenToggleMs } from "../../physics/mechanicsConstants";
import { shadowSmallBlock } from "../../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "../ItemBehaviour";
import { applyModifiesList } from "./applyModifiesList";

export class SwitchBehaviour extends ItemBehaviour {
  constructor() {
    super({
      snagsHelpfulMovement: true,
      shadowCastTexture: shadowSmallBlock,
    });
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      super.onTouch(switchItem, e, isMover);
      return;
    }
    const { room } = e;
    const lastToggledAt: number =
      switchItem.state.lastToggledAtRoomTime ?? neverTime;

    const { roomTime } = room;

    switchItem.state.lastToggledAtRoomTime = roomTime;

    if (lastToggledAt + switchMinTimeBetweenToggleMs > roomTime) {
      // switch was already being pressed so skip it:
      return;
    }

    if (switchItem.state.disabled) {
      return;
    }

    this.#toggle(switchItem, room);
  }

  /**
   * switches flipped by other controllers toggle, so can chain their own
   * targets. Disabled switches stay put
   */
  override onModified<RoomId extends string, RoomItemId extends string>(
    switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
    modification: SwitchItemModificationUnion<RoomId, RoomItemId>,
    room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
    visited: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  ): void {
    if ("flip" in modification && !switchItem.state.disabled) {
      this.#toggle(switchItem, room, visited);
    }
  }

  #toggle<RoomId extends string, RoomItemId extends string>(
    switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
    room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
    /**
     * chain of causation - a list of the switches that flipped to flip this one.
     * needed to avoid infinite loops
     */
    visited?: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  ): void {
    const { config } = switchItem;

    if (config.type === "in-store") {
      store.dispatch(toggleUserSetting({ path: config.path }));
      return;
    }

    const newSetting = switchItem.state.setting === "left" ? "right" : "left";
    switchItem.state.setting = newSetting;

    // loop over the top-level of the switch's modification list:
    applyModifiesList(config.modifies, newSetting, switchItem, room, visited);
  }
}
