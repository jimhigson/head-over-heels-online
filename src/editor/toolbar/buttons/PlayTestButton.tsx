import { useState } from "preact/hooks";

import { compressObject } from "../../../db/compressObject";
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
          onClick={async () => {
            const state = editorStore.getState();
            const campaign = selectCurrentCampaignInProgress(state);
            const encodedCampaign = await compressObject(campaign);

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
                className={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} mt-half`}
              />
            }
          />
        </ToolbarButton>
      }
    >
      {[
        <div className="pl-1 pr-1 pt-1">
          <label className="mr-1 text-lightGrey">Base URL:</label>
          <input
            key="baseurl"
            className="bg-shadow text-highlightBeige"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
        </div>,
        <Switch
          key="fromStart"
          className="w-full px-1 py-half"
          value={fromStart}
          label="Start from:"
          falseLabel="this room"
          trueLabel="start"
          onChange={(value) => setFromStart(value)}
        />,
        <Switch
          key="playAsHeels"
          className="w-full px-1 py-half"
          value={playAsHeels}
          label="Play as:"
          falseLabel="head"
          trueLabel="heels"
          onChange={(value) => setPlayAsHeels(value)}
        />,
      ]}
    </MenuButton>
  );
};
