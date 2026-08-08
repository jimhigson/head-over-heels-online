import {
  type ExportedSoundId,
  isSoundId,
} from "../../../_generated/sfxdex/sfx";
import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type RoomJson, roomJsonItemsIterable } from "../../../model/RoomJson";
import { type SceneryName } from "../../../sprites/planets";
import { defaultUserSettings } from "../../../store/slices/userSettings/defaultUserSettings";
import {
  type RoomEntryTunesSetting,
  type UserSettings,
} from "../../../store/slices/userSettings/userSettingsSlice";
import {
  boxWithSize,
  originXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const roomEntrySoundPos: Xyz = blockXyzToFineXyz({ x: -2, y: -2, z: -2 });
const roomEntryGain = 1;
const roomEntryPlaybackRate = 1.2;

const resolveSoundId = (
  roomJson: RoomJson<string, string>,
  isNewGame: boolean,
  roomEntryTunesSetting: RoomEntryTunesSetting,
  previousRoomPlanet: SceneryName | undefined,
): ExportedSoundId | undefined => {
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

  if (roomEntryTunesSetting === "never") {
    return undefined;
  }

  // with no previous room (the first room of a fresh load, or respawning in the
  // same room after losing a life) there is no scenery change to announce, so
  // the tune does not play in any mode:
  if (previousRoomPlanet === undefined) {
    return undefined;
  }

  if (
    roomEntryTunesSetting === "sparse" &&
    previousRoomPlanet === roomJson.planet
  ) {
    return undefined;
  }

  const roomEntrySoundId = roomJson.planet;
  return isSoundId(roomEntrySoundId) ? roomEntrySoundId : undefined;
};

export const loadRoomEntrySound = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<string, string>,
  userSettings: UserSettings,
  isNewGame: boolean,
  previousRoomPlanet?: SceneryName,
): ItemInPlay<"soundEffect", RoomId, RoomItemId> | undefined => {
  const isMute =
    userSettings.soundSettings.mute ?? defaultUserSettings.soundSettings.mute;

  if (isMute) {
    return undefined;
  }

  const roomEntryTunesSetting =
    userSettings.soundSettings.roomEntryTunes ??
    defaultUserSettings.soundSettings.roomEntryTunes;

  const soundId = resolveSoundId(
    roomJson,
    isNewGame,
    roomEntryTunesSetting,
    previousRoomPlanet,
  );

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
  soundId: ExportedSoundId;
  noSoundPan?: boolean;
  gain?: number;
  playbackRate?: number;
  id?: RoomItemId;
}): ItemInPlay<"soundEffect", RoomId, RoomItemId> => ({
  id,
  type: "soundEffect",
  // never animates, so the hash (only used to de-synchronise animations) is irrelevant:
  hash: 0,
  fixedZIndex: nonRenderingItemFixedZIndex,
  config: {
    soundOptions: {
      soundId,
      gain,
      playbackRate,
    },
  },
  castsShadowWhileStoodOn: false,
  state: {
    ...defaultBaseState(),
    box: boxWithSize(roomEntrySoundPos, originXyz),
    played: false,
  },
  noSoundPan,
});
