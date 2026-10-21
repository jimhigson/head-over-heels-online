import { cn } from "./cn";

export type CurrentMarkerProps = {
  isCurrent: boolean;
  /**
   * in the text's own colour, for options already coloured (eg each room in its own)
   */
  uncoloured?: boolean;
};

/**
 * an arrow before the current (or checked) option of a list - a same-width
 * space before the others, so their text lines up
 */
export const CurrentMarker = ({
  isCurrent,
  uncoloured = false,
}: CurrentMarkerProps) => (
  <span class="text-single-line whitespace-pre">
    {isCurrent ?
      <span class={cn(!uncoloured && "text-moss")}>➡ </span>
    : "  "}
  </span>
);
