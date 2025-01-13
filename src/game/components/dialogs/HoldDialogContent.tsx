import { BitmapText } from "../Sprite";
import { PressToContinueBanner } from "./PressToContinueBanner";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { ScaleFactorContext } from "../ScaleFactorContext";
import { useContext } from "react";
import type { GameApi } from "@/game/GameApi";
import { useCloseOnInput } from "./useCloseOnInput";

type HoldDialogContentProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
};

export const HoldDialogContent = <RoomId extends string>({
  gameApi,
  onClose,
}: HoldDialogContentProps<RoomId>) => {
  const scaleFactor = useContext(ScaleFactorContext);

  // technically this is wrong - if the key assignment changes, this component won't re-render
  // but this is probably not possible during the lifetime of this component
  const { keyAssignment } = gameApi.gameState;

  useCloseOnInput({
    action: "hold",
    onClose,
    gameApi,
  });

  return (
    <div className="text-center bg-pureBlack">
      <div>
        <BitmapText
          scale={scaleFactor}
          doubleHeight
          color={spritesheetPalette.moss}
        >
          hold
        </BitmapText>
      </div>
      <span>
        <PressToContinueBanner
          className="text-center"
          action="hold"
          keyAssignment={keyAssignment}
        />
      </span>
    </div>
  );
};
