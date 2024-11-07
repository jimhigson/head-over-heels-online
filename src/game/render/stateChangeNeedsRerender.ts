import { UnknownItemInPlay } from "@/model/ItemInPlay";

// this is difficult to type correctly because the discrimination needs a union, but the
// union makes it hard to accept a generic to tie the item and newstate together
export const stateChangeNeedsRerender = (
  item: UnknownItemInPlay,
  previousState: Record<string, unknown>,
): boolean => {
  switch (item.type) {
    case "head":
    case "heels":
      return (
        item.state.facing !== (previousState as typeof item.state).facing ||
        item.state.movement !== (previousState as typeof item.state).movement ||
        item.state.teleporting?.phase !==
          (previousState as typeof item.state).teleporting?.phase
      );

    case "teleporter": {
      return (
        item.state.flashing !== (previousState as typeof item.state).flashing
      );
    }
  }

  // don't re-render on state changes:
  return false;
};
