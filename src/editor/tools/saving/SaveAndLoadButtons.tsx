import { useState } from "react";

import type { CampaignLocator } from "../../../model/modelTypes";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

import { supabaseDb } from "../../../db/supabaseDb";
import { BitmapText } from "../../../game/components/tailwindSprites/Sprite";
import {
  loadCampaignFromApi,
  saveCampaignViaApi,
} from "../../../store/slices/campaigns/campaignApiHelpers";
import { store } from "../../../store/store";
import { cn } from "../../../ui/cn";
import { emptyArray } from "../../../utils/empty";
import { OpenCampaignDialog } from "../../editorDialogs/OpenCampaignDialog";
import { SaveAsDialog } from "../../editorDialogs/SaveAsDialog";
import { campaignIsNamed, type EditorCampaign } from "../../editorTypes";
import {
  loadCampaign,
  selectCurrentCampaignInProgress,
  setCampaignName,
  setCampaignPublished,
  setCampaignUserId,
  setRemoteCampaign,
} from "../../slice/levelEditorSlice";
import { MenuButton, MenuItemButton } from "../MenuButton";
import { ToolbarButton } from "../ToolbarButton";
import { useShortTimeDisplay } from "../useShortTimeDisplay";
import { useSupabaseUser } from "../useSupabaseUser";
import { useRemoteIsInSync } from "./useRemoteIsInSync";

export const showOkAfterSaveDuration = 2000;

const saveTooltipMarkdown = `
## Save

Put your campaign on cassette tape, or even floppy disk! - to be shared or worked on later

(really, saves to a cloud database)
`;
const loadTooltipMarkdown = `
## Open

Load your saved campaign, or anyone else's for editing
`;

const save = async () => {
  const state = store.getState() as RootStateWithLevelEditorSlice;
  const campaign = selectCurrentCampaignInProgress(state);
  if (!campaignIsNamed(campaign)) {
    throw new Error("Campaign is not named, can't save");
  }

  const { data, error } = await supabaseDb.auth.getUser();
  if (error) {
    throw new Error("Failed to get user:", error);
  }
  const userId = data.user.id;
  if (userId !== campaign.locator.userId) {
    // if this is someone else's campaign, change the name:
    store.dispatch(setCampaignUserId(userId));
  }

  console.info("saving...", campaign);
  const result = await saveCampaignViaApi(campaign);
  if (result.data !== undefined) {
    console.info(`...saved as v${result.data}`);
    store.dispatch(setRemoteCampaign({ campaign }));
  } else if (result.error) {
    console.error("Failed to save:", result.error);
  }
};

const load = async (campaignLocator: CampaignLocator) => {
  const result = await loadCampaignFromApi(campaignLocator, {
    forceRefetch: true,
  });

  if (result.data) {
    const campaign = result.data as EditorCampaign;
    console.info("loaded", campaign);
    store.dispatch(loadCampaign({ campaign }));
  } else if (result.error) {
    console.error("Failed to load:", result.error);
  }
};

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();
  const savedIsInSync = useRemoteIsInSync();
  const { doneNow, justDone } = useShortTimeDisplay();
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const [openDialogOpen, setOpenDialogOpen] = useState(false);

  return (
    <>
      {justDone > 0 ?
        <ToolbarButton disabled className="!bg-moss !text-white">
          <BitmapText className="relative leading-none">OK!</BitmapText>
        </ToolbarButton>
      : <MenuButton
          closeOnSelect
          main={
            <ToolbarButton
              disabled={user === null || savedIsInSync}
              onClick={async () => {
                const state = store.getState() as RootStateWithLevelEditorSlice;
                const campaign = selectCurrentCampaignInProgress(state);

                if (!campaignIsNamed(campaign)) {
                  setSaveAsDialogOpen(true);
                } else {
                  await save();
                  doneNow();
                }
              }}
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
        >
          {user ?
            [
              <MenuItemButton onClick={() => setSaveAsDialogOpen(true)}>
                Save as...
              </MenuItemButton>,
            ]
          : emptyArray}
        </MenuButton>
      }

      <ToolbarButton
        onClick={() => setOpenDialogOpen(true)}
        tooltipContent={loadTooltipMarkdown}
        shortcutKeys={["^O", "⌘O"]}
      >
        <div className="flex flex-row items-center">
          <span className={cn(`sprite texture-editor_tool_open relative`)} />
          <span
            className={cn(
              `sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`,
            )}
          />
        </div>
      </ToolbarButton>

      {saveAsDialogOpen && (
        <SaveAsDialog
          onClose={() => {
            setSaveAsDialogOpen(false);
          }}
          onDone={({ campaignName, publish }) => {
            store.dispatch(setCampaignName(campaignName));
            store.dispatch(setCampaignPublished(publish));
            save();
            setSaveAsDialogOpen(false);
          }}
        />
      )}

      {openDialogOpen && (
        <OpenCampaignDialog
          onClose={() => {
            setOpenDialogOpen(false);
          }}
          onDone={({ campaignLocator }) => {
            load(campaignLocator);
            setOpenDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
