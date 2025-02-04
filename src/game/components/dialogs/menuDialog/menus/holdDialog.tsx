import { PressToContinueBanner } from "../../PressToContinueBanner";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";
import { Dialog } from "../../../../../components/ui/dialog";

export const HoldDialog = () => {
  return (
    <Dialog className="!h-min !w-max bg-pureBlack text-center p-0">
      <BitmapText className="block sprites-double-height text-zxBlue">
        hold
      </BitmapText>
      <span className="zx">
        <PressToContinueBanner
          className={`text-center ${multilineTextClass}`}
          action="hold"
        />
      </span>
    </Dialog>
  );
};
