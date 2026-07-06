import plugin from "tailwindcss/plugin";

/**
 * Styles for the native (css anchor positioning + popover + interest invoker)
 * tooltips and popovers - see `src/ui/tip/Tip.tsx` and
 * `src/ui/PopoverPanel.tsx`.
 *
 * Chrome-only for now (anchor positioning is baseline but interest invokers
 * are Chrome 142+); tooltips/popovers are editor and debug surfaces, which
 * target Chrome.
 */
export const anchorPopovers = plugin(({ addBase, addComponents }) => {
  addBase({
    // hover intent for all interest invokers; --tipDelay can be set on any
    // ancestor to speed a whole surface up (eg the editor map)
    "[interestfor]": {
      "interest-delay": "var(--tipDelay, 450ms) 0s",
    },
  });

  // neutralise the UA [popover] styles (Canvas background, CanvasText colour,
  // 0.25em padding, border) so the popover behaves like a plain div, taking
  // its appearance from the app's own classes
  const uaPopoverReset = {
    margin: "0",
    border: "none",
    padding: "0",
    background: "transparent",
    color: "inherit",
    overflow: "visible",
  };

  addComponents({
    // tooltip anchored to its invoker (implicit anchor from interestfor)
    ".tip": {
      ...uaPopoverReset,
      position: "fixed",
      "position-area": "block-end span-inline-start",
      "position-try-fallbacks": "flip-block, flip-inline",
    },
    // tooltip positioned from an svg invoker's bounding rect (set as inline
    // left/top on each show, since anchors inside svg have no css boxes)
    ".tip-svg-invoker": {
      ...uaPopoverReset,
      position: "fixed",
      translate: "-50% 0",
    },
    // click-toggled panel anchored below its popovertarget invoker, at least
    // as wide as it
    ".popover-panel": {
      ...uaPopoverReset,
      position: "fixed",
      "position-area": "block-end span-inline-start",
      "position-try-fallbacks": "flip-block, flip-inline",
      "min-width": "anchor-size(width)",
    },
    // panel shown at an arbitrary viewport point (eg a context menu at the
    // mouse cursor), positioned with inline left/top
    ".popover-point": {
      ...uaPopoverReset,
      position: "fixed",
    },
  });
});
