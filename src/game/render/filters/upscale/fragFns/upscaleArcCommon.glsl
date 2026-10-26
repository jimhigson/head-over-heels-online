/*
 * What the arc passes share: the sheet's samples, an arc's own frame, and
 * tracing along a convex outline in it.
 *
 * In its own frame an arc is the top-left quarter of its ellipse - the centre
 * lies down and to the right of it - and runs, from its vertical end to its
 * horizontal end: vertical runs, each a column further right and the next
 * one up; a middle of single pixels stepping up-right at 45 degrees; then
 * horizontal runs, each a row further up. The other three quarters are the
 * frame's rotations. Only the arc's outer edge is traced - line pixels with
 * outside above or to their left in the frame - so an arc is found on a
 * one-pixel line and on the edge of a solid body alike.
 *
 * The passes run once for each kind of line the art outlines with: most
 * items are outlined in black, but a dark item is outlined in a colour, with
 * its dark body within.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

// which kind of line the arcs are traced along: lineBlack or lineColour
uniform float uLineClass;

const float lineBlack = 0.0;
const float lineColour = 1.0;

const float blackThreshold = 0.1;

// how many single pixels an arc's 45 degree middle may have
const int maxMiddleLength = 4;
// how many runs each of an arc's arms is measured to
const int maxArmRuns = 4;
// the longest a run is measured to; a longer one counts as this long
const int maxRunLength = 8;
// the most an arc's run centres may stray from its fitted ellipse, in pixels
const float maxStray = 0.25;
// the most an over-the-top arc's peak may stray: the peak is the extreme,
// which can lie anywhere across the row its run is drawn in
const float maxPeakStray = 0.5;
// the most its sides' run centres may stray: a little more than another
// arc's, since its sides must also mirror each other run for run
const float maxPeakSideStray = 0.3;
// the largest semi-axis an arc's ellipse may have, in pixels
const float maxRadius = 32.0;
// the fewest points (run centres and middle pixels) an ellipse is fitted
// through; an arc with fewer is fitted with a circle, which needs fewer
const int minEllipsePoints = 5;
const int maxArcPoints = maxMiddleLength + 2 * maxArmRuns;

// an over-the-top arc's sides, each measured to as many of these
const int maxSideHRuns = 3;
const int maxSideSingles = 4;
const int maxSideVRuns = 2;
const int maxSideItems = maxSideHRuns + maxSideSingles + maxSideVRuns;
// the longest an over-the-top arc's peak run is measured to
const int maxPeakLength = 24;
const int maxPeakPoints = 1 + 2 * maxSideItems;
const int maxFitPoints = maxPeakPoints;

const int moveNone = 0;
const int moveHorizontal = 1;
const int moveVertical = 2;
const int moveDiagonal = 3;

vec4 srcAt(ivec2 p){
	return texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
}

bool isBlack(ivec2 p){
	vec4 col = srcAt(p);
	return col.a >= 0.5 && max(col.r, max(col.g, col.b)) < blackThreshold * col.a;
}

// an offset in the frame of an arc in the given quarter, as a sheet offset.
// Frames 4 to 7 are frames 0 to 3 mirrored, across the frame's vertical
ivec2 toSheet(ivec2 v, int quarter){
	ivec2 w = quarter >= 4 ? ivec2(-v.x, v.y) : v;
	int turn = quarter & 3;
	if (turn == 1) return ivec2(-w.y, w.x);
	if (turn == 2) return -w;
	if (turn == 3) return ivec2(w.y, -w.x);
	return w;
}

vec2 toSheetF(vec2 v, int quarter){
	vec2 w = quarter >= 4 ? vec2(-v.x, v.y) : v;
	int turn = quarter & 3;
	if (turn == 1) return vec2(-w.y, w.x);
	if (turn == 2) return -w;
	if (turn == 3) return vec2(w.y, -w.x);
	return w;
}

// a sheet offset, in the frame of the given (unmirrored) quarter
ivec2 toFrame(ivec2 s, int quarter){
	if (quarter == 1) return ivec2(s.y, -s.x);
	if (quarter == 2) return -s;
	if (quarter == 3) return ivec2(-s.y, s.x);
	return s;
}

// whether p is of the line the arcs are traced along
bool isLine(ivec2 p){
	return uLineClass == lineBlack ? isBlack(p) : !isBlack(p) && srcAt(p).a >= 0.5;
}

// whether p is outside the line: anything not of it
bool isOutside(ivec2 p){
	return !isLine(p);
}

bool blackIn(ivec2 origin, int quarter, ivec2 v){
	return isBlack(origin + toSheet(v, quarter));
}

// whether the pixel at v is on the outer edge the frame's arcs are traced on
bool onEdge(ivec2 origin, int quarter, ivec2 v){
	return isLine(origin + toSheet(v, quarter))
		&& (isOutside(origin + toSheet(v + ivec2(0, -1), quarter)) || isOutside(origin + toSheet(v + ivec2(-1, 0), quarter)));
}

// the next pixel along the edge toward the arc's horizontal end, and the move
// that reaches it
int towardHorizontalEnd(ivec2 origin, int quarter, ivec2 v, out ivec2 next){
	next = v;
	if (onEdge(origin, quarter, v + ivec2(0, -1))) { next = v + ivec2(0, -1); return moveVertical; }
	if (onEdge(origin, quarter, v + ivec2(1, -1))) { next = v + ivec2(1, -1); return moveDiagonal; }
	if (onEdge(origin, quarter, v + ivec2(1, 0))) { next = v + ivec2(1, 0); return moveHorizontal; }
	return moveNone;
}

// the next pixel along the edge toward the arc's vertical end, and the move
// that reaches it
int towardVerticalEnd(ivec2 origin, int quarter, ivec2 v, out ivec2 next){
	next = v;
	if (onEdge(origin, quarter, v + ivec2(-1, 0))) { next = v + ivec2(-1, 0); return moveHorizontal; }
	if (onEdge(origin, quarter, v + ivec2(-1, 1))) { next = v + ivec2(-1, 1); return moveDiagonal; }
	if (onEdge(origin, quarter, v + ivec2(0, 1))) { next = v + ivec2(0, 1); return moveVertical; }
	return moveNone;
}

// arc data is packed into bytes
float packByte(float byteValue){
	return clamp(floor(byteValue + 0.5), 0.0, 255.0) / 255.0;
}

int unpackByte(float channel){
	return int(floor(channel * 255.0 + 0.5));
}

// an arc's shape: its middle's length, and each arm's runs outward from it
struct ArcRuns {
	int middleLength;
	int hRuns[maxArmRuns];
	int hCount;
	int vRuns[maxArmRuns];
	int vCount;
};

// An arm's last run, as much of it as is the arc's: a run far longer than
// the one before it is a straight edge, or the extreme the arc meets, and
// only as much as the arc could have grown into - twice the run before it
// and one more - is taken as part of the arc
ArcRuns clippedToArc(ArcRuns arc){
	ArcRuns clipped = arc;
	for (int j = 0; j < maxArmRuns; j++){
		int hBefore = j == 0 ? 1 : arc.hRuns[max(j - 1, 0)];
		int vBefore = j == 0 ? 1 : arc.vRuns[max(j - 1, 0)];
		if (j == arc.hCount - 1) clipped.hRuns[j] = min(arc.hRuns[j], 2 * hBefore + 1);
		if (j == arc.vCount - 1) clipped.vRuns[j] = min(arc.vRuns[j], 2 * vBefore + 1);
	}
	return clipped;
}

// whether the arc's arms are alike, run for run
bool isSymmetric(ArcRuns arc){
	if (arc.hCount != arc.vCount) return false;
	for (int j = 0; j < maxArmRuns; j++){
		if (j < arc.hCount && arc.hRuns[j] != arc.vRuns[j]) return false;
	}
	return true;
}

// the ellipse a x^2 + c y^2 + d x + e y = 1, by least squares, through the
// points, from an origin inside the curve so the form cannot degenerate
bool fitEllipse(vec2 points[maxFitPoints], int count, vec2 origin, out vec2 centre, out vec2 axes){
	centre = vec2(0.0);
	axes = vec2(0.0);
	mat4 normal = mat4(0.0);
	vec4 rhs = vec4(0.0);
	for (int i = 0; i < maxFitPoints; i++){
		if (i >= count) break;
		vec2 q = points[i] - origin;
		vec4 row = vec4(q.x * q.x, q.y * q.y, q.x, q.y);
		normal += outerProduct(row, row);
		rhs += row;
	}
	if (abs(determinant(normal)) < 1e-6) return false;
	vec4 coefficients = inverse(normal) * rhs;
	if (coefficients.x <= 0.0 || coefficients.y <= 0.0) return false;
	vec2 fromOrigin = vec2(-coefficients.z / (2.0 * coefficients.x), -coefficients.w / (2.0 * coefficients.y));
	float level = 1.0 + coefficients.x * fromOrigin.x * fromOrigin.x + coefficients.y * fromOrigin.y * fromOrigin.y;
	if (level <= 0.0) return false;
	centre = origin + fromOrigin;
	axes = vec2(sqrt(level / coefficients.x), sqrt(level / coefficients.y));
	return true;
}

// whether the ellipse is small enough, and every point from the first on
// lies within stray of it - the point at index extreme, if any, being an
// extreme allowed to stray further
bool keepsNear(vec2 points[maxFitPoints], int count, int first, int extreme, float stray, vec2 centre, vec2 axes){
	if (axes.x > maxRadius || axes.y > maxRadius) return false;
	for (int i = 0; i < maxFitPoints; i++){
		if (i >= count) break;
		if (i < first) continue;
		vec2 fromCentre = points[i] - centre;
		vec2 scaled = fromCentre / (axes * axes);
		float level = dot(fromCentre, scaled) - 1.0;
		if (abs(level) / length(2.0 * scaled) > (i == extreme ? maxPeakStray : stray)) return false;
	}
	return true;
}

// The ellipse through an arc's points - its middle's pixels and its runs'
// centres, its last runs clipped to the arc, in its frame from its anchor -
// as its centre and semi-axes. An arc of few points has a circle fitted
// instead, with its centre on the middle's perpendicular, which only a
// symmetric arc can have. False where no fit keeps every run centre near
// enough.
bool fitArc(ArcRuns measured, out vec2 centre, out vec2 axes){
	centre = vec2(0.0);
	axes = vec2(0.0);
	ArcRuns arc = clippedToArc(measured);
	vec2 points[maxFitPoints];
	int count = 0;
	for (int i = 0; i < maxMiddleLength; i++){
		if (i >= arc.middleLength) break;
		points[count] = vec2(float(i), -float(i));
		count++;
	}
	int firstRunPoint = count;
	vec2 start = vec2(float(arc.middleLength), -float(arc.middleLength));
	for (int j = 0; j < maxArmRuns; j++){
		if (j >= arc.hCount) break;
		float len = float(arc.hRuns[j]);
		points[count] = start + vec2((len - 1.0) * 0.5, 0.0);
		count++;
		start += vec2(len, -1.0);
	}
	start = vec2(-1.0, 1.0);
	for (int j = 0; j < maxArmRuns; j++){
		if (j >= arc.vCount) break;
		float len = float(arc.vRuns[j]);
		points[count] = start + vec2(0.0, (len - 1.0) * 0.5);
		count++;
		start += vec2(-1.0, len);
	}
	vec2 middle = vec2(float(arc.middleLength - 1) * 0.5, -float(arc.middleLength - 1) * 0.5);

	if (count >= minEllipsePoints){
		if (!fitEllipse(points, count, middle + vec2(4.0), centre, axes)) return false;
		return keepsNear(points, count, 0, -1, maxStray, centre, axes);
	}
	if (!isSymmetric(arc)) return false;
	vec2 perpendicular = vec2(0.70710678);
	float sumSquares = 0.0;
	float sumAlong = 0.0;
	for (int i = 0; i < maxFitPoints; i++){
		if (i >= count) break;
		if (i < firstRunPoint) continue;
		vec2 q = points[i] - middle;
		sumSquares += dot(q, q);
		sumAlong += 2.0 * dot(q, perpendicular);
	}
	if (sumAlong <= 0.0) return false;
	float radius = sumSquares / sumAlong;
	centre = middle + perpendicular * radius;
	axes = vec2(radius);
	return keepsNear(points, count, firstRunPoint, -1, maxStray, centre, axes);
}

// the arc an anchor texel (from upscaleArcAnchors.frag) describes, and its
// quarter; false where the texel is no anchor
bool decodeAnchor(vec4 anchor, out ArcRuns arc, out int quarter){
	int counts = unpackByte(anchor.r);
	int lengths = unpackByte(anchor.g) | (unpackByte(anchor.b) << 8) | (unpackByte(anchor.a) << 16);
	quarter = counts >> 6;
	arc.middleLength = (counts & 3) + 1;
	arc.hCount = ((counts >> 2) & 3) + 1;
	arc.vCount = ((counts >> 4) & 3) + 1;
	for (int j = 0; j < maxArmRuns; j++){
		arc.hRuns[j] = ((lengths >> (3 * j)) & 7) + 1;
		arc.vRuns[j] = ((lengths >> (3 * (j + maxArmRuns))) & 7) + 1;
	}
	return (lengths & 7) != 0;
}

// ---- over-the-top arcs: a peak run, the extreme of its ellipse, with the
// same side falling away from each end of it - runs that never lengthen,
// then 45 degree single pixels, then runs down the other axis that never
// shorten. In its own frame the peak is horizontal at the top, its centre
// below it, its anchor its left end, and the right side is the left one
// mirrored across the peak's middle.

struct PeakArc {
	int peakLength;
	int hRuns[maxSideHRuns];
	int hCount;
	int singles;
	int vRuns[maxSideVRuns];
	int vCount;
};

// the side's last vertical run, as much of it as is the arc's: as for an
// arc's end runs, no more than twice the run before it and one more
PeakArc peakClippedToArc(PeakArc arc){
	PeakArc clipped = arc;
	for (int j = 0; j < maxSideVRuns; j++){
		int before = j == 0 ? 1 : arc.vRuns[max(j - 1, 0)];
		if (j == arc.vCount - 1) clipped.vRuns[j] = min(arc.vRuns[j], 2 * before + 1);
	}
	return clipped;
}

// the centres of the left side's runs and single pixels, from the peak out,
// in the arc's frame - a clipped last run by as much of it as is the arc's,
// which holds the fit to the straight edge the arc meets
int peakSidePoints(PeakArc arc, out vec2 points[maxSideItems]){
	int count = 0;
	vec2 leftEnd = vec2(0.0);
	for (int j = 0; j < maxSideHRuns; j++){
		if (j >= arc.hCount) break;
		float len = float(arc.hRuns[j]);
		vec2 rightEnd = leftEnd + vec2(-1.0, 1.0);
		points[count] = rightEnd - vec2((len - 1.0) * 0.5, 0.0);
		count++;
		leftEnd = rightEnd - vec2(len - 1.0, 0.0);
	}
	for (int j = 0; j < maxSideSingles; j++){
		if (j >= arc.singles) break;
		leftEnd += vec2(-1.0, 1.0);
		points[count] = leftEnd;
		count++;
	}
	for (int j = 0; j < maxSideVRuns; j++){
		if (j >= arc.vCount) break;
		float len = float(arc.vRuns[j]);
		vec2 top = leftEnd + vec2(-1.0, 1.0);
		points[count] = top + vec2(0.0, (len - 1.0) * 0.5);
		count++;
		leftEnd = top + vec2(0.0, len - 1.0);
	}
	return count;
}

// the ellipse through an over-the-top arc's peak centre and both sides'
// run centres, in its frame from its anchor; false where it strays
bool fitPeak(PeakArc measured, out vec2 centre, out vec2 axes){
	centre = vec2(0.0);
	axes = vec2(0.0);
	PeakArc arc = peakClippedToArc(measured);
	vec2 side[maxSideItems];
	int sideCount = peakSidePoints(arc, side);
	float peakMiddle = float(arc.peakLength - 1) * 0.5;
	vec2 points[maxFitPoints];
	points[0] = vec2(peakMiddle, 0.0);
	int count = 1;
	for (int i = 0; i < maxSideItems; i++){
		if (i >= sideCount) break;
		points[count] = side[i];
		points[count + 1] = vec2(2.0 * peakMiddle - side[i].x, side[i].y);
		count += 2;
	}
	if (count < minEllipsePoints){
		// a crown - the peak and one run each side - takes the circle
		// tangent to the sides' lines at the runs' centres, so it rounds
		// the apex off and runs smoothly on into the straight sides
		if (count < 3) return false;
		vec2 shoulder = side[0] - vec2(peakMiddle, 0.0);
		float slope = float(arc.hRuns[0]);
		float radius = -shoulder.x * sqrt(1.0 + slope * slope);
		centre = vec2(peakMiddle, shoulder.y - shoulder.x * slope);
		axes = vec2(radius);
		return radius <= maxRadius;
	}
	if (!fitEllipse(points, count, vec2(peakMiddle, 3.0), centre, axes)) return false;
	return keepsNear(points, count, 0, 0, maxPeakSideStray, centre, axes);
}

// the over-the-top arc a peaks texel (from upscaleArcPeaks.frag) describes,
// and its quarter; false where the texel is no anchor
bool decodePeak(vec4 texel, out PeakArc arc, out int quarter){
	int head = unpackByte(texel.r);
	int bits = unpackByte(texel.g) | (unpackByte(texel.b) << 8) | (unpackByte(texel.a) << 16);
	arc.peakLength = head & 31;
	quarter = (head >> 5) & 3;
	arc.hCount = bits & 3;
	arc.singles = (bits >> 2) & 7;
	arc.vCount = (bits >> 5) & 3;
	for (int j = 0; j < maxSideHRuns; j++) arc.hRuns[j] = ((bits >> (7 + 3 * j)) & 7) + 1;
	for (int j = 0; j < maxSideVRuns; j++) arc.vRuns[j] = ((bits >> (16 + 3 * j)) & 7) + 1;
	return head >= 128;
}

// two 16-bit values, high byte first, as upscaleArcEllipse.frag writes them
vec2 unpackWords(vec4 texel){
	vec4 bytes = floor(texel * 255.0 + 0.5);
	return (bytes.xz * 256.0 + bytes.yw) / 256.0;
}

// where the centre of the pixel at p is from the ellipse of the arc anchored
// at anchor (from upscaleArcEllipse.frag's textures): x its signed distance,
// out from the centre positive, and yz the direction out across the curve
vec3 arcDistanceAt(ivec2 p, ivec2 anchor, sampler2D centres, sampler2D axesAt){
	vec2 uv = (vec2(anchor) + 0.5) / uSheetSize;
	vec2 centre = vec2(anchor) + unpackWords(texture(centres, uv)) - 128.0;
	vec2 axes = unpackWords(texture(axesAt, uv));
	vec2 fromCentre = vec2(p) - centre;
	vec2 scaled = fromCentre / (axes * axes);
	vec2 gradient = 2.0 * scaled;
	return vec3((dot(fromCentre, scaled) - 1.0) / length(gradient), normalize(gradient));
}
