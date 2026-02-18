import { twMerge } from "tailwind-merge";

import { emptyArray } from "../../../../../utils/empty";
import { BitmapText } from "../../../tailwindSprites/Sprite";
import { MenuItems } from "../MenuItems";
import { MobileStyleBackButton } from "./MobileStyleBackButton";

export type DialogTitleBarProps = {
  path?: string[];
  className?: string;
};

export const DialogTitleBar = ({
  path = emptyArray,
  className,
}: DialogTitleBarProps) => {
  const last = path.at(-1);
  return (
    <div
      role="menubar"
      className={twMerge(
        "flex flex-row sticky top-0 z-slightlyAbove py-oneScaledPix gap-2 pl-2",
        className,
      )}
    >
      <MenuItems inline>
        <MobileStyleBackButton />
      </MenuItems>
      <div className="flex flex-row items-center">
        {path.slice(0, -1).map((p, i) => (
          <div className="flex flex-row" key={i}>
            <BitmapText className="text-midGrey zx:text-pureBlack">
              {p}
            </BitmapText>
            <BitmapText className="text-midRed zx:text-zxRedDimmed">
              ➡
            </BitmapText>
          </div>
        ))}
        {last && (
          <div className="flex flex-row sprites-double-height text-midRed zx:text-zxBlue">
            <BitmapText TagName="h1">{last}</BitmapText>
          </div>
        )}
      </div>
    </div>
  );
};
