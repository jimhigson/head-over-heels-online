#version 300 es
precision highp float;

/*
 * Tells each pixel of the 1x sheet's lines which arc it is part of, if any,
 * by following its outline to the arc's anchor: an over-the-top arc's (from
 * upscaleArcPeaks.frag), which is preferred, or a quarter arc's (from
 * upscaleArcAnchors.frag).
 *
 * The pixels of an arc's middle and of its inner runs are drawn to its
 * ellipse by the upscale; so are those of the half of each end run nearest
 * the middle, where the ellipse and the line on to the next run beyond pass
 * through the run's centre together. The rest of an end run is still the
 * arc's, but is drawn as an ordinary line - as is the whole of an end run
 * that is a straight edge the arc meets, which no ellipse follows.
 *
 * Output per texel (all zero for no arc):
 *   r, g: the arc's anchor relative to the pixel, offset by 128
 *   b:    1 for a pixel of the arc, 3 for one drawn to its ellipse, | 4
 *         where the arc is layered: an over-the-top arc of a coloured line
 *         with black either side of its peak, as a rim between two black
 *         outlines is, and half of a ring - the opposite cap of the ring is
 *         an arc of the same width - which is drawn as all three layers
 *         from the one ellipse
 *   a:    1
 */

#include "fragFns/upscaleArcCommon.glsl"

uniform sampler2D uAnchors;
uniform sampler2D uPeaks;
// each arc's ellipse, at its anchor
uniform sampler2D uArcCentres;
uniform sampler2D uArcAxes;

// how far along its outline a pixel looks for its arc's anchor
const int maxTrace = 40;

const int notOnArc = 0;
const int onArc = 1;
const int drawnToCircle = 3;

vec4 anchorAt(ivec2 p){
	return texture(uAnchors, (vec2(p) + 0.5) / uSheetSize);
}

vec4 peakAt(ivec2 p){
	return texture(uPeaks, (vec2(p) + 0.5) / uSheetSize);
}

// the ellipse at an anchor: its centre in the sheet, and its semi-axes
void ellipseAt(ivec2 anchor, out vec2 centre, out vec2 axes){
	vec2 uv = (vec2(anchor) + 0.5) / uSheetSize;
	centre = vec2(anchor) + unpackWords(texture(uArcCentres, uv)) - 128.0;
	axes = unpackWords(texture(uArcAxes, uv));
}

// whether the over-the-top arc anchored at anchor, in the given quarter, is
// one half of a ring: somewhere along its axis, away from its peak, lies
// the peak of an arc in the opposite quarter of the same width, with its
// centre on the same axis. The two halves need not share one ellipse - a
// rim with straight sides has two caps, one each end
bool isRing(ivec2 anchor, int quarter){
	vec2 centre;
	vec2 axes;
	ellipseAt(anchor, centre, axes);
	PeakArc own;
	int ownQuarter;
	decodePeak(peakAt(anchor), own, ownQuarter);
	vec2 up = toSheetF(vec2(0.0, -1.0), quarter);
	vec2 across = vec2(-up.y, up.x);
	int opposite = (quarter + 2) & 3;
	// the opposite peak's anchor is the left end of its run in its frame
	ivec2 leftward = toSheet(ivec2(-1, 0), opposite);
	// scanned from the peak's middle, down the axis - not from the centre,
	// which a cap's tall ellipse can put beyond the opposite cap
	vec2 peakMiddle = vec2(anchor) + toSheetF(vec2(float(own.peakLength - 1) * 0.5, 0.0), quarter);
	for (int step = 1; step <= 2 * maxPeakLength; step++){
		ivec2 q = ivec2(round(peakMiddle - up * float(step)));
		// a ring's axis lies within its item: past the item's edge, the
		// scan would be reading some other sprite on the sheet
		if (srcAt(q).a < 0.5) break;
		if (!isLine(q)) continue;
		for (int i = 0; i < maxPeakLength; i++){
			PeakArc arc;
			int peakQuarter;
			if (decodePeak(peakAt(q), arc, peakQuarter) && peakQuarter == opposite){
				vec2 farCentre;
				vec2 farAxes;
				ellipseAt(q, farCentre, farAxes);
				// the caps of a rim with straight sides share its width, but
				// not their height: only the semi-axis across is compared
				float width = abs(dot(across, axes));
				float farWidth = abs(dot(across, farAxes));
				if (abs(dot(farCentre - centre, across)) <= 1.0 && abs(farWidth - width) <= 1.5) return true;
				break;
			}
			if (!isLine(q + leftward)) break;
			q += leftward;
		}
	}
	return false;
}

