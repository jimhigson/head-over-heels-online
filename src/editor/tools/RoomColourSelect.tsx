import type { CSSProperties } from "react";
import { CommandItem } from "../../ui/command";
import type { ZxSpectrumRoomHue } from "../../originalGame";
import { zxSpectrumRoomHue } from "../../originalGame";
import {
  changeRoomColour,
  selectCurrentEditingRoomColour,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { useAppDispatch } from "../../store/hooks";
import { colorScheme } from "../../game/hintColours";
import { Select } from "../../ui/Select";
import { Switch } from "../../ui/Switch";
import { cn } from "../../ui/cn";

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
      />
      <Switch
        className=""
        label="shade"
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
