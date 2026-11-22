#version 300 es
precision highp float;

/*
 * Whether the ring each peak tops closes, for the peaks pass: per texel at a
 * peak's left end in a quarter's frame, read as a peak facing that way and
 * as one facing back from its right end. Output (all zero elsewhere):
 *   r: bit q where the ring closes on the peak facing quarter q's way, bit
 *      4 + q where it closes on the peak facing back from its right end
 *   a: 1
 *
 * The sides are read from the sides pass, one texture per frame, rather than
 * measured here: measuring them in this shader as well as walking the ring
 * makes it slow to compile on some drivers
 */

#include "fragFns/upscaleArcCommon.glsl"
#include "fragFns/upscaleArcSide.glsl"

// each frame's sides, frames 0 to 7
uniform sampler2D uSides0;
uniform sampler2D uSides1;
uniform sampler2D uSides2;
uniform sampler2D uSides3;
uniform sampler2D uSides4;
uniform sampler2D uSides5;
uniform sampler2D uSides6;
uniform sampler2D uSides7;

// what the sides pass keeps of a side
struct SideSummary {
	bool exists;
	bool extreme;
	// the last item's far end, in the frame
	ivec2 farEnd;
	// the last item's length less one where it is a vertical run, else 0
	int verticalLength;
};

vec4 sidesTexel(int frame, ivec2 p){
	vec2 uv = (vec2(p) + 0.5) / uSheetSize;
	if (frame == 0) return texture(uSides0, uv);
	if (frame == 1) return texture(uSides1, uv);
	if (frame == 2) return texture(uSides2, uv);
	if (frame == 3) return texture(uSides3, uv);
	if (frame == 4) return texture(uSides4, uv);
	if (frame == 5) return texture(uSides5, uv);
	if (frame == 6) return texture(uSides6, uv);
	return texture(uSides7, uv);
}

// the side of the peak ending at origin, in the frame
SideSummary sideAt(ivec2 origin, int frame){
	vec4 texel = sidesTexel(frame, origin);
	int bits = unpackByte(texel.b);
	SideSummary side;
	side.exists = (bits & 16) != 0;
	side.extreme = (bits & 8) != 0;
	side.verticalLength = bits & 7;
	side.farEnd = ivec2(unpackByte(texel.r) - 128, unpackByte(texel.g) - 128);
	return side;
}

// the pixel the side's last item ends at, in the sheet
ivec2 sideEnd(ivec2 origin, int frame, SideSummary side){
	return origin + toSheet(side.farEnd, frame);
}

// the middle of the side's last item, in the sheet: the same whichever
// end of the ring the item is measured from
vec2 sideMiddle(ivec2 origin, int frame, SideSummary side){
	ivec2 start = side.farEnd - ivec2(0, side.verticalLength);
	return vec2(origin) + toSheetF(vec2(start + side.farEnd) * 0.5, frame);
}

// the furthest the outline is walked on from a widest point to find the
// ring's far run
const int maxWalk = 64;

// whether the run of peakLength at row y of the frame, with the outside
// beyond it, is bounded: the peak's mirror run across the ellipse
bool mirrorRunAt(ivec2 origin, int quarter, int peakLength, int y){
	for (int i = 0; i < maxPeakLength; i++){
		if (i >= peakLength) break;
		ivec2 v = ivec2(i, y);
		if (!isLine(origin + toSheet(v, quarter)) || !isOutside(origin + toSheet(v + ivec2(0, 1), quarter))) return false;
	}
	return !isLine(origin + toSheet(ivec2(-1, y), quarter)) && !isLine(origin + toSheet(ivec2(peakLength, y), quarter));
}

// whether the ring the peak tops closes: walked on from the left widest
// point, the outline reaches the end of the peak's mirror run across the
// ring, and that run's own sides, as a peak's facing the other way, end at
// the same two widest points. Walking on turns back toward the far run,
// which is toward the horizontal end in the frame across from this one
bool ringCloses(ivec2 origin, int quarter, int peakLength, SideSummary left, SideSummary right){
	int across = (quarter + 2) & 3;
	ivec2 rightOrigin = origin + toSheet(ivec2(peakLength - 1, 0), quarter);
	ivec2 leftExtreme = sideEnd(origin, quarter, left);
	int bottom = -1;
	ivec2 v = ivec2(0);
	for (int step = 0; step < maxWalk; step++){
		ivec2 at = toFrame(leftExtreme + toSheet(v, across + 4) - origin, quarter);
		if (at.x == 0 && at.y >= 2 && mirrorRunAt(origin, quarter, peakLength, at.y)){
			bottom = at.y;
			break;
		}
		ivec2 next;
		if (towardHorizontalEnd(leftExtreme, across + 4, v, next) == moveNone) return false;
		v = next;
	}
	if (bottom < 0) return false;
	// the mirror run's left end, in the frame across, is this frame's right
	ivec2 farLeft = origin + toSheet(ivec2(peakLength - 1, bottom), quarter);
	ivec2 farRight = origin + toSheet(ivec2(0, bottom), quarter);
	SideSummary farLeftSide = sideAt(farLeft, across);
	SideSummary farRightSide = sideAt(farRight, across + 4);
	if (!farLeftSide.exists || !farRightSide.exists) return false;
	if (!farLeftSide.extreme || !farRightSide.extreme) return false;
	return sideMiddle(farLeft, across, farLeftSide) == sideMiddle(rightOrigin, quarter + 4, right)
		&& sideMiddle(farRight, across + 4, farRightSide) == sideMiddle(origin, quarter, left);
}

// whether the ring closes on the peak whose near end is at nearOrigin, facing
// the frame's way: both its sides reach the widest points, and the outline
// runs on from them around to the peak's mirror run
bool ringOf(ivec2 nearOrigin, int frame, int peakLength){
	ivec2 farOrigin = nearOrigin + toSheet(ivec2(peakLength - 1, 0), frame);
	SideSummary nearSide = sideAt(nearOrigin, frame);
	SideSummary farSide = sideAt(farOrigin, frame + 4);
	return nearSide.exists && farSide.exists && nearSide.extreme && farSide.extreme
		&& ringCloses(nearOrigin, frame, peakLength, nearSide, farSide);
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	if (!isLine(p)) return;
	int rings = 0;
	for (int quarter = 0; quarter < 4; quarter++){
		int peakLength;
		ivec2 rightOrigin;
		if (!findPeak(p, quarter, peakLength, rightOrigin)) continue;
		if (ringOf(p, quarter, peakLength)) rings |= 1 << quarter;
		if (ringOf(rightOrigin, (quarter + 2) & 3, peakLength)) rings |= 1 << (4 + quarter);
	}
	finalColor = vec4(packByte(float(rings)), 0.0, 0.0, 1.0);
}
