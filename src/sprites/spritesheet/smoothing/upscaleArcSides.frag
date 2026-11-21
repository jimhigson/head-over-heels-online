#version 300 es
precision highp float;

/*
 * Each outline pixel's side in one frame, measured as if a peak ended there:
 * the side the arc passes read again at another pixel, kept here so that
 * measuring it is not repeated in their shaders. Output per texel of the
 * outline (all zero elsewhere, and where there is no side):
 *   r, g: the side's far end in the frame, x and y each + 128
 *   b: its last item's length less one where that is a vertical run (else
 *      0) | 8 where the side reaches the ellipse's widest point | 16
 *   a: 1
 */

#include "fragFns/upscaleArcCommon.glsl"
#include "fragFns/upscaleArcSide.glsl"

// the frame the sides are measured in, 0 to 7
uniform float uFrame;

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	if (!isLine(p)) return;
	int frame = int(uFrame);
	Side side = measureSide(p, frame);
	if (side.count == 0) return;
	int last = side.count - 1;
	int verticalLength = side.types[last] == itemVertical ? side.lengths[last] - 1 : 0;
	bool extreme = reachesExtreme(p, frame, side, side.count);
	ivec2 farEnd = side.farEnds[last];
	finalColor = vec4(
		packByte(float(farEnd.x + 128)),
		packByte(float(farEnd.y + 128)),
		packByte(float(verticalLength | (extreme ? 8 : 0) | 16)),
		1.0
	);
}
