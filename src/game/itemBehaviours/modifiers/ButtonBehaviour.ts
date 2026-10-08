import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { nextSpritesOption } from "../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../store/store";
import { objectEmpty } from "../../../utils/objectEmpty";
import { type GameState } from "../../gameState/GameState";
import {
  type MechanicResult,
  unitMechanicalResult,
} from "../../physics/MechanicResult";
import { buttonStayPressedAfterReleasePeriod } from "../../physics/mechanicsConstants";
import { ItemBehaviour } from "../ItemBehaviour";
import { applyModifiesList } from "./applyModifiesList";

const pressedMechanicResult: MechanicResult<"button", string, string> = {
  movementType: "steady",
  stateDelta: {
    pressed: true,
  },
};
const releasedMechanicResult: MechanicResult<"button", string, string> = {
  movementType: "steady",
  stateDelta: {
    pressed: false,
  },
};

export class ButtonBehaviour extends ItemBehaviour {
  constructor() {
    super({});
  }

  /**
   * pressed while stood on, released a while after it is stood off
   */
  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    button: ItemTypeUnion<"button", RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
    into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    const {
      state: { stoodOnUntilRoomTime, stoodOnBy, pressed },
      config,
    } = button;

    const deactivateTime =
      stoodOnUntilRoomTime + buttonStayPressedAfterReleasePeriod;
    const { roomTime } = room;
    const isStoodOn = !objectEmpty(stoodOnBy);

    // check is we just stepped over deactivate time:
    const release = !isStoodOn && roomTime > deactivateTime && pressed;
    if (release) {
      if (config.type !== "in-store") {
        applyModifiesList(config.modifies, "right", button, room);
      }
      into.push(
        releasedMechanicResult as MechanicResult<"button", RoomId, RoomItemId>,
      );
      return;
    }

    if (!pressed && isStoodOn) {
      if (config.type === "in-store") {
        const storeActions = { nextSpritesOption } as const;
        store.dispatch(storeActions[config.action]());
      } else {
        applyModifiesList(config.modifies, "left", button, room);
      }
      into.push(
        pressedMechanicResult as MechanicResult<"button", RoomId, RoomItemId>,
      );
      return;
    }

    into.push(unitMechanicalResult);
  }
}
