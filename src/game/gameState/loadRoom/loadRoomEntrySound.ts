import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { SoundId } from "../../../sound/soundUrls";
import type { UserSettings } from "../../../store/slices/gameMenus/gameMenusSlice";

import { type RoomJson, roomJsonItemsIterable } from "../../../model/RoomJson";
import { isSoundId } from "../../../sound/soundUrls";
import { defaultUserSettings } from "../../../store/slices/gameMenus/defaultUserSettings";
import { originXyz, type Xyz } from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const roomEntrySoundPos: Xyz = blockXyzToFineXyz({ x: -2, y: -2, z: -2 });
const roomEntryGain = 0.3;
const roomEntryPlaybackRate = 1.2;

const resolveSoundId = (
  roomJson: RoomJson<string, string>,
  isNewGame: boolean,
  noRoomEntryTunesSetting: boolean,
): SoundId | undefined => {
  if (
    isNewGame &&
    roomJsonItemsIterable(roomJson).some(
      // bit of a hack, but since the game always plays for head, we can detect
      // head in the room and use it to decide if this new game room state that is
      // loading is the first room that will be shown:
      (item) => item.type === "player" && item.config.which === "head",
    )
  ) {
    return "fanfare";
  }

  if (noRoomEntryTunesSetting) {
    return undefined;
  }

  const roomEntrySoundId = `roomEntry.${roomJson.planet}`;
  return isSoundId(roomEntrySoundId) ? roomEntrySoundId : undefined;
};

export const loadRoomEntrySound = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<string, string>,
  userSettings: UserSettings,
  isNewGame: boolean,
): ItemInPlay<"soundEffect", RoomId, RoomItemId> | undefined => {
  const isMute =
    userSettings.soundSettings.mute ?? defaultUserSettings.soundSettings.mute;

  if (isMute) {
    return undefined;
  }

  const noRoomEntryTunesSetting =
    userSettings.soundSettings.noRoomEntryTunes ??
    defaultUserSettings.soundSettings.noRoomEntryTunes;

  const soundId = resolveSoundId(roomJson, isNewGame, noRoomEntryTunesSetting);

  if (!soundId) {
    return undefined;
  }

  return createRoomEntrySound({
    soundId,
    noSoundPan: true,
    gain: roomEntryGain,
    playbackRate: roomEntryPlaybackRate,
  });
};

export const createRoomEntrySound = <
  RoomId extends string,
  RoomItemId extends string,
>({
  soundId,
  noSoundPan = true,
  gain = 1,
  playbackRate = 1,
  id = "roomEntrySound" as RoomItemId,
}: {
  soundId: SoundId;
  noSoundPan?: boolean;
  gain?: number;
  playbackRate?: number;
  id?: RoomItemId;
}): ItemInPlay<"soundEffect", RoomId, RoomItemId> => ({
  id,
  type: "soundEffect",
  fixedZIndex: nonRenderingItemFixedZIndex,
  config: {
    soundOptions: {
      soundId,
      gain,
      playbackRate,
    },
  },
  aabb: originXyz,
  castsShadowWhileStoodOn: false,
  state: {
    ...defaultBaseState(),
    position: roomEntrySoundPos,
    played: false,
  },
  noSoundPan,
});
