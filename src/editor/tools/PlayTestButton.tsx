import { compressObject } from "../../db/compressObject";
import type { TypedURLSearchParams } from "../../options/queryParams";
import { store } from "../../store/store";
import {
  selectCurrentCampaignInProgress,
  type RootStateWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const PlayTestButton = () => {
  return (
    <ToolbarButton
      onClick={async () => {
        const state = store.getState() as RootStateWithLevelEditorSlice;
        const campaign = selectCurrentCampaignInProgress(state);
        const encodedCampaign = await compressObject(campaign);

        const url = new URL(import.meta.env.VITE_GAME_URL);
        const searchParams = url.searchParams as TypedURLSearchParams;
        searchParams.set("campaignData", encodedCampaign);
        searchParams.set("noSaves", "1");
        searchParams.set("cheats", "1");
        url.hash = state.levelEditor.currentlyEditingRoomId;
        window.open(url.toString(), "playtest");
      }}
    >
      <IconWithTwoLineHoverText
        topText="pl"
        bottomText="ay"
        icon={<span className="sprite texture-joystick mt-half" />}
      />
    </ToolbarButton>
  );
};
