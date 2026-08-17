#version 300 es
precision highp float;

/*
 * Removes the specks cleanEdge leaves behind, at the resolution it drew them.
 *
 * cleanEdge decides each output pixel by a hard in/out test against a line it
 * fitted to the runs around one source pixel. Two things follow from that:
 * a line grazing the corner of a quadrant leaves a sliver one pixel across,
 * and two source pixels along the same edge can fit lines that do not meet,
 * stranding a pixel at the seam. Neither is anything the art asked for.
 *
 * A pixel with no more than one of its four neighbours to agree with it is
 * one of those, and can be nothing else: the bake is always at least twice
 * the source, so a single output pixel is a fraction of a source pixel and no
 * feature the artist drew can be that small. Ordinary staircase corners keep
 * two neighbours and are left alone, which is what stops this from rounding
 * off every diagonal.
 *
 * The replacement is whichever colour the most of the four neighbours share,
 * so a speck fills with what surrounds it rather than with a blend - this
 * pass introduces no colour the sheet did not already have.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// one baked output pixel, in uv
uniform vec2 uPixelSize;

// 1.0 when the two are the exact same colour - the bake never blends, so
// every pixel is one of the palette's colours and equality is exact
float same(vec4 col1, vec4 col2){
	return step(distance(col1, col2), 0.0);
}

void main(){
	vec4 c = texture(uTexture, vUV);
	vec4 e = texture(uTexture, vUV + vec2( uPixelSize.x, 0.0));
	vec4 w = texture(uTexture, vUV + vec2(-uPixelSize.x, 0.0));
	vec4 s = texture(uTexture, vUV + vec2(0.0,  uPixelSize.y));
	vec4 n = texture(uTexture, vUV + vec2(0.0, -uPixelSize.y));

	float kin = same(c, e) + same(c, w) + same(c, s) + same(c, n);

	// the colour the most of the four agree on; ties go to the first of
	// east/west/south/north, so the result does not depend on sample order
	float agreeE = same(e, w) + same(e, s) + same(e, n);
	float agreeW = same(w, e) + same(w, s) + same(w, n);
	float agreeS = same(s, e) + same(s, w) + same(s, n);
	float agreeN = same(n, e) + same(n, w) + same(n, s);
	vec4 winner = e;
	float best = agreeE;
	float takeW = step(best + 0.5, agreeW); winner = mix(winner, w, takeW); best = max(best, agreeW);
	float takeS = step(best + 0.5, agreeS); winner = mix(winner, s, takeS); best = max(best, agreeS);
	float takeN = step(best + 0.5, agreeN); winner = mix(winner, n, takeN);

	finalColor = mix(c, winner, step(kin, 1.5));
}
