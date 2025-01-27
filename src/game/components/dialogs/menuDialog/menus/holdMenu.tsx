import { PressToContinueBanner } from "../../PressToContinueBanner";
import type { Menu } from "../menus";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";

const HoldDialogContent = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-zxBlue">
        hold
      </BitmapText>
      <span className="zx">
        <PressToContinueBanner
          className={`text-center ${multilineTextClass}`}
          action="hold"
        />
      </span>
    </>
  );
};

export const holdMenu: Menu = {
  dialogClassName: "!h-min !w-max bg-pureBlack text-center p-0",
  Content: HoldDialogContent,
  items: [],
};
