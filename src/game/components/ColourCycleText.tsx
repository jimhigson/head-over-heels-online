import { type ReactElement } from "react";

export type ColourCycleTextProps = {
  children: string;
  /**
   * per-character className cycle (usually text colours) - each character is
   * given the next className in the list, wrapping back to the start
   */
  classnameCycle: string[];
  className?: string;
};

/**
 * Renders text with a className (usually a text colour) cycling
 * character-by-character: each character is wrapped in its own span carrying the
 * next className from the cycle.
 */
export const ColourCycleText = ({
  children,
  classnameCycle,
  className,
}: ColourCycleTextProps): ReactElement => (
  <span className={className}>
    {Array.from(children).map((char, charIndex) => (
      <span
        className={classnameCycle[charIndex % classnameCycle.length]}
        key={charIndex}
      >
        {char}
      </span>
    ))}
  </span>
);
