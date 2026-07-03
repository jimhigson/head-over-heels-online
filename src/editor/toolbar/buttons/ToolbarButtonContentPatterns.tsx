import { type VNode } from "preact";

import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { twClass } from "../../../utils/twClass";
import { buttonSpriteRevertColourClasses } from "../buttonSizeClassNames";

/** a main icon, plus a small explanatory side-icon giving some attribute such as conveyor direction */
export const LabelledToolbarIcon = ({
  iconClasses,
  text,
  class: className = "",
}: {
  iconClasses: string;
  text: string;
  class?: string;
}) => {
  return (
    <div class={`relative w-full h-full ${className}`}>
      <span
        class={`sprite absolute top-0 left-0 ${iconClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <span class="bg-moss text-pureBlack absolute top-0 left-0 pl-oneScaledPix py-oneScaledPix block text-single-line">
        {text}
      </span>
    </div>
  );
};
/** icon with a puff of smoke also, indicating a disappearing item */
export const DissapearingItemToolbarIcon = ({
  iconClassName,
}: {
  iconClassName: string;
}) => {
  return (
    <StackedToolbarIcons
      topClasses={twClass(
        `${"texture-bubbles_white_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_white" satisfies AnimatedTextureTailwindClass}`,
      )}
      bottomClasses={iconClassName}
    />
  );
};
export const StackedToolbarIcons = ({
  topClasses,
  bottomClasses = "texture-headlessBase" satisfies TextureTailwindClass,
}: {
  topClasses: string;
  bottomClasses?: string;
}) => {
  return (
    <div class="relative w-full h-full">
      <span
        class={`sprite absolute top-[calc(9px*var(--scale))] left-0 ${bottomClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <span
        class={`sprite absolute top-[calc(-3px*var(--scale))] left-0 ${topClasses} ${buttonSpriteRevertColourClasses}`}
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
  icon: VNode;
  topText: string;
  bottomText: string;
}) => {
  return (
    <span class="w-full h-full flex flex-col items-center justify-center">
      <span class={iconClassname}>{icon}</span>
      <span class={`${topTextClassname} text-single-line`}>{topText}</span>
      <span class={`${bottomTextClassname} text-single-line`}>
        {bottomText}
      </span>
    </span>
  );
};
