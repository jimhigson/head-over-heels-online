import { useState } from "preact/hooks";

import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { editorStore } from "../../../store/store";
import { Button } from "../../../ui/Button";
import { Switch } from "../../../ui/Switch";
import { openPlaytest, playtestUrl } from "../../playtestUrl";
import { MenuButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

const prodUrl = "https://blockstack.ing";
const devUrl = "https://blockstack.dev";
const localUrl = import.meta.env.VITE_GAME_URL;

export const PlayTestButton = () => {
  const [fromStart, setFromStart] = useState(false);
  const [playAsHeels, setPlayAsHeels] = useState(false);
  const [baseUrl, setBaseUrl] = useState(localUrl);

  const playtest = async () => {
    openPlaytest(
      await playtestUrl(editorStore.getState(), {
        baseUrl,
        fromStart,
        playAsHeels,
      }),
    );
  };

  return (
    <MenuButton
      main={
        <ToolbarButton
          ariaLabel="Play test"
          onClick={playtest}
          tooltipContent={`## Playtest\n\nPlay this room without saving`}
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
          <label class="mr-1 text-lightGrey">Open game at:</label>
          <div class="flex flex-row gap-x-1">
            <input
              key="baseurl"
              class="bg-shadow text-highlightBeige"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.currentTarget.value)}
            />
            {localUrl !== devUrl && localUrl !== prodUrl && (
              <Button
                class="bg-pastelBlue px-half"
                onClick={(_e) => setBaseUrl(import.meta.env.VITE_GAME_URL)}
              >
                here
              </Button>
            )}
            <Button
              class="bg-moss px-half"
              onClick={(_e) => setBaseUrl(prodUrl)}
            >
              .ing
            </Button>
            <Button
              class="bg-midRed px-half"
              onClick={(_e) => setBaseUrl(devUrl)}
            >
              .dev
            </Button>
          </div>
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
        <Button onClick={playtest}>Play</Button>,
      ]}
    </MenuButton>
  );
};
