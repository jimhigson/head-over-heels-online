import nanoEqual from "nano-equal";
import { loadCampaignFromDb, saveCampaignToDb } from "../../db/campaign";
import { store } from "../../store/store";
import { cn } from "../../ui/cn";
import type { EditorCampaign } from "../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  campaignSaved,
  loadCampaign,
  selectCurrentCampaignInProgress,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";
import { useSupabaseUser } from "./useSupabaseUser";
import { useState } from "react";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";

const showOkAfterSaveDuration = 2000;

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();
  const savedIsInSync = useAppSelectorWithLevelEditorSlice(
    ({ levelEditor: { savedCampaign, campaignInProgress } }) =>
      nanoEqual(savedCampaign, campaignInProgress),
  );
  const [justSaved, setJustSaved] = useState<number>(0);

  const handleSaveClicked = async () => {
    const state = store.getState() as RootStateWithLevelEditorSlice;
    const campaign = selectCurrentCampaignInProgress(state);
    console.info("saving...", campaign);
    const version = await saveCampaignToDb("sequel", campaign);
    console.info(`...saved as v${version}`);
    store.dispatch(campaignSaved({ campaign }));
    setJustSaved((n) => n + 1);
    setTimeout(() => setJustSaved((n) => n - 1), showOkAfterSaveDuration);
  };

  const handleLoadClicked = async () => {
    try {
      const campaign = (await loadCampaignFromDb("sequel")) as EditorCampaign;
      console.info("loaded", campaign);
      store.dispatch(loadCampaign({ campaign }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {justSaved > 0 ?
        <ToolbarButton disabled className="!bg-moss !text-white">
          <BitmapText className="relative leading-none">OK!</BitmapText>
        </ToolbarButton>
      : <ToolbarButton
          disabled={user === null || savedIsInSync}
          onClick={handleSaveClicked}
          shortcutKeys={["^S", "⌘S"]}
        >
          <IconWithTwoLineHoverText
            icon={
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
            }
            topText="sa"
            bottomText="ve"
          />
        </ToolbarButton>
      }

      <ToolbarButton disabled={user === null} onClick={handleLoadClicked}>
        <IconWithTwoLineHoverText
          icon={
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
          }
          topText="lo"
          bottomText="ad"
        />
      </ToolbarButton>
    </>
  );
};
