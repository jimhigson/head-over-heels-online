import type { GameApi } from "@/game/GameApi";
import { BitmapText } from "../Sprite";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useContext } from "react";
import { ScaleFactorContext } from "../ScaleFactorContext";
import { useCloseOnInput } from "./useCloseOnInput";

export interface MenuDialogContentProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
}

export const MenuDialogContent = <RoomId extends string>({
  onClose,
  gameApi,
}: MenuDialogContentProps<RoomId>) => {
  const scaleFactor = useContext(ScaleFactorContext);

  useCloseOnInput({
    action: "menu",
    onClose,
    gameApi,
  });

  return (
    <BitmapText
      scale={scaleFactor}
      doubleHeight
      color={spritesheetPalette.moss}
    >
      menu
    </BitmapText>
  );
};
