import { ScrollDialog } from "./ScrollDialog";
import { HoldDialog } from "./HoldDialog";
import { MenuDialog } from "./menuDialog/MenuDialog";
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
