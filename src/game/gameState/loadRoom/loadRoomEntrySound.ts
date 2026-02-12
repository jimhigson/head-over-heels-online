import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { SoundId } from "../../../sound/soundUrls";
import type { UserSettings } from "../../../store/slices/gameMenus/gameMenusSlice";

import { iterateRoomJsonItems, type RoomJson } from "../../../model/RoomJson";
import { isSoundId } from "../../../sound/soundUrls";
import { defaultUserSettings } from "../../../store/slices/gameMenus/defaultUserSettings";
import { originXyz, type Xyz } from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const roomEntrySoundPos: Xyz = blockXyzToFineXyz({ x: -2, y: -2, z: -2 });

const resolveSoundId = (
  roomJson: RoomJson<string, string>,
  isNewGame: boolean,
  noRoomEntryTunes: boolean,
): SoundId | undefined => {
  if (
    isNewGame &&
    iterateRoomJsonItems(roomJson).some(
      // bit of a hack, but since the game always plays for head, we can detect
      // head in the room and use it to decide if this new game room state that is
      // loading is the first room that will be shown:
      (item) => item.type === "player" && item.config.which === "head",
    )
  ) {
    return "fanfare";
  }

  if (noRoomEntryTunes) {
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

  const noRoomEntryTunes =
    userSettings.soundSettings.noRoomEntryTunes ??
    defaultUserSettings.soundSettings.noRoomEntryTunes;

  if (noRoomEntryTunes) {
    return undefined;
  }

  const soundId = resolveSoundId(roomJson, isNewGame, noRoomEntryTunes);

  if (!soundId) {
    return undefined;
  }

  return {
    id: "roomEntrySound" as RoomItemId,
    type: "soundEffect",
    fixedZIndex: nonRenderingItemFixedZIndex,
    config: {
      soundOptions: {
        soundId,
        gain: 0.3,
        playbackRate: 1.2,
      },
    },
    aabb: originXyz,
    castsShadowWhileStoodOn: false,
    state: {
      ...defaultBaseState(),
      position: roomEntrySoundPos,
      played: false,
    },
    noSoundPan: true,
  };
};
