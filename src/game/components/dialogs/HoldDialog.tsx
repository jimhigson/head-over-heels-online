import { Dialog } from "../../../components/ui/dialog";
import { useIsOnHold } from "../../../store/selectors";
import { BitmapText } from "../Sprite";
import { PressToContinueBanner } from "./PressToContinueBanner";
import type { EmptyObject } from "type-fest";

const HoldDialogInner = (_emptyProps: EmptyObject) => {
  return (
    <Dialog className="text-center bg-pureBlack">
      <BitmapText className="block sprites-double-height text-moss">
        hold
      </BitmapText>
      <span>
        <PressToContinueBanner className="text-center" action="hold" />
      </span>
    </Dialog>
  );
};

export const HoldDialog = (_emptyProps: EmptyObject) => {
  const isOnHold = useIsOnHold();

  if (!isOnHold) return null;

  return <HoldDialogInner />;
};
