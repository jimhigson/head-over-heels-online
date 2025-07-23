import { useState } from "react";
import { compressObject } from "../../db/compressObject";
import type { TypedURLSearchParams } from "../../options/queryParams";
import { store } from "../../store/store";
import { Switch } from "../../ui/Switch";
import {
  selectCurrentCampaignInProgress,
  type RootStateWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { MenuButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const PlayTestButton = () => {
  const [fromStart, setFromStart] = useState(true);
  const [playAsHeels, setPlayAsHeels] = useState(true);

  return (
    <MenuButton
      main={
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
            if (playAsHeels) {
              searchParams.set("playAsHeels", "1");
            }
            if (!fromStart) {
              url.hash = state.levelEditor.currentlyEditingRoomId;
            }
            window.open(url.toString(), "playtest");
          }}
          shortcutKeys={["⌘P", "^P"]}
        >
          <IconWithTwoLineHoverText
            topText="pl"
            bottomText="ay"
            icon={<span className="sprite texture-joystick mt-half" />}
          />
        </ToolbarButton>
      }
    >
      {[
        <Switch
          className="w-full"
          value={fromStart}
          label="from"
          falseLabel="room"
          trueLabel="start"
          onClick={(_e, value) => setFromStart(value)}
        />,
        <Switch
          className="w-full"
          value={playAsHeels}
          label="as"
          falseLabel="head"
          trueLabel="heels"
          onClick={(_e, value) => setPlayAsHeels(value)}
        />,
      ]}
    </MenuButton>
  );
};
