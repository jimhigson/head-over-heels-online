// a peak run's sides, as the outline falls away from its ends, and the peak
// run itself. Needs upscaleArcCommon.glsl included before it

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
	// where each item's far end lies, in the frame
	ivec2 farEnds[maxSideItems];
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
		side.farEnds[i] = ivec2(0);
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
		side.farEnds[side.count] = farEnd;
		side.count++;
		cur = farEnd;
	}
	return side;
}

// whether the side, cut to its first items, ends at the ellipse's widest
// point: its last item runs along the axis there, with the outline not
// carrying on beyond it down the axis or further out, or is the single
// pixel the outline turns back in from, toward the far peak
bool reachesExtreme(ivec2 origin, int frame, Side side, int items){
	int last = items - 1;
	if (side.types[last] == itemVertical){
		ivec2 next;
		int move = towardVerticalEnd(origin, frame, side.farEnds[last], next);
		// nothing further out or down: the outline turns back in
		if (move == moveNone) return true;
		// the run carries on, cut at the measuring limit, or the outline
		// runs straight out
		if (move != moveDiagonal) return false;
		// one pixel further out, where another outline meets this one, is
		// not the outline carrying on; any more is
		ivec2 beyond;
		return towardVerticalEnd(origin, frame, next, beyond) == moveNone;
	}
	if (side.types[last] != itemSingle) return false;
	ivec2 end = side.farEnds[last];
	bool turnsBack = onEdge(origin, frame, end + ivec2(1, 1)) && !onEdge(origin, frame, end + ivec2(0, 1)) && !onEdge(origin, frame, end + ivec2(-1, 1));
	return turnsBack;
}

// whether another outline runs parallel to the peak two rows beyond it, over
// the peak's whole length, with a row of the outside between: the peak is
// the inner of two concentric rings, and the outer, where it touches the
// peak's ends corner to corner, is not this outline carrying on
bool ringBeyond(ivec2 origin, int quarter, int peakLength){
	for (int i = 0; i < maxPeakLength; i++){
		if (i >= peakLength) break;
		ivec2 v = ivec2(i, 0);
		if (!isOutside(origin + toSheet(v + ivec2(0, -1), quarter))) return false;
		if (!isLine(origin + toSheet(v + ivec2(0, -2), quarter))) return false;
	}
	return true;
}

// whether p is the left end of a peak in the quarter's frame: a run along
// the top of the outline, which falls away down-left from it and down-right
// from its right end, with nothing carrying on from that end - bar a
// concentric ring beyond. Gives the run's length, and its right end in the
// sheet
bool findPeak(ivec2 p, int quarter, out int peakLength, out ivec2 rightOrigin){
	peakLength = 0;
	rightOrigin = p;
	if (!onEdge(p, quarter, ivec2(0)) || !isOutside(p + toSheet(ivec2(0, -1), quarter))) return false;
	ivec2 ignored;
	if (towardVerticalEnd(p, quarter, ivec2(0), ignored) != moveDiagonal) return false;
	peakLength = 1;
	ivec2 rightEnd = ivec2(0);
	for (int i = 1; i < maxPeakLength; i++){
		ivec2 next;
		if (towardHorizontalEnd(p, quarter, rightEnd, next) != moveHorizontal) break;
		rightEnd = next;
		peakLength++;
	}
	if (peakLength < 2) return false;
	if (towardHorizontalEnd(p, quarter, rightEnd, ignored) != moveNone && !ringBeyond(p, quarter, peakLength)) return false;
	rightOrigin = p + toSheet(rightEnd, quarter);
	return towardVerticalEnd(rightOrigin, quarter + 4, ivec2(0), ignored) == moveDiagonal;
}
