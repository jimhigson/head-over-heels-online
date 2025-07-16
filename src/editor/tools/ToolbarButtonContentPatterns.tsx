import type { ReactElement } from "react";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { twClass } from "../twClass";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";

export const LabelledToolbarIcon = ({
  iconClasses,
  text,
}: {
  iconClasses: string;
  text: string;
}) => {
  return (
    <div className="relative w-full h-full">
      <span
        className={`sprite absolute top-0 left-0 ${iconClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <BitmapText className="bg-metallicBlueHalfbrite absolute top-0 right-0 pl-oneScaledPix block">
        {text}
      </BitmapText>
    </div>
  );
};
export const DissapearingToolbarIcon = ({
  iconClassName,
}: {
  iconClassName: string;
}) => {
  return (
    <StackedToolbarIcons
      topClasses={twClass(
        "texture-bubbles_white_2 [button:hover_&]:texture-animated-bubbles_white",
      )}
      bottomClasses={iconClassName}
    />
  );
};
export const StackedToolbarIcons = ({
  topClasses,
  bottomClasses = "texture-headlessBase",
}: {
  topClasses: string;
  bottomClasses?: string;
}) => {
  return (
    <div className="relative w-full h-full">
      <span
        className={`sprite absolute top-[calc(9px*var(--scale))] left-0 ${bottomClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <span
        className={`sprite absolute top-[calc(-3px*var(--scale))] left-0 ${topClasses} ${buttonSpriteRevertColourClasses}`}
      />
    </div>
  );
};

const iconClassname = "[button:not(:disabled):hover_&]:hidden";
const topTextClassname =
  "hidden [button:not(:disabled):hover_&]:inline mt-quarter";
const bottomTextClassname = "hidden [button:not(:disabled):hover_&]:inline";
export const IconWithTwoLineHoverText = ({
  icon,
  topText,
  bottomText,
}: {
  icon: ReactElement;
  topText: string;
  bottomText: string;
}) => {
  return (
    <span className="w-full h-full flex flex-col items-center justify-center">
      <span className={iconClassname}>{icon}</span>
      <BitmapText className={topTextClassname}>{topText}</BitmapText>
      <BitmapText className={bottomTextClassname}>{bottomText}</BitmapText>
    </span>
  );
};
