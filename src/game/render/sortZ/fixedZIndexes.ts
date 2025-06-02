// nothing can be in front of the floor edge
export const floorEdgeFixedZIndex = 1_100;
// floating text appears above all 'normal' items. This number must be larger than the
// number of items in the room to guarantee that.
export const floatingTextFixedZIndex = 1_000;

/* nothing can render on top of the floor */
export const floorItemFixedZIndex = -1;

// non-rendering items should be given this fixedZ. Since rendering items' zIndexes
// when sorted start at 0, this will never intersect the rendering items.
export const nonRenderingItemFixedZIndex = -2;
