import { blockSizePx } from "../../physics/mechanicsConstants";

// bounding boxes for doors form a long tunnel-like structure longer than the door's rendering
// that extends out of the room. This helps with collision detection for items entering the room
// to not have MTVs that snag behind the door

export const doorTunnelLengthBlocks = 1;
/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = blockSizePx.z * 2;
const doorPostHeightBlocks = 4;
export const doorPostHeightPx = blockSizePx.z * doorPostHeightBlocks;
/** how many blocks wide is the door, including frame and doorway? */
const doorOverallWidthBlocks = 2;
export const doorOverallWidthPx = doorOverallWidthBlocks * blockSizePx.x;
/**
 * both posts are physically 8px along the wall at every camera angle. The
 * *drawn* posts are asymmetric (the apparently-nearer is 9px), which is
 * render-time-derived; freezing the physical width means the camera can
 * never change the room's geometry - at the cost of a constant 1px
 * art-vs-physics difference on exactly one post
 */
export const doorPostWidthPx = 8;
export const doorPostWidthInThroughDoorAxis = 8;
/**
 * the doorway gap the player walks through, and enters relative to, is placed
 * at the ORIGINAL game's asymmetric post widths (near 9px / far 8px) - NOT the
 * frozen 8px render posts. The portal is non-rendering physics, so keeping it
 * at the original geometry preserves the exact spot the player enters at (which
 * the first-frame scroll snaps to) without affecting the camera-invariant post
 * render. Baking the 9/8 asymmetry into world space is itself camera-invariant.
 */
export const entryNearPostWidthPx = 9;
export const entryFarPostWidthPx = 8;
// to be true to the original game, this should be 0.75 blocks, which is
// enough to be completely outside the doorframe, and to fall off the ledge
// of the door (if z>0)
export const autoWalkDistanceBlocks = 0.5;
// the stop autowalk isn't just a plane, in case the player gets pushed
// through a long way in one frame, like an item being introduced to
// the room, like the other player walking through the door
export const stopAutoWalkDepthBlocks = 0.5;
