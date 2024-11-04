import { UnknownItemInPlay } from "@/model/ItemInPlay";

// this is difficult to type correctly because the discrimination needs a union, but the
// union makes it hard to accept a generic to tie the item and newstate together
export const stateChangeNeedsRerender = (
  item: UnknownItemInPlay,
  newState: Record<string, unknown>,
): boolean => {
  switch (item.type) {
    case "head":
    case "heels":
      return (
        item.state.facing !== (newState as typeof item.state).facing ||
        item.state.movement !== (newState as typeof item.state).movement
      );
  }

  // don't re-render on state changes:
  return false;
};
