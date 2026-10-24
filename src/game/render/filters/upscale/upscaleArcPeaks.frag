#version 300 es
precision highp float;

/*
 * Finds the over-the-top arcs in the 1x sheet's outlines: a peak run - the
 * extreme of its ellipse, with the outline falling away the same way from
 * both its ends - and its two sides, which must be alike run for run as an
 * axis-aligned ellipse's two halves are. Each side, from the peak out, is
 * runs that never lengthen (and never longer than the peak), then 45 degree
 * single pixels, then runs down the other axis that never shorten - eg
 * 1-2-3-2-1 is a peak of three with a two and a single either side.
 *
 * The arc keeps as much of its sides as an ellipse can be fitted through
 * with every run centre near it, and needs at least two runs or single
 * pixels each side, so that the ellipse is fitted, not merely threaded.
 * Each side's first run must be over a quarter of the peak's length, as
 * an ellipse's runs shorten no faster than that: a far longer peak is a
 * straight edge with its corners cut. Each side must turn as far as 45
 * degrees, and must not stop where the outline carries straight on - the same run again - since that is a
 * corner between straight lines, such as an isometric tile's; a 45 degree
 * line carrying on from the arc is its tangent, and does not count. The
 * peak, the extreme, may lie further from the ellipse than the other runs,
 * as the extreme can be anywhere across the row its run is drawn in, and
 * the sides a little further than a quarter arc's runs, since they must
 * also mirror each other.
 *
 * Found at the peak's left end in the arc's frame. Output per texel there
 * (all zero elsewhere):
 *   r: the peak's length | the quarter << 5 | 128
 *   g, b, a: one 24-bit number, low byte first: the side's horizontal runs
 *      | its single pixels << 2 | its vertical runs << 5, then the runs'
 *      lengths less one, three bits each from bit 7: the horizontal runs
 *      from the peak out, then the vertical ones from bit 16
 */

#include "fragFns/upscaleArcCommon.glsl"

const int itemHorizontal = 0;
const int itemSingle = 1;
const int itemVertical = 2;

// one side, from the peak out, as its runs and single pixels in order, and
// the run the outline went on into where it stopped being one
struct Side {
	int types[maxSideItems];
	int lengths[maxSideItems];
	int count;
	int followingType;
	int followingLength;
};

// the run the edge goes on into from start, toward the frame's vertical
// end: its kind, its length, and its far end
int measureRun(ivec2 origin, int frame, ivec2 start, out int len, out ivec2 farEnd){
	len = 1;
	farEnd = start;
	ivec2 next;
	int move = towardVerticalEnd(origin, frame, start, next);
	if (move == moveHorizontal || move == moveVertical){
		for (int i = 1; i < maxRunLength; i++){
			if (towardVerticalEnd(origin, frame, farEnd, next) != move) break;
			farEnd = next;
			len++;
		}
		return move == moveHorizontal ? itemHorizontal : itemVertical;
	}
	return itemSingle;
}

// a side, measured from the end of the peak at origin
Side measureSide(ivec2 origin, int frame){
	Side side;
	side.count = 0;
	side.followingType = -1;
	side.followingLength = 0;
	for (int i = 0; i < maxSideItems; i++){
		side.types[i] = 0;
		side.lengths[i] = 0;
	}
	ivec2 cur = ivec2(0);
	int hRuns = 0;
	int singles = 0;
	int vRuns = 0;
	for (int i = 0; i < maxSideItems; i++){
		ivec2 start;
		if (towardVerticalEnd(origin, frame, cur, start) != moveDiagonal) break;
		int len;
		ivec2 farEnd;
		int kind = measureRun(origin, frame, start, len, farEnd);
		side.followingType = kind;
		side.followingLength = len;
		if (kind == itemHorizontal && (singles > 0 || vRuns > 0 || hRuns == maxSideHRuns)) break;
		if (kind == itemSingle && (vRuns > 0 || singles == maxSideSingles)) break;
		if (kind == itemVertical && (singles == 0 || vRuns == maxSideVRuns)) break;
		side.followingType = -1;
		if (kind == itemHorizontal) hRuns++;
		if (kind == itemSingle) singles++;
		if (kind == itemVertical) vRuns++;
		side.types[side.count] = kind;
		side.lengths[side.count] = len;
		side.count++;
		cur = farEnd;
	}
	return side;
}

// how many of the side's items, from the peak out, can be part of an arc
// over a peak of the given length: horizontal runs no longer than the peak
// and never lengthening, no three alike in a row; vertical runs never
// shortening
int usableItems(Side side, int peakLength){
	int usable = 0;
	for (int i = 0; i < maxSideItems; i++){
		if (i >= side.count) break;
		int kind = side.types[i];
		int len = side.lengths[i];
		if (kind == itemHorizontal){
			if (len > peakLength || len < 2) break;
			if (i > 0 && len > side.lengths[i - 1]) break;
			if (i > 1 && len == side.lengths[i - 1] && len == side.lengths[i - 2]) break;
		}
		if (kind == itemVertical){
			if (len < 2) break;
			if (i > 0 && side.types[i - 1] == itemVertical && len < side.lengths[i - 1]) break;
		}
		usable++;
	}
	return usable;
}

// whether the side, cut to its first items, is part of an arc's turn: it
// reaches 45 degrees in a single pixel, and the outline does not carry
// straight on from where it is cut - the same run again would make it a
// corner between straight lines, not an arc - unless what carries on is a
// 45 degree line, the arc's own tangent
// whether the side's first item makes a crown with the peak: a run, so the
// apex is rounded off even where the sides below it are straight
bool isCrown(Side side){
	return side.types[0] == itemHorizontal && side.lengths[0] >= 2;
}

