import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { type RoomJson } from "../../../model/RoomJson";
import { type PlanetName } from "../../../sprites/planets";
import { type ScrollsRead } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type PokesEnabled } from "../../../store/slices/userSettings/userSettingsSlice";
import { entries } from "../../../utils/entries";
import { cameraAngleBase } from "../../../utils/vectors/rotateXy";
import { type Xy } from "../../../utils/vectors/vectors";
import { type RoomPickupsCollected } from "../GameState";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "./loadItemFromJson";

export function* loadItems<RoomId extends string, RoomItemId extends string>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
  roomPickupsCollected: RoomPickupsCollected,
  scrollsRead: ScrollsRead,
  planetsLiberated: Partial<Record<PlanetName, boolean>>,
  pokesEnabled: PokesEnabled,
  isNewGame: boolean,
  shouldLoadItem: (item: JsonItemUnion<RoomId, RoomItemId>) => boolean = () =>
    true,
  /** the camera rotation that camera-relative structure (walls/floors) is built for */
  cameraAngle: Xy = cameraAngleBase,
): Generator<UnionOfAllItemInPlayTypes<RoomId>> {
  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    if (item.type === "player" && !isNewGame) {
      continue;
    }
    if (!shouldLoadItem(item)) {
      continue;
    }
    yield* loadItemFromJson(
      id,
      item,
      roomJson,
      directionalIndex,
      roomPickupsCollected,
      scrollsRead,
      planetsLiberated,
      pokesEnabled,
      "",
      cameraAngle,
    );
  }
}
