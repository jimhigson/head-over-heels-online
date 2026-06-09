import { type CSSProperties } from "react";
import { capitalize } from "string-transform";

import { gameColour } from "../../../game/render/gameColours/gameColours";
import {
  zxSpectrumColor,
  type ZxSpectrumRoomHue,
  zxSpectrumRoomHue,
} from "../../../originalGame";
import { useAppDispatch } from "../../../store/hooks";
import { useIsUncolourised } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { useEditorAppSelector } from "../../../store/store";
import { CommandItem } from "../../../ui/command/CommandItem";
import { CommandMatch } from "../../../ui/command/CommandMatch";
import { Select } from "../../../ui/Select";
import { Switch } from "../../../ui/Switch";
import {
  changeRoomColour,
  selectCurrentEditingRoomColour,
} from "../../slice/levelEditorSlice";

declare module "react" {
  interface CSSProperties {
    /** the room's base background colour; the command components derive the rest */
    ["--command-secondary"]?: string;
  }
}

/**
 * Inline style for an element coloured by a room hue: it just provides the base
 * background (`--command-secondary`) and border. The `.command-colours` class
 * (commandColours.css) derives the contrasting foreground and reverses them for
 * the focused row / matched text. `CommandItem` carries `.command-colours` by
 * default; apply it explicitly when colouring another element (e.g. the trigger).
 */
export const cssForRoomColour = (
  hue: ZxSpectrumRoomHue,
  uncolourised: boolean,
): CSSProperties => {
  const hueColour =
    uncolourised ?
      zxSpectrumColor(hue, "dimmed").toHex()
    : gameColour(`swop_${hue}`).toHex();

  return {
    "--command-secondary": hueColour,
    borderColor:
      uncolourised ? hueColour : gameColour(`swop_${hue}Dim`).toHex(),
  };
};

export const RoomColourSelect = () => {
  const dispatch = useAppDispatch();
  const uncolourised = useIsUncolourised();

  const currentRoomColour = useEditorAppSelector(
    selectCurrentEditingRoomColour,
  );

  return (
    <>
      <Select<ZxSpectrumRoomHue>
        value={currentRoomColour.hue}
        onSelect={(currentValue) => {
          dispatch(
            changeRoomColour({
              colour: { hue: currentValue as ZxSpectrumRoomHue },
              timestamp: Date.now(),
            }),
          );
        }}
        values={zxSpectrumRoomHue}
        disableCommandInput
        OptionCommandItem={({ itemValue, onSelect }) => (
          <CommandItem
            value={itemValue}
            className="border-l-3 h-2 w-full p-0"
            style={cssForRoomColour(itemValue, uncolourised)}
            onSelect={onSelect}
          >
            <CommandMatch className="ml-1" text={capitalize(itemValue)} />
          </CommandItem>
        )}
        triggerButtonLabel={`Colour: ${capitalize(currentRoomColour.hue)}`}
        triggerButtonClassName="w-full command-colours"
        triggerButtonStyle={cssForRoomColour(
          currentRoomColour.hue,
          uncolourised,
        )}
        tooltipContent="Change the colour of this room"
      />
      <Switch
        className=""
        label="Shade"
        value={currentRoomColour.shade === "basic"}
        onChange={(value) => {
          dispatch(
            changeRoomColour({
              colour: { shade: value ? "basic" : "dimmed" },
              timestamp: Date.now(),
            }),
          );
        }}
        falseLabel="dim"
        trueLabel="bright"
      />
    </>
  );
};
