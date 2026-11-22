#version 300 es
precision highp float;

/*
 * Removes the specks cleanEdge leaves behind in the linework, at the
 * resolution it drew them: the first of two stages, deciding only the
 * classes - transparent, black linework, colourised fill - as the upscale's
 * own geometry pass does. The shading within the fills is left to the
 * second stage (despeckleShading.frag).
 *
 * cleanEdge decides each output pixel by a hard in/out test against a line it
 * fitted to the runs around one source pixel. Two things follow from that:
 * a line grazing the corner of a quadrant leaves a sliver one pixel across,
 * and two source pixels along the same edge can fit lines that do not meet,
 * stranding a pixel at the seam. Neither is anything the art asked for.
 *
 * A pixel with no more than one of its four neighbours of its own class is
 * one of those, and can be nothing else: the bake is always at least twice
 * the source, so a single output pixel is a fraction of a source pixel and no
 * feature the artist drew can be that small. Ordinary staircase corners keep
 * two neighbours and are left alone, which is what stops this from rounding
 * off every diagonal. Only the class counts here: a fill pixel at a seam in
 * the shading is still fill, however its colour differs from those beside.
 *
 * The replacement is a neighbour of the class the most of the four share,
 * and of those the colour the most share, so a speck fills with what
 * surrounds it rather than with a blend - this pass introduces no colour the
 * sheet did not already have.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// one baked output pixel, in uv
uniform vec2 uPixelSize;

// how dark (relative to alpha, since the art is premultiplied) a pixel must
// be to count as the black linework rather than a colourised fill
const float blackThreshold = 0.1;

// 0 = transparent, 1 = black linework, 2 = colourised fill
float classOf(vec4 col){
	return step(0.5, col.a) * (1.0 + step(blackThreshold * col.a, max(col.r, max(col.g, col.b))));
}

float sameClass(vec4 col1, vec4 col2){
	return step(abs(classOf(col1) - classOf(col2)), 0.5);
}

// 1.0 when the two are the exact same colour - the bake never blends, so
// every pixel is one of the palette's colours and equality is exact
float same(vec4 col1, vec4 col2){
	return step(distance(col1, col2), 0.0);
}

// how strongly the other three neighbours back this one as the
// replacement: its class first, then, among its class, its colour
float backing(vec4 col, vec4 other1, vec4 other2, vec4 other3){
	float classes = sameClass(col, other1) + sameClass(col, other2) + sameClass(col, other3);
	float colours = same(col, other1) + same(col, other2) + same(col, other3);
	return 4.0 * classes + colours;
}

void main(){
	vec4 c = texture(uTexture, vUV);
	vec4 e = texture(uTexture, vUV + vec2( uPixelSize.x, 0.0));
	vec4 w = texture(uTexture, vUV + vec2(-uPixelSize.x, 0.0));
	vec4 s = texture(uTexture, vUV + vec2(0.0,  uPixelSize.y));
	vec4 n = texture(uTexture, vUV + vec2(0.0, -uPixelSize.y));

	float kin = sameClass(c, e) + sameClass(c, w) + sameClass(c, s) + sameClass(c, n);

	// ties go to the first of east/west/south/north, so the result does not
	// depend on sample order
	float backE = backing(e, w, s, n);
	float backW = backing(w, e, s, n);
	float backS = backing(s, e, w, n);
	float backN = backing(n, e, w, s);
	vec4 winner = e;
	float best = backE;
	float takeW = step(best + 0.5, backW); winner = mix(winner, w, takeW); best = max(best, backW);
	float takeS = step(best + 0.5, backS); winner = mix(winner, s, takeS); best = max(best, backS);
	float takeN = step(best + 0.5, backN); winner = mix(winner, n, takeN);

	finalColor = mix(c, winner, step(kin, 1.5));
}
