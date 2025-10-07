import type { CSSProperties } from "react";

import type { ZxSpectrumRoomHue } from "../../originalGame";

import { colorScheme } from "../../game/hintColours";
import { zxSpectrumRoomHue } from "../../originalGame";
import { useAppDispatch } from "../../store/hooks";
import { cn } from "../../ui/cn";
import { CommandItem } from "../../ui/command";
import { Select } from "../../ui/Select";
import { Switch } from "../../ui/Switch";
import {
  changeRoomColour,
  selectCurrentEditingRoomColour,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

const itemColourCss = (hue: ZxSpectrumRoomHue): CSSProperties => {
  const { main: mainColoursForHue } = colorScheme[hue].basic;
  return {
    backgroundColor: mainColoursForHue.basic.toHex(),
    borderColor: mainColoursForHue.dimmed.toHex(),
  };
};

export function RoomColourSelect() {
  const dispatch = useAppDispatch();

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
            style={itemColourCss(value)}
            onSelect={onSelect}
          />
        )}
        triggerButtonLabel="colour"
        triggerButtonClassName={cn(
          "w-full",
          `${currentRoomColour.hue === "white" || currentRoomColour.hue === "yellow" ? "text-pureBlack" : "text-white"}`,
        )}
        triggerButtonStyle={itemColourCss(currentRoomColour.hue)}
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
        trueLabel="basic"
      />
    </>
  );
}
