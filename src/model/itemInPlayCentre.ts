import { type UnionOfAllItemInPlayTypes } from "./ItemInPlayNarrowedUnions";

export const itemInPlayCentre = (item: UnionOfAllItemInPlayTypes) => {
  const { box } = item.state;
  return {
    x: box.x + box.xd / 2,
    y: box.y + box.yd / 2,
    z: box.z + box.zd / 2,
  };
};
