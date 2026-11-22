#version 300 es
precision highp float;

/*
 * The stand-in colour of every pixel of the 1x sheet, for the colour pass of
 * upscaleTwoPass.frag: a fill is its own colour, and a black pixel of the
 * linework is read as the fill nearest to it, so the shading is resolved as
 * the colourist painted it - in regions that run on beneath the lines.
 *
 * The nearest fills are taken ring by ring (sides, then diagonals, then two
 * away...); of the nearest ring's fills the commonest colour stands in, a
 * tie going to the lighter, so the choice is the same in a mirror image. A
 * black pixel with no fill within reach, or a transparent one, keeps its
 * own sample and abstains as before.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

const float blackThreshold = 0.1;

vec4 srcAt(ivec2 p){
	return texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
}

// 0 = transparent, 1 = black linework, 2 = colourised fill
int classOf(vec4 col){
	if (col.a < 0.5) return 0;
	return max(col.r, max(col.g, col.b)) > blackThreshold * col.a ? 2 : 1;
}

// neighbour offsets in order of distance, with where each ring ends
const int ringCount = 6;
const int ringEnd[ringCount] = int[ringCount](4, 8, 12, 20, 24, 28);
const ivec2 offsets[28] = ivec2[28](
	ivec2( 1, 0), ivec2(-1, 0), ivec2( 0, 1), ivec2( 0,-1),
	ivec2( 1, 1), ivec2(-1, 1), ivec2( 1,-1), ivec2(-1,-1),
	ivec2( 2, 0), ivec2(-2, 0), ivec2( 0, 2), ivec2( 0,-2),
	ivec2( 2, 1), ivec2(-2, 1), ivec2( 2,-1), ivec2(-2,-1), ivec2( 1, 2), ivec2(-1, 2), ivec2( 1,-2), ivec2(-1,-2),
	ivec2( 2, 2), ivec2(-2, 2), ivec2( 2,-2), ivec2(-2,-2),
	ivec2( 3, 0), ivec2(-3, 0), ivec2( 0, 3), ivec2( 0,-3)
);

float lightness(vec4 col){
	return -distance(col.rgb, vec3(1.0));
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	vec4 own = srcAt(p);
	finalColor = own;
	if (classOf(own) != 1) return;
	int start = 0;
	for (int ring = 0; ring < ringCount; ring++){
		int end = ringEnd[ring];
		vec4 best = vec4(0.0);
		int bestCount = 0;
		for (int i = start; i < end; i++){
			vec4 candidate = srcAt(p + offsets[i]);
			if (classOf(candidate) != 2) continue;
			int count = 0;
			for (int j = start; j < end; j++){
				if (distance(srcAt(p + offsets[j]), candidate) == 0.0) count++;
			}
			if (count > bestCount || (count == bestCount && lightness(candidate) > lightness(best))){
				best = candidate;
				bestCount = count;
			}
		}
		if (bestCount > 0){
			finalColor = best;
			return;
		}
		start = end;
	}
}
