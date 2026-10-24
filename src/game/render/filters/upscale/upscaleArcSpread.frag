#version 300 es
precision highp float;

/*
 * The last of the arc passes: a pixel beside an arc, not of its line, is
 * drawn to the arc's ellipse too, so that the ellipse decides the whole of
 * the band it draws, on both sides of the arc's pixels. Only a pixel that
 * touches none of the line but its one arc's is: one that also touches
 * other lines is left to the ordinary slicing, which knows about both.
 *
 * A layered arc (see upscaleArcs.frag) draws three layers, so this pass
 * runs twice for coloured lines' arcs: the first ring takes in every black
 * pixel touching a layered arc's drawn pixels - its two black layers - and
 * the second the pixels beyond those layers, where they touch no other
 * black.
 *
 * Each ring only takes in pixels whose centres lie as far from the arc's
 * ellipse as its layer does, so that a ring cannot wander off into the art
 * beside the arc.
 *
 * Output per texel: as upscaleArcs.frag, for every pixel drawn to an
 * ellipse, with b | 8 for a pixel taken in by this pass rather than one of
 * the arc's own.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the arcs' black pixels, from upscaleArcs.frag
uniform sampler2D uArcPixels;

// each arc's ellipse, at its anchor
uniform sampler2D uArcCentres;
uniform sampler2D uArcAxes;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

// which kind of line the arcs were traced along: 0 black, 1 colour
uniform float uLineClass;

// which ring this run of the pass spreads: 0 the first, 1 the second (for
// coloured lines' layered arcs only)
uniform float uRing;

const float blackThreshold = 0.1;

bool isBlack(ivec2 p){
	vec4 col = texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
	return col.a >= 0.5 && max(col.r, max(col.g, col.b)) < blackThreshold * col.a;
}

bool isLine(ivec2 p){
	vec4 col = texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
	return uLineClass == 0.0 ? isBlack(p) : !isBlack(p) && col.a >= 0.5;
}

vec4 arcPixelAt(ivec2 p){
	return texture(uArcPixels, (vec2(p) + 0.5) / uSheetSize);
}

vec2 unpackWords(vec4 texel){
	vec4 bytes = floor(texel * 255.0 + 0.5);
	return (bytes.xz * 256.0 + bytes.yw) / 256.0;
}

// the signed distance (out from the centre positive) from the centre of the
// pixel at p to the ellipse of the arc anchored at anchor
float distanceFromArc(ivec2 p, ivec2 anchor){
	vec2 uv = (vec2(anchor) + 0.5) / uSheetSize;
	vec2 centre = vec2(anchor) + unpackWords(texture(uArcCentres, uv)) - 128.0;
	vec2 axes = unpackWords(texture(uArcAxes, uv));
	vec2 fromCentre = vec2(p) - centre;
	vec2 scaled = fromCentre / (axes * axes);
	return (dot(fromCentre, scaled) - 1.0) / length(2.0 * scaled);
}

int unpackByte(float channel){
	return int(floor(channel * 255.0 + 0.5));
}

float packByte(float byteValue){
	return clamp(floor(byteValue + 0.5), 0.0, 255.0) / 255.0;
}

const ivec2 around[8] = ivec2[8](
	ivec2( 1, 0), ivec2(-1, 0), ivec2( 0, 1), ivec2( 0,-1),
	ivec2( 1, 1), ivec2(-1, 1), ivec2( 1,-1), ivec2(-1,-1)
);

bool isDrawn(int flags){
	return (flags & 3) == 3;
}

bool isLayered(int flags){
	return (flags & 4) != 0;
}



vec4 arcData(ivec2 anchor, ivec2 p, int flags){
	ivec2 fromPixel = anchor - p;
	return vec4(packByte(float(fromPixel.x + 128)), packByte(float(fromPixel.y + 128)), packByte(float(flags)), 1.0);
}

ivec2 anchorOf(ivec2 q, vec4 arc){
	return q + ivec2(unpackByte(arc.r), unpackByte(arc.g)) - 128;
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	vec4 own = arcPixelAt(p);
	finalColor = own;

	if (uRing > 0.5){
		// the second ring of a layered arc: beyond its black layers, a
		// pixel that touches no black but theirs
		if (own.a != 0.0) return;
		bool found = false;
		ivec2 anchor = ivec2(0);
		for (int i = 0; i < 8; i++){
			ivec2 q = p + around[i];
			if (!isBlack(q)) continue;
			vec4 arc = arcPixelAt(q);
			int flags = unpackByte(arc.b);
			if (arc.a == 0.0 || !isDrawn(flags) || !isLayered(flags)) return;
			ivec2 qAnchor = anchorOf(q, arc);
			if (found && qAnchor != anchor) return;
			found = true;
			anchor = qAnchor;
		}
		if (found && abs(distanceFromArc(p, anchor)) <= 2.75) finalColor = arcData(anchor, p, 3 | 4 | 8);
		return;
	}

	if (isLine(p)) return;
	finalColor = vec4(0.0);
	// a layered arc's black layers: every black pixel touching its drawn
	// pixels, whatever else it touches
	if (isBlack(p)){
		bool found = false;
		ivec2 anchor = ivec2(0);
		for (int i = 0; i < 8; i++){
			ivec2 q = p + around[i];
			if (!isLine(q)) continue;
			vec4 arc = arcPixelAt(q);
			int flags = unpackByte(arc.b);
			if (arc.a == 0.0 || !isDrawn(flags) || !isLayered(flags)) continue;
			ivec2 qAnchor = anchorOf(q, arc);
			if (found && qAnchor != anchor) { found = false; break; }
			found = true;
			anchor = qAnchor;
		}
		if (found && abs(distanceFromArc(p, anchor)) <= 1.75) { finalColor = arcData(anchor, p, 3 | 4 | 8); return; }
	}
	bool found = false;
	bool drawn = false;
	ivec2 anchor = ivec2(0);
	for (int i = 0; i < 8; i++){
		ivec2 q = p + around[i];
		if (!isLine(q)) continue;
		vec4 arc = arcPixelAt(q);
		if (arc.a == 0.0) return;
		ivec2 qAnchor = anchorOf(q, arc);
		if (found && qAnchor != anchor) return;
		found = true;
		anchor = qAnchor;
		drawn = drawn || isDrawn(unpackByte(arc.b));
	}
	if (!drawn) return;
	finalColor = arcData(anchor, p, 3 | 8);
}
