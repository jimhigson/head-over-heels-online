import { useState } from "preact/hooks";

import { compressCampaignObject } from "../../../db/compressCampaignObject";
import { type TypedURLSearchParams } from "../../../options/queryParams";
import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { editorStore } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { selectCursorRoomId } from "../../slice/levelEditorSelectors";
import { selectCurrentCampaignInProgress } from "../../slice/levelEditorSlice";
import { MenuButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const PlayTestButton = () => {
  const [fromStart, setFromStart] = useState(false);
  const [playAsHeels, setPlayAsHeels] = useState(false);
  const [baseUrl, setBaseUrl] = useState(import.meta.env.VITE_GAME_URL);

  return (
    <MenuButton
      main={
        <ToolbarButton
          ariaLabel="Play test"
          onClick={async () => {
            const state = editorStore.getState();
            const campaign = selectCurrentCampaignInProgress(state);
            const encodedCampaign = await compressCampaignObject(campaign);

            const url = new URL(baseUrl, window.location.href);
            const searchParams = url.searchParams as TypedURLSearchParams;
            searchParams.set("campaignName", `data:${encodedCampaign}`);
            searchParams.set("cheats", "1");
            if (playAsHeels) {
              searchParams.set("playAsHeels", "1");
            }
            if (!fromStart) {
              url.hash = selectCursorRoomId(state.levelEditor);
            }
            window.open(url.toString(), "playtest");
          }}
          tooltipContent={`##Playtest\n\nPlay this room without saving`}
          shortcutKeys={["⌘P", "^P"]}
        >
          <IconWithTwoLineHoverText
            topText="pl"
            bottomText="ay"
            icon={
              <span
                class={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} mt-half`}
              />
            }
          />
        </ToolbarButton>
      }
    >
      {[
        <div class="pl-1 pr-1 pt-1">
          <label class="mr-1 text-lightGrey">Base URL:</label>
          <input
            key="baseurl"
            class="bg-shadow text-highlightBeige"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.currentTarget.value)}
          />
        </div>,
        <Switch
          key="fromStart"
          class="w-full px-1 py-half"
          value={fromStart}
          label="Start from:"
          ariaLabel="Play test start point"
          falseLabel="this room"
          trueLabel="start"
          onChange={(value) => setFromStart(value)}
        />,
        <Switch
          key="playAsHeels"
          class="w-full px-1 py-half"
          value={playAsHeels}
          label="Play as:"
          ariaLabel="Play test character"
          falseLabel="head"
          trueLabel="heels"
          onChange={(value) => setPlayAsHeels(value)}
        />,
      ]}
    </MenuButton>
  );
};
