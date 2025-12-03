import type { CSSProperties } from "react";

import { capitalize } from "string-transform";

import type { ZxSpectrumRoomHue } from "../../../originalGame";

import { BitmapText } from "../../../game/components/tailwindSprites/Sprite";
import { gameColour } from "../../../game/render/gameColours/gameColours";
import { zxSpectrumColor, zxSpectrumRoomHue } from "../../../originalGame";
import { useAppDispatch } from "../../../store/hooks";
import { useIsUncolourised } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { CommandItem } from "../../../ui/command";
import { Select } from "../../../ui/Select";
import { Switch } from "../../../ui/Switch";
import {
  changeRoomColour,
  selectCurrentEditingRoomColour,
  useAppSelectorWithLevelEditorSlice,
} from "../../slice/levelEditorSlice";

export const itemColourCss = (
  hue: ZxSpectrumRoomHue,
  uncolourised: boolean,
): CSSProperties => {
  if (uncolourised) {
    return {
      backgroundColor: zxSpectrumColor(hue, "dimmed").toHex(),
      borderColor: zxSpectrumColor(hue, "dimmed").toHex(),
    };
  }

  return {
    backgroundColor: gameColour(`swop_${hue}`).toHex(),
    borderColor: gameColour(`swop_${hue}Dim`).toHex(),
    color:
      hue === "white" || hue === "yellow" ?
        gameColour("pureBlack").toHex()
      : gameColour("white").toHex(),
  };
};

export const RoomColourSelect = () => {
  const dispatch = useAppDispatch();
  const uncolourised = useIsUncolourised();

  const currentRoomColour = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomColour,
  );

  return (
    <>
      <Select<ZxSpectrumRoomHue>
        value={currentRoomColour.hue}
        onSelect={(currentValue) => {
          dispatch(
            changeRoomColour({
              hue: currentValue as ZxSpectrumRoomHue,
            }),
          );
        }}
        values={zxSpectrumRoomHue}
        disableCommandInput
        OptionCommandItem={({ value, onSelect }) => (
          <CommandItem
            value={value}
            className="border-l-3 h-2 w-full p-0"
            style={itemColourCss(value, uncolourised)}
            onSelect={onSelect}
          >
            <BitmapText className="ml-1">{capitalize(value)}</BitmapText>
          </CommandItem>
        )}
        triggerButtonLabel={`Colour: ${capitalize(currentRoomColour.hue)}`}
        triggerButtonClassName="w-full"
        triggerButtonStyle={itemColourCss(currentRoomColour.hue, uncolourised)}
        tooltipContent="Change the colour of this room"
      />
      <Switch
        className=""
        label="Shade"
        value={currentRoomColour.shade === "basic"}
        onChange={(value) => {
          dispatch(
            changeRoomColour({
              shade: value ? "basic" : "dimmed",
            }),
          );
        }}
        falseLabel="dim"
        trueLabel="bright"
      />
    </>
  );
};
