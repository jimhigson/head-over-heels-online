import { type VNode } from "preact";

export type ColourCycleTextProps = {
  children: string;
  /**
   * per-character className cycle (usually text colours) - each character is
   * given the next className in the list, wrapping back to the start
   */
  classnameCycle: string[];
  class?: string;
};

/**
 * Renders text with a className (usually a text colour) cycling
 * character-by-character: each character is wrapped in its own span carrying the
 * next className from the cycle.
 */
export const ColourCycleText = ({
  children,
  classnameCycle,
  class: className,
}: ColourCycleTextProps): VNode => (
  <span class={className}>
    {Array.from(children).map((char, charIndex) => (
      <span
        class={classnameCycle[charIndex % classnameCycle.length]}
        key={charIndex}
      >
        {char}
      </span>
    ))}
  </span>
);
