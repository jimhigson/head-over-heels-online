import { Children, type Fragment, type ReactElement } from "react";

import { MenuItems } from "../../MenuItems";
import { MenuSeparator } from "./MenuSeparator";

export type MaybeTwoColumnMenuitemsProps = {
  topContents: ReactElement;
  /* fragment containing all the elements to put in 1 or 2 columns */
  middleContents: ReactElement<{ children: ReactElement[] }, typeof Fragment>;
  bottomContents: ReactElement;
  columnCount: 1 | 2;
};

export const MaybeTwoColumnMenuitems = ({
  topContents,
  middleContents,
  bottomContents,
  columnCount,
}: MaybeTwoColumnMenuitemsProps) => {
  if (columnCount === 1) {
    return (
      <MenuItems className="mx-auto">
        {topContents}
        <MenuSeparator />
        {middleContents}
        {bottomContents}
      </MenuItems>
    );
  }

  const allMiddle = Children.toArray(middleContents.props.children);
  const column1 = allMiddle.filter((_, i) => i % 2 === 0);
  const column2 = allMiddle.filter((_, i) => i % 2 === 1);

  return (
    <>
      <MenuItems className="w-24 mx-auto">{topContents}</MenuItems>
      <div className="flex flex-row gap-2 w-24 mx-auto">
        <MenuItems className="w-12">{column1}</MenuItems>
        <MenuItems>{column2}</MenuItems>
      </div>
      <MenuItems className="w-24 mx-auto">{bottomContents}</MenuItems>
    </>
  );
};
