import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { store } from "../../../store/store";
import { getAtPath } from "../../../utils/getAtPath";

export const teleporterIsActive = <
  RoomId extends string,
  RoomItemId extends string,
>({
  config: { activatedOnStoreValue },
}: ItemTypeUnion<
  "portableTeleporter" | "teleporter",
  RoomId,
  RoomItemId
>): boolean => {
  return activatedOnStoreValue === undefined ? true : (
      !!getAtPath(store.getState().gameInPlay.gameInPlay, activatedOnStoreValue)
    );
};
