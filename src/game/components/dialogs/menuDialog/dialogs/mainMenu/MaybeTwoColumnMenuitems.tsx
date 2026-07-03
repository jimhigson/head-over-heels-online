import { type VNode } from "preact";
import { Children } from "preact/compat";

import { MenuItems } from "../../MenuItems";
import { MenuSeparator } from "./MenuSeparator";

export type MaybeTwoColumnMenuitemsProps = {
  topContents: VNode;
  /* fragment containing all the elements to put in 1 or 2 columns */
  middleContents: VNode<{ children: VNode[] }>;
  bottomContents: VNode;
  spaceOut?: boolean;
  columnCount: 1 | 2;
};

export const MaybeTwoColumnMenuitems = ({
  topContents,
  middleContents,
  bottomContents,
  columnCount,
  spaceOut = false,
}: MaybeTwoColumnMenuitemsProps) => {
  if (columnCount === 1) {
    return (
      <MenuItems class="mx-auto">
        {topContents}
        {spaceOut && <MenuSeparator />}
        {middleContents}
        {bottomContents}
      </MenuItems>
    );
  }

  const allMiddle = Children.toArray(middleContents.props.children);
  const column1 = allMiddle.filter((_, i) => i % 2 === 0);
  const column2 = allMiddle.filter((_, i) => i % 2 === 1);

  return (
    <div>
      <MenuItems class="w-24 mx-auto mb-1">{topContents}</MenuItems>
      <div class="flex flex-row gap-2 w-24 mx-auto">
        <MenuItems class="w-12">{column1}</MenuItems>
        <MenuItems>{column2}</MenuItems>
      </div>
      <MenuItems class="w-24 mx-auto">{bottomContents}</MenuItems>
    </div>
  );
};
