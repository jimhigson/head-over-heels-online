import { BitmapText } from "../Sprite";
import { PressToContinueBanner } from "./PressToContinueBanner";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Dialog } from "@/components/ui/dialog";
import type { EmptyObject } from "type-fest";
import { useIsOnHold } from "@/store/selectors";
import { useGameApi } from "../GameApiContext";

const HoldDialogInner = (_emptyProps: EmptyObject) => {
  // technically this is wrong - if the key assignment changes, this component won't re-render
  // but this is probably not possible during the lifetime of this component
  const { keyAssignment } = useGameApi().gameState;

  return (
    <Dialog className="text-center">
      <BitmapText
        doubleHeight
        colour={spritesheetPalette.moss}
        className="block"
      >
        hold
      </BitmapText>
      <span>
        <PressToContinueBanner
          className="text-center"
          action="hold"
          keyAssignment={keyAssignment}
        />
      </span>
    </Dialog>
  );
};

export const HoldDialog = (_emptyProps: EmptyObject) => {
  const isOnHold = useIsOnHold();

  if (!isOnHold) return null;

  return <HoldDialogInner />;
};
