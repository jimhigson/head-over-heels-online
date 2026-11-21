#version 300 es
precision highp float;

/*
 * Takes the anti-aliasing out of the 1x sheet before it is upscaled. The art
 * softens the inside corner of its outline with a darker shade: a fill pixel
 * tucked into a corner of the black outline - black above and beside it,
 * with the outside of the sprite beyond the corner, whether the outline
 * turns there or steps on as a slope - and lighter shades of its own hue on
 * its two open sides. At 1x that shade reads as a rounder corner; the
 * upscale rounds the corner itself, so the shade only muddies it. Such a
 * pixel takes the darker of the two shades beside it. A dark or greyish
 * colour counts as a shade of whatever hue it sits in, as pixel art often
 * uses one, and so may be lightened to a greyish shade too.
 *
 * The corner is matched in all eight orientations (four rotations, each
 * mirrored), and every match reads only the original pixels, so the result
 * does not depend on the order pixels are visited in.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

const float blackThreshold = 0.1;

// how far apart, in degrees, a shade's hue may be from the lighter one's
const float hueTolerance = 30.0;

// the chroma (its strongest channel less its weakest) at and above which a
// shade is held to hueTolerance. Below it the tolerance widens in inverse
// proportion: pixel art uses a dark or greyish colour as a generic darker
// shade of whatever it sits in, and the darker and greyer a colour is, the
// less its hue says
const float fullChroma = 0.4;

// the chroma at and below which a shade's hue says nothing at all: it sits
// in any hue
const float greyChroma = 0.1;

// how saturated the lighter shades must be to have a hue at all: below this,
// eg the whites and greys, they are shades of nothing - to a darker shade
// with a hue of its own; a dark or greyish one sits in them as in any
const float minSaturation = 0.2;

vec4 srcAt(ivec2 p){
	return texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
}

// 0 = transparent, 1 = black linework, 2 = colourised fill
int classOf(vec4 col){
	if (col.a < 0.5) return 0;
	return max(col.r, max(col.g, col.b)) > blackThreshold * col.a ? 2 : 1;
}

float luma(vec4 col){
	return dot(col.rgb / col.a, vec3(0.2126, 0.7152, 0.0722));
}

// hue in degrees and saturation, as hue-lightness-saturation reckons them
vec2 hueAndSaturation(vec4 col){
	vec3 rgb = col.rgb / col.a;
	float high = max(rgb.r, max(rgb.g, rgb.b));
	float low = min(rgb.r, min(rgb.g, rgb.b));
	float range = high - low;
	if (range <= 0.0) return vec2(0.0);
	float lightness = (high + low) * 0.5;
	float saturation = lightness <= 0.5 ? range / (high + low) : range / (2.0 - high - low);
	float hue = high == rgb.r ? mod((rgb.g - rgb.b) / range, 6.0)
		: high == rgb.g ? (rgb.b - rgb.r) / range + 2.0
		: (rgb.r - rgb.g) / range + 4.0;
	return vec2(hue * 60.0, saturation);
}

float chroma(vec4 col){
	vec3 rgb = col.rgb / col.a;
	return max(rgb.r, max(rgb.g, rgb.b)) - min(rgb.r, min(rgb.g, rgb.b));
}

// whether the darker shade own is near enough in hue to the lighter col
bool sameHue(vec4 own, vec4 col){
	vec2 ownHue = hueAndSaturation(own);
	vec2 colHue = hueAndSaturation(col);
	float apart = abs(ownHue.x - colHue.x);
	apart = min(apart, 360.0 - apart);
	if (chroma(own) <= greyChroma) return true;
	float tolerance = hueTolerance * max(1.0, fullChroma / max(chroma(own), 1e-6));
	bool colHasHue = colHue.y >= minSaturation || chroma(own) < fullChroma;
	return colHasHue && apart <= tolerance;
}

// a lighter shade of own's hue
bool lighterShade(vec4 own, vec4 col){
	return classOf(col) == 2 && sameHue(own, col) && luma(col) > luma(own);
}

// the corner in one orientation: x and y are the directions, in the sheet,
// of the kernel's right and down
bool cornerMatches(ivec2 p, vec4 own, ivec2 x, ivec2 y, out vec4 replacement){
	vec4 right = srcAt(p + x);
	vec4 below = srcAt(p + y);
	replacement = luma(right) <= luma(below) ? right : below;
	return classOf(srcAt(p - x - y)) == 0
		&& classOf(srcAt(p - y)) == 1
		&& classOf(srcAt(p - x)) == 1
		&& lighterShade(own, right)
		&& lighterShade(own, below);
}

const ivec2 rotations[4] = ivec2[4](ivec2(1, 0), ivec2(0, 1), ivec2(-1, 0), ivec2(0, -1));

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	vec4 own = srcAt(p);
	finalColor = own;
	if (classOf(own) != 2) return;
	// the darkest shade any matching orientation offers, so that a pixel
	// matched more than one way is decided the same in a mirror image
	vec4 darkest = own;
	bool matched = false;
	for (int r = 0; r < 4; r++){
		ivec2 x = rotations[r];
		ivec2 y = ivec2(-x.y, x.x);
		for (int m = 0; m < 2; m++){
			ivec2 mirroredX = m == 0 ? x : -x;
			vec4 replacement;
			if (cornerMatches(p, own, mirroredX, y, replacement) && (!matched || luma(replacement) < luma(darkest))){
				darkest = replacement;
				matched = true;
			}
		}
	}
	finalColor = darkest;
}
