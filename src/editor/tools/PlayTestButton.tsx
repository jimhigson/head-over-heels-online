import { useState } from "react";

import type { TypedURLSearchParams } from "../../options/queryParams";

import { compressObject } from "../../db/compressObject";
import { store } from "../../store/store";
import { Switch } from "../../ui/Switch";
import {
  type RootStateWithLevelEditorSlice,
  selectCurrentCampaignInProgress,
} from "../slice/levelEditorSlice";
import { MenuButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const PlayTestButton = () => {
  const [fromStart, setFromStart] = useState(false);
  const [playAsHeels, setPlayAsHeels] = useState(false);

  return (
    <MenuButton
      main={
        <ToolbarButton
          onClick={async () => {
            const state = store.getState() as RootStateWithLevelEditorSlice;
            const campaign = selectCurrentCampaignInProgress(state);
            const encodedCampaign = await compressObject(campaign);

            const url = new URL(
              import.meta.env.VITE_GAME_URL,
              window.location.href,
            );
            const searchParams = url.searchParams as TypedURLSearchParams;
            searchParams.set("campaignName", `data:${encodedCampaign}`);
            searchParams.set("cheats", "1");
            if (playAsHeels) {
              searchParams.set("playAsHeels", "1");
            }
            if (!fromStart) {
              url.hash = state.levelEditor.currentlyEditingRoomId;
            }
            window.open(url.toString(), "playtest");
          }}
          tooltipContent={`##Playtest\n\nPlay this room without saving`}
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
          key="fromStart"
          className="w-full px-1 py-half"
          value={fromStart}
          label="from"
          falseLabel="room"
          trueLabel="start"
          onChange={(value) => setFromStart(value)}
        />,
        <Switch
          key="playAsHeels"
          className="w-full px-1 py-half"
          value={playAsHeels}
          label="as"
          falseLabel="head"
          trueLabel="heels"
          onChange={(value) => setPlayAsHeels(value)}
        />,
      ]}
    </MenuButton>
  );
};
