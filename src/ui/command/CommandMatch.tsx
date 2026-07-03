import { cn } from "../cn";
import { fuzzyMatch } from "./fuzzyMatch";
import { runsOf } from "./runsOf";
import { useCommandContext } from "./useCommandContext";

export type CommandMatchProps = {
  /** the text to render, with the part matching the current search highlighted */
  text: string;
  class?: string;
};

/**
 * Renders `text` with the characters matching the command's current search
 * wrapped in `.matched-text` spans, which reverse foreground/background (see the
 * `.command-colours`/`.matched-text` rules in commandColours.css). The enclosing
 * `CommandItem` sets `--command-secondary` (a per-variant palette default, or an
 * override such as `cssForRoomColour`). The same `fuzzyMatch` decides which
 * characters to highlight here and whether the item is visible at all (in
 * `CommandItem`), so the two always agree.
 */
export const CommandMatch = ({ text, class: className }: CommandMatchProps) => {
  const { search } = useCommandContext();
  const runs = runsOf(text, new Set(fuzzyMatch(text, search) ?? []));
  return (
    <span class={cn("text-single-line text-nowrap", className)}>
      {runs.map((run, i) =>
        run.matched ?
          <span key={i} class="matched-text inline-block">
            {run.text}
          </span>
        : run.text,
      )}
    </span>
  );
};
