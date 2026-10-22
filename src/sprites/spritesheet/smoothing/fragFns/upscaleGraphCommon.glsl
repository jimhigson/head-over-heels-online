/*
 * What the graph passes share: the sheet's samples and their classes, the
 * cell codes, and Kopf & Lischinski's chain and island votes.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

const float blackThreshold = 0.1;

const float noCrossing = 0.0;
const float unresolved = 0.25;
const float tlBrConnects = 0.5;
const float trBlConnects = 0.75;
const float neitherConnects = 1.0;

// how far a chain of valence-2 pixels is followed from a crossing. Beyond
// this the vote is already decisive for any stroke in the art
const int maxChainLength = 24;

vec4 srcAt(ivec2 p){
	return texture(uTexture, (vec2(p) + 0.5) / uSheetSize);
}

// 0 = transparent, 1 = black linework, 2 = colourised fill
int classOf(vec4 col){
	if (col.a < 0.5) return 0;
	return max(col.r, max(col.g, col.b)) > blackThreshold * col.a ? 2 : 1;
}

// the eight neighbour directions: sides first, then the diagonal between
// side i-4 and side (i-3)%4
const ivec2 dirs[8] = ivec2[8](
	ivec2( 1, 0), ivec2( 0, 1), ivec2(-1, 0), ivec2( 0,-1),
	ivec2( 1, 1), ivec2(-1, 1), ivec2(-1,-1), ivec2( 1,-1)
);

int classAt(ivec2 p){
	return classOf(srcAt(p));
}

// whether p sits in a chequerboard: its sides all of one class, its
// diagonals all of its own, and the pattern carrying on two away. A
// chequerboard is a texture, not geometry: neither of its diagonals
// connects, which leaves it unsliced
bool inChequer(ivec2 p){
	int own = classAt(p);
	int side = classAt(p + ivec2(1, 0));
	if (side == own) return false;
	for (int i = 1; i < 4; i++){
		if (classAt(p + dirs[i]) != side) return false;
	}
	for (int i = 4; i < 8; i++){
		if (classAt(p + dirs[i]) != own) return false;
	}
	return classAt(p + ivec2(2, 0)) == own || classAt(p + ivec2(0, 2)) == own;
}

bool sameColour(vec4 col1, vec4 col2){
	return distance(col1, col2) == 0.0;
}

// layer B likeness: both real fills of the same colour
bool alikeB(vec4 col1, vec4 col2){
	return classOf(col1) == 2 && classOf(col2) == 2 && sameColour(col1, col2);
}

// whether the pixel at p is of ref's colour: its class in layer A, its exact
// fill colour in layer B
bool joins(vec4 ref, ivec2 p, bool layerB){
	vec4 col = srcAt(p);
	return layerB ? alikeB(ref, col) : classOf(ref) == classOf(col);
}


// the pixels connected to p in its colour's graph, as a bitmask over dirs.
// A diagonal counts only when neither of its two flanking sides would do, so
// a solid block's pixels join only by their sides
int connectionsOf(ivec2 p, vec4 ref, bool layerB){
	int mask = 0;
	bool side[4];
	for (int i = 0; i < 4; i++){
		side[i] = joins(ref, p + dirs[i], layerB);
		if (side[i]) mask |= 1 << i;
	}
	for (int i = 4; i < 8; i++){
		if (!side[i - 4] && !side[(i - 3) & 3] && joins(ref, p + dirs[i], layerB)) mask |= 1 << i;
	}
	return mask;
}

int bitCount8(int mask){
	int n = 0;
	for (int i = 0; i < 8; i++) n += (mask >> i) & 1;
	return n;
}

// follows the chain of valence-2 pixels onward from `from`, which has just
// been reached from `prev`; returns how many further pixels it visits
int chainLength(ivec2 from, ivec2 prev, vec4 ref, bool layerB){
	int length = 0;
	for (int step = 0; step < maxChainLength; step++){
		int mask = connectionsOf(from, ref, layerB);
		if (bitCount8(mask) != 2) break;
		ivec2 next = from;
		for (int i = 0; i < 8; i++){
			if (((mask >> i) & 1) == 1 && from + dirs[i] != prev) next = from + dirs[i];
		}
		if (next == from) break;
		prev = from;
		from = next;
		length++;
	}
	return length;
}

// K&L's curve: the number of pixels in the valence-2 chain through the
// diagonal p1-p2
int curveLength(ivec2 p1, ivec2 p2, vec4 ref, bool layerB){
	return 2 + chainLength(p1, p2, ref, layerB) + chainLength(p2, p1, ref, layerB);
}

// K&L's islands: votes for the a-d diagonal (negative for b-c) from any of
// the cell's pixels whose only connection is its diagonal
int islandVotes(ivec2 tl, vec4 a, vec4 b, bool layerB){
	const int islandWeight = 5;
	int votes = 0;
	if (bitCount8(connectionsOf(tl, a, layerB)) == 1) votes += islandWeight;
	if (bitCount8(connectionsOf(tl + ivec2(1, 1), a, layerB)) == 1) votes += islandWeight;
	if (bitCount8(connectionsOf(tl + ivec2(1, 0), b, layerB)) == 1) votes -= islandWeight;
	if (bitCount8(connectionsOf(tl + ivec2(0, 1), b, layerB)) == 1) votes -= islandWeight;
	return votes;
}
