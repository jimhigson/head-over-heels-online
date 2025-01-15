import { ScrollDialog } from "./ScrollDialog";
import { HoldDialog } from "./HoldDialog";
import { MenuDialog } from "./menu/MenuDialog";
import type { EmptyObject } from "type-fest";

export const Dialogs = (_emptyProps: EmptyObject) => {
  return (
    <>
      <ScrollDialog />
      <HoldDialog />
      <MenuDialog />
    </>
  );
};
