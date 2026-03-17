import type { SanitisedForClassName } from "../../../game/components/tailwindSprites/SanitiseForClassName";
import type { AnimationId, TextureId } from "./spriteSheetData";

type ExpectedPrefixes =
  | ""
  | "[button:hover_&]:"
  | "activated:"
  | "hover:"
  | "selectedMenuItem:"
  | "zx:";

export type TextureTailwindClass =
  `${ExpectedPrefixes}texture-${SanitisedForClassName<TextureId>}`;
export type AnimatedTextureTailwindClass =
  `${ExpectedPrefixes}texture-animated-${"" | "reversed-"}${SanitisedForClassName<AnimationId>}`;
