import { twMerge } from "tailwind-merge";

import { emptyArray } from "../../../../../utils/empty";
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
      role="header"
      className={twMerge(
        "flex flex-row sticky top-0 z-slightlyAbove py-oneScaledPix gap-2 pl-2",
        className,
      )}
    >
      <MenuItems inline role="menubar">
        <MobileStyleBackButton />
      </MenuItems>
      <div className="flex flex-row items-center">
        {path.slice(0, -1).map((p, i) => (
          <div className="flex flex-row" key={i}>
            <span className="text-midGrey zx:text-pureBlack toppy:text-toppyGrey3">
              {p}
            </span>
            <span className="text-midRed zx:text-zxRedDimmed toppy:text-toppyPink2">
              ➡
            </span>
          </div>
        ))}
        {last && (
          <div className="flex flex-row text-midRed zx:text-zxBlue toppy:text-toppyPink2">
            <h1 className="text-double-height">{last}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