// whether black lies either side of the arc across its widest points, as
// along its peak: a rim's black layers run alongside its colour all round,
// whereas rings stacked one below another - a disc's top edge, its face,
// its bottom edge - share a width and part at the sides. True where the
// arc's sides do not reach the widest points, which then cannot tell
bool blackAcrossExtremes(ivec2 anchor, int quarter, PeakArc arc){
	if (!arc.atExtreme) return true;
	vec2 side[maxSideItems];
	int sideCount = peakSidePoints(arc, side);
	if (sideCount == 0) return true;
	vec2 extreme = side[sideCount - 1];
	float peakMiddle = float(arc.peakLength - 1) * 0.5;
	ivec2 across = toSheet(ivec2(1, 0), quarter);
	ivec2 left = anchor + ivec2(round(toSheetF(extreme, quarter)));
	ivec2 right = anchor + ivec2(round(toSheetF(vec2(2.0 * peakMiddle - extreme.x, extreme.y), quarter)));
	return isBlack(left - across) && isBlack(left + across) && isBlack(right - across) && isBlack(right + across);
}

// 4 where the over-the-top arc anchored at anchor is layered - a coloured
// line with black either side of it along its peak run and across its
// widest points, as a rim between two black outlines is - and half of a
// ring, so its layers are rings of their own; else 0. Only the peak and
// the widest points decide it: a line that merely touches black along its
// sides, as the fill inside an outline does where the lines of a pattern
// meet it, is not layered
int layering(ivec2 anchor, int quarter, bool isPeak){
	if (uLineClass != lineColour || !isPeak) return 0;
	PeakArc arc;
	int peakQuarter;
	decodePeak(peakAt(anchor), arc, peakQuarter);
	ivec2 along = toSheet(ivec2(1, 0), quarter);
	ivec2 inward = toSheet(ivec2(0, 1), quarter);
	for (int i = 0; i < maxPeakLength; i++){
		if (i >= arc.peakLength) break;
		ivec2 q = anchor + along * i;
		if (!isBlack(q + inward) || !isBlack(q - inward)) return 0;
	}
	if (!blackAcrossExtremes(anchor, quarter, arc)) return 0;
	return isRing(anchor, quarter) ? 4 : 0;
}

// how the pixels of an arm's end run belong to the arc: its nearer half is
// drawn to the ellipse, as the inner runs are, unless the run was clipped -
// a straight edge the arc meets, which is drawn as the line it is
int endRunMembership(int along, int len, int measured){
	if (measured > len) return onArc;
	return along < len / 2 ? drawnToCircle : onArc;
}

// how a pixel at rel from an anchor (in the arc's frame) belongs to its arc
int membership(ivec2 rel, ArcRuns measured){
	ArcRuns arc = clippedToArc(measured);
	for (int i = 0; i < maxMiddleLength; i++){
		if (i < arc.middleLength && rel == ivec2(i, -i)) return drawnToCircle;
	}
	ivec2 start = ivec2(arc.middleLength, -arc.middleLength);
	for (int j = 0; j < maxArmRuns; j++){
		if (j >= arc.hCount) break;
		int len = arc.hRuns[j];
		if (rel.y == start.y && rel.x >= start.x && rel.x < start.x + len){
			return j < arc.hCount - 1 ? drawnToCircle : endRunMembership(rel.x - start.x, len, measured.hRuns[j]);
		}
		start += ivec2(len, -1);
	}
	start = ivec2(-1, 1);
	for (int j = 0; j < maxArmRuns; j++){
		if (j >= arc.vCount) break;
		int len = arc.vRuns[j];
		if (rel.x == start.x && rel.y >= start.y && rel.y < start.y + len){
			return j < arc.vCount - 1 ? drawnToCircle : endRunMembership(rel.y - start.y, len, measured.vRuns[j]);
		}
		start += ivec2(-1, len);
	}
	return notOnArc;
}

// the arc data for the pixel at p, if the anchor at v (in the frame of the
// given quarter, from p) is its arc's
bool arcFromAnchor(ivec2 p, int quarter, ivec2 v, out vec4 arcData){
	arcData = vec4(0.0);
	ivec2 fromPixel = toSheet(v, quarter);
	ArcRuns arc;
	int anchorQuarter;
	if (!decodeAnchor(anchorAt(p + fromPixel), arc, anchorQuarter) || anchorQuarter != quarter) return false;
	int member = membership(-v, arc);
	if (member == notOnArc) return false;
	arcData = vec4(
		packByte(float(fromPixel.x + 128)),
		packByte(float(fromPixel.y + 128)),
		packByte(float(member)),
		1.0
	);
	return true;
}

