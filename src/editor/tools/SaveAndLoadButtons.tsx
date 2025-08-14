import nanoEqual from "nano-equal";
import {
  loadCampaignFromApi,
  saveCampaignViaApi,
} from "../../store/slices/campaigns/campaignApiHelpers";
import { store } from "../../store/store";
import { cn } from "../../ui/cn";
import type { EditorCampaign } from "../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  setRemoteCampaign,
  loadCampaign,
  selectCurrentCampaignInProgress,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { useSupabaseUser } from "./useSupabaseUser";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useShortTimeDisplay } from "./useShortTimeDisplay";

export const showOkAfterSaveDuration = 2000;

const saveTooltipMarkdown = `
## Save

put your campaign on cassette tape, or even floppy disk!

to be shared or worked on later

(really, saves to a cloud database)
`;
const loadTooltipMarkdown = `
## Load

continue working from your last save
`;

export const useSavedIsInSync = () => {
  return useAppSelectorWithLevelEditorSlice(
    ({ levelEditor: { remoteCampaign: savedCampaign, campaignInProgress } }) =>
      nanoEqual(savedCampaign, campaignInProgress),
  );
};

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();
  const savedIsInSync = useSavedIsInSync();
  const { doneNow, justDone } = useShortTimeDisplay();

  const handleSaveClicked = async () => {
    const state = store.getState() as RootStateWithLevelEditorSlice;
    const campaign = selectCurrentCampaignInProgress(state);
    console.info("saving...", campaign);
    const result = await saveCampaignViaApi(campaign);
    if (result.data !== undefined) {
      console.info(`...saved as v${result.data}`);
      store.dispatch(setRemoteCampaign({ campaign }));
      doneNow();
    } else if (result.error) {
      console.error("Failed to save:", result.error);
    }
  };

  const handleLoadClicked = async () => {
    const result = await loadCampaignFromApi(
      {
        campaignName: "sequel",
        userId: user?.id,
        version: -1, // latest version
      },
      {
        forceRefetch: true,
      },
    );

    if (result.data) {
      const campaign = result.data as EditorCampaign;
      console.info("loaded", campaign);
      store.dispatch(loadCampaign({ campaign }));
    } else if (result.error) {
      console.error("Failed to load:", result.error);
    }
  };

  return (
    <>
      {justDone > 0 ?
        <ToolbarButton disabled className="!bg-moss !text-white">
          <BitmapText className="relative leading-none">OK!</BitmapText>
        </ToolbarButton>
      : <ToolbarButton
          disabled={user === null || savedIsInSync}
          onClick={handleSaveClicked}
          shortcutKeys={["^S", "⌘S"]}
          tooltipContent={saveTooltipMarkdown}
        >
          <div className="flex flex-row items-center">
            <span
              className={cn(
                `sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`,
                { "text-lightGrey": user === null },
              )}
            />
            <span
              className={cn(`sprite texture-editor_tool_save relative`, {
                "sprite-revert-to-two-tone-dim": user === null,
              })}
            />
          </div>
        </ToolbarButton>
      }

      <ToolbarButton
        disabled={user === null}
        onClick={handleLoadClicked}
        tooltipContent={loadTooltipMarkdown}
      >
        <div className="flex flex-row items-center">
          <span
            className={cn(`sprite texture-editor_tool_save relative`, {
              "sprite-revert-to-two-tone-dim": user === null,
            })}
          />
          <span
            className={cn(
              `sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`,
              { "text-lightGrey": user === null },
            )}
          />
        </div>
      </ToolbarButton>
    </>
  );
};
