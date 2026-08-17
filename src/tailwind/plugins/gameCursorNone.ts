import plugin from "tailwindcss/plugin";

/**
 * Hides the os cursor within an element and all its descendants - used only
 * around the in-game render area, where SoftwarePointer draws a blocky
 * pointer sprite in its place. `!important` so it also beats elements asking
 * for a cursor of their own, eg the cursor-pointer on buttons. Distinct from
 * tailwind's own non-recursive, non-important `cursor-none` utility.
 */
export const gameCursorNone = plugin(({ addComponents }) => {
  addComponents({
    ".game-cursor-none, .game-cursor-none *": {
      cursor: "none !important",
    },
  });
});
