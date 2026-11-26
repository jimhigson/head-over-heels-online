import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";

/**
 * the utility class that draws a texture as an html sprite
 */
export const textureClassName = (textureId: string): string =>
  `texture-${sanitiseForClassName(textureId)}`;

/**
 * the utility class that plays an animation as an html sprite
 */
export const animatedTextureClassName = (
  animationId: string,
  /**
   * play the animation's frames backwards
   */
  reversed: boolean,
): string =>
  `texture-animated-${reversed ? "reversed-" : ""}${sanitiseForClassName(animationId)}`;
