#version 300 es
precision highp float;

/*
 * Widens the black outline where it has come out thinner than a source pixel
 * between the transparent outside and the fill, by taking transparent pixels
 * into it, one baked pixel a pass.
 *
 * The upscaled outline comes out anything from a sliver to the full width
 * of the stroke the artist drew, and the source art never has an outline
 * under a pixel wide. So from each transparent pixel the eight directions
 * are walked: where the walk goes straight into black and reaches a fill in
 * less than a source pixel's distance, the outline there is too thin, and
 * this pixel joins it. Width is measured along the walk, so a diagonal step
 * counts root two.
 *
 * A black stroke with transparent on both sides is not an outline and is left
 * as drawn, as is a fill touching the outside with no outline at all - the
 * walk has to begin on black and end on fill. The frames are given as a mask
 * colouring each in its own colour: only pixels inside a frame are taken, and
 * a walk never leaves the frame it began in, so nothing grows into the
 * gutters, out of a tile drawn to its very edge, or from one frame into the
 * next where two lie flush.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;
// the sheet's frames, at 1x: each frame's rect in a colour of its own
uniform sampler2D uFrames;

// one baked output pixel, in uv
uniform vec2 uPixelSize;
// baked pixels per source pixel: the width the outline is held to
uniform float uScale;

// how dark (relative to alpha, since the art is premultiplied) a pixel must
// be to count as the black linework rather than a colourised fill
const float blackThreshold = 0.1;

// 0 = transparent, 1 = black linework, 2 = colourised fill
float classOf(vec4 col){
	return step(0.5, col.a) * (1.0 + step(blackThreshold * col.a, max(col.r, max(col.g, col.b))));
}

// whether the pixel at uv is in the frame the fragment's own pixel is in
float inFrame(vec2 uv, vec4 frame){
	return float(all(equal(texture(uFrames, uv), frame)));
}

/*
 * 1.0 when walking from this pixel along `dir` crosses only black, then
 * reaches fill in under a source pixel. `outline` is the black pixel the walk
 * began on, the colour this pixel takes if it joins the outline
 */
float thinAlong(vec2 dir, vec4 frame, out vec4 outline){
	float stepLength = length(dir);
	vec2 uv = vUV + dir * uPixelSize;
	outline = texture(uTexture, uv);
	// the walk is over once it meets anything but black, or leaves the frame
	float onBlack = step(abs(classOf(outline) - 1.0), 0.5) * inFrame(uv, frame);
	float run = onBlack;
	float thin = 0.0;
	for (int i = 2; i <= int(uScale); i++) {
		if (onBlack < 0.5) {
			break;
		}
		uv = vUV + dir * uPixelSize * float(i);
		vec4 col = texture(uTexture, uv) * inFrame(uv, frame);
		float cls = classOf(col);
		// fill reached: thin if the black run so far is under a source pixel
		thin = max(thin, step(1.5, cls) * step(run * stepLength, uScale - 0.5));
		onBlack *= step(abs(cls - 1.0), 0.5);
		run += onBlack;
	}
	return thin;
}

void main(){
	vec4 c = texture(uTexture, vUV);
	vec4 frame = texture(uFrames, vUV);
	// only a transparent pixel inside a frame can join an outline
	if (c.a > 0.5 || frame.a < 0.5) {
		finalColor = c;
		return;
	}
	const vec2 dirs[8] = vec2[8](
		vec2(1.0, 0.0), vec2(-1.0, 0.0), vec2(0.0, 1.0), vec2(0.0, -1.0),
		vec2(1.0, 1.0), vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(-1.0, -1.0)
	);
	vec4 joined = c;
	float joins = 0.0;
	for (int d = 0; d < 8; d++) {
		vec4 outline;
		float thin = thinAlong(dirs[d], frame, outline);
		// the first direction found thin gives the colour
		joined = mix(joined, outline, thin * (1.0 - joins));
		joins = max(joins, thin);
	}
	finalColor = joined;
}
