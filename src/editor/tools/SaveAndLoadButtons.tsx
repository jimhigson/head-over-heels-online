import { loadCampaignFromDb, saveCampaignToDb } from "../../db/campaign";
import { store } from "../../store/store";
import { cn } from "../../ui/cn";
import type { EditorCampaign } from "../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  loadCampaign,
  selectCurrentCampaignInProgress,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";
import { useSupabaseUser } from "./useSupabaseUser";

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();

  return (
    <>
      <ToolbarButton
        disabled={user === null}
        onClick={async () => {
          const state = store.getState() as RootStateWithLevelEditorSlice;
          await saveCampaignToDb(
            "sequel",
            selectCurrentCampaignInProgress(state),
          );
        }}
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

      <ToolbarButton
        disabled={user === null}
        onClick={async () => {
          try {
            const campaign = (await loadCampaignFromDb(
              "sequel",
            )) as EditorCampaign;
            console.log(campaign);
            store.dispatch(loadCampaign({ campaign }));
          } catch (e) {
            console.error(e);
          }
        }}
      >
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
