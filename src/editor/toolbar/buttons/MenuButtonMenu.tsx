import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

import { Command } from "../../../ui/command/Command";
import { CommandList } from "../../../ui/command/CommandList";

/**
 * the dropdown of a `MenuButton` (eg the arrow beside the toolbar's Playtest,
 * Save as and Revert buttons), holding ordinary `MenuItem`s - the same ones
 * the editor's menu bar uses, so a toolbar dropdown and the matching top menu
 * show identical items.
 *
 * `MenuItem`s must be rendered inside a `Command` with a `CommandList`, which
 * give them keyboard navigation and the active-item highlight. The menu bar's
 * menus provide that already; this provides it for a toolbar dropdown.
 */
export const MenuButtonMenu = ({
  children,
}: PropsWithChildren<EmptyObject>) => (
  <Command>
    <CommandList>{children}</CommandList>
  </Command>
);
