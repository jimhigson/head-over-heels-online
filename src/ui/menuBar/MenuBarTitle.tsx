import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

/**
 * a `MenuBar`'s title, between its menus, with equal gaps either side that
 * grow to fill the bar
 */
export const MenuBarTitle = ({ children }: PropsWithChildren<EmptyObject>) => (
  <>
    <div class="flex-1" />
    <div class="flex items-center min-w-0 overflow-hidden px-1">{children}</div>
    <div class="flex-1" />
  </>
);
