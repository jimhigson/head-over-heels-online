#version 300 es
precision highp float;

/*
 * Finds, for every 2x2 cell of the 1x sheet, whether its two diagonals are in
 * contention - the decision the upscale's slicing then draws.
 *
 * A cell whose two diagonals each join a pair of alike pixels, with the pairs
 * unlike each other, is a crossing: only one diagonal can connect, and which
 * one is not a local question. Two layers are seen in the same samples, as
 * the render pass sees them:
 *
 * - layer A sees three states only - transparent, black linework, or
 *   colourised fill - and settles the linework's geometry. It never reads
 *   the shading: the colourisation may not move the authored outlines. Its
 *   crossings leave here unresolved, for upscaleGraphRound.frag to settle
 *   over its rounds;
 * - layer B sees the fill colours themselves, with black and transparent
 *   abstaining, and settles where one shade meets another beneath the
 *   linework, by the heuristics of Kopf & Lischinski's "Depixelizing Pixel
 *   Art": the longer chain of valence-2 pixels wins by the difference in
 *   length, the sparser colour in the 8x8 window around the cell wins by
 *   the difference in counts, and a pixel whose only connection is the
 *   diagonal votes to keep it. A tie goes to the lighter shade.
 *
 * Output per texel, for the cell whose top-left pixel it is:
 *   r: layer A   g: layer B
 *   0.00 no crossing   0.25 crossing, unresolved
 *   0.50 top-left to bottom-right connects   0.75 top-right to bottom-left
 *   1.00 crossing in a chequerboard: neither connects
 */

#include "fragFns/upscaleGraphCommon.glsl"

// the half-width of the window the sparse-pixels vote counts over
const int sparseWindowRadius = 4;

int countInWindow(ivec2 tl, vec4 ref){
	int n = 0;
	for (int dy = -sparseWindowRadius + 1; dy <= sparseWindowRadius; dy++){
		for (int dx = -sparseWindowRadius + 1; dx <= sparseWindowRadius; dx++){
			if (alikeB(ref, srcAt(tl + ivec2(dx, dy)))) n++;
		}
	}
	return n;
}

float resolveB(ivec2 tl){
	vec4 a = srcAt(tl);
	vec4 b = srcAt(tl + ivec2(1, 0));
	vec4 c = srcAt(tl + ivec2(0, 1));
	vec4 d = srcAt(tl + ivec2(1, 1));
	if (!alikeB(a, d) || !alikeB(b, c) || alikeB(a, b)) return noCrossing;

	// votes for the a-d diagonal, negative for b-c
	int votes = curveLength(tl, tl + ivec2(1, 1), a, true)
		- curveLength(tl + ivec2(1, 0), tl + ivec2(0, 1), b, true);
	votes += islandVotes(tl, a, b, true);
	// the sparser colour wins: a-d gains by how much commoner b-c's colour is
	votes += countInWindow(tl, b) - countInWindow(tl, a);

	if (votes > 0) return tlBrConnects;
	if (votes < 0) return trBlConnects;
	float aLight = distance(a.rgb, vec3(1.0));
	float bLight = distance(b.rgb, vec3(1.0));
	return aLight <= bLight ? tlBrConnects : trBlConnects;
}

float findA(ivec2 tl){
	int a = classAt(tl);
	int b = classAt(tl + ivec2(1, 0));
	int c = classAt(tl + ivec2(0, 1));
	int d = classAt(tl + ivec2(1, 1));
	if (!(a == d && b == c && a != b)) return noCrossing;
	if (inChequer(tl) || inChequer(tl + ivec2(1, 0)) || inChequer(tl + ivec2(0, 1)) || inChequer(tl + ivec2(1, 1))) return neitherConnects;
	return unresolved;
}

void main(){
	ivec2 tl = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(findA(tl), resolveB(tl), 0.0, 1.0);
}
