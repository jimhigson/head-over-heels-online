import type { UnknownItemInPlay } from "@/model/ItemInPlay";

// this is difficult to type correctly because the discrimination needs a union, but the
// union makes it hard to accept a generic to tie the item and newstate together
export const itemNeedsRerender = (item: UnknownItemInPlay): boolean => {
  if (item.lastRenderedState === undefined) {
    // if never rendered before, we always re-render
    return true;
  }

  switch (item.type) {
    case "head":
    case "heels":
      return (
        item.state.facing !== item.lastRenderedState.facing ||
        item.state.action !== item.lastRenderedState.action ||
        item.state.teleporting?.phase !==
          item.lastRenderedState.teleporting?.phase
      );

    case "teleporter":
    case "spring": {
      return item.state.stoodOn !== item.lastRenderedState.stoodOn;
    }

    // disappearing items need to re-render when they are marked as expired
    case "block":
    case "barrier":
    case "fish":
    case "pickup": {
      return item.state.expires !== item.lastRenderedState.expires;
    }

    default:
      // by default, we don't re-render on state changes:
      return false;
  }
};
