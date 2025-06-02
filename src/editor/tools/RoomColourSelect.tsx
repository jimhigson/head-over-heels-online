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
import { twClass } from "../twClass";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { Switch } from "../../ui/Switch";

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
            className="border-1 h-4 w-2"
            style={itemColourCss(value)}
            onSelect={onSelect}
          />
        )}
        triggerButtonLabel={<BitmapText>colour</BitmapText>}
        triggerButtonClassName={twClass(
          `${currentRoomColour.hue === "white" ? "text-pureBlack" : "text-white"}`,
        )}
        triggerButtonStyle={itemColourCss(currentRoomColour.hue)}
      />
      <Switch
        value={currentRoomColour.shade === "basic"}
        onClick={(_e, value) => {
          dispatch(
            changeRoomColour({
              shade: value ? "basic" : "dimmed",
            }),
          );
        }}
        falseLabel="dimmed"
        trueLabel="basic"
      />
    </>
  );
}
