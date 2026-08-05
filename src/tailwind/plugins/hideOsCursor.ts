import plugin from "tailwindcss/plugin";

/**
 * Hides the os cursor within an element and all its descendants - used only
 * around the in-game render area, where a software pointer draws a blocky
 * pointer sprite in its place. `!important` so it also beats elements asking
 * for a cursor of their own, eg the cursor-pointer on buttons. Distinct from
 * tailwind's own non-recursive, non-important `cursor-none` utility.
 */
export const hideOsCursor = plugin(({ addComponents }) => {
  addComponents({
    ".hide-os-cursor, .hide-os-cursor *": {
      cursor: "none !important",
    },
  });
});
