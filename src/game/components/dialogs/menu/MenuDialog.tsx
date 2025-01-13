import type { GameApi } from "@/game/GameApi";
import { useContext, useState } from "react";
import { useActionInput } from "../useActionInput";
import { MenuItemComponent } from "./MenuItemComponent";
import { menu } from "./MenuItem";
import { BitmapText } from "../../Sprite";
import { ScaleFactorContext } from "../../ScaleFactorContext";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Dialog } from "@/components/ui/dialog";

export interface MenuDialogContentProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
}

export const MenuDialog = <RoomId extends string>({
  onClose,
  gameApi,
}: MenuDialogContentProps<RoomId>) => {
  const scaleFactor = useContext(ScaleFactorContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useActionInput({
    action: "menu",
    onAction: onClose,
    gameApi,
  });
  useActionInput({
    action: "away",
    onAction() {
      setSelectedItemIndex((i) => (i - 1 + menu.length) % menu.length);
    },
    gameApi,
  });
  useActionInput({
    action: "towards",
    onAction() {
      setSelectedItemIndex((i) => (i + 1) % menu.length);
    },
    gameApi,
  });

  return (
    <Dialog className="bg-midRed p-1">
      <div>
        <BitmapText
          color={spritesheetPalette.highlightBeige}
          scale={scaleFactor}
          doubleHeight
        >
          Head
        </BitmapText>
        <BitmapText scale={scaleFactor}>over</BitmapText>
        <BitmapText
          scale={scaleFactor}
          color={spritesheetPalette.highlightBeige}
          doubleHeight
        >
          Heels
        </BitmapText>
        <BitmapText scale={scaleFactor}>online</BitmapText>
      </div>
      <BitmapText scale={scaleFactor}>blockstack.ing</BitmapText>
      <div className="mt-4">
        {menu.map((mi, i) => (
          <MenuItemComponent
            key={mi.text}
            menuItem={mi}
            selected={selectedItemIndex === i}
          />
        ))}
      </div>
    </Dialog>
  );
};
