import { loadCampaignFromDb, saveCampaignToDb } from "../../db/campaignTable";
import { store } from "../../store/store";
import type { EditorCampaign } from "../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  loadCampaign,
  selectCurrentCampaignInProgress,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const SaveButton = () => {
  return (
    <ToolbarButton
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
              className={`sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`}
            />
            <span className={`sprite texture-editor_tool_save relative`} />
          </div>
        }
        topText="sa"
        bottomText="ve"
      />
    </ToolbarButton>
  );
};

export const LoadButton = () => {
  return (
    <ToolbarButton
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
            <span className={`sprite texture-editor_tool_save relative`} />
            <span
              className={`sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`}
            />
          </div>
        }
        topText="lo"
        bottomText="ad"
      />
    </ToolbarButton>
  );
};
