import { PressToContinueBanner } from "../../PressToContinueBanner";
import type { Menu } from "../menus";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";

const HoldDialogContent = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-moss zx:text-zxGreen">
        hold
      </BitmapText>
      <span>
        <PressToContinueBanner
          className={`text-center ${multilineTextClass}`}
          action="hold"
        />
      </span>
    </>
  );
};

export const holdMenu: Menu = {
  dialogClassName: "!h-min bg-pureBlack text-center",
  Content: HoldDialogContent,
  items: [],
};
