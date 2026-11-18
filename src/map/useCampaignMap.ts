import nanoEqual from "nano-equal";
import { useMemo } from "preact/hooks";

import { originalCampaignLocator } from "../gameInfo";
import { firstSubRoomId } from "../model/firstSubRoomId";
import { teleporterLinksFromCell } from "../model/map/teleporterLinksFromCell";
import { type OptionallyNamedCampaign } from "../model/modelTypes";
import { emptyObject } from "../utils/empty";
import { campaignMapAreas } from "./campaignMapAreas";
import { mapAreaIndexOfRoom } from "./mapAreaIndexOfRoom";
import {
  type MapContextValue,
  type MapSettingsHooks,
  noCellPlayables,
} from "./MapContext";
import {
  type PostfixRoomDecoratorComponent,
  type PrefixRoomDecoratorComponent,
  type RoomBehaviourComponent,
} from "./RoomDecoratorProps";
import { selectNotableItems } from "./selectNotableItems";

export type UseCampaignMapOptions<RoomId extends string> = {
  campaign: OptionallyNamedCampaign<RoomId>;
  /**
   * marked as the current room, if any
   */
  currentRoomId: RoomId | undefined;
  /**
   * any room of the area to show
   */
  shownAreaRoomId: RoomId;
  behaviours: RoomBehaviourComponent<RoomId>[];
  prefixDecorators: PrefixRoomDecoratorComponent<RoomId>[];
  postfixDecorators: PostfixRoomDecoratorComponent<RoomId>[];
  /**
   * where the map's settings (the spritesheet, the upscale) come from
   */
  settingsHooks: MapSettingsHooks;
  /**
   * drawn as selected
   */
  selectedRoomId: RoomId | undefined;
};

/**
 * a campaign's map areas, and the context its rooms draw from with the given
 * room as current - drawn from the campaign alone, with no game being played:
 * no characters, nothing visited, nothing collected
 */
export const useCampaignMap = <RoomId extends string>({
  campaign,
  currentRoomId,
  shownAreaRoomId,
  behaviours,
  prefixDecorators,
  postfixDecorators,
  settingsHooks,
  selectedRoomId,
}: UseCampaignMapOptions<RoomId>) => {
  const mapAreas = useMemo(() => campaignMapAreas(campaign), [campaign]);
  const shownAreaIndex =
    mapAreas.isError ? 0 : mapAreaIndexOfRoom(mapAreas.areas, shownAreaRoomId);
  const maybeShownArea =
    mapAreas.isError ? undefined : mapAreas.areas[shownAreaIndex];
  const mapContext = useMemo(
    (): MapContextValue<RoomId> => ({
      // the original campaign's main map has its own background:
      isOriginalCampaign: nanoEqual(campaign.locator, originalCampaignLocator),
      currentCharacterName: "head",
      onPlayableClick: undefined,
      behaviours,
      prefixDecorators,
      postfixDecorators,
      // none of these call any hooks, so are fine to swap for others when
      // the campaign or room changes:
      ...settingsHooks,
      useShownArea() {
        // the map is only drawn when its geometry could be solved:
        if (import.meta.env.DEV && maybeShownArea === undefined) {
          throw new Error("the map was drawn without its geometry solved");
        }
        return maybeShownArea!;
      },
      useCurRoomId: () => currentRoomId,
      useCurSubRoomId: () =>
        currentRoomId === undefined ? undefined : (
          firstSubRoomId(campaign.rooms[currentRoomId])
        ),
      // the map takes its colours from the current room, else the area's:
      useCurRoomScenery: () =>
        campaign.rooms[currentRoomId ?? shownAreaRoomId].planet,
      useTeleporterLinksFrom: (mapRoomId, subRoomId) =>
        teleporterLinksFromCell(campaign, mapRoomId, subRoomId),
      useRoomJson: (mapRoomId) => campaign.rooms[mapRoomId],
      // nothing is collected without a game:
      useNotableItems: (mapRoomId, subRoomId) =>
        selectNotableItems(campaign.rooms[mapRoomId], emptyObject, subRoomId),
      useCellPlayables: () => noCellPlayables,
      useRoomVisited: () => false,
      useIsRoomSelected: (mapRoomId) => mapRoomId === selectedRoomId,
    }),
    [
      campaign,
      maybeShownArea,
      currentRoomId,
      shownAreaRoomId,
      behaviours,
      prefixDecorators,
      postfixDecorators,
      settingsHooks,
      selectedRoomId,
    ],
  );
  return { mapAreas, shownAreaIndex, mapContext };
};
