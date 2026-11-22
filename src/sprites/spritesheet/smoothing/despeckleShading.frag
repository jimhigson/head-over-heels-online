#version 300 es
precision highp float;

/*
 * Removes the specks cleanEdge leaves in the shading, at the resolution it
 * drew them: the second of two stages, run on the first's output
 * (despeckle.frag), which has already settled the classes - transparent,
 * black linework, colourised fill. This stage only recolours fill pixels,
 * and only with the colours of fills beside them, so the linework and the
 * silhouette stay exactly as the first stage left them.
 *
 * A fill pixel with no more than one of its four neighbours of its own
 * colour is a seam's stray, as the first stage explains for the classes,
 * and takes the colour the most of its fill neighbours share. Black and
 * transparent neighbours abstain, as they do in the upscale's colour pass,
 * so a fill pixel cut into a corner of the linework stays fill.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// one baked output pixel, in uv
uniform vec2 uPixelSize;

// how dark (relative to alpha, since the art is premultiplied) a pixel must
// be to count as the black linework rather than a colourised fill
const float blackThreshold = 0.1;

float isFill(vec4 col){
	return step(0.5, col.a) * step(blackThreshold * col.a, max(col.r, max(col.g, col.b)));
}

// 1.0 when the two are the exact same colour - the bake never blends, so
// every pixel is one of the palette's colours and equality is exact
float same(vec4 col1, vec4 col2){
	return step(distance(col1, col2), 0.0);
}

// how strongly the other three neighbours back this one as the
// replacement: nothing unless it is a fill, else one more for each of the
// others of its colour
float backing(vec4 col, vec4 other1, vec4 other2, vec4 other3){
	return isFill(col) * (1.0 + same(col, other1) + same(col, other2) + same(col, other3));
}

void main(){
	vec4 c = texture(uTexture, vUV);
	vec4 e = texture(uTexture, vUV + vec2( uPixelSize.x, 0.0));
	vec4 w = texture(uTexture, vUV + vec2(-uPixelSize.x, 0.0));
	vec4 s = texture(uTexture, vUV + vec2(0.0,  uPixelSize.y));
	vec4 n = texture(uTexture, vUV + vec2(0.0, -uPixelSize.y));

	float kin = same(c, e) + same(c, w) + same(c, s) + same(c, n);

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
	float takeN = step(best + 0.5, backN); winner = mix(winner, n, takeN); best = max(best, backN);

	finalColor = mix(c, winner, isFill(c) * step(kin, 1.5) * step(0.5, best));
}