// whether two pixels beyond the line are alike: both transparent, or the
// one fill colour
bool alikeBeyond(vec4 a, vec4 b){
	return a.a < 0.5 ? b.a < 0.5 : b.a >= 0.5 && all(equal(a, b));
}

// the pixel beyond the line at v, in the frame: above it
vec4 beyond(ivec2 origin, int quarter, ivec2 v){
	return srcAt(origin + toSheet(v + ivec2(0, -1), quarter));
}

// whether what lies beyond the side's first run is what lies beyond the
// peak: a crown is one edge, where a run of one line beside another's
// end only looks like one
bool crownSharesBeyond(ivec2 origin, int quarter, Side side){
	vec4 overPeak = beyond(origin, quarter, ivec2(0));
	// a coloured outline's crown is on the item's silhouette: a colour
	// strip between black lines is not one
	if (uLineClass == lineColour && overPeak.a >= 0.5) return false;
	return alikeBeyond(overPeak, beyond(origin, quarter, ivec2(-1, 1)))
		&& alikeBeyond(overPeak, beyond(origin, quarter, ivec2(-side.lengths[0], 1)));
}

bool turnsAsArc(Side side, int items){
	bool reachesDiagonal = false;
	for (int i = 0; i < maxSideItems; i++){
		if (i < items && side.types[i] == itemSingle) reachesDiagonal = true;
	}
	if (!reachesDiagonal) return false;
	int nextType = items < side.count ? side.types[min(items, maxSideItems - 1)] : side.followingType;
	int nextLength = items < side.count ? side.lengths[min(items, maxSideItems - 1)] : side.followingLength;
	int last = items - 1;
	// a 45 degree line carrying on is the arc's own tangent going on
	if (side.types[last] == itemSingle) return true;
	return !(nextType == side.types[last] && nextLength == side.lengths[last]);
}

PeakArc peakArcOf(int peakLength, Side side, int items){
	PeakArc arc;
	arc.peakLength = peakLength;
	arc.hCount = 0;
	arc.singles = 0;
	arc.vCount = 0;
	for (int j = 0; j < maxSideHRuns; j++) arc.hRuns[j] = 1;
	for (int j = 0; j < maxSideVRuns; j++) arc.vRuns[j] = 1;
	for (int i = 0; i < maxSideItems; i++){
		if (i >= items) break;
		int kind = side.types[i];
		if (kind == itemHorizontal){
			arc.hRuns[arc.hCount] = side.lengths[i];
			arc.hCount++;
		}
		if (kind == itemSingle) arc.singles++;
		if (kind == itemVertical){
			arc.vRuns[arc.vCount] = side.lengths[i];
			arc.vCount++;
		}
	}
	return arc;
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	if (!isLine(p)) return;
	for (int quarter = 0; quarter < 4; quarter++){
		// p must be the left end of a run along the top of the outline,
		// which falls away down-left from it
		if (!onEdge(p, quarter, ivec2(0)) || !isOutside(p + toSheet(ivec2(0, -1), quarter))) continue;
		ivec2 ignored;
		if (towardVerticalEnd(p, quarter, ivec2(0), ignored) != moveDiagonal) continue;
		int peakLength = 1;
		ivec2 rightEnd = ivec2(0);
		for (int i = 1; i < maxPeakLength; i++){
			ivec2 next;
			if (towardHorizontalEnd(p, quarter, rightEnd, next) != moveHorizontal) break;
			rightEnd = next;
			peakLength++;
		}
		if (peakLength < 2) continue;
		// ...and its right end must fall away down-right, mirroring the left
		if (towardHorizontalEnd(p, quarter, rightEnd, ignored) != moveNone) continue;
		ivec2 rightOrigin = p + toSheet(rightEnd, quarter);
		if (towardVerticalEnd(rightOrigin, quarter + 4, ivec2(0), ignored) != moveDiagonal) continue;

		Side left = measureSide(p, quarter);
		Side right = measureSide(rightOrigin, quarter + 4);
		// along an ellipse the run after the peak is over a third of the
		// peak's length; a far longer peak is a straight edge with its
		// corners cut, not an arc's extreme
		if (left.count == 0 || peakLength > 4 * left.lengths[0] + 1) continue;
		int alike = min(usableItems(left, peakLength), usableItems(right, peakLength));
		for (int i = 0; i < maxSideItems; i++){
			if (i >= alike) break;
			if (left.types[i] != right.types[i] || left.lengths[i] != right.lengths[i]) {
				alike = i;
				break;
			}
		}
		bool crown = isCrown(left) && crownSharesBeyond(p, quarter, left) && crownSharesBeyond(rightOrigin, quarter + 4, right);
		for (int items = maxSideItems; items >= 1; items--){
			if (items > alike) continue;
			if (items == 1 ? !crown : !turnsAsArc(left, items) || !turnsAsArc(right, items)) continue;
			PeakArc arc = peakArcOf(peakLength, left, items);
			vec2 centre;
			vec2 axes;
			if (!fitPeak(arc, centre, axes)) continue;
			int bits = arc.hCount | (arc.singles << 2) | (arc.vCount << 5);
			for (int j = 0; j < maxSideHRuns; j++) bits |= (arc.hRuns[j] - 1) << (7 + 3 * j);
			for (int j = 0; j < maxSideVRuns; j++) bits |= (arc.vRuns[j] - 1) << (16 + 3 * j);
			finalColor = vec4(
				packByte(float(peakLength | (quarter << 5) | 128)),
				packByte(float(bits & 255)),
				packByte(float((bits >> 8) & 255)),
				packByte(float((bits >> 16) & 255))
			);
			return;
		}
	}
}
