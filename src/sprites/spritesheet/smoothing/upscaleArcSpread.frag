#version 300 es
precision highp float;

/*
 * The last of the arc passes: a pixel beside an arc, not of its line, is
 * drawn to the arc's ellipse too, so that the ellipse decides the whole of
 * the band it draws, on both sides of the arc's pixels. Only a pixel that
 * touches none of the line but its one arc's is: one that also touches
 * other lines is left to the ordinary slicing, which knows about both.
 * To a pixel outside the arc's ellipse, line pixels inside it are the body
 * the arc is the edge of, not another line, and count as the arc's own.
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

// each arc's curve, at its anchor
uniform sampler2D uArcCentres;
uniform sampler2D uArcAxes;
uniform sampler2D uArcExponents;

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
// pixel at p to the curve |x/a|^n + |y/b|^n = 1 of the arc anchored at anchor
float distanceFromArc(ivec2 p, ivec2 anchor){
	vec2 uv = (vec2(anchor) + 0.5) / uSheetSize;
	vec2 centre = vec2(anchor) + unpackWords(texture(uArcCentres, uv)) - 128.0;
	vec2 axes = unpackWords(texture(uArcAxes, uv));
	float exponent = unpackWords(texture(uArcExponents, uv)).x;
	vec2 fromCentre = vec2(p) - centre;
	vec2 scaled = abs(fromCentre) / axes;
	// |u|^(n - 1), zero on an axis: pow cannot be trusted with a zero base
	vec2 powered = pow(max(scaled, 1e-30), vec2(exponent - 1.0)) * step(1e-6, scaled);
	vec2 gradient = exponent * powered / axes;
	return (dot(scaled, powered) - 1.0) / length(gradient);
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

// whether two anchors' arcs draw the one curve, as the two halves of a
// closed ring do: the same centre, semi-axes and exponent
bool sameCurve(ivec2 a, ivec2 b){
	if (a == b) return true;
	vec2 ua = (vec2(a) + 0.5) / uSheetSize;
	vec2 ub = (vec2(b) + 0.5) / uSheetSize;
	vec2 centreA = vec2(a) + unpackWords(texture(uArcCentres, ua));
	vec2 centreB = vec2(b) + unpackWords(texture(uArcCentres, ub));
	vec2 axesA = unpackWords(texture(uArcAxes, ua));
	vec2 axesB = unpackWords(texture(uArcAxes, ub));
	float exponentA = unpackWords(texture(uArcExponents, ua)).x;
	float exponentB = unpackWords(texture(uArcExponents, ub)).x;
	const float slack = 1.0 / 128.0;
	return all(lessThanEqual(abs(centreA - centreB), vec2(slack))) && all(lessThanEqual(abs(axesA - axesB), vec2(slack))) && abs(exponentA - exponentB) <= slack;
}

// the arc pixel drawn to its curve at q, if there is one, as its anchor
bool drawnArcAt(ivec2 q, out ivec2 anchor){
	anchor = ivec2(0);
	if (!isLine(q)) return false;
	vec4 arc = arcPixelAt(q);
	if (arc.a == 0.0 || !isDrawn(unpackByte(arc.b))) return false;
	anchor = anchorOf(q, arc);
	return true;
}

// whether p is the inside corner of a diagonal step in an arc: it touches
// one of the arc's drawn pixels beside it and one above or below, which
// touch each other only corner to corner, so the curve runs through p
bool insideCorner(ivec2 p, out ivec2 anchor){
	for (int i = 0; i < 2; i++){
		for (int j = 2; j < 4; j++){
			ivec2 besideAnchor;
			ivec2 aboveAnchor;
			if (drawnArcAt(p + around[i], besideAnchor) && drawnArcAt(p + around[j], aboveAnchor) && sameCurve(besideAnchor, aboveAnchor)){
				anchor = besideAnchor;
				return true;
			}
		}
	}
	anchor = ivec2(0);
	return false;
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
	// the curve passes through an inside corner whatever else the pixel
	// touches, and the band is all it paints there
	if (insideCorner(p, anchor)){
		finalColor = arcData(anchor, p, 3 | 8);
		return;
	}
	for (int i = 0; i < 8; i++){
		ivec2 q = p + around[i];
		if (!isLine(q)) continue;
		vec4 arc = arcPixelAt(q);
		if (arc.a == 0.0) continue;
		ivec2 qAnchor = anchorOf(q, arc);
		if (found && !sameCurve(qAnchor, anchor)) return;
		found = true;
		anchor = qAnchor;
		drawn = drawn || isDrawn(unpackByte(arc.b));
	}
	if (!drawn) return;
	// every other line pixel touched must be the arc's body: within its
	// ellipse, with this pixel outside it
	for (int i = 0; i < 8; i++){
		ivec2 q = p + around[i];
		if (!isLine(q) || arcPixelAt(q).a != 0.0) continue;
		if (distanceFromArc(q, anchor) > -0.5 || distanceFromArc(p, anchor) < 0.0) return;
	}
	finalColor = arcData(anchor, p, 3 | 8);
}