// how a pixel at rel from an over-the-top arc's anchor (in the arc's frame)
// belongs to its arc. Sides that end at the ellipse's widest points are
// drawn to it whole, last item and all: the curve runs through the widest
// point, and on a ring the far half's sides end there too
int peakMembership(ivec2 rel, PeakArc measured){
	PeakArc arc = peakClippedToArc(measured);
	if (rel.y == 0 && rel.x >= 0 && rel.x < arc.peakLength) return drawnToCircle;
	// the right side is the left one mirrored
	ivec2 q = rel.x >= arc.peakLength ? ivec2(arc.peakLength - 1 - rel.x, rel.y) : rel;
	if (q.x >= 0) return notOnArc;
	int last = arc.hCount + arc.singles + arc.vCount - 1;
	int index = 0;
	ivec2 leftEnd = ivec2(0);
	for (int j = 0; j < maxSideHRuns; j++){
		if (j >= arc.hCount) break;
		int len = arc.hRuns[j];
		ivec2 rightEnd = leftEnd + ivec2(-1, 1);
		if (q.y == rightEnd.y && q.x <= rightEnd.x && q.x > rightEnd.x - len){
			return (index < last || rightEnd.x - q.x < len / 2) ? drawnToCircle : onArc;
		}
		leftEnd = rightEnd - ivec2(len - 1, 0);
		index++;
	}
	for (int j = 0; j < maxSideSingles; j++){
		if (j >= arc.singles) break;
		leftEnd += ivec2(-1, 1);
		if (q == leftEnd) return index < last || measured.atExtreme ? drawnToCircle : onArc;
		index++;
	}
	for (int j = 0; j < maxSideVRuns; j++){
		if (j >= arc.vCount) break;
		// the run at the widest point is the curve's own, however long
		int len = index == last && measured.atExtreme ? measured.vRuns[j] : arc.vRuns[j];
		ivec2 top = leftEnd + ivec2(-1, 1);
		if (q.x == top.x && q.y >= top.y && q.y < top.y + len){
			return index < last || measured.atExtreme ? drawnToCircle : endRunMembership(q.y - top.y, len, measured.vRuns[j]);
		}
		leftEnd = top + ivec2(0, len - 1);
		index++;
	}
	return notOnArc;
}

// the over-the-top arc the pixel at p is part of, if any, found by following
// its outline up its side - in either of the frames, mirrored or not, whose
// side it may be on - to the anchor at the peak's left end; how it belongs,
// one that draws it preferred
int peakArcFor(ivec2 p, out vec4 arcData){
	arcData = vec4(0.0);
	int best = notOnArc;
	for (int quarter = 0; quarter < 4; quarter++){
		for (int mirrored = 0; mirrored < 2; mirrored++){
			int frame = quarter + 4 * mirrored;
			if (!onEdge(p, frame, ivec2(0))) continue;
			ivec2 v = ivec2(0);
			for (int i = 0; i <= maxTrace; i++){
				ivec2 anchor = p + toSheet(v, frame);
				PeakArc arc;
				int anchorQuarter;
				if (decodePeak(peakAt(anchor), arc, anchorQuarter) && anchorQuarter == quarter){
					int member = peakMembership(toFrame(p - anchor, quarter), arc);
					if (member > best){
						best = member;
						ivec2 fromPixel = anchor - p;
						arcData = vec4(
							packByte(float(fromPixel.x + 128)),
							packByte(float(fromPixel.y + 128)),
							packByte(float(member | layering(anchor, quarter, true))),
							1.0
						);
						if (best == drawnToCircle) return best;
					}
				}
				ivec2 next;
				if (towardHorizontalEnd(p, frame, v, next) == moveNone) break;
				v = next;
			}
		}
	}
	return best;
}

// the arc data for the pixel at p from the first anchor its outline in the
// given quarter leads to whose arc it is part of, if any
bool arcInQuarter(ivec2 p, int quarter, out vec4 arc){
	arc = vec4(0.0);
	if (!onEdge(p, quarter, ivec2(0))) return false;
	if (arcFromAnchor(p, quarter, ivec2(0), arc)) return true;
	ivec2 v = ivec2(0);
	for (int i = 0; i < maxTrace; i++){
		ivec2 next;
		if (towardVerticalEnd(p, quarter, v, next) == moveNone) break;
		v = next;
		if (arcFromAnchor(p, quarter, v, arc)) return true;
	}
	v = ivec2(0);
	for (int i = 0; i < maxTrace; i++){
		ivec2 next;
		if (towardHorizontalEnd(p, quarter, v, next) == moveNone) break;
		v = next;
		if (arcFromAnchor(p, quarter, v, arc)) return true;
	}
	return false;
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	if (!isLine(p)) return;
	// a pixel can be on more than one arc - an over-the-top arc's side is
	// also a quarter arc, and an end run can be two arcs' - so an arc that
	// draws it is preferred to one that leaves it a line, and an
	// over-the-top arc to a quarter one
	vec4 fallback = vec4(0.0);
	vec4 arc;
	int peakMember = peakArcFor(p, arc);
	if (peakMember == drawnToCircle) { finalColor = arc; return; }
	if (peakMember == onArc) fallback = arc;
	for (int quarter = 0; quarter < 4; quarter++){
		if (!arcInQuarter(p, quarter, arc)) continue;
		if ((unpackByte(arc.b) & 3) == drawnToCircle) { finalColor = arc; return; }
		if (fallback.a == 0.0) fallback = arc;
	}
	finalColor = fallback;
}
