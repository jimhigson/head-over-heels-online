/*
 * floating text appears above all 'normal' items. This number must be larger than the
 * number of items in the room to guarantee that.
 */
export const floatingTextFixedZIndex = 1000;

/**
 * non-rendering items should be given this fixedZ. Since rendering items' zIndexes
 * when sorted start at 0, this will never intersect the rendering items.
 */
export const nonRenderingItemFixedZIndex = -2;
