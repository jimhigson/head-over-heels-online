import { type ComponentChildren } from "preact";
import { useCallback, useContext, useRef } from "preact/hooks";

import { type Xy } from "../../utils/vectors/vectors";
import { cn } from "../cn";
import { ContextMenu } from "../command/ContextMenu";
import { MenuBarContext } from "./MenuBarContext";

export type MenuProps = {
  label: string;
  /** shown in the bar in place of the label */
  name?: ComponentChildren;
  /** sits at the far end of the bar, with any menus after it */
  alignEnd?: boolean;
  /** the menu's items - usually `MenuItem`s */
  children: ComponentChildren;
};

/** one menu of a `MenuBar`: its name in the bar, and the items it drops down */
export const Menu = ({
  label,
  name,
  alignEnd = false,
  children,
}: MenuProps) => {
  const maybeMenuBar = useContext(MenuBarContext);
  if (import.meta.env.DEV && maybeMenuBar === null) {
    throw new Error("Menu must be rendered inside a MenuBar");
  }
  const {
    index,
    menuCount,
    openIndex,
    setOpenIndex,
    openIndexAtPointerDownRef,
  } = maybeMenuBar!;
  const isOpen = openIndex === index;
  const menuNameRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpenIndex(undefined), [setOpenIndex]);

  // drops down from below the menu's name:
  const anchor = useCallback((): Xy => {
    const menuName = menuNameRef.current;
    if (menuName === null) {
      return { x: 0, y: 0 };
    }
    const { left, bottom } = menuName.getBoundingClientRect();
    return { x: left, y: bottom };
  }, []);

  const moveToMenu = (delta: -1 | 1) =>
    setOpenIndex((openMenuIndex) =>
      openMenuIndex === undefined ? undefined : (
        (openMenuIndex + delta + menuCount) % menuCount
      ),
    );

  return (
    <>
      <button
        ref={menuNameRef}
        type="button"
        role="menuitem"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        class={cn(
          "text-single-line px-1 py-half",
          alignEnd && "ml-auto",
          isOpen ? "bg-metallicBlue text-white" : "hover:text-white",
        )}
        onPointerDown={() => {
          openIndexAtPointerDownRef.current = openIndex;
        }}
        onClick={() =>
          // the pointer going down dismissed any open menu, so check what was
          // open then - clicking an open menu's name closes it:
          setOpenIndex(
            openIndexAtPointerDownRef.current === index ? undefined : index,
          )
        }
        onPointerEnter={() => {
          if (openIndex !== undefined) {
            setOpenIndex(index);
          }
        }}
      >
        {name ?? label}
      </button>
      {isOpen && (
        <ContextMenu
          open
          onClose={close}
          anchor={anchor}
          onKeyDown={(keyboardEvent) => {
            if (keyboardEvent.key === "ArrowLeft") {
              moveToMenu(-1);
            } else if (keyboardEvent.key === "ArrowRight") {
              moveToMenu(1);
            }
          }}
        >
          <div
            class="contents"
            onClick={(mouseEvent) => {
              // choosing an item (by pointer or Enter, which clicks it) closes
              // the menu, unless it is one that changes a setting in place:
              const item = (mouseEvent.target as Element).closest(
                "[data-command-item]",
              );
              if (
                item !== null &&
                item.getAttribute("data-disabled") !== "true" &&
                item.getAttribute("data-keeps-menu-open") !== "true"
              ) {
                close();
              }
            }}
          >
            {children}
          </div>
        </ContextMenu>
      )}
    </>
  );
};
