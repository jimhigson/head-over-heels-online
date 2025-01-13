import type { GameApi } from "@/game/GameApi";
import { BitmapText } from "../../Sprite";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useContext, useState } from "react";
import { ScaleFactorContext } from "../../ScaleFactorContext";
import { useActionInput } from "../useActionInput";

export interface MenuDialogContentProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
}

const menuItems = ["Play the game", "Select the keys", "Modernisation options"];

const MenuItem = ({ text, selected }: { text: string; selected: boolean }) => {
  const scaleFactor = useContext(ScaleFactorContext);
  return (
    <BitmapText
      scale={scaleFactor}
      doubleHeight={selected}
      color={
        selected ? spritesheetPalette.metallicBlue : spritesheetPalette.moss
      }
      className="block mb-1"
    >
      {selected ? "==" : "{}"}
      {text}
    </BitmapText>
  );
};

export const MenuDialogContent = <RoomId extends string>({
  onClose,
  gameApi,
}: MenuDialogContentProps<RoomId>) => {
  //const scaleFactor = useContext(ScaleFactorContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useActionInput({
    action: "menu",
    onAction: onClose,
    gameApi,
  });
  useActionInput({
    action: "away",
    onAction() {
      setSelectedItemIndex(
        (i) => (i - 1 + menuItems.length) % menuItems.length,
      );
    },
    gameApi,
  });
  useActionInput({
    action: "towards",
    onAction() {
      setSelectedItemIndex((i) => (i + 1) % menuItems.length);
    },
    gameApi,
  });

  return menuItems.map((mi, i) => (
    <MenuItem key={mi} text={mi} selected={selectedItemIndex === i} />
  ));
};
